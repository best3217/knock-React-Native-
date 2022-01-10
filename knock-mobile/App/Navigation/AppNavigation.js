import * as React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/Home';
import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';
import MainTabs from '../Screens/Main';
import Splash from '../Screens/Splash';

import { Fonts, Metrics, Images } from '../Themes';
import { navigationRef } from '../helper/navigationService';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}  >
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Splash" component={Splash} />        
        <Stack.Screen name="Home" component={Home} />        
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={MainTabs} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
