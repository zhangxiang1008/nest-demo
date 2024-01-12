import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  //   constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  async get<T>(key: string) {
    // return await this.cacheManager.get(key);

    return await this.redisClient.get(key);
  }

  async zRange(key: string, num: number) {
    return await this.redisClient.zRange('grades', 0, num);
  }

  async set(key: string, value: any, ttl?: number) {
    return await this.redisClient.set(key, value);
    // return await this.cacheManager.set(key, value, ttl);
  }
}
