// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen.js';
import ProductDetail from './screens/ProductDetail.js';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTintColor: '#000',
                    headerBackTitleVisible: false,
                    headerBackTitle: '', 
                }} //Zorgt voor zwarte pijl en geen 'home' tekst door ios 
            >

                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={ProductDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
