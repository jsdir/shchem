const Redis = require('ioredis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const create = function() {
  return new Redis(redisUrl);
};

module.exports.create = create;
module.exports.client = create();
