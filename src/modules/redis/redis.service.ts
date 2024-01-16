import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  async get<T>(key: string) {
    return await this.redisClient.get(key);
  }

  async zRange(key: string, num: number) {
    return (await this.redisClient.zRangeWithScores(key, 0, num)).reverse();
  }

  async zIncrBy(key: string, num: number, member: string) {
    return await this.redisClient.zIncrBy(key, num, member);
  }

  async set(key: string, value: any, ttl?: number) {
    return await this.redisClient.set(key, value);
    // return await this.cacheManager.set(key, value, ttl);
  }
}
