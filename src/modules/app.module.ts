import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoyModule } from './boys/boy.module';
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { HttpGuard } from '../guards/HttpGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boys } from './boys/boys.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zhangxiang1314',
      database: 'myblog',
      entities: [Boys],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BoyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: HttpGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
