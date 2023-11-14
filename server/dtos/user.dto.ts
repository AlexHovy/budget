import { BaseDto } from "./bases/base.dto";

export interface UserDto extends BaseDto {
  firstName: string;
  lastName: string;
  email: string;
  loggedInAt: Date;
  token?: string;
}
