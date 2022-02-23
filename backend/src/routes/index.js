const express = require("express");
const contatoController = require("../controller/contato.controller.js");

const router = express.Router();

router.post("/contato", contatoController.create);
router.get("/contato", contatoController.findAll);
router.get("/contato/:id", contatoController.findById);
router.put("/contato/:id", contatoController.update);
router.delete("/contato/:id", contatoController.remove);

module.exports = router;
