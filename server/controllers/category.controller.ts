import { NextFunction, Request, Response } from "express";
import { TokenHelper } from "../helpers/token.helper";
import { categoryQuery, categoryService } from "../configs/di.config";
import { NotFoundError, UnauthorizedError } from "../utils/error.util";
import { HttpStatusCode } from "../constants/http-status-codes";

export class CategoryController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      if (!tokenDto) throw new UnauthorizedError();

      const categories = await categoryQuery.getAll(tokenDto?.userId);
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
      const category = await categoryQuery.getById(req.params.id);
      if (!category) throw new NotFoundError();
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
      const category = await categoryService.create(req.body);
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
      const category = await categoryService.update(req.body);
      if (!category) throw new NotFoundError();
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
      await categoryService.delete(req.params.id);
      return res.status(HttpStatusCode.OK);
    } catch (error) {
      return next(error);
    }
  }
}
