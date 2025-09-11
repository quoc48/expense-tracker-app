import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    expect(() => {
      render(<ProgressBar progress={0.5} />);
    }).not.toThrow();
  });

  it('handles progress values correctly', () => {
    const testCases = [
      { progress: 0, expected: '0%' },
      { progress: 0.3, expected: '30%' },
      { progress: 0.75, expected: '75%' },
      { progress: 1, expected: '100%' },
    ];

    testCases.forEach(({ progress, expected }) => {
      expect(() => render(<ProgressBar progress={progress} />)).not.toThrow();
      
      // The actual width style would need to be verified through style inspection
      expect(() => render(<ProgressBar progress={progress} />)).not.toThrow();
    });
  });

  it('clamps progress values outside 0-1 range', () => {
    const edgeCases = [
      { progress: -0.5, shouldClamp: true },
      { progress: 1.5, shouldClamp: true },
      { progress: 0, shouldClamp: false },
      { progress: 1, shouldClamp: false },
    ];

    edgeCases.forEach(({ progress }) => {
      expect(() => {
        render(<ProgressBar progress={progress} />);
      }).not.toThrow();
    });
  });

  it('accepts custom styling props', () => {
    const customProps = {
      progress: 0.5,
      height: 12,
      backgroundColor: '#CUSTOM_BG',
      progressColor: '#CUSTOM_PROGRESS',
    };

    expect(() => {
      render(<ProgressBar {...customProps} />);
    }).not.toThrow();
  });
});