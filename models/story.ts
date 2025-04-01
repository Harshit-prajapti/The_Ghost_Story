import mongoose, {Schema, Document, ObjectId} from "mongoose";
// import { string } from "zod";
// import { boolean, string } from "zod";

export interface Story extends Document {
    title : string,
    content : string,
    images : [string],
    thumbnail : string,
    owner : string,
    ownerId : ObjectId,
    categories : [string],
    views : number,
    likes : number,
    comments : [{
        userId : ObjectId,
        username : string,
        comment : string,
        likes : number,
    }],
    isPublished : boolean,
}

const StorySchema: Schema<Story> = new Schema({
    title : {
        type : String,
        required : [true,"title must be required"],
        unique : true
    },
    content : {
        type : String,
        required : [true,"content is must be rquired"]
    },
    images : [String],
    thumbnail : {
        type : String,
        required : [true,"Tumbnail must be rquired"]
    },
    ownerId : {
        type : Schema.Types.ObjectId,
        ref : "UserModel"
    },
    owner : {
        type : String,
        required : [true,"Owner name must be rquired"]
    },
    categories : {
        type : [String],
        default : []
    },
    views : {
        type : Number,
        default : 0
    },
    likes : {
        type : Number,
        default : 0
    },
    comments : [{
        userId : {
            type : Schema.Types.ObjectId,
            ref : "UserModel"
        },
        username : {
            type : String,
        },
        likes : {
            type : Number,
            default : 0,
        },
        comment : {
            type : String,
        }
    }],
    isPublished : {
        type : Boolean,
        default : false
    }
})

const StoryModel = (mongoose.models.Story as mongoose.Model<Story>) || mongoose.model<Story>("Story",StorySchema)
export default StoryModel