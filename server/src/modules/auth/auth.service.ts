import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { UserTask } from "../user/user.task";
import { LoginDto } from ".//dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../../shared/jwt/jwt-payload.interface";
import { IBaseResponse } from "../../shared/base-response/base-response.interface";
import { BaseResponse } from "../../shared/base-response/base-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userTask: UserTask
  ) {}

  async login(loginDto: LoginDto): Promise<IBaseResponse> {
    const { email, password } = loginDto;
    const userResponse = await this.userTask.findUserByEmail(email);
    if (userResponse.length > 1) {
      throw new BadRequestException(
        "Multiple accounts available for the given email. Please contact the school."
      );
    }
    if (userResponse.length === 0) {
      throw new BadRequestException(
        "No accounts associated to the given email. Please contact the school."
      );
    }
    const user = userResponse[0];

    if (user) {
      if (
        user.loginAttempt >=
        (Number(process.env.APPLICATION_LOGIN_ATTEMPT) || 5)
      ) {
        throw new BadRequestException(
          "Allowed login attempts exceeded. Please contact the school."
        );
      }

      if (!user.isActive) {
        throw new BadRequestException(
          "In-active account. Please contact the school."
        );
      }
      
      const payload: JwtPayload = {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneCode: user.phoneCode,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      await this.userTask.updateAuthInfo(
        email,
        accessToken,
        new Date(),
        0,
        null,
        null
      );
      const returnObj = await this.userTask.getUserDetailsByEmail(
        email,
        null
      );
      return new BaseResponse(HttpStatus.OK, "OK", [returnObj]);
    } else {
      throw new BadRequestException(
        "No account associated to the provided email."
      );
    }
  }
}
