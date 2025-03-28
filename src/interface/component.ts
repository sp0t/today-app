import { ViewStyle, TextStyle, KeyboardTypeOptions } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    style?: any;
}

export interface CornerTextProps {
    text: string;
    animatedStyle: AnimatedStyle<any>;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}