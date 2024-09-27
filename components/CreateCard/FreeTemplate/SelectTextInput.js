import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect } from 'react';
import "react-native-gesture-handler";

import { theme } from "../../../theme";

export default function SelectTextInput ({name, cardValue, setCardValue}) {

    // name 마지막 글자 자음(종성, 받침) 여부 (을/를)
    const isConsonant = () => {
        return (name.charCodeAt(name.length - 1) - "가".charCodeAt(0)) % 28 !== 0; // 0이면 종성이 없음
    };
    const selectName = isConsonant() ? `${name}을` : `${name}를`;

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{name}</Text>
            <TextInput 
                style={styles.customInput}
                placeholder={`${selectName} 입력해 주세요.`}
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={cardValue}
                onChangeText={setCardValue}
                returnKeyType="done"
                blurOnSubmit={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 40,
        width: "100%",
        paddingHorizontal: 16,
    },
    inputText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        color: theme.gray40,
        fontStyle: "normal",
        fontWeight: "400",
        marginBottom: 8,
    },
    customInput: {
        height: 48,
        borderRadius: 8,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
    },
})