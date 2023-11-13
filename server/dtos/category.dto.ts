import { UserDto } from "./user.dto";

export interface CategoryDto {
  id: string;
  parentCategoryId?: string;
  name: string;
  description?: string;
  user: UserDto;
}
