import { Schema } from "mongoose";
import { BaseDto } from "../../dtos/bases/base.dto";

export interface IBase extends Document {
  createdAt?: Date;
  updatedAt?: Date;
}

const BaseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

BaseSchema.methods.toDto = function (): BaseDto {
  return {
    id: this._id.toString(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export default BaseSchema;
