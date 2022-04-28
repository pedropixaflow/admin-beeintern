"use strict";

const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");

const { helpers } = require("./helpers/handlebars");

const OauthRoutes = require("./routes/OauthRoutes");
const DashboardUserRoutes = require("./routes/DashboardUserRoutes");
const DashboardSubscriptionRoutes = require("./routes/DashboardSubscriptionRoutes");

class App {
  constructor() {
    this.server = express();
    this.engine();
    this.virtualization();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use("/", OauthRoutes);
    this.server.use("/", DashboardUserRoutes);
    this.server.use("/", DashboardSubscriptionRoutes);

    this.server.use("*", (req, res) => res.redirect("/login"));
  }

  engine() {
    this.server.engine("handlebars", handlebars({ helpers }));

    this.server.set("views", path.join(__dirname, "views"));
    this.server.set("view engine", "handlebars");
  }

  middlewares() {
    this.server.use(express.json({ limit: "50mb" }));
    this.server.use(express.urlencoded({ limit: "50mb" }));
  }

  virtualization() {
    this.server.use(express.static(__dirname + "/public/"));
  }
}

module.exports = new App().server;
