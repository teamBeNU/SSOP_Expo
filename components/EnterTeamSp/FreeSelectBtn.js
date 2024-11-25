import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';
import "react-native-gesture-handler";

import { theme } from "../../theme";

export default function FreeSelectBtn ({itemKey, name, isClick, setIsClick, isBtnActive}) {
    return (
        <TouchableOpacity 
            style={[styles.container, isBtnActive ? styles.btnDeactivate : isClick ? styles.btnOn : styles.btnOff]}
            onPress={() => {
                setIsClick(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
            }}
            disabled={isBtnActive}
        >
            <Text style={isBtnActive ? styles.btnDeactivateText : isClick ? styles.textOn : styles.textOff}>{name}</Text>
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
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: -0.14,
    },
    textOff: {       // 비활성화
        color: theme.gray20,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
        letterSpacing: -0.14,
    },
    btnDeactivate: {    // 앞에서 이미 입력한 버튼 비활성화
        backgroundColor: theme.gray90,
        borderColor: theme.gray90,
    },
    btnDeactivateText: {
        color: theme.gray60,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
        letterSpacing: -0.14,
    },
})