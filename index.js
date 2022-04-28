"use strict";

const app = require("./app");

const systemAlert = (message) => console.log(`[Admin BeeIntern]: ${message}`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, systemAlert("NODE_ENV: [local]"));
