"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");
const CC = require("currency-converter-lt");

const { is_logged, is_permission } = require("../../helpers/auth.controller");

const { app } = require("../../config");

const ModelRegister = require("../../models/Register");
const ModelUser = require("../../models/User");

class DashboardSubscriptionRoutes {
  constructor() {
    this.routes = express.Router();
    this.pages();
  }

  pages() {
    this.routes.get("/dashboard/subscription", is_logged, (req, res) => {
      const formatDate = (date) => {
        let dateString = new Date(date)
          .toLocaleString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "/");

        return dateString;
      };

      const formatPhone = (phone) => {
        if (phone && phone.indexOf("+") !== -1) {
          phone = phone.trim();
          phone = phone.replaceAll("+", "");
          phone = phone.replaceAll(" ", "");

          phone = `https://api.whatsapp.com/send?phone=${phone}`;

          return phone;
        }

        return "";
      };

      async function load() {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        if (isNaN(page) || isNaN(limit)) {
          let numPage = !isNaN(page) ? page : 1;
          let numLimit = !isNaN(limit) ? limit : 50;

          res.redirect(
            `/dashboard/subscription?page=${numPage}&limit=${numLimit}`
          );
          return;
        }

        page = parseInt(page);
        limit = parseInt(limit);

        let result = await ModelRegister.findAll({
          order: [["createdAt", "DESC"]],
          offset: (page - 1) * limit,
          limit: limit,
        });
        result = result.map((item) => item.toJSON());

        let qtd = await ModelRegister.count();

        let user = res.locals.user;

        if (user.permission === "all" || user.permission === "update") {
          user.active = true;
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < qtd) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        }

        var max = Math.ceil(qtd / limit);

        results.pages = {
          max: max,
          page: page,
        };

        Object.keys(result).forEach(async function (item) {
          let { phone, createdAt, about } = result[item];

          result[item].about = "" + about.trim();
          result[item].createdAt = formatDate(createdAt);
          result[item].urlPhone = formatPhone(phone);
        });

        results.results = result;

        setTimeout(() => {
          res.render("pages/admin/subscription", {
            layout: "dashboard",
            app,
            user,

            results,
            page,
            limit,
          });
        }, 1500);
      }

      load();
    });
  }
}

module.exports = new DashboardSubscriptionRoutes().routes;
