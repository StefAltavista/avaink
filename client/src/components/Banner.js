import React from "react";
import { Link } from "react-router-dom";

export default function Banner({ select, selection }) {
    const links = ["Designs", "Try out", "Book Appointment", "About"];

    return (
        <div id="banner">
            <div
                id="logo"
                onClick={() => {
                    select("About");
                }}
            >
                <img id="logoImg" src="/imgs/Logo.png" />
                <div>
                    <h1>AVA Ink</h1>
                    <p>Handpoke Tattoo Artists</p>
                </div>
            </div>

            <div id="navBar">
                {links.map((x) => {
                    return (
                        <div key={x}>
                            {x == selection ? (
                                <p
                                    onClick={() => {
                                        select("Dashboard");
                                    }}
                                >
                                    Home
                                </p>
                            ) : (
                                <p
                                    onClick={() => {
                                        select(x);
                                    }}
                                >
                                    {x}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
