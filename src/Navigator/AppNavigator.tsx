// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import HomeScreen from './Navigation/HomeScreen';
// import WebViewScreen from './Navigation/WebViewScreen';
// import {Image} from 'react-native'; // Import Image component from react-native

// // Import your custom icons as image files
// import HomeIcon from '../../Icons/home.png';
// import WebIcon from '../../Icons/community.png';

// const Tab = createBottomTabNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let icon;

//             // Set icon based on route name
//             if (route.name === 'Home') {
//               icon = (
//                 <Image
//                   source={HomeIcon}
//                   style={{tintColor: color, width: size, height: size}}
//                 />
//               );
//             } else if (route.name === 'WebView') {
//               icon = (
//                 <Image
//                   source={WebIcon}
//                   style={{tintColor: color, width: size, height: size}}
//                 />
//               );
//             }

//             return icon;
//           },
//           tabBarActiveTintColor: 'blue',
//           tabBarInactiveTintColor: 'gray',
//         })}>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="WebView" component={WebViewScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

// AppNavigator.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import HomeScreen from './Navigation/HomeScreen';
import WebViewScreen from './Navigation/WebViewScreen';
import {Image} from 'react-native';

import HomeIcon from '../../Icons/home.png';
import WebIcon from '../../Icons/community.png';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let icon;

              if (route.name === 'Home') {
                icon = (
                  <Image
                    source={HomeIcon}
                    style={{tintColor: color, width: size, height: size}}
                  />
                );
              } else if (route.name === 'WebView') {
                icon = (
                  <Image
                    source={WebIcon}
                    style={{tintColor: color, width: size, height: size}}
                  />
                );
              }

              return icon;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="WebView" component={WebViewScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
