import React, { useRef } from 'react';
import { View, FlatList, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.5;
const NEXT_ITEM_SCALE = 0.8;

const data = [
  { id: '1', color: 'red' },
  { id: '2', color: 'blue' },
  { id: '3', color: 'green' },
  { id: '4', color: 'orange' },
  { id: '5', color: 'purple' }
];

const MarketScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH
          ];
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [NEXT_ITEM_SCALE, 1, NEXT_ITEM_SCALE],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                transform: [{ scale }],
                marginHorizontal: 10,
                height: 200,
                backgroundColor: item.color,
                borderRadius: 10
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default MarketScreen;
