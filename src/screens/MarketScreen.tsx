import React from 'react';
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
  ];

  const progressValue = useSharedValue(0);
  
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
          loop
          width={width * 0.85}
          height={180}
          data={educationalItems}
          scrollAnimationDuration={1000}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.educationalCard, { backgroundColor: item.backgroundColor }]}>
              <Image source={item.image} style={styles.educationalImage} />
              <View style={styles.educationalOverlay}>
                <Text style={styles.educationalDuration}>{item.duration}</Text>
                <Text style={styles.educationalTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {/* Top gainers section */}
      <View style={styles.topGainersSection}>
        <Text style={styles.topGainersTitle}>Top gainers</Text>
        <Text style={styles.topGainersSubtitle}>Price rising over the past 24 hours</Text>
        
        <Carousel
          loop
          vertical={false}
          width={width}
          height={240}
          data={[topGainers]}
          scrollAnimationDuration={1000}
          renderItem={() => (
            <View style={styles.gainersListContainer}>
              {topGainers.map((item) => (
                <TouchableOpacity key={item.id} style={styles.gainerItem}>
                  <View style={styles.gainerLeft}>
                    <Image source={item.icon} style={styles.gainerIcon} />
                    <View style={styles.gainerInfo}>
                      <Text style={styles.gainerName}>{item.name}</Text>
                      <Text style={styles.gainerSymbol}>{item.symbol}</Text>
                    </View>
                  </View>
                  <View style={styles.gainerRight}>
                    <Text style={styles.gainerPrice}>{item.price}</Text>
                    <Text style={styles.gainerChange}>{item.change}</Text>
                    <Image source={item.rightIcon} style={styles.gainerRightIcon} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
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
    height: 180,
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
  topGainersSection: {
    marginTop: 24,
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