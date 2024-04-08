import {AppRegistry} from 'react-native';

// If a user wants to go to the navigator having bottom navigator, then use:
// import App from './App';

// If a user wants to use the WebView screen, then use:
import App from './src/Navigator/Navigation/WebViewScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
