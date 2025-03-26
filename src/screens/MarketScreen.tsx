import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const MarketScreen = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: theme === 'dark' ? '#fff' : '#000' }}>
                Home Screen
            </Text>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Current Theme: {theme}
            </Text>
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
    );
};

export default MarketScreen;
