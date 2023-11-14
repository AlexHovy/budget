import { Model } from "mongoose";
import { IBase } from "../models/bases/base.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class RepositoryService<T extends IBase>
  implements IRepositoryService<T>
{
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    try {
      return this.model.find().exec();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async findAllBy(filter: Partial<T>): Promise<T[]> {
    try {
      return this.model.find(filter).exec();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    try {
      return this.model.findOne(filter as any).exec();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return this.model.findById(id).exec();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async exists(filter: Partial<T>): Promise<boolean> {
    try {
      return !!this.model.exists(filter as any);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      item.createdAt = new Date();
      return this.model.create(item);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    try {
      item.updatedAt = new Date();
      return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async delete(id: string): Promise<T | null> {
    try {
      return this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
