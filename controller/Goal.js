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

module.exports = { getGoalsWithSteps, createGoal }