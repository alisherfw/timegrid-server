const express = require('express')
const auth = require("../middleware/auth")
const goalConroller = require('../controller/Goal')

const router = express.Router();


router.post("/", auth.authenticate, goalConroller.createGoal);
router.get("/", auth.authenticate, goalConroller.getGoalsWithSteps);
router.put("/:id", auth.authenticate, auth.checkOwnership, goalConroller.updateGoal);
router.delete("/:id", auth.authenticate, auth.checkOwnership, goalConroller.deleteGoal);

module.exports = router