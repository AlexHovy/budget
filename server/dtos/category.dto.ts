import { BaseDto } from "./base.dto";

export interface CategoryDto extends BaseDto {
  parentCategoryId?: string;
  name: string;
  description?: string;
  userId: string;
}
