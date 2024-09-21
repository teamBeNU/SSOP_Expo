import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import { theme } from "../../../theme";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function SelectBtn ({k, btnName, isClick, setIsClick}) {
    return (
        <TouchableOpacity 
            style={[styles.container, isClick ? styles.btnOn : styles.btnOff]}
            onPress={() => {
                setIsClick(prev => ({ ...prev, [k]: !prev[k] }));
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