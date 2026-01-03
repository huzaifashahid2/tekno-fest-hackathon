import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  backgroundColor,
  textColor,
}) => {
  // If backgroundColor is provided, use solid color instead of gradient
  if (backgroundColor) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          styles.button,
          style,
          {
            backgroundColor: disabled ? '#ccc' : backgroundColor,
            padding: 20,
            borderColor: colors.black,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor || colors.black }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Default gradient behavior
  return (
    <LinearGradient
      colors={disabled ? ['#ccc', '#ccc'] : ['#FFD601', '#E19502']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.button, style, { padding: 0, width: '100%' }]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={{
          padding: 20,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    // fontFamily: FONTS.display_medium,
    fontWeight: '600',
  },
});

export default CustomButton;
