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
    const [selection, setSection] = useState("dashboard");
    const [Elm, setElm] = useState(Dashboard);
    const access = useSelector((state) => state.admin.access);
    console.log("access:", access);

    useEffect(() => {
        switch (selection) {
            case "dashboard":
                setElm(Dashboard);
                break;
            case "designs":
                setElm(Designs);
                break;
            case "tryOut":
                setElm(TryOut);
                break;
            case "book":
                setElm(Book);
                break;
            case "about":
                setElm(About);
                break;
        }
    }, [, selection]);

    return (
        <>
            <Banner
                select={(selected) => {
                    setSection(selected);
                }}
            ></Banner>
            {Elm}
            <Footer></Footer>
        </>
    );
}
