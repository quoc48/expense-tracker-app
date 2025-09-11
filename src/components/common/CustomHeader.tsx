import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface CustomHeaderProps {
  currentMonth: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chevronButton} onPress={onPreviousMonth}>
        <Text style={styles.chevronText}>‹</Text>
      </TouchableOpacity>
      
      <Text style={styles.monthText}>{currentMonth}</Text>
      
      <TouchableOpacity style={styles.chevronButton} onPress={onNextMonth}>
        <Text style={styles.chevronText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    height: 52,
  } as ViewStyle,

  chevronButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  } as ViewStyle,

  chevronText: {
    ...typography.heading16,
    color: colors.textSecondary,
    fontSize: 18,
  } as TextStyle,

  monthText: {
    ...typography.heading16,
    color: colors.textPrimary,
  } as TextStyle,
});

export default CustomHeader;