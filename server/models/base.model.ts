import mongoose, { Schema, Model } from "mongoose";

export interface IBase extends Document {
  createdAt?: Date;
  updatedAt?: Date;
}

const BaseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default BaseSchema;
