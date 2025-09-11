import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <Text style={styles.subtitle}>Ready to implement Home Screen!</Text>
      <Text style={styles.instructions}>
        This is where we'll implement the Home screen based on the Figma design with:
      </Text>
      <Text style={styles.feature}>• Monthly & Daily Stats Cards</Text>
      <Text style={styles.feature}>• Top 3 Categories</Text>
      <Text style={styles.feature}>• FAB Button</Text>
      <Text style={styles.feature}>• Month Navigation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.xl,
    justifyContent: 'center',
  },
  title: {
    ...typography.money32,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.heading20,
    color: colors.accentGreen,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  instructions: {
    ...typography.body14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  feature: {
    ...typography.medium14,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});

export default HomeScreen;