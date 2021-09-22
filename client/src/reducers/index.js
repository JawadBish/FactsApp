import { combineReducers } from "redux";
import facts from './facts';
import auth from './auth'

export default combineReducers({ facts, auth })