const express = require("express");
const contactController = require("../controller/contact.controller.js");

const router = express.Router();

router.post("/contact", contactController.create);
router.get("/contact", contactController.findAll);
router.get("/contact/:id", contactController.findById);
router.put("/contact/:id", contactController.update);
router.delete("/contact/:id", contactController.remove);

module.exports = router;
