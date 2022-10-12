import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import readImage from "../hooks/readImage";
import uploadImage from "../hooks/uploadImage";
import getData from "../hooks/getData";

export default function AddModal({ source, closeModal }) {
    const token = useSelector((state) => state.admin.token);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgs, setImgs] = useState([]);
    const [files, setFiles] = useState([]);

    getData();
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
            .then((response) => {
                setDescription(null);
                closeModal();
            })
            .catch((e) => console.log(e));
    };

    return (
        <div id="modalBack">
            <div id="addModal">
                <div id="modalHead">
                    <h3>New {source}</h3>
                    <div>
                        <button onClick={() => closeModal()}>CANCEL</button>
                        <button onClick={() => upload()}>POST</button>
                    </div>
                </div>
                <div id="modalForm">
                    <div id="modalInputs">
                        <div id="modIn">
                            <p>Title:</p>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>
                        <div id="modIn">
                            <p>Description:</p>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div id="modIn">
                            <p>Image:</p>
                            <input
                                type="file"
                                onChange={(e) => addImage(e.target.files[0])}
                            ></input>
                        </div>
                    </div>
                    <div id="imagesPreview">
                        {imgs.map((i, idx) => (
                            <img id="addImagePreview" src={i} key={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
