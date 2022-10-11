import React, { useEffect } from "react";
import Home from "./Home";
import Access from "./Access";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home></Home>} />
                <Route path="/access" element={<Access></Access>} />
            </Routes>
        </BrowserRouter>
    );
}
