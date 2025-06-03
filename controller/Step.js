const Step = require('../model/Step')

const createStep = async (req, res) => {
    
    try {

        const newStep = new Step({...req.body, goal: req.params.goal._id })
        const saved = await newStep.save();

        res.status(201).json({saved});

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateStep = async (req, res) => {
    try {

        const updatedStep = await Step.findOneAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if(!updatedStep) {
            return res.status(404).json({ error: "Step not found!" });
        }

        res.status(200).json(updatedStep);
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteStep = async (req, res) => {
    try {
        const deletedStep = await Step.findByIdAndDelete(req.params.id);
        if(!deletedStep) {
            return res.status(404).json({ error: "Step not found!" });
        }

        res.status(200).json({ message: "Step deleted!" });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createStep,
    updateStep,
    deleteStep
}