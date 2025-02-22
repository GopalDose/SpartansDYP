const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors')




const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
// app.use(cors())
// Connect to MongoDB
connectDB();

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));