import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter ';
import { HttpGuard } from './guards/HttpGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new HttpGuard());
  await app.listen(3000);
}
bootstrap();
