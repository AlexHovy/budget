import { IUser } from "../models/user.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class UserQuery {
  constructor(private userRepository: IRepositoryService<IUser>) {}

  async isExistingUser(email: string): Promise<boolean> {
    try {
      return await this.userRepository.exists({ email });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async getByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) return null;
      return user;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
