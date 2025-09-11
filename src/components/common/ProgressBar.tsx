import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';

interface ProgressBarProps {
  progress: number; // 0-1 (0% to 100%)
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = colors.grayLight,
  progressColor = colors.accentGreen,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: progressColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
  } as ViewStyle,

  progressFill: {
    height: '100%',
    borderRadius: 4,
  } as ViewStyle,
});

export default ProgressBar;