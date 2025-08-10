import express from "express";
import { prisma } from "@repo/db/client";
import brcypt from "bcrypt";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "incomplete credentials",
        });
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (existingUser) {
            res.status(409).json({
                message: "email already in use.",
            });
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: brcypt.hashSync(password, 10),
            },
        });

        if (user) {
            res.json({
                message: "Signed up successfully",
                userId: user.id,
            });
        }
    } catch {
        res.status(500).json({
            message: "internal server error",
        });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "incomplete credentials",
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (user) {
            const passwordCorrect = brcypt.compareSync(password, user.password);
            if (passwordCorrect) {
                res.json({
                    message: "Signed in successfully",
                    userId: user.id,
                });
            } else {
                res.status(401).json({
                    message: "incorrect credentials",
                });
            }
        }
    } catch {
        res.status(500).json({
            message: "internal server error",
        });
    }
});

app.listen(PORT);
