import {combineReducers} from 'redux';
import homeReducer from '../redux/reducers/homeReducers';
import webViewReducer from '../redux/reducers/webViewReducers';

const rootReducer = combineReducers({
  home: homeReducer,
  webView: webViewReducer,
});

export default rootReducer;
