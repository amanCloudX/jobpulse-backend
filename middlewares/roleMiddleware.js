export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      // check user exist
      if (!req.user) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      // check role allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: `Access denied. Role (${req.user.role}) not allowed`,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
