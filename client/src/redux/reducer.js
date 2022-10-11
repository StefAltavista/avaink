import { combineReducers } from "redux";
import { setAdminReducer } from "./setAdmin/slice";
import { contentReducer } from "./content/slice";

const rootReducer = combineReducers({
    admin: setAdminReducer,
    content: contentReducer,
});

export default rootReducer;
