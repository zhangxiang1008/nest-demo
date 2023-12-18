import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import JwtAuthStrategy from './jwt-auth.strategy';
import { JwtSecertKey } from 'src/constants/jwt';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JwtSecertKey,
      signOptions: {
        expiresIn: '36000000',
      },
    }),
    BlogModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
