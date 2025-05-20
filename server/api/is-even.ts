export default defineEventHandler(async (event) => {
  const isNumber = (string : string) => {
    return /^[0-9]*$/.test(string);
  };

  const body = await readBody(event);

  if (!body.number || !isNumber(body.number) || Number(body.number) % 2 !== 0) {
    throw createError({
      statusCode: 400,
    });
  }

  return { statusCode: 200 };
});
