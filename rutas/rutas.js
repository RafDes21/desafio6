const express = require("express");
const router = express.Router();
const contenedor = require("../controlador/productos");

//Setting data base Mysql.
const { mysql } = require("../options/mysql");
const knex = require("knex")(mysql);
const bd = require("../containerBD/index");
const newProduct = new bd(knex, "products");

router.get("/", async (req, res) => {
  const productos = await contenedor.getAll();
  res.render("inicio", { productos });
});

router.post("/productos", async (req, res) => {
  try {
    await newProduct.save(req.body); //save product in Mysql
    await contenedor.save(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
