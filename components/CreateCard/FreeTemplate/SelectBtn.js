import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';
import "react-native-gesture-handler";

import { theme } from "../../../theme";

export default function SelectBtn ({itemKey, btnName, isClick, setIsClick}) {
    return (
        <TouchableOpacity 
            style={[styles.container, isClick ? styles.btnOn : styles.btnOff]}
            onPress={() => {
                setIsClick(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
            }}
        >
            <Text style={isClick ? styles.textOn : styles.textOff}>{btnName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.white,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        margin: 3
    },
    btnOn: {       // 활성화
        borderColor: theme.skyblue,
    },
    btnOff: {       // 비활성화
        borderColor: theme.gray90,
    },
    textOn: {       // 활성화
        color: theme.skyblue,
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        textAlign: "center",
    },
    textOff: {       // 비활성화
        color: theme.gray20,
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
    }
})