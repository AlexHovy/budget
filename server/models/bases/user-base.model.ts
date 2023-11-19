import { Schema } from "mongoose";
import BaseSchema, { IBaseModel } from "./base.model";
import { UserBaseDto } from "../../dtos/bases/user-base.dto";

export interface IUserBase extends IBaseModel {
  userId: String;
}

const UserBaseSchema = new Schema({
  userId: { type: String, required: true },
});
UserBaseSchema.add(BaseSchema);

UserBaseSchema.methods.toDto = function (): UserBaseDto {
  const baseDto = BaseSchema.methods.toDto.call(this);
  return {
    userId: this.userId.toString(),
    ...baseDto,
  };
};

export default UserBaseSchema;
