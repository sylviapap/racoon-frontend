import userReducer from './userReducer';
import mapReducer from './mapReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({user: userReducer, map: mapReducer, loading: loadingReducer, error: errorReducer})

export default rootReducer;