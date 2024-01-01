import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter ';
import { HttpGuard } from './guards/HttpGuard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './modules/app.service';
import { Inject } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new HttpGuard());
  await app.listen(configService.get('app.port') || 3000);
}
bootstrap();
