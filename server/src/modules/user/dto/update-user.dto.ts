import { IsEnum, IsOptional, IsArray } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { UserGender } from '../enum/user-gender.enum';
import { UserPermission } from '../enum/user-permission.enum';

export class UpdateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsEnum(UserGender, {
    message: 'Invalid User gender',
  })
  gender: UserGender;

  @IsOptional()
  email: string;

  @IsOptional()
  age: number;

  @IsOptional()
  phoneCode: string;

  @IsOptional()
  mobile: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Invalid User Role',
  })
  role: UserRole;

  @IsOptional()
  @IsArray()
  @IsEnum(UserPermission, { each: true, message: 'Invalid Permission' })
  permissions: UserPermission[];

  @IsOptional()
  userToken: string;

  @IsOptional()
  loginAttempt: number;

  @IsOptional()
  otpCode: string;

  @IsOptional()
  otpCreationDate: Date;

  @IsOptional()
  isActive: boolean;
}
