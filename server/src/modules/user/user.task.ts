import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RedisClientWrapper } from 'src/shared/redis/redis-client-wrapper';
import { User } from './user.model';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UserTask {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly redisClientWrapper: RedisClientWrapper,
  ) {}

  private defaultFields =
    '_id firstName lastName gender age email phone address role permissions';

  async findUser(userId: ObjectId): Promise<User> {
    let user;
    try {
      user = await this.userModel
        .findOne({ _id: userId })
        .select(this.defaultFields)
        .exec();
    } catch (error) {
      throw new BadRequestException();
    }
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async updateUserCache(userObj) {
    const user = {
      _id: userObj._id,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      gender: userObj.gender,
      email: userObj.email,
      phoneNo: userObj.phoneNo,
      role: userObj.role,
      permissions: userObj.permissions,
      isActive: userObj.isActive,
      accessToken: userObj.accessToken,
      signatureUrl: userObj.signatureUrl,
    };
    if (user && user.phoneNo) {
      await this.redisClientWrapper.setHash(
        'users',
        user.phoneNo,
        JSON.stringify(user),
      );
    }
  }

  async getCachedUserDetail(phoneNo: string): Promise<User> {
    let user;
    try {
      let cachedMemberData =
        await this.redisClientWrapper.getAllHash('members');
      cachedMemberData = cachedMemberData ? cachedMemberData[phoneNo] : null;
      if (cachedMemberData) {
        user = JSON.parse(cachedMemberData.toString());
      } else {
        const dataFromDb = await this.userModel
          .find({ phoneNo })
          .select('_id firstName lastName gender age email phone address role')
          .exec();
        user = dataFromDb.length > 0 ? dataFromDb[0] : null;
        if (user && user.phoneNo) {
          await this.redisClientWrapper.setHash(
            'members',
            phoneNo,
            JSON.stringify(user),
          );
        }
      }
    } catch (error) {
      throw new BadRequestException();
    }
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
