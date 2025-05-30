import { z } from 'zod';
import { validateBody } from '@serp/utils/server';
import { createFeedback } from '@serp/db/server/database/queries/admin';

const schema = z.object({
  user: z.string(),
  message: z.string().min(1, 'Message is required'),
  meta: z
    .object({
      browser: z.string().optional(),
      screenResolution: z.string().optional(),
      language: z.string().optional(),
      platform: z.string().optional(),
      colorScheme: z.string().optional(),
      timezone: z.string().optional(),
      url: z.string().optional()
    })
    .optional()
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const data = await validateBody(event, schema);
  const feedback = await createFeedback({
    user: data.user,
    message: data.message,
    meta: data.meta
  });
  return feedback;
});
