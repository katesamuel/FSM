import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { IBaseResponse } from '../../shared/base-response/base-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPermission } from './enum/user-permission.enum';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@Permissions(UserPermission.SuperAdmin, UserPermission.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions(UserPermission.SuperAdmin, UserPermission.Admin)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IBaseResponse> {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: ObjectId): Promise<IBaseResponse> {
    return await this.userService.getUserById(userId);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IBaseResponse> {
    return await this.userService.updateUserById(userId, updateUserDto);
  }

  @Permissions(UserPermission.SuperAdmin, UserPermission.Admin)
  @Delete(':id')
  async deleteMember(@Param('id') id: string): Promise<IBaseResponse> {
    return await this.userService.deleteUser(id);
  }

  @Delete('member-cache')
  async deleteMemberCache(): Promise<IBaseResponse> {
    return await this.userService.deleteUserCache();
  }
}
