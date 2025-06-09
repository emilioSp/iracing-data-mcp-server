import { API_BASE_URL } from './constant.js';
import { fetchData } from './repository/api.js';

interface MemberRecapParams {
  member_id?: number;
  year?: number;
  season?: number;
}

interface CategoryStats {
  category_id: number;
  category: string;
  category_name: string;
  starts: number;
  wins: number;
  top5: number;
  laps: number;
  laps_led: number;
  avg_start_position: number;
  avg_finish_position: number;
  avg_field_size: number;
  avg_incidents: number;
  avg_points: number;
  win_percentage: number;
  top5_percentage: number;
  laps_led_percentage: number;
}

interface SeasonStats extends CategoryStats {
  year: number;
  season: number;
}

interface MemberRecapData {
  member_id: number;
  yearly_summary?: CategoryStats[];
  season_summary?: SeasonStats[];
}

export const memberRecap = async (
  params: MemberRecapParams = {},
): Promise<MemberRecapData> => {
  const queryParams = new URLSearchParams();

  if (params.member_id !== undefined) {
    queryParams.append('cust_id', params.member_id.toString());
  }

  if (params.year !== undefined) {
    queryParams.append('year', params.year.toString());
  }

  if (params.season !== undefined) {
    queryParams.append('season', params.season.toString());
  }

  const url = `${API_BASE_URL}/stats/member_recap?${queryParams.toString()}`;

  const recap = await fetchData(url);
  return recap as MemberRecapData;
};
