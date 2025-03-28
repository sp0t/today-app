import { ViewStyle, TextStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export interface CornerTextProps {
    text: string;
    animatedStyle: AnimatedStyle<any>;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}