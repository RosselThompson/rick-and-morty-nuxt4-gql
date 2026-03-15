import { GET_CHARACTERS_QUERY } from "../../graphql/queries/characters";
import { apiRequest } from "../../services/rickAndMortyAPI";
import { mapGetAllCharactersResponse } from "../../mappers/characters.mapper";
import type { RickAndMortyGetAllCharactersResponse } from "../../types/rickAndMortyAPI.interface";
import { validateGetAllCharactersQuery } from "../../utils/validateCharacterVariables";
import { validateBaseUrl } from "../../utils/validateBaseUrl";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const baseUrl = validateBaseUrl(config.rickAndMortyApi);
  const variables = validateGetAllCharactersQuery(query);

  const data = await apiRequest<RickAndMortyGetAllCharactersResponse>(
    baseUrl,
    GET_CHARACTERS_QUERY,
    variables,
  );

  return mapGetAllCharactersResponse(data);
});
