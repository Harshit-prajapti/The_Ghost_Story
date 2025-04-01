import z from "zod"

export const signUpSchema = z.object({
    username : z.string().min(3,"Username must be at lease 3 character").max(12,"Username must be no more 12 characters"),
    fullname : z.string().min(3,"fullname must be at lease 3 character").max(20,"fullname must be no more 20 characters"),
    email : z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address").email({message : "Invalid email address"}),
    password : z.string().min(8,"password must be at lease 8 character long").max(15,"password  too Long"),
    avatar : z.string().default("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"),
    bio : z.string().max(50,"bio should have maximum 50 characters long"),
    mobileNumber : z.string().max(10,"Invalid Number")
})