import { WAKATIME_API_URL } from '@/constants';

export type WakaTimeStatsData = {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
};

export type WakatimeStats = {
  data: {
    editors: WakaTimeStatsData[];
    languages: WakaTimeStatsData[];
    machines: (WakaTimeStatsData & {
      machine_name_id: string;
    })[];
    operating_systems: WakaTimeStatsData[];
  };
};

export const statsApiURL = `${WAKATIME_API_URL}/users/current/stats/last_30_days?api_key=${process.env.WAKATIME_API_KEY}`;
