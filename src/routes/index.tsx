import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import Routes from './RouteName';  
// screens
import MarketScreen from '../screens/MarketScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function RootNavigation() {
    const { theme, toggleTheme } = useTheme();
    const [initialRoute, setInitialRoute] = React.useState(Routes.ONBOARDING);

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
                if (hasSeenOnboarding === 'true') {
                    setInitialRoute(Routes.MARKET);
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            }
        };
        checkOnboarding();
    }, []); 

    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen name={Routes.MARKET} component={MarketScreen} />
                <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
