import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

interface BackgroundItem {
  topImage: ImageSourcePropType;
  bottomImage: ImageSourcePropType;
  activeCorner: 'learn' | 'invest' | 'send' | 'trade';
}

const BackgroundData: BackgroundItem[] = [
  {
    topImage: require('../assets/images/Login_Learn_Top.png'),
    bottomImage: require('../assets/images/Login_Learn_Bottom.png'),
    activeCorner: 'learn',
  },
  {
    topImage: require('../assets/images/Login_Invest_Top.png'),
    bottomImage: require('../assets/images/Login_Invest_Bottom.png'),
    activeCorner: 'invest',
  },
  {
    topImage: require('../assets/images/Login_Send_Top.png'),
    bottomImage: require('../assets/images/Login_Send_Bottom.png'),
    activeCorner: 'send',
  },
  {
    topImage: require('../assets/images/Login_Trade_Top.png'),
    bottomImage: require('../assets/images/Login_Trade_Bottom.png'),
    activeCorner: 'trade',
  },
];

const LoginScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Shared values for opacity
  const learnOpacity = useSharedValue(1);
  const investOpacity = useSharedValue(0.3);
  const sendOpacity = useSharedValue(0.3);
  const tradeOpacity = useSharedValue(0.3);

  const topImageOpacity = useSharedValue(1);
  const bottomImageOpacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % BackgroundData.length;
      const nextCase = BackgroundData[nextIndex];

      // Update text opacity
      learnOpacity.value = withTiming(nextCase.activeCorner === 'learn' ? 1 : 0.3, { duration: 800 });
      investOpacity.value = withTiming(nextCase.activeCorner === 'invest' ? 1 : 0.3, { duration: 800 });
      sendOpacity.value = withTiming(nextCase.activeCorner === 'send' ? 1 : 0.3, { duration: 800 });
      tradeOpacity.value = withTiming(nextCase.activeCorner === 'trade' ? 1 : 0.3, { duration: 800 });

      // Update background opacity
      topImageOpacity.value = withTiming(0.5, { duration: 800 }, () => {
        runOnJS(setCurrentIndex)(nextIndex);
        topImageOpacity.value = withTiming(1, { duration: 800 });
      });

      bottomImageOpacity.value = withTiming(0.5, { duration: 800 }, () => {
        bottomImageOpacity.value = withTiming(1, { duration: 800 });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Animated styles
  const learnStyle = useAnimatedStyle(() => ({ opacity: learnOpacity.value }));
  const investStyle = useAnimatedStyle(() => ({ opacity: investOpacity.value }));
  const sendStyle = useAnimatedStyle(() => ({ opacity: sendOpacity.value }));
  const tradeStyle = useAnimatedStyle(() => ({ opacity: tradeOpacity.value }));

  const topImageStyle = useAnimatedStyle(() => ({ opacity: topImageOpacity.value }));
  const bottomImageStyle = useAnimatedStyle(() => ({ opacity: bottomImageOpacity.value }));

  return (
    <View style={styles.container}>
      {/* Top Half */}
      <View style={styles.topHalf}>
        <Animated.View style={[styles.backgroundImageContainer, topImageStyle]}>
          <ImageBackground
            source={BackgroundData[currentIndex].topImage}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        </Animated.View>
        <View style={styles.contentContainer}>
          <View style={styles.todayContainer}>
            <Animated.Text style={[styles.cornerText, styles.topLeft, learnStyle]}>Learn</Animated.Text>
            <Animated.Text style={[styles.cornerText, styles.topRight, investStyle]}>Invest</Animated.Text>
            <Text style={styles.centerText}>Today</Text>
            <Animated.Text style={[styles.cornerText, styles.bottomRight, sendStyle]}>Send</Animated.Text>
            <Animated.Text style={[styles.cornerText, styles.bottomLeft, tradeStyle]}>Trade</Animated.Text>
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}>
      </View>

      {/* Bottom Half */}
      <View style={styles.bottomHalf}>
        <Animated.View style={[styles.backgroundImageContainer, bottomImageStyle]}>
          <ImageBackground
            source={BackgroundData[currentIndex].bottomImage}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
          <Text style={styles.bottomTitle}>Don’t wait for tomorrow, prosper today</Text>
        </Animated.View>
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
  cornerText: {
    position: 'absolute',
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  topLeft: {
    left: 0,
    top: -30,
  },
  topRight: {
    right: 0,
    top: -30,
  },
  bottomRight: {
    right: 0,
    bottom: -40,
  },
  bottomLeft: {
    left: 0,
    bottom: -40,
  },
  bottomTitle: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'PlayfairDisplay-Medium',
    textAlign: 'center',
  },
});

export default LoginScreen;
