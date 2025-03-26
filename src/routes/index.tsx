import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import Routes from './RouteName';
import MarketScreen from '../screens/MarketScreen';

// screens


const Stack = createStackNavigator();

export default function RootNavigation() {
    const { theme, toggleTheme } = useTheme();


    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator
            >
                <Stack.Screen name={Routes.MARKET} component={MarketScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
