import { getAllSubscribers } from '@serp/db/server/database/queries/admin';

export default defineEventHandler(async (_event) => {
  const subscribers = await getAllSubscribers();
  return subscribers;
});
