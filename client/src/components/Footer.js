import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div id="footer">
            <p>Website Created by Stef Altavista </p>
            <Link to="./access">
                <p>♠</p>
            </Link>
        </div>
    );
}
