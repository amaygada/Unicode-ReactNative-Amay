import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign'
import {Profile} from './Profile'
import {ContactClass} from './Contacts'
import {Weather} from './Weather'


const tab = createBottomTabNavigator()

export default function App(){
  return (
      <NavigationContainer>
        <tab.Navigator
          screenOptions ={ ({route}) => ({
            tabBarIcon : ({focused , color , size}) => {
              let iconName;
              if(route.name === 'Profile'){
                iconName = focused ? 'profile' : 'profile'
              }else if(route.name === 'Contacts'){
                iconName = focused ? 'contacts' : 'contacts'
              }else if(route.name === 'Weather'){
                iconName = focused ? 'cloudo': 'cloudo'
              }
              return <Icon name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions = {{
            activeTintColor : 'tomato',
            inactiveTintColor : 'grey',
            keyboardHidesTabBar : true
          }}
        
        >
          <tab.Screen name="Profile" component={Profile}/>
          <tab.Screen name="Contacts" component={ContactClass}/>
          <tab.Screen name="Weather" component={Weather}/>
        </tab.Navigator>
      </NavigationContainer>
  );
};

