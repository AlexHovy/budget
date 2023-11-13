import mongoose, { Document, Model } from "mongoose";
import { IBase } from "../models/base.model";

export class RepositoryService<T extends IBase> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.model.findOne(filter as any).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async exists(filter: Partial<T>): Promise<boolean> {
    return !!this.model.exists(filter as any);
  }

  async create(item: Partial<T>): Promise<T> {
    item.createdAt = new Date();
    return this.model.create(item);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    item.updatedAt = new Date();
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndRemove(id).exec();
  }
}
