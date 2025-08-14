const jwt = require("jsonwebtoken");

function isAuthenticate(req, res, next) {
  token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "no token is provided" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or exprired token" });
  }
}
module.exports = isAuthenticate;
