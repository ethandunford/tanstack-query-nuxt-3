export default defineEventHandler(async (event) => {
  const isNumber = (string) => {
    return /^[0-9]*$/.test(string);
  };

  const body = await readBody(event);

  if (!body.number) {
    throw createError({
      statusCode: 400,
    });
  }

  if (!isNumber(body.number)) {
    throw createError({
      statusCode: 400,
    });
  }

  if (body.number % 2 !== 0) {
    {
      throw createError({
        statusCode: 400,
      });
    }
  }

  return { statusCode: 200 };
});
