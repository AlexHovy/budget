import { Request, Response } from "express";
import { TokenHelper } from "../helpers/token.helper";
import { categoryQuery, categoryService } from "../configs/di.config";

export class CategoryController {
  async get(req: Request, res: Response): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      if (!tokenDto)
        return res.status(401).json({ message: "Unauthorized user" });

      const categories = await categoryQuery.getAll(tokenDto?.userId);
      return res.json(categories);
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }

  async getById(req: Request, res: Response): Promise<Response | void> {
    try {
      const category = await categoryQuery.getById(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.json(category);
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }

  async post(req: Request, res: Response): Promise<Response | void> {
    try {
      const category = await categoryService.create(req.body);
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async put(req: Request, res: Response): Promise<Response | void> {
    try {
      const category = await categoryService.update(req.body);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async remove(req: Request, res: Response): Promise<Response | void> {
    try {
      await categoryService.delete(req.params.id);
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }
}
