import { useDispatch } from "react-redux";
import { set_content } from "../redux/content/slice";

export default function getData() {
    const dispatch = useDispatch();
    fetch("/api/getData")
        .then((res) => res.json())
        .then((data) => {
            dispatch(set_content(data));
        });
}
