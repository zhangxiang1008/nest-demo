import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter ';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './modules/logger/my-logger.service';
import { RedisService } from './modules/redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // 获取配置
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  // 获取日志
  app.useLogger(app.get(MyLogger));
  const redisService = app.get(RedisService);
  redisService.get('k1').then((value) => {
    console.log('redis----', JSON.stringify(value));
  });
  redisService.zRange('grades', 1).then((value) => {
    console.log('value', value);
  });

  await app.listen(configService.get('app.port') || 3000);
}
bootstrap();
