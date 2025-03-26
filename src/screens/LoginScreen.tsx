import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Dimensions, ImageBackground, ImageSourcePropType } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface BackgroundItem {
  topImage: ImageSourcePropType;
  bottomImage: ImageSourcePropType;
  text: string;
}

const BackgroundData: BackgroundItem[] = [
  {
    topImage: require('../assets/images/Login_Learn_Top.png'),
    bottomImage: require('../assets/images/Login_Learn_Bottom.png'),
    text: 'Welcome to Case 1',
  },
  {
    topImage: require('../assets/images/Login_Invest_Top.png'),
    bottomImage: require('../assets/images/Login_Invest_Bottom.png'),
    text: 'Experience Case 2',
  },
  {
    topImage: require('../assets/images/Login_Send_Top.png'),
    bottomImage: require('../assets/images/Login_Send_Bottom.png'),
    text: 'Explore Case 3',
  },
  {
    topImage: require('../assets/images/Login_Trade_Top.png'),
    bottomImage: require('../assets/images/Login_Trade_Bottom.png'),
    text: 'Discover Case 4',
  },
];

const LoginScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Smoother fade transition
      opacity.value = withSequence(
        withTiming(0.3, { duration: 800 }), // Fade to 0.3 instead of 0
        withTiming(1, { duration: 800 }) // Fade back to 1
      );

      setCurrentIndex((prevIndex) => (prevIndex + 1) % BackgroundData.length);
    }, 4000); // Increased interval to 4 seconds for better viewing experience
    return () => clearInterval(interval);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const currentCase: BackgroundItem = BackgroundData[currentIndex];

  return (
    <View style={styles.container}>
      {/* Top Half */}
      <View style={styles.topHalf}>
        <ImageBackground 
          source={currentCase.topImage} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <Animated.View style={[styles.contentContainer, animatedStyle]}>
            <Text style={styles.title}>{currentCase.text}</Text>
            <Button 
              title="Create an account" 
              onPress={() => {}}
            />
          </Animated.View>
        </ImageBackground>
      </View>

      {/* Bottom Half */}
      <View style={styles.bottomHalf}>
        <ImageBackground 
          source={currentCase.bottomImage} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Don't wait for tomorrow, prosper today</Text>
            <Button 
              title="Sign in" 
              onPress={() => {}}
            />
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
    backgroundColor: '#fff', // fallback color
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#f5f5f5', // fallback color
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)', // Reduced overlay opacity
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
});
export default LoginScreen;
