import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import TryOut from "./TryOut";
import Book from "./Book";
import About from "./About";
import Designs from "./Designs";
import Footer from "./Footer";

import Banner from "./Banner";

export default function Home() {
    const [selection, setSection] = useState("Dashboard");

    const renderSwitch = () => {
        switch (selection) {
            case "Dashboard":
                return <Dashboard></Dashboard>;

            case "Designs":
                return <Designs></Designs>;

            case "Try out":
                return <TryOut></TryOut>;

            case "Book Appointment":
                return <Book></Book>;

            case "About":
                return <About></About>;
        }
    };

    return (
        <>
            <Banner
                select={(selected) => {
                    setSection(selected);
                }}
                selection={selection}
            ></Banner>
            <div id="homeBody">{renderSwitch()}</div>
            <Footer></Footer>
        </>
    );
}
