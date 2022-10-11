export function contentReducer(content = {}, action) {
    if (action.type == "SET_CONTENT") {
        content = { ...content, ...action.payload };
    }
    return content;
}

export function set_content(content) {
    return {
        type: "SET_CONTENT",
        payload: { ...content },
    };
}
