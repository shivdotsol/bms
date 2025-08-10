import { prisma } from "@repo/db/client";

export default async function Home() {
    // just to test if the deployed frontend can connect to the db
    const user = await prisma.user.findFirst({
        where: {
            email: {
                startsWith: "test",
            },
        },
    });
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "32px",
            }}
        >
            <div>user: {user?.email}</div>
        </div>
    );
}
