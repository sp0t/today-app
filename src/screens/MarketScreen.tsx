import React from 'react';
import { View, Text, Button } from 'react-native';
// import { useTheme } from '../theme/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MarketScreen: React.FC<Props> = ({ navigation }) => {
    // const { theme, toggleTheme } = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Home Screen</Text>
            <Text>Current Theme:</Text>
            <Button title="Toggle Theme"/>
            <Button title="Go to Settings"/>
        </View>
    );
};

export default MarketScreen;
