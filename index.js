const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const userRoutes = require('./controller/User')

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}, mongoose connected`) }))
    .catch(err => console.log(err));