import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter ';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './modules/logger/my-logger.service';
import { RedisService } from './modules/redis/redis.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  // 获取配置
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  // 获取日志
  app.useLogger(app.get(MyLogger));
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static/' });
  await app.listen(configService.get('app.port') || 3000);
}
bootstrap();
