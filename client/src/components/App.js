import React from "react";
import Home from "./Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home></Home>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
