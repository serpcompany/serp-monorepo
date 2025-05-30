import type { z } from 'zod';
import type { H3Event } from 'h3';

export async function validateBody<T extends z.ZodType>(
  event: H3Event,
  schema: T
): Promise<z.infer<T>> {
  const result = await readValidatedBody(event, (body) =>
    schema.safeParse(body)
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
      data: result.error.issues
    });
  }

  return result.data;
}
