import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import Routes from './RouteName';  
import { RootStackParamList } from '../interface/login';

// screens
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import MarketScreen from '../screens/MarketScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    const { theme, toggleTheme } = useTheme();

    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator initialRouteName={Routes.LOGIN}
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen name={Routes.MARKET} component={MarketScreen} />
                <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
                <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
