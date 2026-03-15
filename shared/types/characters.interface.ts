export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface GetAllCharactersVariables {
  page?: number;
  name?: string;
}

export interface GetOneCharacterVariables {
  id: number;
}

export interface GetAllCharacterItem {
  id: string;
  image: string;
  name: string;
  species: string;
  status: string;
  originName: string | null;
}

export interface GetAllCharactersApiResponse {
  info: PageInfo;
  results: GetAllCharacterItem[];
}

export interface GetOneCharacterApiResponse {
  id: string;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  originName: string | null;
  locationName: string | null;
  episodeCount: number;
}
