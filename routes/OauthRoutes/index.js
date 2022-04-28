const express = require("express");
const routes = express.Router();
const bcryptjs = require("bcryptjs");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const { is_disconnected } = require("../../helpers/auth.controller");

const { app } = require("../../config/");

require("../../config/auth")(passport);

let sessionStore = new MySQLStore(app.db);
routes.use(
  session({
    secret: "FXlbA@97d!",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
  })
);

routes.use(passport.initialize());
routes.use(passport.session());
routes.use(flash());

routes.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;

  next();
});

routes.get("/login", is_disconnected, async (req, res) => {
  res.render("pages/login", {
    layout: "main",
    app,
  });
});

routes.post("/login", is_disconnected, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

routes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// routes.get("/initial-user", is_disconnected, (req, res, next) => {
//   const ModelUser = require("../../models/User");

//   const user = new ModelUser({
//     id: Math.random().toString(36).substring(2),
//     name: "dev",
//     login: "dev",
//     password: "dev",
//     permission: "all",
//   });

//   bcryptjs.genSalt(10, (error, salt) => {
//     bcryptjs.hash(user.password, salt, (error, hash) => {
//       user.password = hash;

//       user.save().then(() => {
//         res.redirect("/login");
//       });
//     });
//   });
// });

module.exports = routes;
