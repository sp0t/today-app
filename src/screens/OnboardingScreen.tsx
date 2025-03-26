import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import Routes from '../routes/RouteName';

const { width } = Dimensions.get('window');

type Slide = {
    key: string;
    title: string;
    text: string;
    // image: any; 
};

const slides: Slide[] = [
    {
        key: '1',
        title: 'Welcome to App',
        text: 'Discover amazing features and more'
        // image: require('../assets/onboarding1.png'), 
    },
    {
        key: '2',
        title: 'Easy to Use',
        text: 'Simple and intuitive interface'
        // image: require('../assets/onboarding2.png'),
    },
    {
        key: '3',
        title: 'Powerful Features',
        text: 'Access all the tools you need'
        // image: require('../assets/onboarding3.png'),
    },
    {
        key: '4',
        title: "Let's Get Started",
        text: 'Join us now and start your journey'
        // image: require('../assets/onboarding4.png'),
    },
];

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
    const { theme } = useTheme();
    
    const renderItem = ({ item }: { item: Slide }) => {
        return (
            <View style={[
                styles.slide,
                { backgroundColor: theme === 'dark' ? '#333' : '#fff' }
            ]}>
                {/* <Image 
                    source={item.image} 
                    style={styles.image}
                    resizeMode="contain"
                /> */}
                <Text style={[
                    styles.title,
                    { color: theme === 'dark' ? '#fff' : '#000' }
                ]}>
                    {item.title}
                </Text>
                <Text style={[
                    styles.text,
                    { color: theme === 'dark' ? '#ccc' : '#666' }
                ]}>
                    {item.text}
                </Text>
            </View>
        );
    };

    const handleDone = async () => {
        try {
            // If you're using AsyncStorage to track onboarding completion
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            navigation.replace(Routes.MARKET);
        } catch (error) {
            console.error('Error saving onboarding status:', error);
            navigation.replace(Routes.MARKET);
        }
    };

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderItem}
            onDone={handleDone}
            showSkipButton
            onSkip={handleDone}
            renderNextButton={() => (
                <Text style={[
                    styles.buttonText,
                    { color: theme === 'dark' ? '#fff' : '#000' }
                ]}>
                    Next
                </Text>
            )}
            renderDoneButton={() => (
                <Text style={[
                    styles.buttonText,
                    { color: theme === 'dark' ? '#fff' : '#000' }
                ]}>
                    Get Started
                </Text>
            )}
            renderSkipButton={() => (
                <Text style={[
                    styles.buttonText,
                    { color: theme === 'dark' ? '#fff' : '#000' }
                ]}>
                    Skip
                </Text>
            )}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.8,
        height: width * 0.8,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        width: 20,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});

export default OnboardingScreen;