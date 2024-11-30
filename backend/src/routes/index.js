import express from "express";
import { dao } from "../dao/contact.dao.js";

import * as imagesController from "../controller/images.controller.js";
import * as contactsController from "../controller/contacts.controller.js";

const router = express.Router();

router.get("/healthz", async function (req, res) {
  const result = await dao.healthcheck();
  return res.status(200).json({ message: "healthy" });
});

router.get("/images/presigned-url", imagesController.preSignedUrl);

router.post("/contacts", contactsController.create);
router.get("/contacts", contactsController.findAll);
router.get("/contacts/:id", contactsController.findById);
router.put("/contacts/:id", contactsController.update);
router.delete("/contacts/:id", contactsController.remove);

export default router;
