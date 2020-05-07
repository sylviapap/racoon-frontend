import userReducer from './userReducer';
import mapReducer from './mapReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import medicalReducer from './medicalReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({user: userReducer, map: mapReducer, loading: loadingReducer, error: errorReducer, medical: medicalReducer})

export default rootReducer;