import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, ImageSourcePropType, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

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

  // Corner opacity values
  const learnOpacity = useSharedValue(1);
  const investOpacity = useSharedValue(0.3);
  const sendOpacity = useSharedValue(0.3);
  const tradeOpacity = useSharedValue(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change background images with animation
      const nextIndex = (currentIndex + 1) % BackgroundData.length;
      const nextCase = BackgroundData[nextIndex];

      // Smoother fade transition for corner text opacity
      learnOpacity.value = withTiming(nextCase.activeCorner === 'learn' ? 1 : 0.3, { duration: 800 });
      investOpacity.value = withTiming(nextCase.activeCorner === 'invest' ? 1 : 0.3, { duration: 800 });
      sendOpacity.value = withTiming(nextCase.activeCorner === 'send' ? 1 : 0.3, { duration: 800 });
      tradeOpacity.value = withTiming(nextCase.activeCorner === 'trade' ? 1 : 0.3, { duration: 800 });

      setCurrentIndex(nextIndex);
    }, 2000); // Increased interval for better viewing experience
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Animated styles for corner text
  const learnStyle = useAnimatedStyle(() => ({ opacity: learnOpacity.value }));
  const investStyle = useAnimatedStyle(() => ({ opacity: investOpacity.value }));
  const sendStyle = useAnimatedStyle(() => ({ opacity: sendOpacity.value }));
  const tradeStyle = useAnimatedStyle(() => ({ opacity: tradeOpacity.value }));

  return (
    <View style={styles.container}>
      {/* Top Half */}
      <View style={styles.topHalf}>
        <ImageBackground
          source={BackgroundData[currentIndex].topImage}
          style={styles.backgroundImage}
          resizeMode="contain"
        >
          <View style={styles.contentContainer}>
            <View style={styles.todayContainer}>
              <Animated.Text style={[styles.cornerText, styles.topLeft, learnStyle]}>
                Learn
              </Animated.Text>
              <Animated.Text style={[styles.cornerText, styles.topRight, investStyle]}>
                Invest
              </Animated.Text>

              <Text style={styles.centerText}>Today</Text>

              <Animated.Text style={[styles.cornerText, styles.bottomRight, sendStyle]}>
                Send
              </Animated.Text>
              <Animated.Text style={[styles.cornerText, styles.bottomLeft, tradeStyle]}>
                Trade
              </Animated.Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Bottom Half */}
      <View style={styles.bottomHalf}>
        <ImageBackground
          source={BackgroundData[currentIndex].bottomImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
        </ImageBackground>
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    bottom: 70
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
    top: -40,
  },
  topRight: {
    right: 0,
    top: -40,
  },
  bottomRight: {
    right: 0,
    bottom: -40,
  },
  bottomLeft: {
    left: 0,
    bottom: -40,
  },
});

export default LoginScreen;
