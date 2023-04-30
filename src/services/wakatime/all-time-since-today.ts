import { WAKATIME_API_URL } from '@/constants';

export type WakatimeAllTimeSinceToday = {
  data: {
    decimal: string;
    digital: string;
    is_up_to_date: boolean;
    percent_calculated: number;
    range: {
      end: string;
      end_date: string;
      end_text: string;
      start: string;
      start_date: string;
      start_text: string;
      timezone: string;
    };
    text: string;
    timeout: number;
    total_seconds: number;
  };
};

export const allTimeSinceTodayApiURL = `${WAKATIME_API_URL}/users/current/all_time_since_today?api_key=${process.env.WAKATIME_API_KEY}`;
