import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { loginBackgroundData } from '../constants/constatants';
import CornerText from '../components/login/ConerText';
import PrimaryButton from '../components/ui/Button/PrimaryButton';
import TextButton from '../components/ui/Button/TextButton';

const LoginScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Type for cornerOpacities shared value with explicit keys
  type CornerKeys = 'learn' | 'invest' | 'send' | 'trade';

  // Shared value object for opacity of all corners
  const cornerOpacities = useSharedValue<{ [key in CornerKeys]: number }>({
    learn: 1,
    invest: 0.3,
    send: 0.3,
    trade: 0.3,
  });

  // Single shared value for image opacity
  const imageOpacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % loginBackgroundData.length;
      const nextCase = loginBackgroundData[nextIndex];

      // Update corner opacity values dynamically
      Object.keys(cornerOpacities.value).forEach((key) => {
        const cornerKey = key as CornerKeys; // Type assertion here
        cornerOpacities.value[cornerKey] = nextCase.activeCorner === cornerKey ? 1 : 0.3;
      });

      // Update image opacity (top and bottom images)
      imageOpacity.value = withTiming(0.5, { duration: 800 }, () => {
        runOnJS(setCurrentIndex)(nextIndex);
        imageOpacity.value = withTiming(1, { duration: 800 });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Animated styles for corners
  const cornerStyles = (key: CornerKeys) =>
    useAnimatedStyle(() => ({
      opacity: cornerOpacities.value[key],
    }));

  // Animated styles for images
  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Top Half */}
      <View style={styles.topHalf}>
        <Animated.View style={[styles.backgroundImageContainer, imageStyle]}>
          <ImageBackground
            source={loginBackgroundData[currentIndex].topImage}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        </Animated.View>
        <View style={styles.contentContainer}>
          <View style={styles.todayContainer}>
            <CornerText text="Learn" top={-30} left={0} animatedStyle={cornerStyles('learn')} />
            <CornerText text="Invest" top={-30} right={0} animatedStyle={cornerStyles('invest')} />
            <Text style={styles.centerText}>Today</Text>
            <CornerText text="Trade" bottom={-40} right={0} animatedStyle={cornerStyles('trade')} />
            <CornerText text="Send" bottom={-40} left={0} animatedStyle={cornerStyles('send')} />
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}></View>

      {/* Bottom Half */}
      <View style={styles.bottomHalf}>
        <Animated.View style={[styles.backgroundImageContainer, imageStyle]}>
          <ImageBackground
            source={loginBackgroundData[currentIndex].bottomImage}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        </Animated.View>
        <View style={styles.bottomContentContainer}>
          <Text style={styles.bottomTitle}>Don’t wait for tomorrow, prosper today</Text>
          <PrimaryButton title="Create an account" onPress={() => {}} />
          <TextButton title="Sign in" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 70,
  },
  bottomContentContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayContainer: {
    width: 204,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    color: '#000000',
    fontSize: 72,
    fontWeight: '400',
    fontFamily: 'PlayfairDisplay-Medium',
    textAlign: 'center',
  },
  bottomTitle: {
    marginTop: '10%',
    color: '#000000',
    fontSize: 12,
    fontWeight: '200',
    fontFamily: 'PlayfairDisplay-Medium',
    textAlign: 'center',
  },
});

export default LoginScreen;
