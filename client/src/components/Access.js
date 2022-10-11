import React, { useState, useEffect } from "react";
import checkLogIn from "../hooks/checkLogin";

import { useDispatch, useSelector } from "react-redux";
import { log_In, log_Out } from "../redux/setAdmin/slice";
import { Link } from "react-router-dom";

export default function Access() {
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();
    const [err, setErr] = useState(null);

    const access = useSelector((state) => state.admin.access);
    const token = useSelector((state) => state.admin.token);

    checkLogIn();

    const log = (body, type) => {
        fetch(`./api/log${type}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((response) => {
                let { token, access } = response;
                if (type == "In") {
                    if (token) {
                        dispatch(log_In({ token, access }));
                        setPass("");
                    } else {
                        setErr("Oops! An error occured");
                    }
                } else if (type == "Out") {
                    dispatch(log_Out());
                    setPass("");
                }
            });
    };

    return (
        <div id="accessPage">
            {access ? (
                <div>
                    <h3>You are already logged in</h3>
                    <button
                        onClick={() => {
                            log({ token }, "Out");
                        }}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Hello Mona!</h1>
                    <p>Enter your Password to access administration</p>
                    <form>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        ></input>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                log({ password: pass }, "In");
                            }}
                        >
                            Enter
                        </button>
                    </form>
                    {err ? <p id="errorP">{err}</p> : null}
                </div>
            )}
            <Link to="/">Home</Link>
        </div>
    );
}
