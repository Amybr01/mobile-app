
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
import { Image } from 'react-native';
import { Text, TextInput } from 'react-native';
import { useFonts } from "expo-font";


const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Rye: require("./assets/fonts/Rye-Regular.ttf"),
    Playfair: require("./assets/fonts/PlayfairDisplay-SemiBold.ttf")
  });
  if (!loaded) return null;

  

  if (!Text.defaultProps) Text.defaultProps = {};
  Text.defaultProps.style = { fontFamily: 'Playfair', ...Text.defaultProps.style };

  if (!TextInput.defaultProps) TextInput.defaultProps = {};
  TextInput.defaultProps.style = { fontFamily: 'Playfair', ...TextInput.defaultProps.style };
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
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="Products"
              component={ProductsScreen}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/smalllogo.png')}
                    style={{ width: 100, height: 30, resizeMode: 'contain' }}
                  />
                ),
                headerLeft: () => null,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/smalllogo.png')}
                    style={{ width: 100, height: 30, resizeMode: 'contain' }}
                  />
                ),

              }}
            />

            <Stack.Screen
              name="Blogs"
              component={BlogsScreen}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/smalllogo.png')}
                    style={{ width: 100, height: 30, resizeMode: 'contain' }}
                  />
                ),
                headerLeft: () => null,
              }}
            />

            <Stack.Screen
              name="BlogDetail"
              component={BlogDetail}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/smalllogo.png')}
                    style={{ width: 100, height: 30, resizeMode: 'contain' }}
                  />
                ),

              }}
            />

            <Stack.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/smalllogo.png')}
                    style={{ width: 100, height: 30, resizeMode: 'contain' }}
                  />
                ),
                headerLeft: () => null,
              }}
            />

            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/smalllogo.png')}
                    style={{ width: 100, height: 30, resizeMode: 'contain' }}
                  />
                ),
                headerLeft: () => null,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider >
  );
}
