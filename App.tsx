import React from 'react';
import { ThemeProvider } from './src/theme/ThemeContext';
import AppNavigator from './src/routes/index';

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
