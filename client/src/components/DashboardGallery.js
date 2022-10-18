import React, { createRef } from "react";

export default function DashboardGallery({ images, postIdx }) {
    let gallery = [];
    let dot = [];
    dot[postIdx] = [];
    const getScroll = (scroll, i) => {
        let postView = Math.floor(scroll / 500);
        dot[i].map((x, idx) => {
            if (idx == postView) {
                x.current.className = "selected";
            } else x.current.className = "notSelected";
        });
    };
    const scrollToImage = (postIdx, dotIdx) => {
        let view = dotIdx * 500;
        gallery[postIdx].current.scrollLeft = view;
    };
    return (
        <div id="postImages">
            <div
                id="postImgGallery"
                onScroll={(e) => getScroll(e.target.scrollLeft, postIdx)}
                ref={(gallery[postIdx] = createRef())}
            >
                {images.map((url, idx) => (
                    <div id="imgContainer" key={idx}>
                        <img src={url} id="postImg" />{" "}
                    </div>
                ))}
            </div>
            <div id="scrollDots">
                {images.map((url, dotIdx) => {
                    return (
                        <div
                            className={dotIdx == 0 ? "selected" : "notSelected"}
                            id="dot"
                            ref={(dot[postIdx][dotIdx] = createRef())}
                            onClick={() => scrollToImage(postIdx, dotIdx)}
                            key={dotIdx}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
