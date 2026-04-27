import "dotenv/config";
import app from "./app.js";
import prisma from "./prisma/client.js";

async function startServer(){
    await prisma.$connect();

    app.listen(process.env.PORT,()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
};

startServer();