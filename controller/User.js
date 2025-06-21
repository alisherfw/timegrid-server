const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {

        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User successfully created!" })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

module.exports = {
    register,
    login
};