import jwt from "jsonwebtoken";
import { UserDto } from "../dtos/user.dto";
import User from "../models/user.model";
import { UserQuery } from "../queries/user.query";

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

  static async login(email: string): Promise<UserDto> {
    try {
      const user = await UserQuery.getByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

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
    if (!TOKEN_KEY) {
      throw new Error("Token key is not set in the environment variables");
    }

    return jwt.sign({ userId: user.id, userEmail: user.email }, TOKEN_KEY, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
  }
}
