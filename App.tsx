import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
// import { ThemeProvider } from './src/theme/ThemeContext';
import AppNavigator from './src/routes/index';
import HomeScreen from './src/screens/HomeScreen';

const App: FC = () => {
  return (
    // <ThemeProvider>
    <HomeScreen />
    // </ThemeProvider>
  );
};

export default App;
