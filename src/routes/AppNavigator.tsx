// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import MarketScreen from '../screens/MarketScreen';
import FeedScreen from '../screens/FeedScreen';
import SendScreen from '../screens/SendScreen';
import SettingScreen from '../screens/SettingScreen';

// Import your icon component
import SmallIcon from '../components/ui/Icon/smallIcon';
import images from '../styles/images';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator for main screens only
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          
          switch (route.name) {
            case 'Market':
              iconSource = focused ? images.tab.TabMarket : images.tab.TabMarket;
              break;
            case 'Feed':
              iconSource = focused ? images.tab.TabFeed : images.tab.TabFeed;
              break;
            case 'Send':
              iconSource = focused ? images.tab.TabSend : images.tab.TabSend;
              break;
            case 'Settings':
              iconSource = focused ? images.tab.TabSetting : images.tab.TabSetting;
              break;
          }
          
          return <SmallIcon source={iconSource} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Send" component={SendScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;