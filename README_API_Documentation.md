# iRacing API Documentation

This document provides a comprehensive overview of the iRacing API endpoints and their usage.

## 📋 Table of Contents

- [Car](#car)
- [Car Class](#car-class)
- [Constants](#constants)
- [Driver Stats by Category](#driver-stats-by-category)
- [Hosted Sessions](#hosted-sessions)
- [League](#league)
- [Lookup](#lookup)
- [Member](#member)
- [Results](#results)
- [Season](#season)
- [Series](#series)
- [Stats](#stats)
- [Team](#team)
- [Time Attack](#time-attack)
- [Track](#track)

---

## 🚗 Car

### Assets
- **Endpoint:** `https://members-ng.iracing.com/data/car/assets`
- **Expiration:** 900 seconds
- **Note:** Image paths are relative to `https://images-static.iracing.com/`

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/car/get`
- **Expiration:** 900 seconds

---

## 🏁 Car Class

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/carclass/get`
- **Expiration:** 900 seconds

---

## ⚙️ Constants

### Categories
- **Endpoint:** `https://members-ng.iracing.com/data/constants/categories`
- **Expiration:** 900 seconds
- **Note:** Constant; returned directly as an array of objects

### Divisions
- **Endpoint:** `https://members-ng.iracing.com/data/constants/divisions`
- **Expiration:** 900 seconds
- **Note:** Constant; returned directly as an array of objects

### Event Types
- **Endpoint:** `https://members-ng.iracing.com/data/constants/event_types`
- **Expiration:** 900 seconds
- **Note:** Constant; returned directly as an array of objects

---

## 📊 Driver Stats by Category

### Oval
- **Endpoint:** `https://members-ng.iracing.com/data/driver_stats_by_category/oval`
- **Expiration:** 900 seconds

### Sports Car
- **Endpoint:** `https://members-ng.iracing.com/data/driver_stats_by_category/sports_car`
- **Expiration:** 900 seconds

### Formula Car
- **Endpoint:** `https://members-ng.iracing.com/data/driver_stats_by_category/formula_car`
- **Expiration:** 900 seconds

### Road
- **Endpoint:** `https://members-ng.iracing.com/data/driver_stats_by_category/road`
- **Expiration:** 900 seconds

### Dirt Oval
- **Endpoint:** `https://members-ng.iracing.com/data/driver_stats_by_category/dirt_oval`
- **Expiration:** 900 seconds

### Dirt Road
- **Endpoint:** `https://members-ng.iracing.com/data/driver_stats_by_category/dirt_road`
- **Expiration:** 900 seconds

---

## 🏠 Hosted Sessions

### Combined Sessions
- **Endpoint:** `https://members-ng.iracing.com/data/hosted/combined_sessions`
- **Expiration:** 60 seconds
- **Description:** Sessions that can be joined as a driver or spectator, and also includes non-league pending sessions for the user.

#### Parameters:
- `package_id` (number, optional): If set, return only sessions using this car or track package ID.

### Sessions
- **Endpoint:** `https://members-ng.iracing.com/data/hosted/sessions`
- **Expiration:** 60 seconds
- **Description:** Sessions that can be joined as a driver. Without spectator and non-league pending sessions for the user.

---

## 🏆 League

### Customer League Sessions
- **Endpoint:** `https://members-ng.iracing.com/data/league/cust_league_sessions`
- **Expiration:** 900 seconds

#### Parameters:
- `mine` (boolean, optional): If true, return only sessions created by this user.
- `package_id` (number, optional): If set, return only sessions using this car or track package ID.

### Directory
- **Endpoint:** `https://members-ng.iracing.com/data/league/directory`
- **Expiration:** 900 seconds

#### Parameters:
- `search` (string, optional): Will search against league name, description, owner, and league ID.
- `tag` (string, optional): One or more tags, comma-separated.
- `restrict_to_member` (boolean, optional): If true include only leagues for which customer is a member.
- `restrict_to_recruiting` (boolean, optional): If true include only leagues which are recruiting.
- `restrict_to_friends` (boolean, optional): If true include only leagues owned by a friend.
- `restrict_to_watched` (boolean, optional): If true include only leagues owned by a watched member.
- `minimum_roster_count` (number, optional): If set include leagues with at least this number of members.
- `maximum_roster_count` (number, optional): If set include leagues with no more than this number of members.
- `lowerbound` (number, optional): First row of results to return. Defaults to 1.
- `upperbound` (number, optional): Last row of results to return. Defaults to lowerbound + 39.
- `sort` (string, optional): One of relevance, leaguename, displayname, rostercount. displayname is owner's name. Defaults to relevance.
- `order` (string, optional): One of asc or desc. Defaults to asc.

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/league/get`
- **Expiration:** 900 seconds

#### Parameters:
- `league_id` (number, **required**)
- `include_licenses` (boolean, optional): For faster responses, only request when necessary.

### Get Points Systems
- **Endpoint:** `https://members-ng.iracing.com/data/league/get_points_systems`
- **Expiration:** 900 seconds

#### Parameters:
- `league_id` (number, **required**)
- `season_id` (number, optional): If included and the season is using custom points (points_system_id:2) then the custom points option is included in the returned list.

### Membership
- **Endpoint:** `https://members-ng.iracing.com/data/league/membership`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): If different from the authenticated member, restrictions apply.
- `include_league` (boolean, optional)

### Roster
- **Endpoint:** `https://members-ng.iracing.com/data/league/roster`
- **Expiration:** 900 seconds

#### Parameters:
- `league_id` (number, **required**)
- `include_licenses` (boolean, optional): For faster responses, only request when necessary.

### Seasons
- **Endpoint:** `https://members-ng.iracing.com/data/league/seasons`
- **Expiration:** 900 seconds

#### Parameters:
- `league_id` (number, **required**)
- `retired` (boolean, optional): If true include seasons which are no longer active.

### Season Standings
- **Endpoint:** `https://members-ng.iracing.com/data/league/season_standings`
- **Expiration:** 900 seconds

#### Parameters:
- `league_id` (number, **required**)
- `season_id` (number, **required**)
- `car_class_id` (number, optional)
- `car_id` (number, optional): If car_class_id is included then standings are for the car in that car class.

### Season Sessions
- **Endpoint:** `https://members-ng.iracing.com/data/league/season_sessions`
- **Expiration:** 900 seconds

#### Parameters:
- `league_id` (number, **required**)
- `season_id` (number, **required**)
- `results_only` (boolean, optional): If true include only sessions for which results are available.

---

## 🔍 Lookup

### Club History
- **Endpoint:** `https://members-ng.iracing.com/data/lookup/club_history`
- **Expiration:** 900 seconds
- **Note:** Returns an earlier history if requested quarter does not have a club history.

#### Parameters:
- `season_year` (number, **required**)
- `season_quarter` (number, **required**)

### Countries
- **Endpoint:** `https://members-ng.iracing.com/data/lookup/countries`
- **Expiration:** 900 seconds

### Drivers
- **Endpoint:** `https://members-ng.iracing.com/data/lookup/drivers`
- **Expiration:** 900 seconds

#### Parameters:
- `search_term` (string, **required**): A cust_id or partial name for which to search.
- `league_id` (number, optional): Narrow the search to the roster of the given league.

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/lookup/get`
- **Expiration:** 900 seconds
- **Note:** `?weather=weather_wind_speed_units&weather=weather_wind_speed_max&weather=weather_wind_speed_min&licenselevels=licenselevels`

### Licenses
- **Endpoint:** `https://members-ng.iracing.com/data/lookup/licenses`
- **Expiration:** 900 seconds

---

## 👤 Member

### Awards
- **Endpoint:** `https://members-ng.iracing.com/data/member/awards`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.

### Award Instances
- **Endpoint:** `https://members-ng.iracing.com/data/member/award_instances`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.
- `award_id` (number, **required**)

### Chart Data
- **Endpoint:** `https://members-ng.iracing.com/data/member/chart_data`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.
- `category_id` (number, **required**): 1 - Oval; 2 - Road; 3 - Dirt oval; 4 - Dirt road
- `chart_type` (number, **required**): 1 - iRating; 2 - TT Rating; 3 - License/SR

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/member/get`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_ids` (numbers, **required**): `?cust_ids=2,3,4`
- `include_licenses` (boolean, optional)

### Info
- **Endpoint:** `https://members-ng.iracing.com/data/member/info`
- **Expiration:** 900 seconds
- **Note:** Always the authenticated member.

### Participation Credits
- **Endpoint:** `https://members-ng.iracing.com/data/member/participation_credits`
- **Expiration:** 900 seconds
- **Note:** Always the authenticated member.

### Profile
- **Endpoint:** `https://members-ng.iracing.com/data/member/profile`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.

---

## 🏁 Results

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/results/get`
- **Expiration:** 900 seconds
- **Description:** Get the results of a subsession, if authorized to view them. series_logo image paths are relative to `https://images-static.iracing.com/img/logos/series/`

#### Parameters:
- `subsession_id` (number, **required**)
- `include_licenses` (boolean, optional)

### Event Log
- **Endpoint:** `https://members-ng.iracing.com/data/results/event_log`
- **Expiration:** 900 seconds

#### Parameters:
- `subsession_id` (number, **required**)
- `simsession_number` (number, **required**): The main event is 0; the preceding event is -1, and so on.

### Lap Chart Data
- **Endpoint:** `https://members-ng.iracing.com/data/results/lap_chart_data`
- **Expiration:** 900 seconds

#### Parameters:
- `subsession_id` (number, **required**)
- `simsession_number` (number, **required**): The main event is 0; the preceding event is -1, and so on.

### Lap Data
- **Endpoint:** `https://members-ng.iracing.com/data/results/lap_data`
- **Expiration:** 900 seconds

#### Parameters:
- `subsession_id` (number, **required**)
- `simsession_number` (number, **required**): The main event is 0; the preceding event is -1, and so on.
- `cust_id` (number, optional): Required if the subsession was a single-driver event. Optional for team events.
- `team_id` (number, optional): Required if the subsession was a team event.

### Search Hosted
- **Endpoint:** `https://members-ng.iracing.com/data/results/search_hosted`
- **Expiration:** 900 seconds
- **Description:** Hosted and league sessions. Maximum time frame of 90 days. Results split into one or more files with chunks of results.

#### Parameters:
- `start_range_begin` (string, optional): Session start times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
- `start_range_end` (string, optional): ISO-8601 UTC time zero offset. Exclusive.
- `finish_range_begin` (string, optional): Session finish times. ISO-8601 UTC time zero offset.
- `finish_range_end` (string, optional): ISO-8601 UTC time zero offset. Exclusive.
- `cust_id` (number, optional): The participant's customer ID. Ignored if team_id is supplied.
- `team_id` (number, optional): The team ID to search for. Takes priority over cust_id.
- `host_cust_id` (number, optional): The host's customer ID.
- `session_name` (string, optional): Part or all of the session's name.
- `league_id` (number, optional): Include only results for the league with this ID.
- `league_season_id` (number, optional): Include only results for the league season with this ID.
- `car_id` (number, optional): One of the cars used by the session.
- `track_id` (number, optional): The ID of the track used by the session.
- `category_ids` (numbers, optional): Track categories to include. `?category_ids=1,2,3,4`

### Search Series
- **Endpoint:** `https://members-ng.iracing.com/data/results/search_series`
- **Expiration:** 900 seconds
- **Description:** Official series. Maximum time frame of 90 days. Results split into one or more files with chunks of results.

#### Parameters:
- `season_year` (number, optional): Required when using season_quarter.
- `season_quarter` (number, optional): Required when using season_year.
- `start_range_begin` (string, optional): Session start times. ISO-8601 UTC time zero offset.
- `start_range_end` (string, optional): ISO-8601 UTC time zero offset. Exclusive.
- `finish_range_begin` (string, optional): Session finish times. ISO-8601 UTC time zero offset.
- `finish_range_end` (string, optional): ISO-8601 UTC time zero offset. Exclusive.
- `cust_id` (number, optional): Include only sessions in which this customer participated.
- `team_id` (number, optional): Include only sessions in which this team participated.
- `series_id` (number, optional): Include only sessions for series with this ID.
- `race_week_num` (number, optional): Include only sessions with this race week number.
- `official_only` (boolean, optional): If true, include only sessions earning championship points.
- `event_types` (numbers, optional): Types of events to include. `?event_types=2,3,4,5`
- `category_ids` (numbers, optional): License categories to include. `?category_ids=1,2,3,4`

### Season Results
- **Endpoint:** `https://members-ng.iracing.com/data/results/season_results`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `event_type` (number, optional): Restrict to one event type: 2 - Practice; 3 - Qualify; 4 - Time Trial; 5 - Race
- `race_week_num` (number, optional): The first race week of a season is 0.

---

## 📅 Season

### List
- **Endpoint:** `https://members-ng.iracing.com/data/season/list`
- **Expiration:** 900 seconds

#### Parameters:
- `season_year` (number, **required**)
- `season_quarter` (number, **required**)

### Race Guide
- **Endpoint:** `https://members-ng.iracing.com/data/season/race_guide`
- **Expiration:** 60 seconds

#### Parameters:
- `from` (string, optional): ISO-8601 offset format. Defaults to the current time.
- `include_end_after_from` (boolean, optional): Include sessions which start before 'from' but end after.

### Spectator Subsession IDs
- **Endpoint:** `https://members-ng.iracing.com/data/season/spectator_subsessionids`
- **Expiration:** 60 seconds

#### Parameters:
- `event_types` (numbers, optional): Types of events to include. `?event_types=2,3,4,5`

### Spectator Subsession IDs Detail
- **Endpoint:** `https://members-ng.iracing.com/data/season/spectator_subsessionids_detail`
- **Expiration:** 60 seconds

#### Parameters:
- `event_types` (numbers, optional): Types of events to include. `?event_types=2,3,4,5`
- `season_ids` (numbers, optional): Seasons to include. `?season_ids=513,937`

---

## 🏎️ Series

### Assets
- **Endpoint:** `https://members-ng.iracing.com/data/series/assets`
- **Expiration:** 900 seconds
- **Note:** Image paths are relative to `https://images-static.iracing.com/`

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/series/get`
- **Expiration:** 900 seconds

### Past Seasons
- **Endpoint:** `https://members-ng.iracing.com/data/series/past_seasons`
- **Expiration:** 900 seconds
- **Description:** Get all seasons for a series. Filter list by official:true for seasons with standings.

#### Parameters:
- `series_id` (number, **required**)

### Seasons
- **Endpoint:** `https://members-ng.iracing.com/data/series/seasons`
- **Expiration:** 900 seconds

#### Parameters:
- `include_series` (boolean, optional)

### Stats Series
- **Endpoint:** `https://members-ng.iracing.com/data/series/stats_series`
- **Expiration:** 900 seconds
- **Description:** To get series and seasons for which standings should be available, filter the list by official: true.

---

## 📈 Stats

### Member Bests
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_bests`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.
- `car_id` (number, optional): First call should exclude car_id; use cars_driven list in return for subsequent calls.

### Member Career
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_career`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.

### Member Division
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_division`
- **Expiration:** 900 seconds
- **Description:** Divisions are 0-based: 0 is Division 1, 10 is Rookie. Always for the authenticated member.

#### Parameters:
- `season_id` (number, **required**)
- `event_type` (number, **required**): The event type code for the division type: 4 - Time Trial; 5 - Race

### Member Recap
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_recap`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.
- `year` (number, optional): Season year; if not supplied the current calendar year (UTC) is used.
- `season` (number, optional): Season (quarter) within the year; if not supplied the recap will be for the entire year.

### Member Recent Races
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_recent_races`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.

### Member Summary
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_summary`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.

### Member Yearly
- **Endpoint:** `https://members-ng.iracing.com/data/stats/member_yearly`
- **Expiration:** 900 seconds

#### Parameters:
- `cust_id` (number, optional): Defaults to the authenticated member.

### Season Driver Standings
- **Endpoint:** `https://members-ng.iracing.com/data/stats/season_driver_standings`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `car_class_id` (number, **required**)
- `club_id` (number, optional): Defaults to all (-1).
- `division` (number, optional): Divisions are 0-based: 0 is Division 1, 10 is Rookie.
- `race_week_num` (number, optional): The first race week of a season is 0.

### Season Supersession Standings
- **Endpoint:** `https://members-ng.iracing.com/data/stats/season_supersession_standings`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `car_class_id` (number, **required**)
- `club_id` (number, optional): Defaults to all (-1).
- `division` (number, optional): Divisions are 0-based: 0 is Division 1, 10 is Rookie.
- `race_week_num` (number, optional): The first race week of a season is 0.

### Season Team Standings
- **Endpoint:** `https://members-ng.iracing.com/data/stats/season_team_standings`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `car_class_id` (number, **required**)
- `race_week_num` (number, optional): The first race week of a season is 0.

### Season Time Trial Standings
- **Endpoint:** `https://members-ng.iracing.com/data/stats/season_tt_standings`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `car_class_id` (number, **required**)
- `club_id` (number, optional): Defaults to all (-1).
- `division` (number, optional): Divisions are 0-based: 0 is Division 1, 10 is Rookie.
- `race_week_num` (number, optional): The first race week of a season is 0.

### Season Time Trial Results
- **Endpoint:** `https://members-ng.iracing.com/data/stats/season_tt_results`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `car_class_id` (number, **required**)
- `race_week_num` (number, **required**): The first race week of a season is 0.
- `club_id` (number, optional): Defaults to all (-1).
- `division` (number, optional): Divisions are 0-based: 0 is Division 1, 10 is Rookie.

### Season Qualify Results
- **Endpoint:** `https://members-ng.iracing.com/data/stats/season_qualify_results`
- **Expiration:** 900 seconds

#### Parameters:
- `season_id` (number, **required**)
- `car_class_id` (number, **required**)
- `race_week_num` (number, **required**): The first race week of a season is 0.
- `club_id` (number, optional): Defaults to all (-1).
- `division` (number, optional): Divisions are 0-based: 0 is Division 1, 10 is Rookie.

### World Records
- **Endpoint:** `https://members-ng.iracing.com/data/stats/world_records`
- **Expiration:** 900 seconds

#### Parameters:
- `car_id` (number, **required**)
- `track_id` (number, **required**)
- `season_year` (number, optional): Limit best times to a given year.
- `season_quarter` (number, optional): Limit best times to a given quarter; only applicable when year is used.

---

## 👥 Team

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/team/get`
- **Expiration:** 900 seconds

#### Parameters:
- `team_id` (number, **required**)
- `include_licenses` (boolean, optional): For faster responses, only request when necessary.

---

## ⏱️ Time Attack

### Member Season Results
- **Endpoint:** `https://members-ng.iracing.com/data/time_attack/member_season_results`
- **Expiration:** 900 seconds
- **Description:** Results for the authenticated member, if any.

#### Parameters:
- `ta_comp_season_id` (number, **required**)

---

## 🏁 Track

### Assets
- **Endpoint:** `https://members-ng.iracing.com/data/track/assets`
- **Expiration:** 900 seconds
- **Note:** Image paths are relative to `https://images-static.iracing.com/`

### Get
- **Endpoint:** `https://members-ng.iracing.com/data/track/get`
- **Expiration:** 900 seconds

---

## 📝 Notes

- **Authentication:** All endpoints require proper authentication with iRacing credentials
- **Rate Limiting:** Respect the expiration times and cache data appropriately
- **Time Formats:** Use ISO-8601 UTC time format where specified: `"2022-04-01T15:45Z"`
- **Customer IDs:** Use numerical customer IDs for member-specific requests
- **Image Assets:** Image paths are relative to the specified base URLs

---

## 🔧 Usage Tips

1. **Caching:** Use the expiration times to implement proper caching
2. **Batch Requests:** Use comma-separated values for multiple IDs where supported
3. **Error Handling:** Implement proper error handling for API failures
4. **Authentication:** Maintain valid session cookies for API access
5. **Respect Limits:** Don't exceed rate limits to avoid being blocked

---

*This documentation is based on the iRacing API as of the latest update. Please refer to the official iRacing documentation for the most current information.* 