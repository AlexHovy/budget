import { NextFunction, Request, Response } from "express";
import { TokenHelper } from "../helpers/token.helper";
import { categoryQuery, categoryService } from "../configs/dependency.config";
import { NotFoundError } from "../utils/error.util";
import { HttpStatusCode } from "../constants/http-status-codes";
import { CategoryDto } from "../dtos/category.dto";

export class CategoryController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDto();
      const categories = await categoryQuery.getAll(tokenDto.userId);
      return res.status(HttpStatusCode.OK).json(categories);
    } catch (error) {
      return next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDto();
      const category = await categoryQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!category) throw new NotFoundError("Category not found");

      return res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      return next(error);
    }
  }

  async post(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDto();
      const body = req.body as CategoryDto;
      const category = await categoryService.create(body, tokenDto.userId);
      return res.status(HttpStatusCode.CREATED).json(category);
    } catch (error) {
      return next(error);
    }
  }

  async put(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDto();
      let category = await categoryQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!category) throw new NotFoundError("Category not found");

      const body = req.body as CategoryDto;
      category.name = body.name;
      category.description = body.description;

      category = await categoryService.update(category);
      return res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      return next(error);
    }
  }

  async remove(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDto();
      let category = await categoryQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!category) throw new NotFoundError("Category not found");

      await categoryService.deleteChildren(category, tokenDto.userId);

      category = await categoryService.delete(category);
      return res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      return next(error);
    }
  }
}
