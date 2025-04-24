
const express = require('express');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
connectDB();

//middleware
app.use(express.json());

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//use contact routes
app.use('/api', contactRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));