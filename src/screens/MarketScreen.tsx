import React, { useRef } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.8; // Focused item width
const SPACING = 20; // Margin spacing
const DATA = Array.from({ length: 5 }, (_, i) => ({ id: i }));

const MarketScreen = () => {
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isLastItem = index === DATA.length - 1;
    const marginLeft = index === 0 ? SPACING : 0;
    const marginRight = isLastItem ? SPACING : 0;

    return (
      <View
        style={[
          styles.item,
          {
            marginLeft,
            marginRight,
          },
        ]}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={DATA}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={{ paddingRight: SPACING }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    height: 200,
    backgroundColor: "gray",
    borderRadius: 10,
  },
});

export default MarketScreen;
