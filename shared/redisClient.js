const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
module.exports = redis.createClient(redisUrl);
