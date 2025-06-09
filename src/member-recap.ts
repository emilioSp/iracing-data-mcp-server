import { API_BASE_URL } from './constant.js';
import { fetchData } from './repository/api.js';

interface MemberRecapParams {
  member_id?: number;
  year?: number;
  season?: number;
}

interface FavoriteCar {
  car_id: number;
  car_name: string;
  car_image: string;
}

interface FavoriteTrack {
  config_name: string;
  track_id: number;
  track_logo: string;
  track_name: string;
}

interface RecapStats {
  starts: number;
  wins: number;
  top5: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  favorite_car: FavoriteCar;
  favorite_track: FavoriteTrack;
}

interface MemberRecapData {
  year: number;
  stats: RecapStats;
  success: boolean;
  season: number | null;
  cust_id: number;
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
