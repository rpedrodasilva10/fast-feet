const { Router } = require("express");

const routes = new Router();

routes.get("/", (req, res) => {
  res.json("hello world");
});

module.exports = routes;
