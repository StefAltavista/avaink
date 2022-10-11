import React from "react";
import { Link } from "react-router-dom";

export default function Banner({ select }) {
    return (
        <div id="banner">
            <div
                id="logo"
                onClick={() => {
                    select("dashboard");
                }}
            >
                <img id="logoImg" src="/imgs/Logo.png" />
                <div>
                    <h1>AVA Ink</h1>
                    <p>Handpoke Tattoo Artists</p>
                </div>
            </div>

            <div id="navBar">
                <p
                    onClick={() => {
                        select("designs");
                    }}
                >
                    Designs
                </p>
                <p
                    onClick={() => {
                        select("tryOut");
                    }}
                >
                    Try out
                </p>
                <p
                    onClick={() => {
                        select("book");
                    }}
                >
                    Book Appointment
                </p>
                <p
                    onClick={() => {
                        select("about");
                    }}
                >
                    About Ava
                </p>
            </div>
        </div>
    );
}
