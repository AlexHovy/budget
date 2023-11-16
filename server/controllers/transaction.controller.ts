import { NextFunction, Request, Response } from "express";
import { TokenHelper } from "../helpers/token.helper";
import { transactionQuery, transactionService } from "../configs/di.config";
import { NotFoundError } from "../utils/error.util";
import { HttpStatusCode } from "../constants/http-status-codes";
import { TransactionDto } from "../dtos/transaction.dto";

export class TransactionController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tokenDto = TokenHelper.getTokenDtoFromRequest(req);
      const transactions = await transactionQuery.getAll(tokenDto.userId);
      return res.status(HttpStatusCode.OK).json(transactions);
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
      const transaction = await transactionQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!transaction) throw new NotFoundError("Transaction not found");

      return res.status(HttpStatusCode.OK).json(transaction);
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

      const body = req.body as TransactionDto;
      body.userId = tokenDto.userId;

      const transaction = await transactionService.create(body);
      return res.status(HttpStatusCode.CREATED).json(transaction);
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
      let transaction = await transactionQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!transaction) throw new NotFoundError("Transaction not found");

      const body = req.body as TransactionDto;
      transaction.name = body.name;
      transaction.description = body.description;

      transaction = await transactionService.update(transaction);
      return res.status(HttpStatusCode.OK).json(transaction);
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
      let transaction = await transactionQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!transaction) throw new NotFoundError("Transaction not found");

      transaction = await transactionService.delete(transaction);
      return res.status(HttpStatusCode.OK).json(transaction);
    } catch (error) {
      return next(error);
    }
  }
}
