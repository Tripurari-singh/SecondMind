import express, { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { UserModel, ContentModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";

// Extend Express Request type to include userId
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const app = express();
app.use(express.json());

const signupHandler: RequestHandler = async (req, res, next) => {
    try {
        const signupSchema = z.object({
            username: z.string().min(3).max(10),
            password: z.string().min(8).max(20)
        });

        const { username, password } = signupSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }

        // Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await UserModel.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Signup successful!"
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: "Invalid input data",
                errors: error.errors
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const signinHandler: RequestHandler = async (req, res, next) => {
    try {
        const signinSchema = z.object({
            username: z.string().min(3).max(10),
            password: z.string().min(8).max(20)
        });

        const { username, password } = signinSchema.parse(req.body);

        const user = await UserModel.findOne({ username });
        if (!user) {
            res.status(401).json({
                message: "Invalid username or password"
            });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Invalid username or password"
            });
            return;
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_PASSWORD,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: "Invalid input data",
                errors: error.errors
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createContentHandler: RequestHandler = async (req, res, next) => {
    try {
        const contentSchema = z.object({
            link: z.string().url(),
            type: z.string(),
            title: z.string(),
            tags: z.array(z.string()).optional()
        });

        const { link, type, title, tags = [] } = contentSchema.parse(req.body);
        
        const content = await ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags
        });

        res.status(201).json({
            message: "Content added successfully",
            content
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: "Invalid input data",
                errors: error.errors
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getContentHandler: RequestHandler = async (req, res, next) => {
    try {
        const content = await ContentModel.find({
            userId: req.userId
        }).select('-__v');

        res.json({ content });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteContentHandler: RequestHandler = async (req, res, next) => {
    try {
        const { contentId } = req.params;
        
        const result = await ContentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId
        });

        if (!result) {
            res.status(404).json({
                message: "Content not found or unauthorized"
            });
            return;
        }

        res.json({
            message: "Content deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Route handlers
app.post("/api/v1/signup", signupHandler);
app.post("/api/v1/signin", signinHandler);
app.post("/api/v1/content", userMiddleware, createContentHandler);
app.get("/api/v1/content", userMiddleware, getContentHandler);
app.delete("/api/v1/content/:contentId", userMiddleware, deleteContentHandler);

app.post("/api/v1/brain/share",function(req,res){

})

app.get("/api/v1/brain/:shareLink",function(req,res){

})

app.listen(3000,function(){
    console.log("Listening on port 3000");
});