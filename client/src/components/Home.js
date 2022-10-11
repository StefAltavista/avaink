import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import checkLogIn from "../hooks/checkLogin";
import Dashboard from "./Dashboard";
import TryOut from "./TryOut";
import Book from "./Book";
import About from "./About";
import Designs from "./Designs";
import Footer from "./Footer";

import Banner from "./Banner";

export default function Home() {
    const [selection, setSection] = useState("dashboard");
    const access = useSelector((state) => state.admin.access);

    checkLogIn();

    const renderSwitch = () => {
        switch (selection) {
            case "dashboard":
                return <Dashboard access={access}></Dashboard>;

            case "designs":
                return <Designs access={access}></Designs>;

            case "tryOut":
                return <TryOut access={access}></TryOut>;

            case "book":
                return <Book access={access}></Book>;

            case "about":
                return <About access={access}></About>;
        }
    };

    return (
        <>
            <Banner
                select={(selected) => {
                    setSection(selected);
                }}
                access={access}
            ></Banner>
            <div id="homeBody">{renderSwitch()}</div>
            <Footer></Footer>
        </>
    );
}
