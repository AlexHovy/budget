import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userQuery, userService } from "../configs/di.config";
import { AlreadyExistsError, BadRequestError } from "../utils/error.util";
import { HttpStatusCode } from "../constants/http-status-codes";

export class UserController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { firstName, lastName, email, password } = req.body;

      const isInputValid = firstName && lastName && email && password;
      if (!isInputValid) throw new BadRequestError();

      const isUserUnique = await userQuery.isExistingUser(email);
      if (isUserUnique) throw new AlreadyExistsError();

      const encryptedPassword = await bcrypt.hash(password, 10);
      const userDto = await userService.register(
        firstName,
        lastName,
        email,
        encryptedPassword
      );
      return res.status(HttpStatusCode.CREATED).json(userDto);
    } catch (error) {
      return next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password } = req.body;

      const isInputValid = email && password;
      if (!isInputValid) throw new BadRequestError();

      const user = await userQuery.getByEmail(email);
      if (!user) throw new BadRequestError("Invalid credentials");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new BadRequestError("Invalid credentials");

      const userDto = await userService.login(user);
      return res.status(HttpStatusCode.OK).json(userDto);
    } catch (error) {
      return next(error);
    }
  }
}
