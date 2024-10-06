import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";

function UserPhoneNumber({navigation}) {
    const [user_tel, setTel] = useState('');
    const [isTelFull, setIsTelFull] = useState(true);
    
    const handlePhoneNumChange = (text) => {
        setTel(text);
        if (text !== '') {
            setIsTelFull(true);
        } else {
            setIsTelFull(false);
        }
    }

    // 변경사항 저장
    const handleSave = () => {
        const isTF = user_tel !== '';
        setIsTelFull(isTF);
        if (isTF) {
            // setStep(2);
            navigation.navigate('MY');
        }
    };

    return (
        <View style={styles.userMain}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.userChangeMain}>
                    <Text style={[styles.title, styles.titleMarginBottom]}>변경할 연락처를 입력하세요.</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>연락처</Text>
                        <TextInput 
                            style={[styles.customInput, !isTelFull && styles.inputError]}
                            placeholder="연락처를 입력하세요."
                            placeholderTextColor={theme.gray60}
                            keyboardType="phone-pad"
                            value={user_tel}
                            onChangeText={handlePhoneNumChange}
                            returnKeyType="done"
                        />
                        {!isTelFull && (
                            <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                        )}
                    </View>
                    <View style={styles.btnFlex} />
                    <TouchableOpacity 
                        style={styles.btnNext}
                        onPress={handleSave}
                    >
                        <Text style={styles.btnNextText}>변경사항 저장하기</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default UserPhoneNumber;