import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResultDTO } from 'src/dto/ResultDTO';
import moment from 'moment';
import { Public } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signupController(
    @Body() signupData: CreateAuthDto,
  ): Promise<ResultDTO<any>> {
    const timeString = moment().format('YYYY-MM-DD hh:mm:ss');
    signupData.createTime = timeString;
    const result = await this.authService.signup(signupData);
    return {
      success: result.success,
      message: result.msg,
      data: result.msg,
    };
  }
  @Public()
  @Post('login')
  async loginController(
    @Body() signupData: CreateAuthDto,
  ): Promise<ResultDTO<any>> {
    const timeString = moment().format('YYYY-MM-DD hh:mm:ss');
    signupData.createTime = timeString;
    const result = await this.authService.login(signupData);
    return {
      success: result.success,
      message: result.msg,
      data: result.access_token,
    };
  }
}
