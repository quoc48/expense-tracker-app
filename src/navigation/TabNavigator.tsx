import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

// Styles must be defined before the component
const styles = StyleSheet.create({
  // WRAPPER: Contains entire bottom navigation area
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: spacing.bottomNavHeight, // 90px total height
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: 'rgba(29, 58, 88, 0.12)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },

  // NAVIGATION CONTAINER: Houses the tab buttons
  tabBarContainer: {
    height: 56, // Navigation area height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    position: 'relative', // Important for FAB positioning
  },

  // TAB BUTTONS: Left and right tabs
  tabButton: {
    width: 120, // Adjust width to leave space for FAB
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },

  tabLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },

  // CENTER SPACE: Empty area for FAB
  centerSpace: {
    width: 80, // Space for FAB button
    height: 56,
  },

  // FAB BUTTON: CRITICAL - Positioned relative to tabBarContainer
  fabButton: {
    position: 'absolute',
    top: -8, // 8px above the navigation container
    left: '50%', // Center horizontally
    marginLeft: -spacing.fabSize / 2, // Half of button width (64/2)
    width: spacing.fabSize, // 64
    height: spacing.fabSize, // 64
    borderRadius: spacing.fabSize / 2, // 32
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(18, 98, 251, 0.32)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12, // Higher elevation than nav bar
    zIndex: 100, // Ensure it's on top
  },

  fabIcon: {
    fontSize: 28,
    color: colors.white,
    fontWeight: 'bold',
    lineHeight: 28,
  },

  // HOME INDICATOR: iOS style indicator
  homeIndicator: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  indicatorLine: {
    width: 135,
    height: 5,
    backgroundColor: '#242D35',
    borderRadius: 100,
  },
});

// Custom Tab Bar Component with integrated FAB
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const handleFABPress = () => {
    console.log('FAB pressed - Add new expense');
    // TODO: Navigate to Add Expense screen
  };

  return (
    <View style={styles.tabBarWrapper}>
      {/* Main Navigation Container */}
      <View style={styles.tabBarContainer}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Icon
            name="home-outline"
            size={20}
            color={state.index === 0 ? colors.accentGreen : colors.grayMedium}
          />
          <Text style={[
            styles.tabLabel,
            { color: state.index === 0 ? colors.accentGreen : colors.grayMedium }
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Center Space for FAB */}
        <View style={styles.centerSpace} />

        {/* Settings Tab */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Analytics')}
          activeOpacity={0.7}
        >
          <Icon
            name="settings-outline"
            size={20}
            color={state.index === 1 ? colors.accentGreen : colors.grayMedium}
          />
          <Text style={[
            styles.tabLabel,
            { color: state.index === 1 ? colors.accentGreen : colors.grayMedium }
          ]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* FAB Button - Positioned relative to tab bar */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={handleFABPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Add new expense"
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.indicatorLine} />
      </View>
    </View>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
};