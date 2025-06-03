const jwt = require('jsonwebtoken')
const Event = require("../model/Event")

const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"];

    if(!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        
        req.user = verified;
        next();

    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
}

const checkOwnership = async (req, res, next) => {

    try {
        const { id } = req.params;
        const userId = req.user.id;

        const event = await Event.findById(id);

        if(!event) {
            return res.status(404).json({ message: "Event not found!" });
        }

        if(event.user.toString() !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = { authenticate, checkOwnership }