// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

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
              iconSource = images.tab.TabMarket;
              break;
            case 'Feed':
              iconSource = images.tab.TabFeed;
              break;
            case 'Send':
              iconSource = images.tab.TabSend;
              break;
            case 'Settings':
              iconSource = images.tab.TabSetting;
              break;
          }
          
          // Create a container with background for active tab
          return (
            <View style={[
              styles.iconContainer,
              focused ? styles.activeIconContainer : null
            ]}>
              <SmallIcon 
                source={iconSource} 
                style={focused ? { tintColor: '#000000' } : { tintColor: '#6B7280' }}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#000000',
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

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  activeIconContainer: {
    backgroundColor: '#F2F2F2',  // Light gray background for active tab
  }
});

export default MainTabNavigator;