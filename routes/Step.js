const express = require('express');
const stepController = require('../controller/Step');
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth.authenticate, stepController.createStep);
router.put("/:id", auth.authenticate, auth.checkOwnership, stepController.updateStep);
router.delete("/:id", auth.authenticate, auth.checkOwnership, stepController.deleteStep);

module.exports = router