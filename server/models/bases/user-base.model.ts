import { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import BaseSchema, { IBaseModel } from "./base.model";
import { UserBaseDto } from "../../dtos/bases/user-base.dto";

export interface IUserBase extends IBaseModel {
  userId: ObjectId;
}

const UserBaseSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
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
