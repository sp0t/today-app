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
      opacity.value = withSequence(
        withTiming(0, { duration: 500 }), 
        withTiming(1, { duration: 500 }) 
      );

      setCurrentIndex((prevIndex) => (prevIndex + 1) % BackgroundData.length);
    }, 2000); 
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
          <Animated.View style={[styles.contentContainer, animatedStyle]}>
            <Text style={styles.subtitle}>Already have an account?</Text>
            <Button 
              title="Sign in" 
              onPress={() => {}}
            />
          </Animated.View>
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
    backgroundColor: 'rgba(0,0,0,0.3)', // optional: adds a dark overlay
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
