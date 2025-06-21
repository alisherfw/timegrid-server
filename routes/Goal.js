const express = require('express')
const auth = require("../middleware/auth")
const goalController = require('../controller/Goal')

const router = express.Router();


router.post("/", auth.authenticate, goalController.createGoal);
router.get("/", auth.authenticate, goalController.getGoalsWithSteps);
router.put("/:id", auth.authenticate, goalController.updateGoal);
router.delete("/:id", auth.authenticate, goalController.deleteGoal);

module.exports = router
