const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config;



const app = express()
app.use(cors());
app.use(express.json());

// Connect to mongoDB

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");  
}).catch((error) => {
    console.error(error);
})

app.listen(process.env.PORT || 5000, )

