import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { colors, spacing } from '../constants';

// Import screens
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const HistoryScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
    <Text style={{ fontSize: 24, color: colors.textPrimary }}>History Screen</Text>
    <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 8 }}>Coming in Phase 2</Text>
  </View>
);

const AnalyticsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
    <Text style={{ fontSize: 24, color: colors.textPrimary }}>Analytics Screen</Text>
    <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 8 }}>Coming in Phase 2</Text>
  </View>
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: spacing.bottomNavHeight,
          backgroundColor: colors.white,
          borderTopColor: colors.grayLight,
          borderTopWidth: 1,
          paddingBottom: 34, // iPhone home indicator space
        },
        tabBarActiveTintColor: colors.accentGreen,
        tabBarInactiveTintColor: colors.grayMedium,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter-Medium',
        },
      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
        }}
      />
    </Tab.Navigator>
  );
};