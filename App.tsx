import React, { FC } from 'react';
import { ThemeProvider } from './src/theme/ThemeContext';
import AppNavigator from './src/routes/index';
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { PrivyProvider } from '@privy-io/expo';

const App: FC = () => {
  return (
    <ThemeProvider>
      <PrivyProvider appId="cm76p206400ey5b2sgwsn2acf" clientId="client-WY5gxmNC7Y288p2SAnCrTgb5kKnfAhB63h4RgUyZNaNM3">
        <AppNavigator />
      </PrivyProvider>
    </ThemeProvider>
  );
};

export default App;
