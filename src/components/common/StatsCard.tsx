import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import { shadows } from '../../constants/shadows';
import ProgressBar from './ProgressBar';

interface StatsCardProps {
  type: 'monthly' | 'daily';
  title: string;
  amount: number;
  progress?: number;
  onPress?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  type,
  title,
  amount,
  progress,
  onPress,
}) => {
  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const WalletIcon = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>💳</Text>
    </View>
  );

  const ChevronButton = () => (
    <TouchableOpacity style={styles.chevronButton} onPress={onPress}>
      <Text style={[
        styles.chevronText,
        { color: type === 'monthly' ? colors.white : colors.textSecondary }
      ]}>
        ›
      </Text>
    </TouchableOpacity>
  );

  if (type === 'monthly') {
    return (
      <LinearGradient
        colors={['#1A2B3D', '#2D3748']}
        style={[styles.card, styles.monthlyCard]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <WalletIcon />
            <Text style={[styles.title, styles.monthlyTitle]}>{title}</Text>
          </View>
          <ChevronButton />
        </View>
        
        <Text style={[styles.amount, styles.monthlyAmount]}>
          {formatAmount(amount)}
        </Text>
        
        {progress !== undefined && (
          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} />
          </View>
        )}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.card, styles.dailyCard, shadows.card]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <WalletIcon />
          <Text style={[styles.title, styles.dailyTitle]}>{title}</Text>
        </View>
        <ChevronButton />
      </View>
      
      <Text style={[styles.amount, styles.dailyAmount]}>
        {formatAmount(amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radiusLarge,
    padding: spacing.cardLarge,
    marginHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.md,
  } as ViewStyle,

  monthlyCard: {
    height: 148,
  } as ViewStyle,

  dailyCard: {
    height: 122,
    backgroundColor: colors.white,
  } as ViewStyle,

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  } as ViewStyle,

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  } as ViewStyle,

  iconText: {
    fontSize: 20,
  } as TextStyle,

  title: {
    ...typography.body14,
  } as TextStyle,

  monthlyTitle: {
    color: colors.white,
  } as TextStyle,

  dailyTitle: {
    color: colors.textSecondary,
  } as TextStyle,

  chevronButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  chevronText: {
    ...typography.heading16,
    fontSize: 18,
  } as TextStyle,

  amount: {
    ...typography.money24,
    marginBottom: spacing.sm,
  } as TextStyle,

  monthlyAmount: {
    color: colors.white,
  } as TextStyle,

  dailyAmount: {
    color: colors.textPrimary,
  } as TextStyle,

  progressContainer: {
    marginTop: 'auto',
  } as ViewStyle,
});

export default StatsCard;