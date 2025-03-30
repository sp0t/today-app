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
import { IconHome } from '@tabler/icons-react-native';
import { IconList } from '@tabler/icons-react-native';
import { IconSend } from '@tabler/icons-react-native';
import { IconWallet  } from '@tabler/icons-react-native';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator for main screens only
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          
          switch (route.name) {
            case 'Market':
              iconSource = <IconHome />;
              break;
            case 'Feed':
              iconSource = <IconList />;
              break;
            case 'Send':
              iconSource = <IconSend />;
              break;
            case 'Settings':
              iconSource = <IconWallet />;
              break;
          }
          
          // Create a container with background for active tab
          return (
            <View style={[
              styles.iconContainer,
              focused ? styles.activeIconContainer : null
            ]}>
            {iconSource}
            </View>
          );
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: 96,
          paddingBottom: 36,
          paddingTop: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          paddingHorizontal: 20,
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
    padding: 10,
    borderRadius: 100,
  },
  activeIconContainer: {
    backgroundColor: '#F4F4F5',  // Light gray background for active tab
  }
});

export default MainTabNavigator;