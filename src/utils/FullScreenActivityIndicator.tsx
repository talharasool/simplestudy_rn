import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

interface FullScreenActivityIndicatorProps {
  color?: string;
  backgroundColor?: string;
  opacity?: number;
}

const FullScreenActivityIndicator: React.FC<FullScreenActivityIndicatorProps> = ({
  color,
  backgroundColor,
  opacity,
}) => (
  <View style={[styles.container, { backgroundColor: backgroundColor || 'rgba(0, 0, 0.5, 0.1)' }]}>
    <BallIndicator size={50}  color={color || '#3333ff'}  />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenActivityIndicator;
