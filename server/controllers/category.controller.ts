import { Request, Response } from "express";
import { CategoryQuery } from "../queries/category.query";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async get(req: Request, res: Response): Promise<Response | void> {
    try {
      const categories = await CategoryQuery.getAll();
      return res.json(categories);
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response | void> {
    try {
      const category = await CategoryQuery.getById(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.json(category);
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }

  static async post(req: Request, res: Response): Promise<Response | void> {
    try {
      const category = await CategoryService.Create(req.body);
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async put(req: Request, res: Response): Promise<Response | void> {
    try {
      const category = await CategoryService.Update(req.body);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async remove(req: Request, res: Response): Promise<Response | void> {
    try {
      await CategoryService.Delete(req.params.id);
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }
}
