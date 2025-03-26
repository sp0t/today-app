import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './RouteName';

import MarketScreen from '../screens/MarketScreen';

export type RootStackParamList = {
    Home: undefined;
    Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.HOME}>
                <Stack.Screen name={Routes.HOME} component={MarketScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;