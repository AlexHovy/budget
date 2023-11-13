import { UserDto } from "../dtos/user.dto";
import User, { IUser } from "../models/user.model";

export class UserQuery {
  static async isExistingUser(email: string): Promise<boolean> {
    try {
      return !!(await User.exists({ email }));
    } catch (err) {
      throw err;
    }
  }

  static async getByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email });
      if (!user) return null;
      return user;
    } catch (err) {
      throw err;
    }
  }
}
