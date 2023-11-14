import { FilterQuery } from "mongoose";
import { IBase } from "../../models/bases/base.model";

export interface IRepositoryService<T extends IBase> {
  findAll(): Promise<T[]>;
  findAllBy(filter: FilterQuery<T>): Promise<T[]>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  exists(filter: FilterQuery<T>): Promise<boolean>;
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
