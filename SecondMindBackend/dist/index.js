"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Zod Validation , Password Hashing
        const username = req.body.username;
        const password = req.body.password;
        try {
            yield db_1.UserModel.create({
                username: username,
                password: password
            });
            res.json({
                message: "User Signed In !!"
            });
        }
        catch (error) {
            console.log("Error Occured Creating", error);
            res.status(500).json({
                message: "Internal server Error"
            });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const UserExists = yield db_1.UserModel.findOne({
            username,
            password
        });
        if (UserExists) {
            const token = jsonwebtoken_1.default.sign({
                id: UserExists._id
            }, config_1.JWT_PASSWORD);
            res.json({
                token
            });
        }
        else {
            res.status(403).json({
                message: "Invalid Crediantials"
            });
        }
    });
});
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
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", function (req, res) {
});
app.delete("/api/v1/content", function (req, res) {
});
app.post("/api/v1/brain/share", function (req, res) {
});
app.get("/api/v1/brain/:shareLink", function (req, res) {
});
app.listen(3000, function () {
    console.log("Listening on port 3000");
});
