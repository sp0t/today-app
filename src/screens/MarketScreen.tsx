import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated
} from 'react-native';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample market items data using the interface

interface MarketItem {
    id: String,
    title: String,
    image: String,
    price: String,
    rating: Number,
    description: String,
    category: String,
    inStock: Boolean,
    quantity: Number,
    tags: String[]
}

const marketItems: MarketItem[] = [
  {
    id: '1',
    title: 'Fresh Produce',
    image: 'https://example.com/produce.jpg',
    price: '$15.99',
    rating: 4.8,
    description: 'Locally sourced fruits and vegetables delivered to your door.',
    category: 'Produce',
    inStock: true,
    quantity: 25,
    tags: ['organic', 'local', 'fresh']
  },
  {
    id: '2',
    title: 'Artisan Bread',
    image: 'https://example.com/bread.jpg',
    price: '$7.50',
    rating: 4.7,
    description: 'Freshly baked sourdough and specialty breads.',
    category: 'Bakery',
    inStock: true,
    quantity: 15,
    tags: ['bread', 'baked', 'artisan']
  },
  {
    id: '3',
    title: 'Organic Dairy',
    image: 'https://example.com/dairy.jpg',
    price: '$12.99',
    rating: 4.5,
    description: 'Farm-fresh milk, cheese, and yogurt from grass-fed cows.',
    category: 'Dairy',
    inStock: true,
    quantity: 20,
    tags: ['organic', 'dairy', 'grass-fed']
  },
  {
    id: '4',
    title: 'Premium Meats',
    image: 'https://example.com/meat.jpg',
    price: '$24.99',
    rating: 4.9,
    description: 'High-quality cuts from sustainable and ethical farms.',
    category: 'Meats',
    inStock: true,
    quantity: 12,
    tags: ['meat', 'premium', 'sustainable']
  },
  {
    id: '5',
    title: 'Specialty Spices',
    image: 'https://example.com/spices.jpg',
    price: '$18.75',
    rating: 4.6,
    description: 'Rare and exotic spices from around the world.',
    category: 'Spices',
    inStock: true,
    quantity: 30,
    tags: ['spices', 'exotic', 'rare']
  }
];

// Props interface for the CustomCarousel component
interface CustomCarouselProps {
  data: MarketItem[];
  renderItem: (props: { item: MarketItem; index: number }) => React.ReactNode;
}

const MarketScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MarketItem>(marketItems[0]);

  // Custom render item for our carousel
  const renderCarouselItem = ({ item, index }: { item: MarketItem; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedItem(item)}
        style={styles.carouselItemContainer}
      >
        <View style={styles.carouselItem}>
          {/* Image placeholder - replace with actual Image component when you have images */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>{item.title[0]}</Text>
            </View>
            {/* Uncomment this when you have actual images */}
            {/* <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="cover"
            /> */}
          </View>
          
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>
      
      {/* Market Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollableCategories />
      </View>
      
      {/* Featured Products Carousel */}
      <View style={styles.carouselSection}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.carouselContainer}>
          <CustomCarousel
            data={marketItems}
            renderItem={renderCarouselItem}
          />
        </View>
      </View>
      
      {/* Selected Item Details */}
      {selectedItem && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedItem.title}</Text>
          <Text style={styles.detailsDescription}>{selectedItem.description}</Text>
          
          {/* Display tags if available */}
          {selectedItem.tags && selectedItem.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {selectedItem.tags.map((tag, index) => (
                <View key={index} style={styles.tagItem}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
          
          <TouchableOpacity 
            style={[
              styles.addToCartButton,
              !selectedItem.inStock && styles.disabledButton
            ]}
            disabled={!selectedItem.inStock}
          >
            <Text style={styles.addToCartButtonText}>
              {selectedItem.inStock 
                ? `Add to Cart - ${selectedItem.price}`
                : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

// Scrollable Categories Component
const ScrollableCategories: React.FC = () => {
  const categories = ['All', 'Produce', 'Bakery', 'Dairy', 'Meats', 'Spices', 'Beverages'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  return (
    <View style={styles.categoriesScrollView}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryItem,
            selectedCategory === category && styles.selectedCategoryItem
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text 
            style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// CustomCarousel with TypeScript types
const CustomCarousel: React.FC<CustomCarouselProps> = ({ data, renderItem }) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const ITEM_WIDTH = SCREEN_WIDTH * 0.6;
  const ITEM_PADDING = 15;
  const viewableOffset = ITEM_WIDTH - (SCREEN_WIDTH - ITEM_WIDTH) + ITEM_PADDING;

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const index = Math.round(value / viewableOffset);
      if (index !== activeIndex && index >= 0 && index < data.length) {
        setActiveIndex(index);
      }
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, [activeIndex, scrollX, viewableOffset, data.length]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const lastItemIndex = data.length - 1;
        
        if (activeIndex === lastItemIndex || 
            (offsetX > (lastItemIndex * viewableOffset) - ITEM_WIDTH / 2)) {
          const finalOffset = lastItemIndex * viewableOffset;
          
          if (Math.abs(offsetX - finalOffset) > 5) {
            flatListRef.current?.scrollToOffset({
              offset: finalOffset,
              animated: true
            });
          }
        }
      }
    }
  );

  const wrappedRenderItem = (itemProps: { item: MarketItem; index: number }) => {
    const { item, index } = itemProps;
    const inputRange = [
      (index - 1) * viewableOffset,
      index * viewableOffset,
      (index + 1) * viewableOffset,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
        }}
      >
        {renderItem(itemProps)}
      </Animated.View>
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: viewableOffset,
    offset: viewableOffset * index,
    index,
  });

  const snapToOffsets = data.map((_, index) => index * viewableOffset);

  return (
    <View style={styles.carouselWrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={wrappedRenderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.flatListContent}
      />
      
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
            ]}
            onPress={() => {
              flatListRef.current?.scrollToIndex({
                index,
                animated: true,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 20,
  },
  categoriesContainer: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  categoriesScrollView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
  },
  selectedCategoryItem: {
    backgroundColor: '#339af0',
  },
  categoryText: {
    fontWeight: '500',
    color: '#495057',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  carouselSection: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
    color: '#212529',
  },
  carouselContainer: {
    height: 220,
  },
  carouselWrapper: {
    flex: 1,
  },
  flatListContent: {
    paddingLeft: (SCREEN_WIDTH - (SCREEN_WIDTH * 0.6)) / 2,
    paddingRight: (SCREEN_WIDTH - (SCREEN_WIDTH * 0.6)) / 2,
  },
  carouselItemContainer: {
    width: SCREEN_WIDTH * 0.6,
    paddingHorizontal: 15,
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 180,
  },
  imageContainer: {
    height: 120,
    backgroundColor: '#e9ecef',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#339af0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#339af0',
  },
  ratingContainer: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#fee500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#212529',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ced4da',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#339af0',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  detailsDescription: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 15,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tagItem: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#495057',
  },
  addToCartButton: {
    backgroundColor: '#339af0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ced4da',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MarketScreen;