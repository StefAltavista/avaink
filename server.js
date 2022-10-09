const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "client")));

app.use(express.json());

app.get("/hello", (req, res) => {
    res.json("hello");
});

app.set("port", process.env.PORT || 6000);

app.listen(app.get("port"), () => {
    console.log("server running on 6000");
});
