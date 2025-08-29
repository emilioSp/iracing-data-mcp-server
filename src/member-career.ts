import { API_BASE_URL } from './constant.ts';
import { fetchData } from './repository/api.ts';

interface CareerStats {
  category_id: number;
  category: string;
  starts: number;
  wins: number;
  top5: number;
  poles: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  avg_incidents: number;
  avg_points: number;
  win_percentage: number;
  top5_percentage: number;
  laps_led_percentage: number;
  total_club_points: number;
  poles_percentage: number;
}

interface MemberCareerData {
  cust_id: number;
  stats: CareerStats[];
}

export const memberCareer = async (
  memberId: number,
): Promise<MemberCareerData> => {
  const queryParams = new URLSearchParams();
  queryParams.append('cust_id', memberId.toString());

  const url = `${API_BASE_URL}/stats/member_career?${queryParams.toString()}`;

  const career = await fetchData(url);
  return career as MemberCareerData;
};
