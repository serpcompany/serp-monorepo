import { defineMultiCacheOptions } from 'nuxt-multi-cache/dist/runtime/serverOptions';
import redisDriver from 'unstorage/drivers/redis';

export default defineMultiCacheOptions({
  data: {
    storage: process.env.REDIS_URL
      ? {
          driver: redisDriver({
            url: process.env.REDIS_URL
          })
        }
      : undefined // Use default (memory) storage in development
  }
});
