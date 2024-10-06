import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import CancelModal from "../../components/MyPage/CancelModal";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";

function UserInfo({navigation}) {
    const [user_name, setUserName] = useState('김슈니');
    const [user_birth, setUserBirth] = useState('2020/03/03');

    const [inputName, setInputName] = useState(user_name);
    const [inputBirth, setInputBirth] = useState(user_birth);

    const [isFull, setIsFull] = useState({
        name: true,
        birth: true,
    })
    const [isNameCorrect, setIsNameCorrect] = useState(true);
    const [isBirthCorrect, setIsBirthCorrect] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    const ref_input2 = useRef();

    // 모달 - 취소 버튼 눌렀을 때
    const handleConfirm = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    // 생년월일 '/' 자동 추가
    useEffect(() => {
        const formatBirth = (input) => {
            const cleaned = input.replace(/\D/g, ''); // 숫자 이외의 문자 제거
            const match = cleaned.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/);
            if (match) {
                return [match[1], match[2], match[3]].filter(Boolean).join('/');
            }
            return input;
        };

        const formattedBirth = formatBirth(inputBirth);
        setInputBirth(formattedBirth);
    }, [inputBirth]);

    // 생년월일 올바른지 확인
    const [isBirthValid, setIsBirthValid] = useState({
        year: false,
        month: false,
        day: false,
    });

    const currentYear = new Date().getFullYear();

    const isLeapYear = (year) => {    // 윤년 구하기
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    const getDayInMonth = (year, month) => {    // 윤달 구하기
        month = parseInt(month, 10) || 0;
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

    const handleBirth = (b) => {    // 생년월일 올바른지 확인
        const birth = b.split('/');

        const year = birth[0];
        const month = birth[1];
        const day = birth[2];

        const days = getDayInMonth(year, month);
        const isYearValid = year > currentYear - 150 && year <= currentYear;
        const isMonthValid = month >= 1 && month <= 12;
        const isDayValid = day >= 1 && day <= days;
    
        setIsBirthValid({
            year: isYearValid,
            month: isMonthValid,
            day: isDayValid,
        });
    }

    useEffect(() => {
        // 입력한 값이 있는지 확인
        const isNameFull = inputName !== '';
        const isBirthFull =  inputBirth !== '';
        setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull})));

        handleBirth(inputBirth);     // 입력한 생일이 올바른지 구하는 함수 호출

        // 기존 유저 정보와 입력한 값이 일치하는지 확인
        const isNCorrect = user_name === inputName;
        const isBCorrect = user_birth === inputBirth;
        setIsNameCorrect(isNCorrect);
        setIsBirthCorrect(isBCorrect);

    }, [inputName, inputBirth, user_name, user_birth]);
    
    // 나가기
    const handleClose = () => {
        if (isFull.name && isFull.birth && isNameCorrect && isBirthCorrect) {
            navigation.goBack();
        } else {
            setModalVisible(true);
        }
    }

    // 헤더 바
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => { handleClose(); }}   // 나가기
                >
                    <CloseIcon style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            ),
        });
    }, [inputName, inputBirth]);

    // 변경사항 저장
    const handleSave = () => {
        if (isFull.name && isFull.birth && isBirthValid.year && isBirthValid.month && isBirthValid.day) {
            setUserName(inputName);
            setUserBirth(inputBirth);
            navigation.navigate('MY');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.userInfoMain}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>이름</Text>
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
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>생년월일 8자리</Text>
                        <TextInput 
                            style={styles.customInput}
                            placeholder="YYYY/MM/DD"
                            placeholderTextColor={theme.gray60}
                            keyboardType="numeric"
                            maxLength={10}
                            value={inputBirth}
                            onChangeText={setInputBirth}
                            returnKeyType="done"
                            ref={ref_input2}
                            blurOnSubmit={true}
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

                <View style={styles.btnFlex} />
                <TouchableOpacity 
                    style={styles.btnNext}
                    onPress={handleSave}
                >
                    <Text style={styles.btnNextText}>변경사항 저장하기</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default UserInfo;