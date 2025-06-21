const Goal = require('../model/Goal')
const Step = require('../model/Step')

const createGoal = async (req, res) => {
    try {

        const newGoal = new Goal({...req.body, user: req.user.id});
        const saved = await newGoal.save();

        res.status(201).json(saved);
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateGoal = async (req, res) => {
    try {
        const updatedGoal = await Goal.findOneAndUpdate({
            _id: req.params.id, user: req.user.id},
            req.body,
            { new: true }
        );

        if(!updatedGoal) {
            return res.status(404).json({ error: "Goal not found!" })
        }

        res.status(200).json(updatedGoal)
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getGoalsWithSteps = async (req, res) => {
    
    try {
        
        const goals = await Goal.aggregate([
            { $match: { user: req.user.id } },
            {
                $lookup: {
                    from: "steps",
                    localField: "_id",
                    foreignField: "goal",
                    as: "steps"
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    steps: {
                        $sortArray: { input: "$steps", sortBy: { order: 1 } }
                    }
                }
            }
        ]);

        res.status(200).json(goals);
        
    } catch (error) {
        res.status(500).json({ error: error.message })  
    }

}

const deleteGoal = async (req, res) => {
    try {

        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

        if(!deletedGoal) {
            return res.status(404).json({ error: "Goal not found!" });
        }

        res.status(200).json({ message: "Goal deleted" });
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { 
    getGoalsWithSteps, 
    createGoal,
    updateGoal,
    deleteGoal
}