const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model("User", new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    age:{
        type: Number,
        min : 21,
        max: 100,
        required: true
    },
    salary:{
        type: Number,
        min : 1,
        required:true
    }
}))

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(12).required(),
        age: Joi.number().min(21).max(100).required(),
        salary:Joi.number().min(1).required(),
    })
    return schema.validate(user)
}

module.exports = { User, validateUser }