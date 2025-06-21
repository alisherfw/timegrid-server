const Step = require('../model/Step');
const Goal = require('../model/Goal');
const Event = require('../model/Event');

const createStep = async (req, res) => {
    try {
        const goal = await Goal.findById(req.body.goal);
        if (!goal || goal.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized or goal not found" });
        }

        const newStep = new Step({ ...req.body });
        const saved = await newStep.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStep = async (req, res) => {
    try {
        const step = await Step.findById(req.params.id);
        if (!step) return res.status(404).json({ error: "Step not found" });

        const goal = await Goal.findById(step.goal);
        if (!goal || goal.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const updated = await Step.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStep = async (req, res) => {
    try {
        const step = await Step.findById(req.params.id);
        if (!step) return res.status(404).json({ error: "Step not found" });

        const goal = await Goal.findById(step.goal);
        if (!goal || goal.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await Event.deleteMany({ step: step._id }); // cascade delete events
        await step.deleteOne();

        res.status(200).json({ message: "Step and related events deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStep,
    updateStep,
    deleteStep
};
