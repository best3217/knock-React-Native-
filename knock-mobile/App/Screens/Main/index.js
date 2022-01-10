import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//BottomDoorStack Screen
import Discovery from './Discovery';
import SingleDoorPage from './SingleDoorPage';
import WhosThere from './WhosThere';

//Bottom Tab
import NearBy from './NearBy'

import Favorite from './Favorite'
import Profile from './Profile';
import { Fonts, Metrics, Images } from '../../Themes';

import {
  Image,
  StyleSheet,
} from 'react-native';
//Activity Stack Navigator
const styles = StyleSheet.create({
    tabItemBg: {
      alignItems: 'center',
      marginTop: Metrics.WIDTH * 0.035,
      marginBottom: Metrics.WIDTH * 0.035,
    },  
    tabIcon: {
      justifyContent: 'center',
      resizeMode: 'contain',
    },
  });
  
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ActivityStackNavigator() {
    return (
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="NearBy" component={NearBy} />        
      </Stack.Navigator>
    );
  }
  
  //BottomDoorStack
  function BottomDoorStack() {
    return (
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="Discovery" component={Discovery} />
          <Stack.Screen name="SingleDoorPage" component={SingleDoorPage} />
          <Stack.Screen name="WhosThere" component={WhosThere} />
        </Stack.Navigator>
    );
  }

  
export default function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Activity" component={ActivityStackNavigator}
          options={{
            tabBarLabel: 'Activity',
            tabBarIcon: ({ color }) => (
              <Image
                source={Images.discoveryActiveIcon}
                style={[
                  {
                    height: Metrics.WIDTH * 0.045,
                    width: Metrics.WIDTH * 0.045,
                    marginTop: -2,
                  },
                  styles.tabIcon,
                ]}
              />
            ),
          }}
  
        />
        <Tab.Screen name="Doors" component={BottomDoorStack}
          options={{
            tabBarLabel: 'Doors',
            tabBarIcon: ({ color }) => (
              <Image
                source={Images.discoveryActiveIcon}
                style={[
                  {
                    height: Metrics.WIDTH * 0.045,
                    width: Metrics.WIDTH * 0.045,
                    marginTop: -2,
                  },
                  styles.tabIcon,
                ]}
              />
            ),
          }}
        />
  
        <Tab.Screen name="PostCards" component={Favorite}
          options={{
            tabBarLabel: 'PostCards',
            tabBarIcon: ({ color }) => (
              <Image
                source={Images.favouriteActiveIcon}
                style={[
                  {
                    height: Metrics.WIDTH * 0.045,
                    width: Metrics.WIDTH * 0.045,
                    marginTop: -2,
                  },
                  styles.tabIcon,
                ]}
              />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Image
                source={Images.profileActiveIcon}
                style={[
                  {
                    height: Metrics.WIDTH * 0.045,
                    width: Metrics.WIDTH * 0.045,
                    marginTop: -2,
                  },
                  styles.tabIcon,
                ]}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }