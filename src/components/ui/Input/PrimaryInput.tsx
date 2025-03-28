import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { InputProps } from '../../../interface/component';

const PrimaryInput: React.FC<InputProps> = ({ value, onChangeText, placeholder, keyboardType, autoCapitalize, style }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
        >
        </TextInput>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E4E4E7',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 12,
    },
});

export default PrimaryInput;
