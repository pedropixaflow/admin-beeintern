const { app } = require("../config/");

module.exports = {
  is_logged: function (req, res, next) {
    if (app.localhost) {
      return next();
    } else {
      if (req.isAuthenticated()) return next();
    }

    return res.redirect("/login");
  },

  is_disconnected: function (req, res, next) {
    if (!req.isAuthenticated()) return next();

    return res.redirect("/dashboard");
  },

  is_permission: function (req, res, next) {
    let user = res.locals.user;

    if (user.permission === "read") {
      res.redirect("/dashboard?permission=invalid");
      return;
    }

    return next();
  },
};
