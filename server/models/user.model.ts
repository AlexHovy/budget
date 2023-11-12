import mongoose, { Schema, Document, Model } from "mongoose";
import { TableNames } from "../constants/table-names";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  toDto: () => UserDto;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.toDto = function (): UserDto {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
  };
};

const User: Model<IUser> = mongoose.model<IUser>(TableNames.User, UserSchema);

export default User;
