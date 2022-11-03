import React, { useContext } from "react";
import ImageGallery from "./ImageGallery";
import { ChartContext } from "./ChartContext";

export default function ViewModal({ img, source, closeModal }) {
    const { chart, dispatch } = useContext(ChartContext);
    const addToChart = () => {
        dispatch({ type: "ADD", payload: img });
    };
    return (
        <div id="viewBack">
            <div id="viewModal">
                <p id="close" onClick={closeModal}>
                    X
                </p>
                <ImageGallery images={[...img]} postIdx={0}></ImageGallery>
                {source == "Shop" && (
                    <button onClick={addToChart}>Add to Chart</button>
                )}
            </div>
        </div>
    );
}
