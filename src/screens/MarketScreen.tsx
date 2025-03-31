import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  ListRenderItemInfo,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../styles/images'

// Constants for layout measurements
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_GAP = width * 0.05;

// Type definitions
interface EducationalCard {
  id: string;
  title: string;
  duration: string;
  colors: string[];
  image: ImageSourcePropType;
}

interface TopGainer {
  id: string;
  name: string;
  ticker: string;
  price: string;
  change: string;
  color: string;
  iconText: string;
}

// Component prop types
interface CarouselIndicatorsProps {
  items: Array<EducationalCard>;
  activeIndex: number;
}

interface EducationalCardItemProps {
  item: EducationalCard;
  index: number;
  totalItems: number;
}

interface TopGainerItemProps {
  item: TopGainer;
  index: number;
  totalItems: number;
}

// Sub-components
const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({ items, activeIndex }) => {
  return (
    <View style={styles.indicators}>
      {items.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            index === activeIndex && styles.activeIndicator
          ]}
        />
      ))}
    </View>
  );
};

const EducationalCardItem: React.FC<EducationalCardItemProps> = ({ item, index, totalItems }) => {
  return (
    <TouchableOpacity
      style={[
        styles.educationalCard,
        { width: CARD_WIDTH, marginRight: index === totalItems - 1 ? 0 : CARD_GAP }
      ]}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={item.colors}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardDuration}>{item.duration}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const TopGainerItem: React.FC<TopGainerItemProps> = ({ item, index, totalItems }) => {
  return (
    <View
      style={[
        styles.gainerCard,
        { width: CARD_WIDTH, marginRight: index === totalItems - 1 ? 0 : CARD_GAP }
      ]}
    >
      <View style={[styles.gainerIcon, { backgroundColor: item.color }]}>
        <Text style={styles.gainerIconText}>{item.iconText}</Text>
      </View>
      <View style={styles.gainerInfo}>
        <Text style={styles.gainerName}>{item.name}</Text>
        <Text style={styles.gainerTicker}>{item.ticker}</Text>
      </View>
      <View style={styles.gainerPrice}>
        <Text style={styles.priceValue}>{item.price}</Text>
        <Text style={styles.priceChange}>{item.change}</Text>
      </View>
    </View>
  );
};

// Main component
const MarketScreen: React.FC = () => {
  // Sample data
  const educationalCards: EducationalCard[] = [
    {
      id: '1',
      title: 'What is DeFi?',
      duration: '56 seconds total',
      colors: ['#9333EA', '#3B82F6'],
      image: images.login.InvestBottom
    },
    {
      id: '2',
      title: 'What is yield?',
      duration: '40 seconds total',
      colors: ['#FB7185', '#EF4444'],
      image: images.login.InvestBottom
    },
    {
      id: '3',
      title: 'How to stake tokens?',
      duration: '62 seconds total',
      colors: ['#10B981', '#14B8A6'],
      image: images.login.InvestBottom
    },
    {
      id: '4',
      title: 'NFT basics',
      duration: '45 seconds total',
      colors: ['#F59E0B', '#F97316'],
      image: images.login.InvestBottom
    },
  ];

  const topGainers: TopGainer[] = [
    {
      id: '1',
      name: 'Particle Network',
      ticker: 'PARTI',
      price: '$0.3568',
      change: '+12%',
      color: '#9333EA',
      iconText: 'P',
    },
    {
      id: '2',
      name: 'Limewire',
      ticker: 'LMWR',
      price: '$0.09479',
      change: '+9%',
      color: '#10B981',
      iconText: 'L',
    },
    {
      id: '3',
      name: 'Brett',
      ticker: 'BRETT',
      price: '$0.03741',
      change: '+5%',
      color: '#3B82F6',
      iconText: 'B',
    },
    {
      id: '4',
      name: 'Kaito',
      ticker: 'KAITO',
      price: '$1.35',
      change: '+19%',
      color: '#2DD4BF',
      iconText: 'K',
    },
  ];

  // Refs and state
  const topCarouselRef = useRef<FlatList<EducationalCard>>(null);
  const bottomCarouselRef = useRef<FlatList<TopGainer>>(null);
  const [topActiveIndex, setTopActiveIndex] = useState<number>(0);
  const [bottomActiveIndex, setBottomActiveIndex] = useState<number>(0);

  // Handlers with proper TypeScript event types
  const handleTopScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + CARD_GAP));
    setTopActiveIndex(index);
  }, []);

  const handleBottomScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + CARD_GAP));
    setBottomActiveIndex(index);
  }, []);

  // Render functions with proper typing
  const renderEducationalCard = useCallback(
    ({ item, index }: ListRenderItemInfo<EducationalCard>) => (
      <EducationalCardItem
        item={item}
        index={index}
        totalItems={educationalCards.length}
      />
    ),
    [educationalCards.length]
  );

  const renderTopGainer = useCallback(
    ({ item, index }: ListRenderItemInfo<TopGainer>) => (
      <TopGainerItem
        item={item}
        index={index}
        totalItems={topGainers.length}
      />
    ),
    [topGainers.length]
  );

  // Item layout calculator for optimized FlatList performance
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CARD_WIDTH + CARD_GAP,
      offset: (CARD_WIDTH + CARD_GAP) * index,
      index,
    }),
    []
  );

  // Optional: Navigate to specific card programmatically
  const scrollToEducationalCard = useCallback((index: number) => {
    topCarouselRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const scrollToGainer = useCallback((index: number) => {
    bottomCarouselRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.dateText}>Monday, March 5th</Text>
        </View>
        <View>
            <Text style={styles.statusText}>Markets are always open</Text>
        </View>
      </View>

      {/* Learn about finance section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learn about the future of finance</Text>

        <View style={styles.carouselContainer}>
          <FlatList
            ref={topCarouselRef}
            data={educationalCards}
            renderItem={renderEducationalCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={CARD_WIDTH + CARD_GAP}
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
            onMomentumScrollEnd={handleTopScrollEnd}
            initialScrollIndex={0}
            getItemLayout={getItemLayout}
            removeClippedSubviews={true} // Performance optimization
          />
          <CarouselIndicators
            items={educationalCards}
            activeIndex={topActiveIndex}
          />
        </View>
      </View>

      {/* Top gainers section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top gainers</Text>
        <Text style={styles.sectionSubtitle}>Price rising over the past 24 hours</Text>

        <FlatList
          ref={bottomCarouselRef}
          data={topGainers}
          renderItem={renderTopGainer}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onMomentumScrollEnd={handleBottomScrollEnd}
          initialScrollIndex={0}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true} // Performance optimization
        />
      </View>

      {/* Deposit button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.depositButton}
          activeOpacity={0.8}
          onPress={() => console.log('Deposit pressed')}
        >
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Typed styles
interface IStyles {
  container: ViewStyle;
  header: ViewStyle;
  welcomeText: TextStyle;
  dateContainer: ViewStyle;
  dateText: TextStyle;
  marketStatus: ViewStyle;
  statusDot: ViewStyle;
  statusText: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  sectionSubtitle: TextStyle;
  carouselContainer: ViewStyle;
  carouselContent: ViewStyle;
  educationalCard: ViewStyle;
  cardGradient: ViewStyle;
  cardImage: ImageStyle;
  cardContent: ViewStyle;
  cardDuration: TextStyle;
  cardTitle: TextStyle;
  indicators: ViewStyle;
  indicator: ViewStyle;
  activeIndicator: ViewStyle;
  gainerCard: ViewStyle;
  gainerIcon: ViewStyle;
  gainerIconText: TextStyle;
  gainerInfo: ViewStyle;
  gainerName: TextStyle;
  gainerTicker: TextStyle;
  gainerPrice: ViewStyle;
  priceValue: TextStyle;
  priceChange: TextStyle;
  footer: ViewStyle;
  depositButton: ViewStyle;
  depositButtonText: TextStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  marketStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  carouselContainer: {
    position: 'relative',
  },
  carouselContent: {
    paddingRight: 16,
  },
  educationalCard: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 12,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  cardContent: {
    padding: 12,
  },
  cardDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  indicators: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 4,
  },
  activeIndicator: {
    width: 16,
    backgroundColor: '#FFFFFF',
  },
  gainerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  gainerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gainerIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gainerInfo: {
    flex: 1,
  },
  gainerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  gainerTicker: {
    fontSize: 12,
    color: '#6B7280',
  },
  gainerPrice: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 14,
    color: '#000000',
  },
  priceChange: {
    fontSize: 12,
    color: '#10B981',
  },
  footer: {
    padding: 16,
    marginTop: 'auto',
  },
  depositButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  depositButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MarketScreen;