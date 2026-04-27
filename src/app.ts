import express from "express";
import cors from "cors";
const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))

app.get('/',(req,res)=>{
    res.send(`Hello`);
})

import userRoutes from "./routes/user.routes.js";
app.use("/api/user",userRoutes);

export default app;