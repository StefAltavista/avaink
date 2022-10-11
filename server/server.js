const path = require("path");

//Express Setup
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.json());

//Multer Setup
const multer = require("multer");
const uidSafe = require("uid-safe");
const { nextTick } = require("process");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: (req, file, callback) => {
        uidSafe(24).then((randomId) => {
            const fileName = `${randomId}${path.extname(file.originalname)}`;
            callback(null, fileName);
        });
    },
});
const uploader = multer({ storage });

let secret;
if (process.env.NODE_ENV == "production") {
    secret = process.env;
} else {
    secret = require("../config.json");
}
let errorNum = 0;
let tokenCheck;
uidSafe(24).then((randomId) => {
    tokenCheck = randomId;
});

//server

app.post("/api/logIn", (req, res) => {
    const { password } = req.body;

    if (password == secret.ACCESS) {
        uidSafe(24).then((randomId) => {
            tokenCheck = randomId;
            res.json({ newToken: tokenCheck, result: "correct" });
        });
    } else {
        res.json({ newToken: null, result: "wrong password" });
        errorNum++;
    }
});

app.post("/api/logOut", checkToken, (req, res) => {
    uidSafe(24).then((randomId) => {
        tokenCheck = randomId;
        res.json({ success: true });
    });
});
app.post("/api/upload", uploader.single("file"), (req, res) => {
    console.log("upload succesfull", req);
});

app.set("port", process.env.PORT || 6000);

app.listen(app.get("port"), () => {
    console.log("server running on 6000");
});

function checkToken(req, res, next) {
    const { token } = req.body;
    if (tokenCheck == token) {
        console.log("Correct Token");
        next();
    } else {
        console.log("wrong credentials");
        res.json("wrong credentials");
    }
}
