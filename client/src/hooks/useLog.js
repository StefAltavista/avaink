import { useDispatch } from "react-redux";
import { log_In } from "../redux/setAdmin/slice";
import { log_Out } from "../redux/setAdmin/slice";

// NOT USED :/

export default function useLog(body, type) {
    const dispatch = useDispatch();
    return new Promise(() => {
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
                        // setPass("");
                    } else {
                        // setErr("Oops! An error occured");
                    }
                } else if (type == "Out") {
                    dispatch(log_Out());
                    // setPass("");
                }
            });
    });
}
