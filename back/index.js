import express from "express";
import cors from "cors";
import * as http from "http";
import "dotenv/config";
var port = process.env.PORT || 8080;
//tsc --module commonjs logic.ts
var app = express();
app.use(cors());
app.use(express.json());
app.get("/logic.js", function (req, res) {
    res.sendFile("logic.js", { root: "." });
});
app.get("/connection.js", function (req, res) {
    res.sendFile("connection.js", { root: "." });
});
app.get("/styles.css", function (req, res) {
    res.sendFile("styles.css", { root: "." });
});
app.get("/", function (req, res) {
    res.sendFile("index.html", { root: "." });
});
var server = http.createServer(app);
server.listen(port, function () {
    console.log("Server succesufully started on ".concat(port));
});
