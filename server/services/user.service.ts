import { UserDto } from "../dtos/user.dto";
import { IUser } from "../models/user.model";
import { TokenDto } from "../dtos/token.dto";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";
import { TokenHelper } from "../helpers/token.helper";

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
      const tokenDto: TokenDto = {
        userId: userDto.id,
        userEmail: userDto.email,
      };
      const token = TokenHelper.signToken(tokenDto);
      userDto.token = token;

      return userDto;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async login(user: IUser): Promise<UserDto> {
    try {
      user.loggedInAt = new Date();

      const userDto = user.toDto();
      await this.userRepository.update(userDto.id, user);

      const tokenDto: TokenDto = {
        userId: userDto.id,
        userEmail: userDto.email,
      };
      const token = TokenHelper.signToken(tokenDto);
      userDto.token = token;

      return userDto;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
