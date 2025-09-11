import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { shadows } from '../../constants/shadows';

interface FABButtonProps {
  onPress: () => void;
}

const FABButton: React.FC<FABButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.primaryBlue, '#1E44FF']}
        style={[styles.button, shadows.fab]}
      >
        <Text style={styles.plusIcon}>+</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.bottomNavHeight - spacing.fabSize / 2,
    alignSelf: 'center',
    zIndex: 10,
  } as ViewStyle,

  button: {
    width: spacing.fabSize,
    height: spacing.fabSize,
    borderRadius: spacing.fabSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  plusIcon: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 32,
  } as TextStyle,
});

export default FABButton;