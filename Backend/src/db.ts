import  mongoose , {model , Schema, Types} from "mongoose";

mongoose.connect("mongodb+srv://Tripurari:cCKXZK7PWcV95k6K@cluster0.c0dgn.mongodb.net/BrainApp")
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));



const UserSchema = new Schema({
    username : {type : String ,required : true},
    password : {type : String , required : true}
})

const ContentSchema = new Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "tag" }], 
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: "User", 
        required: true                  
    }
});

const LinkSchema = new Schema({
    hash : String,
    userId : {type : mongoose.Types.ObjectId , ref : "User" , required : true}
})

export const UserModel = model("User" , UserSchema)
export const LinkModel = model("Links" , LinkSchema)
export const ContentModel = model("Content" , ContentSchema); 
