export interface RickAndMortyGetAllCharacter {
  id: string;
  image: string;
  name: string;
  species: string;
  status: string;
  origin: {
    name: string;
  } | null;
}

export interface RickAndMortyGetAllCharactersResponse {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: RickAndMortyGetAllCharacter[];
  };
}

export interface RickAndMortyGetOneCharacterResponse {
  character: {
    id: string;
    image: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
      name: string;
    } | null;
    location: {
      name: string;
    } | null;
    episode: {
      id: string;
    }[];
  };
}
