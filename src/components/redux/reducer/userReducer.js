
const userReducer = (state = null, action) => {
    if (action.type === 'ON_SIGN_IN') {
        return action.user;
    }
    return state;
};
export default userReducer;
