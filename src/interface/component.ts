import { ViewStyle, TextStyle } from 'react-native';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}