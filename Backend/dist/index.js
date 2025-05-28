"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const zod_1 = require("zod");
const bcrypt = __importStar(require("bcrypt"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
// Signup endpoint
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupSchema = zod_1.z.object({
            username: zod_1.z.string().min(3).max(10),
            password: zod_1.z.string().min(8).max(20)
        });
        const { username, password } = signupSchema.parse(req.body);
        // Check if user already exists
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }
        // Password Hashing
        const hashedPassword = yield bcrypt.hash(password, 10);
        yield db_1.UserModel.create({
            username,
            password: hashedPassword
        });
        res.status(201).json({
            message: "Signup successful!"
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
}));
// Signin endpoint
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signinSchema = zod_1.z.object({
            username: zod_1.z.string().min(3).max(10),
            password: zod_1.z.string().min(8).max(20)
        });
        const { username, password } = signinSchema.parse(req.body);
        const user = yield db_1.UserModel.findOne({ username });
        if (!user) {
            res.status(401).json({
                message: "Invalid username or password"
            });
            return;
        }
        const isPasswordCorrect = yield bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Invalid username or password"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_PASSWORD);
        res.json({ token });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
}));
// Create content endpoint
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentSchema = zod_1.z.object({
            link: zod_1.z.string(),
            type: zod_1.z.string(),
            title: zod_1.z.string(),
            // tags: z.array(z.string()).optional()
        });
        const { link, type, title } = contentSchema.parse(req.body);
        const content = yield db_1.ContentModel.create({
            link: link,
            title: req.body.title,
            type: type,
            userId: req.userId, // userId is added by the middleware.
            tags: []
        });
        res.status(201).json({
            message: "Content added successfully",
            content
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
}));
// Get content endpoint
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const content = yield db_1.ContentModel.findOne({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
// Delete content endpoint
app.delete("/api/v1/content/:contentId", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.params;
        const result = yield db_1.ContentModel.findOneAndDelete({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof zod_1.z.ZodError) {
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
app.post("/api/v1/brain/share", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const share = req.body.share;
        if (share) {
            const existingLink = yield db_1.LinkModel.findOne({
                userId: req.userId
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            const hash = (0, util_1.random)(10);
            yield db_1.LinkModel.create({
                userId: req.userId,
                hash: hash
            });
            res.json({
                message: "/share/" + hash
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                Message: "Link Removed"
            });
        }
    });
});
// Makes that sharable Link Work
app.get("/api/v1/brain/:shareLink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = req.params.shareLink;
        const link = yield db_1.LinkModel.findOne({
            hash
        });
        if (!link) {
            res.status(411).json({
                message: "Sorry Incorrect Input"
            });
            return;
        }
        //userId
        const content = yield db_1.ContentModel.findOne({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(411).json({
                message: "Something Crazzy Happened"
            });
            return;
        }
        res.json({
            username: user.username,
            content: content
        });
    });
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
