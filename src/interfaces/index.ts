export interface Player {
  player_name: string;
  player_id: string;
  player_number: number;
  player_type: string;
  player_image: string;
}

export interface Team {
  _id?: string;
  name: string;
  logo: string;
  players?: Player[];
}

export interface Country {
  id?: string;
  name: string;
  image: string;
  players?: Player[];
}

export interface Ball {
  position: string;
  team: string | null;
}

export interface Score {
  playerPosition: number;
  time: string;
  team: string;
}

export interface TeamSummary {
  team: string;
  marker: number;
  fouls: number;
  corners: number;
  scorer: Score[];
}

export interface matchSummary {
  firstTeamSummary: TeamSummary;
  secondTeamSummary: TeamSummary;
}
