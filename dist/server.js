import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send(`Yo! Your api key is ${process.env.MOCK_API_KEY}`);
});
import userRoutes from "./routes/user.routes.js";
app.use("/api/user", userRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map