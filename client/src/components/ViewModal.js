import React from "react";
import ImageGallery from "./ImageGallery";

export default function ViewModal({ img, closeModal }) {
    return (
        <div id="vievModal">
            <p onClick={() => closeModal()}>X</p>
            <ImageGallery images={[...img]} postIdx={0}></ImageGallery>
        </div>
    );
}
