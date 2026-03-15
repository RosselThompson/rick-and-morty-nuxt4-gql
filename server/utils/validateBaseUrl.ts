export const validateBaseUrl = (baseUrl: string | undefined) => {
  if (!baseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing rickAndMortyApi config",
    });
  }

  return baseUrl;
};
