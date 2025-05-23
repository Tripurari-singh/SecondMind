import  mongoose , {model , Schema, Types} from "mongoose";

mongoose.connect("");

const ContentTypes = ["image", "video" , "article" , "audio"];

const UserSchema = new Schema({
    username : {type : String ,required : true, unique : true},
    password : {type : String , required : true}
})

const ContentSchema = new Schema({
    // link ,  type , title , tag , userId
    link : String,
    title : String,
    tags : {type : mongoose.Types.ObjectId , ref : "Tag"},
    userId : {type : mongoose.Types.ObjectId , ref : "User" , required : true , unique : true}
})

const LinkSchema = new Schema({
    hash : String,
    userId : {type : mongoose.Types.ObjectId , ref : "User" , required : true}
})

export const UserModel = model("User" , UserSchema)
export const LinkModel = model("Links" , LinkSchema)
export const ContentModel = model("Content" , ContentSchema); 
