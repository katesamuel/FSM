import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RedisClientWrapper } from "src/shared/redis/redis-client-wrapper";
import { User } from "./user.model";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class UserTask {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly redisClientWrapper: RedisClientWrapper
  ) {}

  private defaultFields =
    "_id firstName lastName gender age email phone address role permissions";

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
      phoneCode: userObj.phoneCode,
      mobile: userObj.mobile,
      role: userObj.role,
      permissions: userObj.permissions,
      isActive: userObj.isActive,
      accessToken: userObj.accessToken,
      signatureUrl: userObj.signatureUrl,
    };
    if (user && user.mobile && user.phoneCode) {
      const phoneNumber = `${user.phoneCode}${user.mobile}`;
      await this.redisClientWrapper.setHash(
        "users",
        phoneNumber,
        JSON.stringify(user)
      );
    }
  }

  async getCachedUserDetail(phoneCode: string, mobile: string): Promise<User> {
    const phoneNumber = `${phoneCode}${mobile}`;
    let user;
    try {
      let cacheduserData = await this.redisClientWrapper.getAllHash("users");
      cacheduserData = cacheduserData ? cacheduserData[phoneNumber] : null;
      if (cacheduserData) {
        user = JSON.parse(cacheduserData.toString());
      } else {
        const dataFromDb = await this.userModel
          .find({ phoneNumber })
          .select("_id firstName lastName gender age email phone address role")
          .exec();
        user = dataFromDb.length > 0 ? dataFromDb[0] : null;
        if (user && user.phoneNumber) {
          await this.redisClientWrapper.setHash(
            "users",
            phoneNumber,
            JSON.stringify(user)
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

  async findUserByEmail(email: string): Promise<User[]> {
    let user;
    try {
      user = await this.userModel.find({ email }).exec();
    } catch (error) {
      throw new BadRequestException();
    }
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async updateAuthInfo(
    email: string,
    accessToken: string,
    loginDate: Date,
    loginAttempt: number,
    otpCode: string,
    otpCreatedDate: Date
  ): Promise<void> {
    const updateObj = {
      accessToken,
      loginDate,
      loginAttempt,
      otpCode,
      otpCreatedDate,
    };
    await this.userModel.updateOne({ email }, updateObj).exec();
  }

  async getUserDetailsByEmail(email: string, fields: any): Promise<User> {
    let user;
    try {
      user = await this.userModel
        .find({ email })
        .select(fields ? fields : this.defaultFields)
        .populate({
          path: "associatedChurchId",
          populate: { path: "dioceseId" },
        })
        .populate({
          path: "associatedChurchId",
          populate: {
            path: "accountsId",
            select: {
              title: 1,
              firstName: 1,
              lastName: 1,
              signatureUrl: 1,
              designation: 1,
            },
          },
        })
        .populate({
          path: "associatedChurchId",
          populate: {
            path: "presbyterId",
            select: {
              firstName: 1,
              lastName: 1,
              signatureUrl: 1,
              designation: 1,
            },
          },
        })
        .exec();
    } catch (error) {
      throw new BadRequestException();
    }
    if (!user) {
      throw new BadRequestException();
    }
    if (user.length > 0) {
      return user[0];
    } else {
      throw new BadRequestException("Error Occurred. Please contact support.");
    }
  }
}
