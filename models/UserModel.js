import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { JWT_SECRET_KEY, JWT_EXPIRES } from "../constants/index.js"

const userSchema = new mongoose.Schema({
    contact: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required: [false, "required id"],
        }
    },
    email:{
        type: String,
        required:[true, "Please enter of the conctact"],
    },
    password:{
        type: String,
        required:[true,"Please enter your password!"],
        minlength:[8,"Password should be greater than 8 characters"],
        select: false,
    },
    contacts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required:[true, "Please set the sender conctact"],
        }]
    },
    createdAt:{
        type: Date,
        default:Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

// Hash password
userSchema.pre("save", async function(next){
     if (!this.isModified("password")) {
        next();
      }
    this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES
    });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Forgot password
userSchema.methods.getResetToken = function(){
    // Generating token
   const resetToken = crypto.randomBytes(20).toString("hex");
   
   //    hashing and adding resetPasswordToken to userSchema
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   this.resetPasswordTime = Date.now() + 15 * 60 * 1000;
   return resetToken;
}


const User = mongoose.model("User", userSchema);
export default User
