import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
// import { ThemeProvider } from './src/theme/ThemeContext';
import AppNavigator from './src/routes/index';

const App: FC = () => {
  return (
    // <ThemeProvider>
    // <AppNavigator />
    // </ThemeProvider>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Home Screen</Text>
      <Text>Current Theme:</Text>
      <Button title="Toggle Theme" />
      <Button title="Go to Settings" />
    </View>
  );
};

export default App;
