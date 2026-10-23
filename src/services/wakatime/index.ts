import { WAKATIME_API_URL } from '@/constants';
import { fetcher } from '@/utils/fetcher';
import type { WakatimeAllTimeSinceToday } from './all-time-since-today';
import type { WakatimeStats } from './stats';

type FetchData = (
  url: string,
  config: { params: { api_key: string }; timeout: number }
) => Promise<unknown>;

export type WakatimeData = {
  allTime: WakatimeAllTimeSinceToday;
  stats: WakatimeStats;
};

export async function getWakatimeData(
  apiKey = process.env.WAKATIME_API_KEY,
  fetchData: FetchData = fetcher
): Promise<WakatimeData | null> {
  if (!apiKey) return null;
  try {
    const config = { params: { api_key: apiKey }, timeout: 10000 };
    const [allTime, stats] = (await Promise.all([
      fetchData(
        `${WAKATIME_API_URL}/users/current/all_time_since_today`,
        config
      ),
      fetchData(`${WAKATIME_API_URL}/users/current/stats/last_30_days`, config)
    ])) as [WakatimeAllTimeSinceToday, WakatimeStats];
    if (
      typeof allTime?.data?.range?.start !== 'string' ||
      typeof allTime?.data?.text !== 'string' ||
      !['editors', 'languages', 'machines', 'operating_systems'].every(key => {
        const values = stats?.data?.[key as keyof WakatimeStats['data']];
        return (
          Array.isArray(values) &&
          values.every(
            value =>
              typeof value.name === 'string' &&
              typeof value.text === 'string' &&
              Number.isFinite(value.percent)
          )
        );
      })
    )
      throw new Error('Invalid WakaTime response');
    const project = (items: WakatimeStats['data']['editors']) =>
      items.map(({ name, text, percent }) => ({ name, text, percent }));
    return {
      allTime: {
        data: {
          range: { start: allTime.data.range.start },
          text: allTime.data.text
        }
      },
      stats: {
        data: {
          editors: project(stats.data.editors),
          languages: project(stats.data.languages),
          machines: project(stats.data.machines),
          operating_systems: project(stats.data.operating_systems)
        }
      }
    };
  } catch {
    // Axios errors include request configuration and credentials. Never log them.
    console.warn(
      'WakaTime statistics are unavailable; continuing without statistics.'
    );
    return null;
  }
}
