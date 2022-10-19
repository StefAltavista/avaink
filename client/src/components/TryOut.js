import React, { useState } from "react";
import { useSelector } from "react-redux";
import WhiteBoard from "./WhiteBoard";

export default function TryOut() {
    const designs = useSelector((state) => state.content.designs);
    const [selected, setSelected] = useState(
        "https://avainkbucket.s3.eu-central-1.amazonaws.com/KbqsgCIMYDbrOCnUWYHaUhHWmZFfUL4Q.png"
    );

    return (
        <div id="TryOut">
            <div id="chooseDesign">
                <p>Choose Design</p>
                {designs &&
                    designs.map((x) => {
                        return x.imgUrls.map((url, idx) => {
                            let className =
                                url == selected
                                    ? "selectedDesign"
                                    : "notSelectedDesign";
                            return (
                                <img
                                    src={url}
                                    id="designPreview"
                                    className={className}
                                    key={idx}
                                    onClick={() => {
                                        setSelected(url);
                                    }}
                                ></img>
                            );
                        });
                    })}
            </div>
            <div id="whiteBoard">
                <WhiteBoard url={selected}></WhiteBoard>
            </div>
        </div>
    );
}
