export function setAdminReducer(admin = {}, action) {
    if (action.type == "LOG_IN") {
        admin = { ...action.payload.admin, ...admin };
    }
    if (action.type == "LOG_OUT") {
        admin = {};
    }
    console.log("redux = admin:", admin);
    return admin;
}

export function log_In(admin) {
    return {
        type: "LOG_IN",
        payload: { admin },
    };
}
export function log_Out() {
    return {
        type: "LOG_OUT",
        payload: {},
    };
}
