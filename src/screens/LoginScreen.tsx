import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Define cases for images and text
const cases = [
  {
    topImage: require('../assets/svg/Login_Learn_Top.svg'), // Replace with your image paths
    bottomImage: require('../assets/svg/Login_Learn_Bottom.svg'),
    text: 'Welcome to Case 1',
  },
  {
    topImage: require('../assets/svg/Login_Invest_Top.svg'),
    bottomImage: require('../assets/svg/Login_Invest_Bottom.svg'),
    text: 'Experience Case 2',
  },
  {
    topImage: require('../assets/svg/Login_Send_Top.svg'),
    bottomImage: require('../assets/svg/Login_Send_Bottom.svg'),
    text: 'Explore Case 3',
  },
  {
    topImage: require('../assets/svg/Login_Trade_Top.svg'),
    bottomImage: require('../assets/svg/Login_Trade_Bottom.svg'),
    text: 'Discover Case 4',
  },
];

const LoginScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out animation
      opacity.value = withSequence(
        withTiming(0, { duration: 500 }), // Fade out
        withTiming(1, { duration: 500 }) // Fade in
      );

      // Update case index after fade-out
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cases.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Cleanup
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const currentCase = cases[currentIndex];

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={currentCase.topImage} style={styles.topImage} resizeMode="cover" />
      </Animated.View>

      {/* Text Section */}
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={styles.title}>{currentCase.text}</Text>
      </Animated.View>

      {/* Bottom Section */}
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={currentCase.bottomImage} style={styles.bottomImage} resizeMode="cover" />
      </Animated.View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#ccc" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
        <Button title="Login"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: width,
    height: height * 0.3,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomImage: {
    width: width,
    height: height * 0.3,
  },
  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default LoginScreen;
