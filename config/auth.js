const localStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

const ModelUser = require("../models/User");

const systemAlert = (message) => console.log(`[Admin BeeIntern]: ${message}`);

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "login", passwordField: "password" },
      (login, password, done) => {
        ModelUser.findOne({ where: { login: login } }).then((user) => {
          if (!user) {
            systemAlert("Invalid login and/or password.");

            return done(null, false, {
              message: "Invalid login and/or password.",
            });
          }

          bcryptjs.compare(password, user.password, (error, equalsPassword) => {
            if (error) {
              systemAlert("An internal error has occurred.");

              return done(null, false, {
                message: "An internal error has occurred.",
              });
            }

            if (equalsPassword) {
              return done(null, user);
            } else {
              systemAlert("Invalid login and/or password.");

              return done(null, false, {
                message: "Invalid login and/or password.",
              });
            }
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
