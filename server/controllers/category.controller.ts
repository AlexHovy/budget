import { Request, Response } from "express";
import Category from "../models/category.model";

const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories.map((x) => x.toDto()));
  } catch (err) {
    res.status(404).json({ error: "No Categories found" });
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category?.toDto());
  } catch (err) {
    res.status(404).json({ error: "No Category found" });
  }
};

const post = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.create(req.body);
    res.json(category.toDto());
  } catch (err) {
    res.status(400).json({ error: "Unable to add this category" });
  }
};

const put = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json(category?.toDto());
  } catch (err) {
    res.status(400).json({ error: "Unable to update the category" });
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.json({ msg: "Category deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "No such category" });
  }
};

export { get, getById, post, put, remove };
