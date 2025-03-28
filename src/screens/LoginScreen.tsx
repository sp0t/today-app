import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { loginBackgroundData } from '../constants/constatants';
import Routes from '../routes/RouteName';  
import { GenericNavigationProps } from '../interface/types';

import PrimaryButton from '../components/ui/Button/PrimaryButton';
import TextButton from '../components/ui/Button/TextButton';
import CornerText from '../components/login/ConerText';


const LoginScreen = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Shared values for opacity
  const learnOpacity = useSharedValue(1);
  const investOpacity = useSharedValue(0.3);
  const tradeOpacity = useSharedValue(0.3);
  const sendOpacity = useSharedValue(0.3);

  const topImageOpacity = useSharedValue(1);
  const bottomImageOpacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % loginBackgroundData.length;
      const nextCase = loginBackgroundData[nextIndex];

      // Update text opacity
      learnOpacity.value = withTiming(nextCase.activeCorner === 'learn' ? 1 : 0.3, { duration: 800 });
      investOpacity.value = withTiming(nextCase.activeCorner === 'invest' ? 1 : 0.3, { duration: 800 });
      tradeOpacity.value = withTiming(nextCase.activeCorner === 'trade' ? 1 : 0.3, { duration: 800 });
      sendOpacity.value = withTiming(nextCase.activeCorner === 'send' ? 1 : 0.3, { duration: 800 });

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
  const tradeStyle = useAnimatedStyle(() => ({ opacity: tradeOpacity.value }));
  const sendStyle = useAnimatedStyle(() => ({ opacity: sendOpacity.value }));

  const topImageStyle = useAnimatedStyle(() => ({ opacity: topImageOpacity.value }));
  const bottomImageStyle = useAnimatedStyle(() => ({ opacity: bottomImageOpacity.value }));

  const handleCreateAccount = () => {
    navigation.navigate(Routes.ONBOARDING);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <Animated.View style={[styles.backgroundImageContainer, topImageStyle]}>
          <ImageBackground
            source={loginBackgroundData[currentIndex].topImage}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        </Animated.View>
        <View style={styles.tipContentContainer}>
          <View style={styles.todayContainer}>
            <CornerText text="Learn" top={-30} left={0} animatedStyle={learnStyle} />
            <CornerText text="Invest" top={-30} right={0} animatedStyle={investStyle} />
            <Text style={styles.centerText}>Today</Text>
            <CornerText text="Trade" bottom={-40} right={0} animatedStyle={tradeStyle} />
            <CornerText text="Send" bottom={-40} left={0} animatedStyle={sendStyle} />
          </View>
        </View>
      </View>

      <View style={{ flex: 0.1 }}>
      </View>

      <View style={{ flex: 0.4 }}>
        <Animated.View style={[styles.backgroundImageContainer, bottomImageStyle]}>
          <ImageBackground
            source={loginBackgroundData[currentIndex].bottomImage}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        </Animated.View>
        <View style={styles.bottomContentContainer}>
          <Text style={styles.bottomTitle}>Don’t wait for tomorrow, prosper today</Text>
          <PrimaryButton title="Create an account" style={{ marginTop: '20%' }} onPress={() => { }} />
          <TextButton title="Sign in" style={{ marginTop: 20 }} onPress={() => { }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  tipContentContainer: {
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
    textAlign: 'center',
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
