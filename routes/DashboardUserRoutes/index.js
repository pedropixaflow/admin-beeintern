"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");

const { is_logged, is_permission } = require("../../helpers/auth.controller");

const { app } = require("../../config");

const ModelUser = require("../../models/User");

class DashboardUserRoutes {
  constructor() {
    this.routes = express.Router();
    this.pages();
  }

  pages() {
    this.routes.get("/dashboard", is_logged, (req, res) => {
      async function load() {
        let user = res.locals.user;
        let data = [];

        data = await ModelUser.findAll({
          order: [["createdAt", "DESC"]],
        });
        data = data.map((item) => item.toJSON());

        Object.keys(data).forEach(function (item) {
          if (data[item].permission === "all")
            data[item].type = "All Permission";
          if (data[item].permission === "read")
            data[item].type = "Read Permission";
          if (data[item].permission === "update")
            data[item].type = "Write Permission";
        });

        if (user.permission === "all") user.all = true;
        if (user.permission === "read") user.read = true;
        if (user.permission === "update") user.update = true;

        let page_render =
          user.permission !== "read"
            ? "pages/admin/home"
            : "pages/admin/home/read";

        setTimeout(() => {
          res.render(page_render, {
            layout: "dashboard",
            app,
            user,
            data,
          });
        }, 500);
      }
      load();
    });

    this.routes.get(
      "/user/deletar",
      is_logged,
      is_permission,
      async (req, res) => {
        const { id } = req.query;
        await ModelUser.destroy({ where: { id } });

        return res.redirect("/dashboard");
      }
    );

    this.routes.post("/user/editar/password", is_logged, (req, res) => {
      async function load() {
        let { password, id } = req.body;

        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(password, salt, async (erro, hash) => {
            await ModelUser.update({ password: hash }, { where: { id } });

            req.user.password = hash;

            res.redirect("/dashboard");
          });
        });
      }
      load();
    });

    this.routes.post("/user/editar/perfil", is_logged, (req, res) => {
      async function load() {
        let { name, login, id } = req.body;

        await ModelUser.update({ name, login }, { where: { id } });

        req.user.name = name;
        req.user.login = login;

        res.redirect("/dashboard");
      }
      load();
    });

    this.routes.post(
      "/user/cadastrar",
      is_logged,
      is_permission,
      (req, res) => {
        async function load() {
          let { name, login, password, permission } = req.body;

          const user = new ModelUser({
            id: Math.random().toString(36).substring(2),
            name,
            login,
            password,
            permission,
          });

          bcrypt.genSalt(10, (erro, salt) => {
            bcrypt.hash(user.password, salt, (erro, hash) => {
              user.password = hash;
              user.save().then(() => {
                res.redirect("/dashboard");
              });
            });
          });
        }

        load();
      }
    );
  }
}

module.exports = new DashboardUserRoutes().routes;
