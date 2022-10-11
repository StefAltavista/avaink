import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set_content } from "../redux/content/slice";

import checkLogIn from "../hooks/checkLogin";

import Home from "./Home";
import Access from "./Access";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    const dispatch = useDispatch();

    checkLogIn();

    useEffect(() => {
        fetch("/api/getData")
            .then((res) => res.json())
            .then((data) => {
                dispatch(set_content(data));
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home></Home>} />
                <Route path="/access" element={<Access></Access>} />
            </Routes>
        </BrowserRouter>
    );
}
