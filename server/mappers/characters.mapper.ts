import type {
  GetAllCharactersApiResponse,
  GetAllCharacterItem,
  GetOneCharacterApiResponse,
} from "#shared/types/characters.interface";
import type {
  RickAndMortyGetAllCharacter,
  RickAndMortyGetAllCharactersResponse,
  RickAndMortyGetOneCharacterResponse,
} from "../types/rickAndMortyAPI.interface";

const mapGetAllCharacter = (
  character: RickAndMortyGetAllCharacter,
): GetAllCharacterItem => {
  return {
    id: character.id,
    image: character.image,
    name: character.name,
    species: character.species,
    status: character.status,
    originName: character.origin?.name || "Unknown",
  };
};

export const mapGetAllCharactersResponse = (
  response: RickAndMortyGetAllCharactersResponse,
): GetAllCharactersApiResponse => {
  return {
    info: response.characters.info,
    results: response.characters.results.map(mapGetAllCharacter),
  };
};

export const mapGetOneCharacterResponse = (
  response: RickAndMortyGetOneCharacterResponse,
): GetOneCharacterApiResponse => {
  return {
    id: response.character.id,
    image: response.character.image,
    name: response.character.name,
    status: response.character.status,
    species: response.character.species,
    gender: response.character.gender,
    originName: response.character.origin?.name || "Unknown",
    locationName: response.character.location?.name || "Unknown",
    episodeCount: response.character.episode.length,
  };
};
