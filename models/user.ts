// import { subscribe } from "diagnostics_channel";
import mongoose from "mongoose";
import {Schema, Document} from "mongoose"
import bcrypt from "bcrypt"
export interface User extends Document{
    username : string;
    createdAt : Date;
    fullname : string;
    email : string;
    avatar : string;
    password : string | null;
    bio : string;
    mobileNumber : number;
    otpCode : number;
    provider : "google" | "facebook" | "twitter" | "credentials";
    isPasswordMatch(enteredPassword: string): Promise<boolean>; // Define method signature
}
const UserSchema : Schema<User> = new Schema({
    username : {
        type : String,
        unique : true,
        required : [true, "Username is must be reqired"],
        trim : true
    },
    fullname : {
        type : String,
        unique : true,
        required : [true, "Fullname is must be reqired"],
    },
    email : {
        type : String,
        unique : true,
        required : [true, "email is must be reqired"],
        match : [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"please enter a valid email"]
    },
    avatar : {
        type : String,
        // required : [true, "avatar is must be reqired"],
    },
    password : {
        type : String,
    },
    bio : {
        type : String,
    },
    mobileNumber : {
        type : Number
    },
    provider : {
        type : String,
        required : true,
        default : "credentials"
    },
    otpCode : {
        type : Number
    }
})

UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return next();
    }
})

UserSchema.methods.isPasswordMatch = async function (enteredPassword:string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
UserSchema.methods.hashedPassword = async function(password : string):Promise<string>{
    return await bcrypt.hash(password,10)
}
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel