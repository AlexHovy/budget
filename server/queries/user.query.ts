import { UserDto } from "../dtos/user.dto";
import User from "../models/user.model";

export class UserQuery {
  static async isExistingUser(email: string): Promise<boolean> {
    try {
      const user = await User.exists({ email });
      return user !== null;
    } catch (err) {
      throw err;
    }
  }

  static async getByEmail(email: string): Promise<UserDto | null> {
    try {
      const user = await User.findOne({ email });
      if (!user) return null;
      return user.toDto();
    } catch (err) {
      throw err;
    }
  }

  static async getPasswordByEmail(email: string): Promise<string | null> {
    try {
      const user = await User.findOne({ email });
      if (!user) return null;
      return user.password;
    } catch (err) {
      throw err;
    }
  }
}
