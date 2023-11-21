import { UserBaseDto } from "./bases/UserBaseDto";

export interface CategoryDto extends UserBaseDto {
  parentCategoryId?: string;
  name: string;
  description?: string;
}
