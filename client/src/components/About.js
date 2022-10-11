import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function About() {
    const access = useSelector((state) => state.admin.access);
    const token = useSelector((state) => state.admin.token);

    const { about } = useSelector((state) => state.content);

    return (
        <div>
            {access ? (
                <div id="editDashboard">
                    <button
                        onClick={() => console.log("open add design modal")}
                    >
                        edit
                    </button>
                </div>
            ) : null}
            {about ? (
                <div id="bio">
                    <>
                        <img src={about.profilePic} id="profileImg" />
                        <p> {about.bio}</p>
                    </>
                    <div id="photos">
                        {about.photos.map((x, idx) => (
                            <div id="photo" key={idx}>
                                <img src={x} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
