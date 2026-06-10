import express from "express";
import cors from "cors";
const app=express();

const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    "http://localhost:5173",
    "https://rbac-admin-panel-client.vercel.app",
].filter(Boolean) as string[];

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
}))

app.get('/',(req,res)=>{
    res.json({
        name: "AccessBoard RBAC API",
        status: "ok",
    });
})

import userRoutes from "./routes/user.routes.js";
import roleRoutes from "./routes/role.routes.js";
app.use("/api/user",userRoutes);
app.use("/api/role",roleRoutes);

export default app;
