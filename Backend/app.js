const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors'); 
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookiesParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes'); 

const app = express();

connectToDB(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookiesParser());

app.get('/', (req, res) => {
    res.send("hlo");
});

app.use('/users',userRoutes);

app.use('/captains', captainRoutes);
// Adding captain routes



module.exports = app;
