import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../assets/theme.js';

export const styles = StyleSheet.create({
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    opacity: 0.7,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
