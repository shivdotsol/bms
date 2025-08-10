import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3002 });

wss.on("connection", async (socket) => {
    await prisma.user.create({
        // dummy data just to test if the deployed ws-server is working with the db
        data: {
            email: `test${Math.random()}@gmail.com`,
            password: "easypeasy",
        },
    });
    socket.send("connected");
});
