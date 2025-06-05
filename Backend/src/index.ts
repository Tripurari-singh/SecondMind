import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { UserModel,LinkModel, ContentModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./util";
import cors from "cors";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Signup endpoint
app.post("/api/v1/signup", async (req: Request, res: Response) => {
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
});

// Signin endpoint
app.post("/api/v1/signin", async (req: Request, res: Response) => {
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
            JWT_PASSWORD
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
});

// Create content endpoint
app.post("/api/v1/content",userMiddleware, async (req: Request, res: Response) => {
    try {
        const contentSchema = z.object({
            link: z.string(),
            type: z.string(),
            title: z.string(),
            // tags: z.array(z.string()).optional()
        });

        const { link, type, title } = contentSchema.parse(req.body);
        
         const content = await ContentModel.create({
            link  : link,
            title : req.body.title,
            type  : type,
            userId: req.userId, // userId is added by the middleware.
            tags: []
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
        console.error("Error while creating content:", error);
        res.status(500).json({ message: "Internal server error" });

    }
});

// Get content endpoint
app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    // try {
    //     const content = await ContentModel.find({
    //         userId: req.userId
    //     }).select('-__v');

    //     res.json({ content });
    // } catch (error) {
    //     res.status(500).json({
    //         message: "Internal server error"
    //     });
    // }

    const userId = req.userId;
    const content = await ContentModel.find({
        userId : userId
    }).populate("userId" , "username")
    res.json({
        content
    })
});

// Delete content endpoint
app.delete("/api/v1/content/:contentId", userMiddleware, async (req: Request, res: Response) => {
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
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    if (err instanceof z.ZodError) {
        res.status(400).json({
            message: "Invalid input data",
            errors: err.errors
        });
        return;
    }
    res.status(500).json({
        message: "Internal server error"
    });
});

// Returns a sharable Link
app.post("/api/v1/brain/share" , userMiddleware ,  async function(req : Request , res : Response){
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            userId : req.userId
        })
        if(existingLink){
            res.json({
                hash : existingLink.hash
            })
            return
        }
        const hash = random(10);
         await LinkModel.create({
            userId : req.userId,
            hash : hash
        });
        res.json({
            message : "/share/" + hash
        })
    }
    else{
         await LinkModel.deleteOne({
            userId : req.userId
        });
        res.json({
        Message : "Link Removed"
    })
    }
})

// Makes that sharable Link Work
app.get("/api/v1/brain/:shareLink" , async function(req : Request , res : Response){
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message : "Sorry Incorrect Input"
        })
        return;
    }

    //userId
    const content =  await ContentModel.findOne({
        userId : link.userId
    })

    const user = await UserModel.findOne({
        _id : link.userId
    })

    if(!user){
        res.status(411).json({
            message : "Something Crazzy Happened"
        })
        return;
    }

    res.json({
        username : user.username,
        content : content
    })

})
app.listen(3000, () => {
    console.log("Listening on port 3000");
});