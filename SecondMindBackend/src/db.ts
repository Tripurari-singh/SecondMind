import  mongoose , {model , Schema, Types} from "mongoose";

mongoose.connect("");

const ContentTypes = ["image", "video" , "article" , "audio"];

const UserSchema = new Schema({
    username : {type : String ,required : true, unique : true},
    password : {type : String , required : true}
})
export const UserModel = model("User" , UserSchema)

const ContentSchema = new Schema({
    // link ,  type , title , tag , userId
    link : String,
    title : String,
    tags : {type : mongoose.Types.ObjectId , ref : "Tag"},
    userId : {type : mongoose.Types.ObjectId , ref : "User" , required : true}
})

 export const ContentModel = model("Content" , ContentSchema); 