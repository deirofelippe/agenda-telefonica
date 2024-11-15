const express = require("express");

const imagesController = require("../controller/images.controller.js");
const contactsController = require("../controller/contacts.controller.js");

const router = express.Router();

router.post("/images/presigned-url", imagesController.preSignedUrl);

router.post("/contacts", contactsController.create);
router.get("/contacts", contactsController.findAll);
router.get("/contacts/:id", contactsController.findById);
router.put("/contacts/:id", contactsController.update);
router.delete("/contacts/:id", contactsController.remove);

module.exports = router;
