import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { TabNavigator } from './navigation';
import { colors } from './constants';
import { testConnection } from './services';

const App = (): JSX.Element => {
  useEffect(() => {
    // Test Supabase connection on app start
    testConnection().then(isConnected => {
      if (isConnected) {
        console.log('✅ App connected to Supabase successfully');
      } else {
        console.warn('⚠️ Supabase connection failed - check your .env configuration');
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.background} 
        translucent={false}
      />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;