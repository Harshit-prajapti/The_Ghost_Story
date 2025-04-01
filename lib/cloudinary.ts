import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name : 'dbknyppxl',
    api_key : process.env.api_Key,
    api_secret : process.env.Api_Secreate_Cloudinary
})

const uploadLocalFile = async(localFilePath:string) => {
    if(!localFilePath){
        console.log("local file path not occuring")
        return null
    }
    try {
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        console.log("file upload successfully ",response)
        // fs.unlinkSync(localFilePath);
        return response
    } catch (error:any) {
        console.log(error.message)
        return null
    }

}
export default uploadLocalFile