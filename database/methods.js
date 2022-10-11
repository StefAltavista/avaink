let data = require("./content.json");
const fs = require("fs");
const path = require("path");

const getData = () => {
    return data;
};

// designs
const getAllDesigns = () => {
    return data.designs;
};
const getDesign = (idx) => {
    return data.designs[idx];
};

const addDesign = (design) => {
    data.designs.unshift(design);
    save();
    return "design Added";
};
const removeDesign = (idx) => {
    if (data.designs.indexOf(idx) > -1) {
        data.designs.splice(idx, 1);
        save();
        return "design removed";
    }
    return "design not found";
};

// dashboard

const getAllPosts = () => {
    return data.posts;
};
const getPost = (idx) => {
    return data.posts[idx];
};

const addPost = (design) => {
    data.posts.unshift(design);
    save();
    return "Post added";
};
const removePost = (idx) => {
    if (data.posts.indexOf(idx) > -1) {
        data.posts.splice(idx, 1);
        save();
        return "post removed";
    }
    return "post not found";
};

// about

const getAbout = () => {
    return data.about;
};
const updatePic = (newUrl) => {
    data.about.profilePic = newUrl;
    save();
    return "pic updated";
};
const updateBio = (newBio) => {
    data.about.bio = newBio;
    save();
    return "bio updated";
};
const addPhoto = (photoUrl) => {
    data.about.photos.unshift(photoUrl);
    save();
    return "photo added";
};
const removePhoto = (idx) => {
    if (data.about.photos.indexOf(idx) > -1) {
        data.about.photos.splice(idx, 1);
        save();
        return "photo removed";
    }
    return "photo not found";
};

module.exports = {
    getData,
    getAllDesigns,
    getDesign,
    addDesign,
    removeDesign,
    getAllPosts,
    getPost,
    addPost,
    removePost,
    getAbout,
    updatePic,
    updateBio,
    addPhoto,
    removePhoto,
};

const save = () => {
    fs.writeFileSync(
        path.join(__dirname, "content.json"),
        JSON.stringify(data)
    );
};
