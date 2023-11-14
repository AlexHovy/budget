import jwt from "jsonwebtoken";
import { UserDto } from "../dtos/user.dto";
import { IUser } from "../models/user.model";
import { TokenDto } from "../dtos/token.dto";
import { IRepositoryService } from "./interfaces/repository.interface";
import { SettingsConfig } from "../configs/settings.config";

export class UserService {
  constructor(private userRepository: IRepositoryService<IUser>) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    encryptedPassword: string
  ): Promise<UserDto> {
    try {
      const user = await this.userRepository.create({
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

  async login(user: IUser): Promise<UserDto> {
    try {
      user.loggedInAt = new Date();
      user.updatedAt = new Date();

      const userDto = user.toDto();
      await this.userRepository.update(userDto.id, user);

      const token = this.signToken(userDto);
      userDto.token = token;

      return userDto;
    } catch (err) {
      throw err;
    }
  }

  private signToken(user: UserDto): string {
    const tokenDto: TokenDto = {
      userId: user.id,
      userEmail: user.email,
    };

    const tokenKey = SettingsConfig.getTokenKey();
    const tokenExpiresIn = SettingsConfig.getTokenExpiresIn();

    return jwt.sign(tokenDto, tokenKey, {
      expiresIn: tokenExpiresIn,
    });
  }
}
