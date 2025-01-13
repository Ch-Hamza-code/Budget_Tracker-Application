const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied, token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ error: "Invalid token", details: err.message });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

module.exports = authenticateJWT;
