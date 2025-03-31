import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import images from '../styles/images';

const { width } = Dimensions.get('window');

const MarketScreen = () => {
    // Educational content carousel data
    const educationalItems = [
        {
            id: 1,
            title: 'What is DeFi?',
            duration: '56 seconds to learn',
            image: images.login.LearnTop,
            backgroundColor: '#f0f0f0',
        },
        {
            id: 2,
            title: 'What is yield?',
            duration: '40 seconds to learn',
            image: images.login.LearnTop,
            backgroundColor: '#f8e0f0',
        },
        {
            id: 3,
            title: 'Crypto basics',
            duration: '45 seconds to learn',
            image: images.login.LearnTop,
            backgroundColor: '#e0f0f8',
        },
    ];

    // Top gainers data
    const topGainers = [
        {
            id: 1,
            name: 'Particle Network',
            symbol: 'PARTI',
            price: '$0.3568',
            change: '+12%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 2,
            name: 'Limewire',
            symbol: 'LMWR',
            price: '$0.09479',
            change: '+9%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 3,
            name: 'Brett',
            symbol: 'BRETT',
            price: '$0.03741',
            change: '+5%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 4,
            name: 'Kaito',
            symbol: 'KAITO',
            price: '$1.35',
            change: '+19%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 5,
            name: 'Kaito',
            symbol: 'KAITO',
            price: '$1.35',
            change: '+19%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 6,
            name: 'Kaito',
            symbol: 'KAITO',
            price: '$1.35',
            change: '+19%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 7,
            name: 'Kaito',
            symbol: 'KAITO',
            price: '$1.35',
            change: '+19%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 8,
            name: 'Kaito',
            symbol: 'KAITO',
            price: '$1.35',
            change: '+19%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
        {
            id: 9,
            name: 'Kaito',
            symbol: 'KAITO',
            price: '$1.35',
            change: '+19%',
            icon: images.login.LearnTop,
            rightIcon: images.login.LearnTop,
        },
    ];

    // Split topGainers into chunks of 2 for pagination
    const gainersChunks = [];
    for (let i = 0; i < topGainers.length; i += 4) {
        gainersChunks.push(topGainers.slice(i, i + 4));
    }

    const progressValue = useSharedValue(0);
    const gainersProgressValue = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGainerIndex, setCurrentGainerIndex] = useState(0);
    const educationalCarouselRef = useRef(null);
    const gainersCarouselRef = useRef(null);

    // Handle educational carousel slide
    const handleEducationalSnapToItem = (index: number) => {
        setCurrentIndex(index);
    };

    // Handle gainers carousel slide
    const handleGainersSnapToItem = (index: number) => {
        setCurrentGainerIndex(index);
    };

    const ITEM_WIDTH = width * 0.8; 
    const SIDE_ITEM_OFFSET = (width - ITEM_WIDTH) / 2;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.dateText}>Monday, March 5th</Text>
                </View>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>Markets are always open</Text>
                </View>
            </View>

            {/* Learn section title */}
            <Text style={styles.sectionTitle}>Learn about the future of finance</Text>

            {/* Educational Carousel */}
            <View style={styles.educationalCarouselContainer}>
                <Carousel
                    ref={educationalCarouselRef}
                    loop={false}
                    width={width}
                    height={210}
                    snapEnabled={true}
                    pagingEnabled={true}
                    data={educationalItems}
                    scrollAnimationDuration={1000}
                    onProgressChange={(_, absoluteProgress) => {
                        gainersProgressValue.value = absoluteProgress;
                    }}
                    onSnapToItem={handleEducationalSnapToItem}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,  // Try 0.9 for better effect
                        parallaxScrollingOffset: 16,  // Reduce offset
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[
                            styles.educationalCard,
                            { backgroundColor: item.backgroundColor }
                        ]}>
                            <Image source={item.image} style={styles.educationalImage} />
                            <View style={styles.educationalOverlay}>
                                <Text style={styles.educationalDuration}>{item.duration}</Text>
                                <Text style={styles.educationalTitle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/* Pagination indicator */}
                <View style={styles.paginationContainer}>
                    {educationalItems.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                { backgroundColor: currentIndex === index ? '#E91E63' : '#ccc' }
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Top gainers section */}
            <View style={styles.topGainersSection}>
                <Text style={styles.topGainersTitle}>Top gainers</Text>
                <Text style={styles.topGainersSubtitle}>Price rising over the past 24 hours</Text>

                <Carousel
                    ref={gainersCarouselRef}
                    loop={false}
                    width={width}
                    height={210}
                    snapEnabled={true}
                    pagingEnabled={true}
                    data={gainersChunks}
                    scrollAnimationDuration={1000}
                    onProgressChange={(_, absoluteProgress) => {
                        gainersProgressValue.value = absoluteProgress;
                    }}
                    onSnapToItem={handleGainersSnapToItem}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,  // Try 0.9 for better effect
                        parallaxScrollingOffset: 16,  // Reduce offset
                    }}
                    renderItem={({ item }) => (
                        <View style={[styles.gainersListContainer]}>
                            {item.map((gainerItem) => (
                                <TouchableOpacity key={gainerItem.id} style={styles.gainerItem}>
                                    <View style={styles.gainerLeft}>
                                        <Image source={gainerItem.icon} style={styles.gainerIcon} />
                                        <View style={styles.gainerInfo}>
                                            <Text style={styles.gainerName}>{gainerItem.name}</Text>
                                            <Text style={styles.gainerSymbol}>{gainerItem.symbol}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.gainerRight}>
                                        <Text style={styles.gainerPrice}>{gainerItem.price}</Text>
                                        <Text style={styles.gainerChange}>{gainerItem.change}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />

                {/* Gainers pagination indicator */}
                <View style={styles.paginationContainer}>
                    {gainersChunks.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                { backgroundColor: currentGainerIndex === index ? '#E91E63' : '#ccc' }
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Deposit button */}
            <TouchableOpacity style={styles.depositButton}>
                <Text style={styles.depositButtonText}>Deposit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    welcomeText: {
        fontSize: 14,
        color: '#E91E63',
        fontWeight: '500',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    badgeContainer: {
        backgroundColor: '#E6F7F1',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeText: {
        color: '#00BFA5',
        fontSize: 12,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 12,
    },
    educationalCarouselContainer: {
        height: 200,  // Increased to accommodate pagination
    },
    educationalCard: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    educationalImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    educationalOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    educationalDuration: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 4,
    },
    educationalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Pagination styles
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    topGainersSection: {
        marginTop: 16,
        flex: 1,
    },
    topGainersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    topGainersSubtitle: {
        fontSize: 14,
        color: '#777',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    gainersListContainer: {
        paddingHorizontal: 16,
    },
    gainerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    gainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gainerIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 12,
    },
    gainerInfo: {
        justifyContent: 'center',
    },
    gainerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    gainerSymbol: {
        fontSize: 14,
        color: '#777',
    },
    gainerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gainerPrice: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 8,
    },
    gainerChange: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '500',
        marginRight: 8,
    },
    gainerRightIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    depositButton: {
        backgroundColor: '#000',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    depositButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MarketScreen;