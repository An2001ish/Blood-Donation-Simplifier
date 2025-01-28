const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    console.log("Allowed roles:", allowedRoles)
    console.log("User role:", req.user ? req.user.role : "No user")

    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied. No role specified." })
    }

    if (allowedRoles.includes(req.user.role)) {
      console.log("Access granted for role:", req.user.role)
      next()
    } else {
      console.log("Access denied for role:", req.user.role)
      res.status(403).json({ message: "Access denied. Insufficient permissions." })
    }
  }
}

module.exports = roleMiddleware

