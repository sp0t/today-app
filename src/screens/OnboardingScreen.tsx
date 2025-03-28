import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import * as ImagePicker from 'react-native-image-picker';

import { baseStyles } from '../styles';
import images from '../styles/images';

import PrimaryButton from '../components/ui/Button/PrimaryButton';

interface SlideData {
    email: string;
    verificationCode: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
}

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
    const sliderRef = useRef<AppIntroSlider | null>(null);
    const [formData, setFormData] = useState<SlideData>({
        email: '',
        verificationCode: '',
        firstName: '',
        lastName: '',
        profilePhoto: '',
    });

    const validateEmail = (email: string) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    };

    const slides = [
        {
            key: '1',
            type: 'email',
            component: () => (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5 }}>
                        <View style={[baseStyles.bgImgContainer]}>
                            <ImageBackground
                                source={images.onboarding.OnboardingTop}
                                style={baseStyles.bgImage}
                                resizeMode="stretch"
                            />
                        </View>
                        <View style={[baseStyles.topContainer]}>
                            <View style={{ borderWidth: 1, borderColor: 'red' }}>
                                <Text style={styles.title}>Welcome to Today</Text>
                                <Text style={styles.subtitle}>Enter your email address</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.1 }}>
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <View style={[baseStyles.bgImgContainer]}>
                            <ImageBackground
                                source={images.onboarding.OnboardingBottom}
                                style={baseStyles.bgImage}
                                resizeMode="stretch"
                            />
                        </View>
                        <View style={[baseStyles.bottomContainer, { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'red' }]}>
                            <PrimaryButton title="Create an account" style={{ marginTop: '25%' }} onPress={() => sliderRef.current?.goToSlide(1)} />
                        </View>
                    </View>
                </View>
            ),
        },
        {
            key: '2',
            type: 'verification',
            component: () => (
                <View style={styles.slideContainer}>
                    {/* <Image source={require('../assets/icons/mail.png')} style={styles.icon} /> */}
                    <Text style={styles.title}>Check your email</Text>
                    <Text style={styles.subtitle}>We just sent a security code to {formData.email}</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.verificationCode}
                        onChangeText={(text) => setFormData({ ...formData, verificationCode: text })}
                        placeholder="Enter verification code"
                        keyboardType="number-pad"
                        maxLength={6}
                    />
                    <TouchableOpacity
                        style={[styles.button, formData.verificationCode.length !== 6 && styles.buttonDisabled]}
                        disabled={formData.verificationCode.length !== 6}
                        onPress={() => sliderRef.current?.goToSlide(2)}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            key: '3',
            type: 'name',
            component: () => (
                <View style={styles.slideContainer}>
                    {/* <Image source={require('../assets/icons/user.png')} style={styles.icon} /> */}
                    <Text style={styles.title}>What is your name?</Text>
                    <Text style={styles.subtitle}>
                        Your name is how others find you on Today.{'\n'}You can change this later.
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={formData.firstName}
                        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                        placeholder="First name"
                    />
                    <TextInput
                        style={styles.input}
                        value={formData.lastName}
                        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                        placeholder="Last name"
                    />
                    <TouchableOpacity
                        style={[styles.button, !(formData.firstName && formData.lastName) && styles.buttonDisabled]}
                        disabled={!(formData.firstName && formData.lastName)}
                        onPress={() => sliderRef.current?.goToSlide(3)}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            key: '4',
            type: 'photo',
            component: () => (
                <View style={styles.slideContainer}>
                    {/* <Image source={require('../assets/icons/user.png')} style={styles.icon} /> */}
                    <Text style={styles.title}>Add a profile photo</Text>
                    <Text style={styles.subtitle}>
                        Your profile photo is how you show up, you can change this later
                    </Text>
                    <TouchableOpacity
                        style={styles.photoUpload}
                    // onPress={() => {
                    //   ImagePicker.launchImageLibrary({
                    //     mediaType: 'photo',
                    //     includeBase64: false,
                    //   }, (response) => {
                    //     if (response.assets?.[0]?.uri) {
                    //       setFormData({ ...formData, profilePhoto: response.assets[0].uri });
                    //     }
                    //   });
                    // }}
                    >
                        {formData.profilePhoto ? (
                            <Image source={{ uri: formData.profilePhoto }} style={styles.profilePhoto} />
                        ) : (
                            <Text style={styles.uploadText}>Upload Photo</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.replace('Home')}
                    >
                        <Text style={styles.buttonText}>Let's go!</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
    ];

    return (
        <AppIntroSlider
            ref={sliderRef}
            data={slides}
            renderItem={({ item }) => item.component()}
            showNextButton={false}
            showDoneButton={false}
            showSkipButton={false}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    photoUpload: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    uploadText: {
        color: '#666',
    },
});

export default OnboardingScreen;