import { Request, Response } from "express";
import { CategoryQuery } from "../queries/category.query";
import { CategoryService } from "../services/category.service";

const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryQuery.getAll();
    res.json(categories);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryQuery.getById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const post = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryService.Create(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const put = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryService.Update(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    await CategoryService.Delete(req.params.id);
    res.status(200);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export { get, getById, post, put, remove };
