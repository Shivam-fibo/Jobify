import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minLength: [3, 'Name must containe at least 3 characters'],
        maxLength: [20, 'Name can not exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Pleae enter your email'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number,
        required: [true, 'Please provide your phone number']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [8, 'Name must containe at least 8 characters'],
        maxLength: [30, 'Name can not exceed 30 characters']
    },
    role:{
        type: String,
        required: [true, 'Please provide your role type'],
        enum : ["Job Seeker", "Employer"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});



// Hashing password
userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

// comparing the password
userSchema.methods.compare = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
};

// generating a jwt token for authorization

userSchema.methods.getJWT = function(){
    jwt.sign({id : this._id}, process.env.JWT_S)
}
