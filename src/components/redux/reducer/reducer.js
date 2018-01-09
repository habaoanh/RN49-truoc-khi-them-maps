import { combineReducers } from 'redux';

import addCartReducer from './addCartReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    cartArray: addCartReducer,
    user: userReducer,
    
});

export default reducer;
