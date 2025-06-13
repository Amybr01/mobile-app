/*
  App.js
  Enkele Stack Navigator voor alle schermen:
*/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetail from './screens/ProductDetail';
import BlogsScreen from './screens/BlogsScreen';
import BlogDetail from './screens/BlogDetail';
import WishlistScreen from './screens/Wishlist';
import CartScreen from './screens/Cart';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: '#000',
          headerBackTitleVisible: false,
        }}
      >
        {/* Home: nav links naar andere pagina's */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />

        {/* Producten overzichten en -detail */}
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ title: 'Producten' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={({ route }) => ({ title: route.params.title })}
        />

        {/* Blogs overzicht en detail */}
        <Stack.Screen
          name="Blogs"
          component={BlogsScreen}
          options={{ title: 'Blogs' }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={({ route }) => ({ title: route.params.title })}
        />

        {/* Wishlist en Winkelmand */}
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{ title: 'Wishlist' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Winkelmand' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
