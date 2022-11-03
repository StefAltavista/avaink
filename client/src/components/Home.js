import React, { useState } from "react";
import { ChartProvider } from "./ChartContext";

import Banner from "./Banner";
import Dashboard from "./Dashboard";
import TryOut from "./TryOut";
import Book from "./Book";
import Shop from "./Shop";
import About from "./About";
import Designs from "./Designs";
import Footer from "./Footer";

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
            case "Shop":
                return <Shop />;
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
            <ChartProvider>
                <div id="homeBody">{renderSwitch()}</div>{" "}
            </ChartProvider>

            <Footer></Footer>
        </>
    );
}
