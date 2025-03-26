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
    }, 4000); // Increased interval for better viewing experience
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
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            {/* Corner Texts */}
            <Animated.Text style={[styles.cornerText, styles.leftTop, learnStyle]}>
              Learn
            </Animated.Text>
            <Animated.Text style={[styles.cornerText, styles.rightTop, investStyle]}>
              Invest
            </Animated.Text>
            <Animated.Text style={[styles.cornerText, styles.rightBottom, sendStyle]}>
              Send
            </Animated.Text>
            <Animated.Text style={[styles.cornerText, styles.leftBottom, tradeStyle]}>
              Trade
            </Animated.Text>

            {/* Center Text */}
            <Text style={styles.centerText}>Today</Text>
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
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Don't wait for tomorrow, prosper today</Text>
            <Button title="Sign in" onPress={() => {}} />
          </View>
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
    flex: 1,
    padding: 24,
  },
  bottomHalf: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    position: 'relative',
  },
  cornerText: {
    position: 'absolute',
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  leftTop: {
    top: '25%',
    left: '15%',
  },
  rightTop: {
    top: '25%',
    right: '15%',
  },
  rightBottom: {
    bottom: '25%',
    right: '15%',
  },
  leftBottom: {
    bottom: '25%',
    left: '15%',
  },
  centerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: '#000000',
    fontSize: 72,
    fontWeight: '400',
    fontFamily: 'New York',
    transform: [{ translateX: -40 }, { translateY: -15 }],
  },
});

export default LoginScreen;
