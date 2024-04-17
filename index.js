import {AppRegistry} from 'react-native';

// If a user wants to go to the navigator having bottom navigator, then use:
// import App from './App';

// If a user wants to use the WebView screen, then use:
import App from './src/Navigator/Navigation/WebViewScreen';
import {name as appName} from './app.json';
import { withIAPContext } from 'react-native-iap';
import {setup} from 'react-native-iap';
import {Provider} from 'react-redux';
import store from './redux/store';

setup({storekitMode: 'STOREKIT2_MODE'});
  const myApp = () => {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  };



AppRegistry.registerComponent(appName, () => withIAPContext(myApp));