const aws = require("aws-sdk");
const fs = require("fs");
let secret;
if (process.env.NODE_ENV == "production") {
    secret = process.env;
} else {
    secret = require("../config.json");
}

const s3 = new aws.S3({
    accessKeyId: secret.AWS_KEY,
    secretAccessKey: secret.AWS_SECRET,
});

module.exports.uploadAWS = (req, res, next) => {
    if (!req.file) {
        console.log("User didn't send any file");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;
    console.log("FILE:\n", filename, mimetype, size, path);
    s3.putObject({
        Bucket: "avainkbucket",
        // ACL: "public-read", // makes sure what we upload can be access online
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype, // ensures that under the hood content type headers can be set
        ContentLength: size, // and content length headers
    })
        .promise()
        .then(() => {
            console.log("img uploaded in aws cloud!");
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => console.log("cloud upload failed!", err));
};
