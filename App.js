import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './src/HomeScreen/HomeScreen';
import FavoritesScreen from './src/FavoritesScreen/FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="home" size={size} color={color} />
              }
              return <Ionicons name="home-outline" size={size} color={color} />
            }
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="bookmark" size={size} color={color} />
              }
              return <Ionicons name="bookmark-outline" size={size} color={color} />
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
