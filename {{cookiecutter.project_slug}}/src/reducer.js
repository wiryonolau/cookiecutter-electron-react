export const GenericReducer = function (state, action) {
    switch (action.method) {
        case "init":
            state = action.value;
            break;
        case "update":
            state[action.key] = action.value;
            break;
        default:
    }
    return { ...state };
};
