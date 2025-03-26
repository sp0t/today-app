import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
// import { ThemeProvider } from './src/theme/ThemeContext';
import AppNavigator from './src/routes/index';

const App: FC = () => {
  return (
    // <ThemeProvider>
    <AppNavigator />
    // </ThemeProvider>
  );
};

export default App;
