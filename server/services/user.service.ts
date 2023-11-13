import jwt from "jsonwebtoken";
import { UserDto } from "../dtos/user.dto";
import User, { IUser } from "../models/user.model";
import { UserQuery } from "../queries/user.query";
import { TokenDto } from "../dtos/token.dto";

const { TOKEN_KEY, TOKEN_EXPIRES_IN } = process.env;

export class UserService {
  static async register(
    firstName: string,
    lastName: string,
    email: string,
    encryptedPassword: string
  ): Promise<UserDto> {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const userDto = user.toDto();
      const token = this.signToken(userDto);
      userDto.token = token;

      return userDto;
    } catch (err) {
      throw err;
    }
  }

  static async login(user: IUser): Promise<UserDto> {
    try {
      user.loggedInAt = new Date();
      user.updatedAt = new Date();

      const userDto = user.toDto();
      await User.findByIdAndUpdate(userDto.id, user);

      const token = this.signToken(userDto);
      userDto.token = token;

      return userDto;
    } catch (err) {
      throw err;
    }
  }

  private static signToken(user: UserDto): string {
    if (!TOKEN_KEY) throw new Error("Missing TOKEN_KEY environment variable");

    if (!TOKEN_EXPIRES_IN)
      throw new Error("Missing TOKEN_EXPIRES_IN environment variable");

    const tokenDto: TokenDto = {
      userId: user.id,
      userEmail: user.email,
    };

    return jwt.sign(tokenDto, TOKEN_KEY, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
  }
}
