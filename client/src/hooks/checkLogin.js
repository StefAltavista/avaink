import { useDispatch } from "react-redux";
import { log_In } from "../redux/setAdmin/slice";

export default function checkLogIn() {
    const dispatch = useDispatch();
    return new Promise((res, rej) => {
        fetch("/api/access")
            .then((res) => res.json())
            .then(({ token, access }) => {
                if (access) {
                    dispatch(log_In({ token, access }));
                    res({ token, access });
                } else {
                    res(null);
                }
            })
            .catch((e) => rej(e));
    });
}
