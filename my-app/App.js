/*
  App.js
  Stack Navigator met WishlistProvider wrapper
*/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetail from './screens/ProductDetail';
import BlogsScreen from './screens/BlogsScreen';
import BlogDetail from './screens/BlogDetail';
import WishlistScreen from './screens/Wishlist';
import CartScreen from './screens/Cart';
import { WishlistProvider } from './components/WishlistContext';
import { CartProvider } from "./components/CartContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTintColor: '#000',
              headerBackTitle: 'Back',
              headerBackTitleVisible: true,
              headerBackTitleStyle: {
                fontSize: 14,
                fontWeight: 'normal',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Home', headerLeft: () => null, }}
            />

            <Stack.Screen
              name="Products"
              component={ProductsScreen}
              options={{ title: 'Products', headerLeft: () => null, }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name="Blogs"
              component={BlogsScreen}
              options={{
                title: 'Blogs',
                headerLeft: () => null, 
              }}
            />

            <Stack.Screen
              name="BlogDetail"
              component={BlogDetail}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={{
                title: 'Wishlist',
                headerLeft: () => null, //verbergt terugknop
              }}
            />

            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                title: 'Winkelmand',
                headerLeft: () => null, // verberg 'Back'-knop
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider >
  );
}
