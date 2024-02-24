import express from "express";
import dotenv from "dotenv";
dotenv.config();
const server = express();
server.use(express.json());

const PORT = process.env.PORT;
server.listen(() => {
  console.log(`${`Server is running at port ${PORT} `}`);
});
