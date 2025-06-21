const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const userRoutes = require('./routes/User');
const eventRoutes = require('./routes/Event');
const goalRoutes = require('./routes/Goal');
const stepRoutes = require('./routes/Step');

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/step", stepRoutes);


const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}, mongoose connected`) }))
    .catch(err => console.log(err));
