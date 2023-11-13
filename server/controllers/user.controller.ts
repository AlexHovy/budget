import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "../services/user.service";
import { UserQuery } from "../queries/user.query";

export class UserController {
  static async register(req: Request, res: Response): Promise<Response | void> {
    const { firstName, lastName, email, password } = req.body;

    const isInputValid = firstName && lastName && email && password;
    if (!isInputValid) return res.status(400).json({ error: "User not valid" });

    const isUserUnique = await UserQuery.isExistingUser(email);
    if (isUserUnique)
      return res.status(409).json({ error: "User already exists" });

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
      const userDto = await UserService.register(
        firstName,
        lastName,
        email,
        encryptedPassword
      );
      return res.status(201).json(userDto);
    } catch (err) {
      return res.status(400).json({ error: "Unable to register user" });
    }
  }

  static async login(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;

    const isInputValid = email && password;
    if (!isInputValid) return res.status(400).json({ error: "User not valid" });

    const user = await UserQuery.getByEmail(email);
    if (!user)
      return res.status(400).json({ error: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid credentials" });

    const userDto = await UserService.login(user);
    return res.status(200).json(userDto);
  }
}
