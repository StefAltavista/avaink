import React, { useState } from "react";
import { useSelector } from "react-redux";

import uploadImmage from "../hooks/uploadImage";

export default function AddDesign() {
    const access = useSelector((state) => state.admin.access);
    const token = useSelector((state) => state.admin.token);
    const { about } = useSelector((state) => state.content);
    const [img, setImg] = useState();
    const [file, setFile] = useState();

    const [title, setTitle] = useState("");

    const readImg = (img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            setImg(reader.result);
            setFile(img);
            console.log(reader.result);
        };
    };

    return (
        <div id="addDesignModal">
            <h3>add Design</h3>

            <div>
                <p>Title:</p>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
            </div>
            <div>
                <p>File:</p>
                <input
                    type="file"
                    onChange={(e) => readImg(e.target.files[0])}
                ></input>
            </div>
            {img && <img id="addDesignPreview" src={img} />}
            <button onClick={() => uploadImmage(file, token)}>Submit</button>
        </div>
    );
}
