export default () => ({
  httpConfig: {
    timeout: parseInt(process.env.HTTP_TIMEOUT!, 10) || 30000,
  },
  allowOrigins: [
    'https://staging.betufantasy.com',
    'https://betufantasy.sotatek.works',
  ],
  redisConfig: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT!, 10) || 6379,
    },
  },
  cacheConfig: {
    store: process.env.CACHE_STORE,
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT!, 10) || 6379,
    db: parseInt(process.env.REDIS_DB_CACHE!, 10) || 1,
  },
});
