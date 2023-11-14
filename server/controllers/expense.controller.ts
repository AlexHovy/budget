import { NextFunction, Request, Response } from "express";
import { TokenHelper } from "../helpers/token.helper";
import { expenseQuery, expenseService } from "../configs/di.config";
import { NotFoundError } from "../utils/error.util";
import { HttpStatusCode } from "../constants/http-status-codes";
import { ExpenseDto } from "../dtos/expense.dto";

export class ExpenseController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      const categories = await expenseQuery.getAll(tokenDto.userId);
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
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      const expense = await expenseQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!expense) throw new NotFoundError("Expense not found");

      return res.status(HttpStatusCode.OK).json(expense);
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
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);

      const body = req.body as ExpenseDto;
      body.userId = tokenDto.userId;

      const expense = await expenseService.create(body);
      return res.status(HttpStatusCode.CREATED).json(expense);
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
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      let expense = await expenseQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!expense) throw new NotFoundError("Expense not found");

      const body = req.body as ExpenseDto;
      expense.name = body.name;
      expense.description = body.description;

      expense = await expenseService.update(expense);
      return res.status(HttpStatusCode.OK).json(expense);
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
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      let expense = await expenseQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!expense) throw new NotFoundError("Expense not found");

      expense = await expenseService.delete(expense);
      return res.status(HttpStatusCode.OK).json(expense);
    } catch (error) {
      return next(error);
    }
  }
}
