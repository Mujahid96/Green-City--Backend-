const { v1: uuidv1 } = require('uuid');
uuidv1();
const mongoose = require('mongoose');
const crypto = require('crypto');
// const uuidv1 = require('uuid/v1');
const { timeStamp } = require('console');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true, 
            required: true,
            maxlength: 32,
            unique: true
            
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("Category",categorySchema);