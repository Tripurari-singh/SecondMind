import express from "express";
import jwt from "jsonwebtoken";
import { UserModel , ContentModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
const app = express();
app.use(express.json());

app.post("/api/v1/signup", async function(req,res){
    //Zod Validation , Password Hashing
    const username  = req.body.username;
    const password = req.body.password;

     try{
        await UserModel.create({
        username : username,
        password : password
    })
     
    res.json({
        message : "User Signed In !!"
    })}
    catch(error){
        console.log("Error Occured Creating" , error);
        res.status(500).json({
            message : "Internal server Error"
        })
    }
})

app.post("/api/v1/signin", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const UserExists = await UserModel.findOne({
        username,
        password
    })

    if(UserExists){
        const token = jwt.sign({
            id : UserExists._id
        },JWT_PASSWORD)

        res.json({
        token
    })
    }
    else{
        res.status(403).json({
            message : "Invalid Crediantials"
        })
    }
})
// app.post("/api/v1/content", userMiddleware ,async function(req,res){
//     const link = req.body.link;
//     const type = req.body.type;
  

//     try{
//         await ContentModel.create({
//         link,
//         type,
//         title :req.body.title,
//         //@ts-ignore 
//          userId : req.userId,
//          tags : [],
//     })
//     res.json({
//         message : "Content Added"
//     })
//     }
//     catch(error){
//         console.log("Error Occured in Contents" , error)
//         res.status(403).json({
//             message : "Content Not added"
//         })
//     }
// })


// Correct Code
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})


app.get("/api/v1/content",function(req,res){

})
app.delete("/api/v1/content",function(req,res){

})
app.post("/api/v1/brain/share",function(req,res){

})

app.get("/api/v1/brain/:shareLink",function(req,res){

})

app.listen(3000,function(){
    console.log("Listening on port 3000");
});