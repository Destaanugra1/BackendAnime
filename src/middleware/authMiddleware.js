const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Pastikan Authorization header ada dan dalam format yang benar
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized, token required" });
  }

  const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.userId; // Simpan userId di req
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticate;
