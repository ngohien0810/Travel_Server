module.export = {
  isLoggedIn: (req, res, next) => {
    if (req.user) {
      return next();
    } else {
      res.sned(401, "Unauthorized");
    }
  },
  addNewHeader: (req, res, next) => {
    res.setHeader("X-New-Policy", "success");
    next();
  },
};
