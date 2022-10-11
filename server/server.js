const path = require("path");

//Express Setup
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.json());

let secret;
if (process.env.NODE_ENV == "production") {
    secret = process.env;
} else {
    secret = require("../config.json");
}

const db = require("../database/methods");

//Cookies
let cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    name: "ava-session",
    secret: secret.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14, //3.5 days
    sameSite: true,
});
app.use(cookieSessionMiddleware);

//Multer Setup
const multer = require("multer");
const uidSafe = require("uid-safe");
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

//----------- Log in/out requests--------------\\
app.post("/api/logIn", (req, res) => {
    const { password } = req.body;

    if (password == secret.ACCESS) {
        uidSafe(24).then((randomId) => {
            req.session = { token: randomId, access: true };
            console.log(req.session);
            res.json({ token: randomId, access: true });
        });
    } else {
        res.json({ token: null, access: false });
        console.log("wrong password");
        errorNum++;
    }
});

app.post("/api/logOut", checkToken, (req, res) => {
    console.log("OUT:", req.session);
    req.session = null;
    res.json({ token: null, access: null });
});

//----------- DATABASE REQUESTS--------------\\
app.get("/api/getData", (req, res) => {
    data = db.getData();
    res.json(data);
});
//----------- AWS --------------\\
app.post("/api/upload", checkToken, uploader.single("file"), (req, res) => {
    console.log("upload succesfull", req);
});
app.get("/api/access", (req, res) => {
    res.json(req.session);
});

app.get("/*", function (req, res) {
    res.redirect("/");
});

//-------------
app.set("port", process.env.PORT || 6000);
app.listen(app.get("port"), () => {
    console.log("server running on 6000");
});

function checkToken(req, res, next) {
    const { token } = req.body;
    // console.log("check:", token, "with", req.session);
    if (token == req.session.token) {
        console.log("Correct Token");
        next();
    } else {
        console.log("wrong credentials");
        res.json("wrong credentials");
    }
}
