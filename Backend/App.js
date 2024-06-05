import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import CORS

export const App = express();

// Use CORS middleware
App.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // If your frontend and backend need to share cookies
}));

App.use(express.json({ limit: "50mb" }));
App.use(express.urlencoded({ extended: true, limit: "50mb" }));
App.use(cookieParser());

import { userRouter } from "./Routes/User.js";
App.use("/api/v1", userRouter);

// Uncomment these lines if you are serving your frontend from the backend server
// import path from "path";
// App.use(express.static(path.resolve("./frontend/build")));
// App.get("*", (req, res) => {
//   res.sendFile(path.resolve("./frontend/build/index.html"));
// });
