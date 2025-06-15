import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { appRoutes } from "./routes/index.js";
import { connectToDB } from "./config/database.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initSocket } from "./socket.js";

const app = express();
const PORT = 3003;

await connectToDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1", appRoutes);
app.use(errorHandler);

const httpServer = http.createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);
