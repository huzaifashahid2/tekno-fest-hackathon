import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import locationIcon from '../../assets/icons/rideicons/locationIcon.png';

const WaitingLoader = ({ title, subtitle }) => {
  const outerPulse = useSharedValue(1);
  const middlePulse = useSharedValue(1);
  const innerPulse = useSharedValue(1);
  const iconBounce = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Staggered pulse animations for each layer
    outerPulse.value = withRepeat(
      withSequence(
        withTiming(1.15, {
          duration: 1800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        withTiming(1, {
          duration: 1800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      ),
      -1,
      false,
    );

    middlePulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(1.12, {
          duration: 1800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        withTiming(1, {
          duration: 1800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      ),
      -1,
      false,
    );

    innerPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(1.1, {
          duration: 1800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        withTiming(1, {
          duration: 1800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      ),
      -1,
      false,
    );

    // Subtle icon bounce
    iconBounce.value = withRepeat(
      withSequence(
        withTiming(1.05, {
          duration: 1000,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }),
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }),
      ),
      -1,
      false,
    );

    // Continuous slow rotation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const outerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: outerPulse.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: interpolate(outerPulse.value, [1, 1.15], [0.3, 0.2]),
  }));

  const middleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: middlePulse.value },
      { rotate: `${-rotation.value * 0.5}deg` },
    ],
    opacity: interpolate(middlePulse.value, [1, 1.12], [0.5, 0.35]),
  }));

  const innerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: innerPulse.value }],
    opacity: interpolate(innerPulse.value, [1, 1.1], [0.7, 0.5]),
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconBounce.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        {/* Outer layer - Lightest */}
        <Animated.View
          style={[styles.circle, styles.outerCircle, outerAnimatedStyle]}
        />

        {/* Middle layer */}
        <Animated.View
          style={[styles.circle, styles.middleCircle, middleAnimatedStyle]}
        />

        {/* Inner layer - Darkest */}
        <Animated.View
          style={[styles.circle, styles.innerCircle, innerAnimatedStyle]}
        />

        {/* Center icon */}
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <View style={styles.iconBackground}>
            <Image source={locationIcon} style={styles.icon} />
          </View>
        </Animated.View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    width: 200,
    height: 200,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: colors.lightYellow,
  },
  outerCircle: {
    width: 200,
    height: 200,
    backgroundColor: '#FFF8E1', // Very light yellow
  },
  middleCircle: {
    width: 140,
    height: 140,
    backgroundColor: '#FFE082', // Medium yellow
  },
  innerCircle: {
    width: 90,
    height: 90,
    backgroundColor: '#FFD54F', // Darker yellow/gold
  },
  iconContainer: {
    zIndex: 10,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    // Professional shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: colors.white,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.display_medium,
    color: colors.black,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: FONTS.display_regular,
    color: colors.description,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
    opacity: 0.8,
  },
});

export default WaitingLoader;
