import { NextFunction } from "express";
import { Schema, model } from "mongoose";
import * as bcrypt from "bcryptjs";

const userSchema = new Schema({
    firstname : {
        type: String,
        required: false,
        trim: true

    },
    lastname : {
        type: String,
        required: false,
        trim: true

    },
    gender: {
        type: String,
        // enum: ["male", "female"],
        required: true
    },
    email : {
        type: String,
        required: true,
        unique : true,
        index: true,
        trim: true
    },
   
    password:{
        type: String,
        required: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    // preferences: { 
    //     type: Array, 
    //     default: [] 
    // },
    // goals: [{ 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Goal' 
    // }],
    otp_code: String,
    otpExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
},
{
    timestamps: true,
}
);

userSchema.pre("save", async function(next: NextFunction){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const User = model("User", userSchema);

export default User