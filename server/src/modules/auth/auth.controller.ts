import { Body, Controller, Post } from '@nestjs/common';
import { AllowAny } from 'src/shared/decorators/allow-any.decorator';
import { IBaseResponse } from '../../shared/base-response/base-response.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserPermission } from '../user/enum/user-permission.enum';
import { Permissions } from 'src/shared/decorators/permissions.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAny()
  @Post('/login-check')
  login(@Body() loginDto: LoginDto): Promise<IBaseResponse> {
    return this.authService.login(loginDto);
  }
}
