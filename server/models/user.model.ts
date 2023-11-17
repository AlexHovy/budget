import mongoose, { Schema, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { UserDto } from "../dtos/user.dto";
import BaseSchema, { IBase } from "./bases/base.model";

export interface IUser extends IBase {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loggedInAt: Date;
  toDto: () => UserDto;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    loggedInAt: { type: Date, default: Date.now },
  },
  {
    collection: TableNames.User,
  }
);
UserSchema.add(BaseSchema);

UserSchema.index({ loggedInAt: -1 });

UserSchema.methods.toDto = function (): UserDto {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    loggedInAt: this.loggedInAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const User: Model<IUser> = mongoose.model<IUser>(TableNames.User, UserSchema);

export default User;
