const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("No access(error in header)!");
  }
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(400).json("Invalid token type!");
  }

  try {
    req.user = await jwt.verify(token, process.env.SECRET);

    next();
  } catch (e) {
    return res.status(401).json(`Authorisation error: ${e.toString()}!`);
  }
};