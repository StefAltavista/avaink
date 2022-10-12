import React, { useState } from "react";
import { useSelector } from "react-redux";

import readImage from "../hooks/readImage";
import uploadImage from "../hooks/uploadImage";

export default function AddModal({ source }) {
    const token = useSelector((state) => state.admin.token);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgs, setImgs] = useState([]);
    const [files, setFiles] = useState([]);

    const addImage = async (img) => {
        let preview = await readImage(img);
        setImgs([...imgs, preview]);
        setFiles([...files, img]);
    };

    const upload = async () => {
        //Dispatch loading

        const imgUrls = await uploadImage(files, token);
        const data = { title, description, imgUrls };

        fetch(`/api/addImages`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({ source, data }),
        })
            .then((res) => res.json())
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };

    return (
        <div id="addModal">
            <h3>New {source}</h3>

            <div>
                <button onClick={() => upload()}>Submit</button>
                <p>Title:</p>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <p>Description:</p>
                <input
                    value={title}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
            </div>
            <div>
                <p>Image:</p>
                <input
                    type="file"
                    onChange={(e) => addImage(e.target.files[0])}
                ></input>
            </div>
            <div id="imagesPreview">
                {imgs.map((i, idx) => (
                    <img id="addImagePreview" src={i} key={idx} />
                ))}
            </div>
        </div>
    );
}
