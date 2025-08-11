import { type } from 'os';

const mongoose  = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    searchedAt :{
        type: Date,
        default: Date.now
    }
}, { timestamps : true});

export const Weather = mongoose.model("Weather", weatherSchema);