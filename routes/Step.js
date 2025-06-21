const express = require('express');
const stepController = require('../controller/Step');
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth.authenticate, stepController.createStep);
router.put("/:id", auth.authenticate, stepController.updateStep);
router.delete("/:id", auth.authenticate, stepController.deleteStep);

module.exports = router
