import mongoose , {Schema,Document} from "mongoose";

export interface Otp extends Document{
    email : string;
    otpCode : string;
    createdAt : Date;
}

const OtpSchema : Schema<Otp> = new Schema({
    email : {
        type : String,
        required : true
    },
    otpCode : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 300
    }
})

const OtpModel = mongoose.models.Otp || mongoose.model<Otp>("Otp",OtpSchema)

export default OtpModel;