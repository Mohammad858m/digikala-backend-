const authRole = (req, res, next) => {
  const role = req.user.role;
  if (role === "user")
    return res.status(403).json({ message: " role not allowed" });

  next();
};
module.exports = authRole;