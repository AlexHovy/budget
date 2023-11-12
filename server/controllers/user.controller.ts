import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";

const { TOKEN_KEY, TOKEN_EXPIRES_IN } = process.env;

const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { firstName, lastName, email, password } = req.body;

  const isInputValid = firstName && lastName && email && password;
  if (!isInputValid) return res.status(400).json({ error: "User not valid" });

  const isUserUnique = await User.findOne({ email });
  if (isUserUnique)
    return res.status(409).json({ error: "User already exists" });

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = signToken(user);
    user.token = token;

    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: "Unable to register user" });
  }
};

const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;

  const isInputValid = email && password;
  if (!isInputValid) return res.status(400).json({ error: "User not valid" });

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid credentials" });

  const token = signToken(user);
  user.token = token;

  return res.status(200).json(user);
};

function signToken(user: IUser): string {
  if (!TOKEN_KEY) {
    throw new Error("Token key is not set in the environment variables");
  }

  return jwt.sign({ userId: user._id, userEmail: user.email }, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

export { register, login };
