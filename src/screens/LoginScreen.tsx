import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const BackgroundData = [
  {
    topImage: require('../assets/images/login_learn_top.png'),
    bottomImage: require('../assets/images/login_learn_bottom.png'),
    text: 'Welcome to Case 1',
  },
  {
    topImage: require('../assets/images/login_invest_top.png'),
    bottomImage: require('../assets/images/login_invest_bottom.png'),
    text: 'Experience Case 2',
  },
  {
    topImage: require('../assets/images/login_send_top.png'),
    bottomImage: require('../assets/images/login_send_bottom.png'),
    text: 'Explore Case 3',
  },
  {
    topImage: require('../assets/images/login_trade_top.png'),
    bottomImage: require('../assets/images/login_trade_bottom.png'),
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

  const currentCase = BackgroundData[currentIndex];

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
        <Button title="Login" />
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
