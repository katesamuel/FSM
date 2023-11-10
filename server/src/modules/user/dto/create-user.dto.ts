import { IsNotEmpty, IsEnum, IsOptional, IsArray } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { UserGender } from '../enum/user-gender.enum';
import { UserPermission } from '../enum/user-permission.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First Name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last Name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'PhoneCode is required' })
  phoneCode: string;

  @IsNotEmpty({ message: 'mobile is required' })
  mobile: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(UserGender, {
    message: 'Invalid User gender',
  })
  gender: UserGender;

  @IsOptional()
  email: string;

  @IsOptional()
  age: number;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'User role is required' })
  @IsEnum(UserRole, {
    message: 'Invalid User Role',
  })
  role: UserRole;

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

  @IsNotEmpty({ message: 'Active is required' })
  isActive: boolean;
}
