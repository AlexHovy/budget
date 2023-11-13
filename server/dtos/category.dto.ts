import { BaseDto } from "./base.dto";
import { UserDto } from "./user.dto";

export interface CategoryDto extends BaseDto {
  parentCategoryId?: string;
  name: string;
  description?: string;
  user: UserDto;
}
