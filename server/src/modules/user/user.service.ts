import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RedisClientWrapper } from 'src/shared/redis/redis-client-wrapper';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { IBaseResponse } from 'src/shared/base-response/base-response.interface';
import { BaseResponse } from 'src/shared/base-response/base-response.dto';
import { UserTask } from './user.task';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly redisClientWrapper: RedisClientWrapper,
    private readonly userTask: UserTask,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IBaseResponse> {
    const newUser = new this.userModel(createUserDto);
    const results = await newUser.save();
    if (results) {
      return new BaseResponse(HttpStatus.CREATED, 'OK', { _id: results._id });
    } else {
      throw new BadRequestException();
    }
  }

  async getUserById(userId: ObjectId): Promise<IBaseResponse> {
    const results = await this.userTask.findUser(userId);
    if (results) {
      return new BaseResponse(HttpStatus.CREATED, 'OK', results);
    } else {
      throw new BadRequestException();
    }
  }

  async getAllUsers(): Promise<IBaseResponse> {
    const results = await this.userModel.find();
    if (results) {
      return new BaseResponse(HttpStatus.CREATED, 'OK', results);
    } else {
      throw new BadRequestException();
    }
  }
  async updateUserById(
    userId: ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<IBaseResponse> {
    const results = await this.userModel.findOne(userId);
    if (results) {
      const updatedDocument = await this.userModel.findByIdAndUpdate(
        userId,
        updateUserDto,
        { new: true },
      );
      await this.userTask.updateUserCache(updatedDocument);
      return new BaseResponse(HttpStatus.NO_CONTENT, 'OK', '');
    } else {
      throw new BadRequestException();
    }
  }

  async deleteUserCache() {
    await this.redisClientWrapper.delKey('users');
    return new BaseResponse(HttpStatus.NO_CONTENT, 'OK', '');
  }

  async deleteUser(userId: string): Promise<IBaseResponse> {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result['n'] !== 0) {
      return new BaseResponse(HttpStatus.NO_CONTENT, 'OK', '');
    } else {
      throw new BadRequestException();
    }
  }
}
