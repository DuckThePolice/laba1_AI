import express from "express";
import cors from "cors";
import * as http from "http";
import "dotenv/config";
import { Request, Response } from "express";
import { addEntry, getEntries, Main_Entry, updateEntry } from "./logic";
const port = process.env.PORT || 8080;
//tsc --module commonjs logic.ts
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  getEntries(req, res);
});
app.post("/create", (req, res) => {
  addEntry(req, res);
});
app.patch("/update", (req, res) => {
  updateEntry(req, res);
});

const server = http.createServer(app);
server.listen(port, () => {
  Main_Entry();
  console.log(`Server succesufully started on ${port}`);
});
