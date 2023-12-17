import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(userData: CreateAuthDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: userData.username },
    });
    if (findUser && findUser.username === userData.username) {
      return { msg: '用户已存在', success: false };
    }
    userData.password = bcryptjs.hashSync(userData.password, 10);
    await this.userRepository.save(userData);
    return { msg: '注册成功', success: true };
  }

  async login(loginData: CreateAuthDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: loginData.username },
    });
    if (!findUser) {
      return { msg: '用户不存在', success: false };
    }
    const comparePassword = bcryptjs.compareSync(
      loginData.password,
      findUser.password,
    );
    if (!comparePassword) {
      return { msg: '密码不正确', success: false };
    }
    const payload = { username: loginData.username };
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      msg: '登录成功',
    };
  }
}
