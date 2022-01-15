import {combineReducers} from 'redux';
import {currentLanguage, serverAddress} from "../app/AppReducer";

export default combineReducers({
    currentLanguage,
    serverAddress
});