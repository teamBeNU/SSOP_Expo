import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";

function UserPhoneNumber({navigation}) {
    const [step, setStep] = useState(1);
    const [tel, setTel] = useState('');
    const [isTelFull, setIsTelFull] = useState(true);
    
    const handleNext = () => {
        if (step === 1) {
            const isTF = tel !== '';
            setIsTelFull(isTF);

            if (isTF) {
                setStep(2);
            }
        } else if (step === 2 ) {
            setStep(3);
        } else if (step === 3 ) {
            setStep(4);
        }
    };

    const handleChangeText = (newTel) => {
        setTel(newTel);
        if (newTel !== '') {
            setIsTelFull(true);
        } else {
            setIsTelFull(false);
        }
    }

    return (
        <View>
            {step === 1 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.UserInfoMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>변경할 연락처를 입력하세요.</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>연락처</Text>
                            <TextInput 
                                style={[styles.customInput, !isTelFull && styles.inputError]}
                                placeholder="연락처를 입력하세요."
                                placeholderTextColor={theme.gray60}
                                keyboardType="phone-pad"
                                value={tel}
                                onChangeText={handleChangeText}
                                returnKeyType="next"
                            />
                            {!isTelFull && (
                                <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                            )}
                        </View>
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                            <Text style={styles.btnNextText}>변경한 연락처 인증하기</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
}

export default UserPhoneNumber;