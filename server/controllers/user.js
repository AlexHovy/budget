const { TOKEN_KEY, TOKEN_EXPIRES_IN } = process.env;

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dtos/user");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const isInputValid = firstName && lastName && email && password;
  if (!isInputValid) res.status(400).json({ error: "User not valid" });

  const isUserUnique = User.findOne({ email });
  if (!isUserUnique) res.status(409).json({ error: "User already exists" });

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    password: encryptedPassword,
  }).catch((err) => res.status(400).json({ error: "Unable to register user" }));

  const token = signToken(user);
  user.token = token;

  const userDto = new UserDTO(user);

  res.status(201).json(userDto);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const isInputValid = email && password;
  if (!isInputValid) res.status(400).json({ error: "User not valid" });

  const user = await User.findOne({ email });

  const canUserLogin = user && (await bcrypt.compare(password, user.password));
  if (!canUserLogin) res.status(400).json({ error: "Invalid credentials" });

  const token = signToken(user);
  user.token = token;

  const userDto = new UserDTO(user);

  res.status(200).json(userDto);
};

function signToken(user) {
  return jwt.sign({ userId: user._id, userEmail: user.email }, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

module.exports = {
  register,
  login,
};
