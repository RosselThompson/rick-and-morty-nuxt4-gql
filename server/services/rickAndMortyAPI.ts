import { GraphQLResponse } from "../types/graphql.interface";
import type {
  GetAllCharactersVariables,
  GetOneCharacterVariables,
} from "#shared/types/characters.interface";

export async function apiRequest<T>(
  url: string,
  query: string,
  variables?: GetAllCharactersVariables | GetOneCharacterVariables,
): Promise<T> {
  const response = await $fetch<GraphQLResponse<T>>(url, {
    method: "POST",
    body: {
      query,
      variables,
    },
  });

  if (response.errors?.length) {
    throw createError({
      statusCode: 502,
      statusMessage: response.errors.map((error) => error.message).join(", "),
    });
  }

  if (!response.data) {
    throw createError({
      statusCode: 502,
      statusMessage: "No data returned from GraphQL API",
    });
  }

  return response.data;
}
