import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import images from '../styles/images';

// Define proper TypeScript interfaces
interface LearnCard {
  id: string;
  title: string;
  duration: string;
  image: any; // Replace with more specific type if possible
}

interface TopGainer {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  image: any; // Replace with more specific type if possible
  color: string;
}

const MarketScreen = () => {
  // Mock data for learn cards
  const learnCards: LearnCard[] = [
    {
      id: '1',
      title: 'What is DeFi?',
      duration: '56 seconds to learn',
      image: images.login.LearnTop,
    },
    {
      id: '2',
      title: 'What is yield?',
      duration: '40 seconds to learn',
      image: images.login.LearnTop,
    },
    {
      id: '3',
      title: 'Understanding NFTs',
      duration: '32 seconds to learn',
      image: images.login.LearnTop,
    },
  ];

  // Mock data for top gainers
  const topGainers: TopGainer[] = [
    {
      id: '1',
      name: 'Particle Network',
      symbol: 'PARTI',
      price: '$0.3568',
      change: '+12%',
      image: images.login.LearnTop,
      color: '#8A2BE2',
    },
    {
      id: '2',
      name: 'Limewire',
      symbol: 'LMWR',
      price: '$0.09479',
      change: '+9%',
      image: images.login.LearnTop,
      color: '#32CD32',
    },
    {
      id: '3',
      name: 'Brett',
      symbol: 'BRETT',
      price: '$0.03741',
      change: '+5%',
      image: images.login.LearnTop,
      color: '#00BFFF',
    },
    {
      id: '4',
      name: 'Kaito',
      symbol: 'KAITO',
      price: '$1.35',
      change: '+19%',
      image: images.login.LearnTop,
      color: '#00FFFF',
    },
  ];

  // Render learn card item with proper typing
  const renderLearnCard = ({ item }: { item: LearnCard }) => (
    <TouchableOpacity style={styles.learnCard}>
      {item.image ? (
        <Image source={item.image} style={styles.learnCardImage} />
      ) : (
        <View style={[styles.learnCardImage, styles.defaultCardBackground]}>
          <Text style={styles.defaultIconText}>?</Text>
        </View>
      )}
      <View style={styles.learnCardOverlay}>
        <Text style={styles.learnCardDuration}>{item.duration}</Text>
        <Text style={styles.learnCardTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render top gainer item with proper typing
  const renderGainerItem = ({ item }: { item: TopGainer }) => (
    <TouchableOpacity style={styles.gainerItem}>
      <View style={styles.gainerLeft}>
        {item.image ? (
          <Image source={item.image} style={styles.gainerImage} />
        ) : (
          <View style={[styles.gainerImage, { backgroundColor: item.color }]}>
            <Text style={styles.defaultIconText}>
              {item.symbol.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.gainerInfo}>
          <Text style={styles.gainerName}>{item.name}</Text>
          <Text style={styles.gainerSymbol}>{item.symbol}</Text>
        </View>
      </View>
      <View style={styles.gainerRight}>
        <Text style={styles.gainerPrice}>{item.price}</Text>
        <Text style={styles.gainerChange}>{item.change}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.dateText}>Monday, March 5th</Text>
          </View>
          <View style={styles.marketStatus}>
            <Image source={images.tab.TabMarket} style={{ width: 16, height: 16 }} />
            <Text style={styles.marketStatusText}>Markets are always open</Text>
          </View>
        </View>

        {/* Learn Section */}
        <Text style={styles.sectionTitle}>Learn about the future of finance</Text>
        <FlatList
          data={learnCards}
          renderItem={renderLearnCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.learnCardsContainer}
        />

        {/* Top Gainers Section */}
        <View style={styles.topGainersHeader}>
          <Text style={styles.sectionTitle}>Top gainers</Text>
          <Text style={styles.gainersSubtitle}>Price rising over the past 24 hours</Text>
        </View>

        <FlatList
          data={topGainers}
          renderItem={renderGainerItem}
          keyExtractor={item => item.id}
          style={styles.gainersList}
          showsVerticalScrollIndicator={false}
        />

        {/* Deposit Button */}
        <TouchableOpacity style={styles.depositButton}>
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#FF00FF',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  marketStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 196, 154, 0.1)',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  marketStatusText: {
    fontSize: 12,
    color: '#00C49A',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  learnCardsContainer: {
    padding: 4,
  },
  learnCard: {
    width: 160,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  learnCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  defaultCardBackground: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIconText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  learnCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  learnCardDuration: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  learnCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topGainersHeader: {
    marginTop: 20,
    marginBottom: 4,
  },
  gainersSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: -8,
    marginBottom: 12,
  },
  gainersList: {
    flex: 1,
  },
  gainerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  gainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gainerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gainerInfo: {
    marginLeft: 12,
  },
  gainerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  gainerSymbol: {
    fontSize: 12,
    color: '#666',
  },
  gainerRight: {
    alignItems: 'flex-end',
  },
  gainerPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  gainerChange: {
    fontSize: 12,
    color: '#00C49A',
    fontWeight: '500',
  },
  depositButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  depositButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MarketScreen;