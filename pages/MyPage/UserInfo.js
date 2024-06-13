import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Pressable, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import CancelModal from "../../components/MyPage/CancelModal";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";

function UserInfo({navigation}) {
    const [user_name, setName] = useState('김슈니');
    const [user_birth, setBirth] = useState({
        year: '2001',
        month: '1',
        day: '2',
    });
    
    const [inputName, setInputName] = useState(user_name);
    const [inputBirth, setInputBirth] = useState({
        year: user_birth.year,
        month: user_birth.month,
        day: user_birth.day,
    });
    const [isFull, setIsFull] = useState({
        name: true,
        birth: true,
    })
    const [isCorrect, setIsCorrect] = useState({
        name: true,
        birth: true,
    })
    const [isBirthValid, setIsBirthValid] = useState({
        year: true,
        month: true,
        day: true,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [dayInMonth, setDayInMonth] = useState(0);

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const currentYear = new Date().getFullYear();

    const handleConfirm = () => {
        setModalVisible(false);
        navigation.goBack();
    };
    
    const isLeapYear = (year) => {    // 윤년 구하기
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    const getDayInMonth = (year, month) => {    // 윤달 구하기
        month = parseInt(month);
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:   // 31일
                return 31;
            case 4: case 6: case 9: case 11:    //30일
                return 30;
            case 2:
                return isLeapYear(year) ? 29 : 28;      // 윤달(2/29), 2/28
            default:
                return 0;
        }
    }

    useEffect(() => {   // 생년월일 올바른지 구하기         
        const days = getDayInMonth(inputBirth.year, inputBirth.month);
        setDayInMonth(days);
    
        if (inputBirth.year > currentYear - 110 && inputBirth.year <= currentYear) {    // 년
            setIsBirthValid((prev) => ({ ...prev, year: true }));   // 현재 년도-110년 ~ 현재년도 까지 가능
        } else {
            setIsBirthValid((prev) => ({ ...prev, year: false }));
        }
        
        if (inputBirth.month >= 1 && inputBirth.month <= 12) {  // 월
            setIsBirthValid((prev) => ({ ...prev, month: true }));
        } else {
            setIsBirthValid((prev) => ({ ...prev, month: false }));
        }

        if (inputBirth.day >= 1 && inputBirth.day <= days) {    // 일
            setIsBirthValid((prev) => ({ ...prev, day: true }));
        } else {
            setIsBirthValid((prev) => ({ ...prev, day: false }));
        }
    }, [inputBirth, currentYear])

    useEffect(() => {   // 페이지 나가기, 저장
        const isNameFull = inputName !== '';
        const isBirthFull = inputBirth.year !== '' && inputBirth.month !== '' && inputBirth.day !== '';
        setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull})));

        const isNameCorrect = user_name === inputName;
        const isBirthCorrect = user_birth.year === inputBirth.year && user_birth.month === inputBirth.month && user_birth.day === inputBirth.day;
        setIsCorrect((prev => ({...prev, name: isNameCorrect, birth: isBirthCorrect})));

        const isYearValid = isBirthValid.year;
        const isMonthValid = isBirthValid.month;
        const isDayValid = isBirthValid.day;

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        if (isNameFull && isBirthFull && isNameCorrect && isBirthCorrect) {
                            navigation.goBack();
                        } else {
                            setModalVisible(true);
                        }
                    }}
                >
                    <CloseIcon style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={() => {
                        if (isNameFull && isYearValid && isMonthValid && isDayValid) {
                            setName(inputName);
                            setBirth((prev => ({...prev, year: inputBirth.year, month: inputBirth.month, day: inputBirth.day})));
                            navigation.navigate('MY');
                        }
                    }}
                >
                    <Text style={styles.saveBtn}>저장</Text>
                </TouchableOpacity>
            ),
        });
    }, [user_name, user_birth, inputName, inputBirth, isBirthValid, navigation]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.userInfoMain}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>이름*</Text>
                    <TextInput 
                        style={styles.customInput}
                        placeholder="이름을 입력하세요."
                        placeholderTextColor={theme.gray60}
                        keyboardType="default"
                        value={inputName}
                        onChangeText={setInputName}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input2.current.focus()}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>생년월일*</Text>
                    <View style={styles.inputBirthContainer}>
                        <TextInput
                            style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                            placeholder="년"
                            placeholderTextColor={theme.gray60}
                            keyboardType="numeric"
                            value={inputBirth.year}
                            onChangeText={(newYear) => {setInputBirth((prevBirth => ({...prevBirth, year: newYear})));}}
                            maxLength={4}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input3.current.focus()}
                            ref={ref_input2}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                            placeholder="월"
                            placeholderTextColor={theme.gray60}
                            keyboardType="numeric"
                            value={inputBirth.month}
                            onChangeText={(newMonth) => {setInputBirth((prevBirth => ({...prevBirth, month: newMonth})));}}
                            maxLength={2}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input4.current.focus()}
                            ref={ref_input3}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={[styles.inputBirth, styles.inputBirthText]}
                            placeholder="일"
                            placeholderTextColor={theme.gray60}
                            keyboardType="numeric"
                            value={inputBirth.day}
                            onChangeText={(newDay) => {setInputBirth((prevBirth => ({...prevBirth, day: newDay})));}}
                            maxLength={2}
                            returnKeyType="done"
                            ref={ref_input4}
                        />
                    </View>
                </View>

                {modalVisible && (
                    <CancelModal 
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        onConfirm={handleConfirm}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

export default UserInfo;