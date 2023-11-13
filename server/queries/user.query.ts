import { IUser } from "../models/user.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";

export class UserQuery {
  constructor(private userRepository: IRepositoryService<IUser>) {}

  async isExistingUser(email: string): Promise<boolean> {
    try {
      return !!(await this.userRepository.exists({ email }));
    } catch (err) {
      throw err;
    }
  }

  async getByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) return null;
      return user;
    } catch (err) {
      throw err;
    }
  }
}
