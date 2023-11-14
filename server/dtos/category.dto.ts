import { UserBaseDto } from "./bases/user-base.dto";

export interface CategoryDto extends UserBaseDto {
  parentCategoryId?: string;
  name: string;
  description?: string;
}
