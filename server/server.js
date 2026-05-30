import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import { inngest, functions } from "./Inngest/index.js";

const app = express();
const Port = 3000;

await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Ticket Counter API!");
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  }),
);

app.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}`);
});
