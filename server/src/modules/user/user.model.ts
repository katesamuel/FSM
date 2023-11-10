import * as mongoose from 'mongoose';
import { UserGender } from './enum/user-gender.enum';
import { UserPermission } from './enum/user-permission.enum';
import { UserRole } from './enum/user-role.enum';

export interface User extends mongoose.Document {
  title: any;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneCode: string;
  mobile: string;
  address: string;
  age: number;
  role: string;
  permissions: [string];
  accessToken: string;
  loginAttempt: number;
  otpCode: string;
  otpCreatedDate: Date;
  loginDate: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true, enum: UserGender },
    email: { type: String, default: null },
    age: { type: Number, default: null },
    phoneCode: { type: String, required: true },
    mobile:  { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: UserRole },
    permissions: [{ type: String, required: true, enum: UserPermission }],
    loginAttempt: { type: Number, default: 0 },
    otpCode: { type: String, default: null },
    otpCreatedDate: { type: Date, default: null },
    accessToken: { type: String, default: null },
    loginDate: { type: Date, default: null },
    isActive: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
