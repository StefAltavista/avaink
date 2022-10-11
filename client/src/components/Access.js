import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { log_In, log_Out } from "../redux/setAdmin/slice";
import { Link } from "react-router-dom";

export default function Access() {
    const [pass, setPass] = useState("");
    const [entered, setEntered] = useState(false);
    const dispatch = useDispatch();
    const [token, setToken] = useState(
        useSelector((state) => state.admin.token)
    );

    useEffect(() => {
        console.log("access component, admin:", token);
        if (token) {
            setEntered(true);
        }
    }, []);

    const logIn = () => {
        fetch("./api/logIn", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ password: pass }),
        })
            .then((res) => res.json())
            .then(({ newToken, result }) => {
                if (newToken) {
                    dispatch(log_In({ token: newToken, access: true }));
                    setEntered(true);
                    setToken(newToken);
                } else {
                    console.log(result);
                }
            });
    };

    const logOut = () => {
        fetch("./api/logOut", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token }),
        })
            .then((res) => res.json())
            .then(({ success }) => {
                if (success) {
                    dispatch(log_Out());
                    setEntered(false);
                    setToken(null);
                } else {
                    console.log("error Logging out");
                }
            });
    };
    return (
        <div id="adminPage">
            {entered ? (
                <div>
                    <h3>You are already logged in</h3>
                    <button
                        onClick={() => {
                            logOut();
                        }}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Hello Mona!</h1>
                    <p>
                        Enter your Password to access Administrator
                        functionalities
                    </p>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    ></input>
                    <button onClick={() => logIn()}></button>
                </div>
            )}
            <Link to="/">Home</Link>
        </div>
    );
}
