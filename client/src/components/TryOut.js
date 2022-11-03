import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WhiteBoard from "./WhiteBoard";

export default function TryOut() {
    const designs = useSelector((state) => state.content.designs);
    const [selectedDSG, setSelectedDSG] = useState();
    const [selectedBDY, setSelectedBDY] = useState();
    const [bodySize, setBodySize] = useState(0.5);
    const [tattooSize, setTattooSize] = useState(0.1);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        designs ? setSelectedDSG(designs[0].imgUrls[0]) : null;
        setSelectedBDY("/imgs/female.png");
    }, [designs]);

    const getImage = (url) => {
        console.log("fetching", url);
        try {
            fetch(url)
                .then((response) => {
                    console.log("aws Response:", response);
                    return response.blob();
                })
                .then((i) => {
                    console.log(i);
                    return URL.createObjectURL(i);
                })
                .then((img) => setSelectedDSG(img));
        } catch (e) {
            console.log("error", e);
        }
    };

    return (
        <div id="TryOut">
            <div id="editor">
                <div id="sizes">
                    <p>body Size</p>
                    <input
                        type="range"
                        min={0.5}
                        max={2}
                        step={0.01}
                        value={bodySize}
                        onChange={(e) => setBodySize(e.target.value)}
                    ></input>
                    <p>Tatoo size:</p>
                    <input
                        type="range"
                        min={0.1}
                        max={2}
                        step={0.01}
                        value={tattooSize}
                        onChange={(e) => setTattooSize(e.target.value)}
                    ></input>
                    <p>Zoom:</p>
                    <input
                        type="range"
                        min={0.1}
                        max={1}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                    ></input>
                </div>
            </div>
            <div id="whiteBoard">
                <WhiteBoard
                    tattoo={selectedDSG}
                    bodyImage={selectedBDY}
                    bodySize={bodySize}
                    tattooSize={tattooSize}
                    zoom={zoom}
                ></WhiteBoard>
            </div>

            <div id="chooseDesign">
                <p>Choose Design</p>
                {designs &&
                    designs.map((x) => {
                        return x.imgUrls.map((url, idx) => {
                            let className =
                                url == selectedDSG
                                    ? "selectedDesign"
                                    : "notSelectedDesign";
                            return (
                                <img
                                    src={url}
                                    id="designPreview"
                                    className={className}
                                    key={idx}
                                    onClick={() => {
                                        getImage(url);
                                    }}
                                ></img>
                            );
                        });
                    })}
            </div>
        </div>
    );
}
