import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const store = await redisStore({
    //       socket: {
    //         host: configService.get<string>('redis.host'),
    //         port: configService.get<number>('redis.port'),
    //       },
    //       // ttl: configService.get<number>('REDIS_TTL'),
    //       database: configService.get<number>('redis.db'),
    //       // password: configService.get<string>('REDIS_PASSWORD'),
    //     });
    //     return {
    //       store,
    //     };
    //   },
    // }),
  ],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: '127.0.0.1',
            port: 6379,
          },
          database: 0,
        });
        await client.connect();
        return client;
      },
    },
  ],

  exports: [RedisService],
})
export class RedisModule {}
