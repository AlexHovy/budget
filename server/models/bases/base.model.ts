import { Schema } from "mongoose";
import { BaseDto } from "../../dtos/bases/base.dto";

export interface IBaseModel extends Document {
  createdAt?: Date;
  updatedAt?: Date;
}

const BaseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

BaseSchema.index({ createdAt: -1 });
BaseSchema.index({ updatedAt: -1 });

BaseSchema.methods.toDto = function (): BaseDto {
  return {
    id: this._id.toString(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export default BaseSchema;
