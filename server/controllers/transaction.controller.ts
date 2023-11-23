import { NextFunction, Request, Response } from "express";
import { TokenHelper } from "../helpers/token.helper";
import {
  transactionQuery,
  transactionService,
} from "../configs/dependency.config";
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
      const tokenDto = TokenHelper.getTokenDto();
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
      const tokenDto = TokenHelper.getTokenDto();
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
      const tokenDto = TokenHelper.getTokenDto();
      const body = req.body as TransactionDto;
      const transaction = await transactionService.create(
        body,
        tokenDto.userId
      );
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
      const tokenDto = TokenHelper.getTokenDto();
      let transaction = await transactionQuery.getById(
        req.params.id,
        tokenDto.userId
      );
      if (!transaction) throw new NotFoundError("Transaction not found");

      const body = req.body as TransactionDto;
      transaction.categoryId = body.categoryId;
      transaction.type = body.type;
      transaction.name = body.name;
      transaction.description = body.description;
      transaction.amount = body.amount;

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
      const tokenDto = TokenHelper.getTokenDto();
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
