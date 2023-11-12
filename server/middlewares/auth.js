const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token =
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    req.headers["x-access-token"] ||
    req.body.token ||
    req.query.token;

  if (!token)
    return res
      .status(403)
      .json({ error: "Token is required for authentication" });

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
  return next();
};

module.exports = verifyToken;
