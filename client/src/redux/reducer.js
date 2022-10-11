import { combineReducers } from "redux";
import { setAdminReducer } from "./setAdmin/slice";

const rootReducer = combineReducers({
    admin: setAdminReducer,
});

export default rootReducer;
