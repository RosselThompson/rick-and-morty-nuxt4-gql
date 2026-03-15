import type {
  GetAllCharactersVariables,
  GetOneCharacterVariables,
} from "#shared/types/characters.interface";

export const validateGetAllCharactersQuery = (
  query: Record<string, unknown>,
): GetAllCharactersVariables => {
  const pageParam = query.page;
  const nameParam = query.name;
  const page = pageParam === undefined ? 1 : Number(pageParam);

  if (nameParam !== undefined && typeof nameParam !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid name parameter: ${nameParam}. Name must be a string.`,
    });
  }

  const normalizedName = nameParam?.trim();

  if (!Number.isInteger(page) || page < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid page parameter: ${pageParam}. Page must be a positive integer.`,
    });
  }

  if (normalizedName && normalizedName.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Invalid name parameter. Name must be 100 characters or fewer.",
    });
  }

  return {
    page,
    ...(normalizedName && normalizedName.length > 0
      ? { name: normalizedName }
      : {}),
  };
};

export const validateGetOneCharacterQuery = (
  idParam: string | undefined,
): GetOneCharacterVariables => {
  const id = idParam ? Number(idParam) : 0;

  if (idParam === undefined || idParam === null || Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid id parameter: ${idParam}. Id must be a number.`,
    });
  }

  if (id < 1 || !Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid id parameter: ${idParam}. Id must be a positive integer.`,
    });
  }

  return {
    id,
  };
};
