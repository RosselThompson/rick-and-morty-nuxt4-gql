import { GET_CHARACTER_BY_ID_QUERY } from "../../graphql/queries/characters";
import { apiRequest } from "../../services/rickAndMortyAPI";
import { mapGetOneCharacterResponse } from "../../mappers/characters.mapper";
import type { RickAndMortyGetOneCharacterResponse } from "../../types/rickAndMortyAPI.interface";
import { validateGetOneCharacterQuery } from "../../utils/validateCharacterVariables";
import { validateBaseUrl } from "../../utils/validateBaseUrl";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParams(event).id;

  const baseUrl = validateBaseUrl(config.rickAndMortyApi);
  const variables = validateGetOneCharacterQuery(id);

  const data = await apiRequest<RickAndMortyGetOneCharacterResponse>(
    baseUrl,
    GET_CHARACTER_BY_ID_QUERY,
    variables,
  );

  return mapGetOneCharacterResponse(data);
});
