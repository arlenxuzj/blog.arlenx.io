export type WakaTimeStatsData = { name: string; percent: number; text: string };
export type WakatimeStats = {
  data: {
    editors: WakaTimeStatsData[];
    languages: WakaTimeStatsData[];
    machines: WakaTimeStatsData[];
    operating_systems: WakaTimeStatsData[];
  };
};
