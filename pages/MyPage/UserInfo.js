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
    const [name, setName] = useState('김슈니');
    const [birth, setBirth] = useState({
        year: '2001',
        month: '1',
        day: '2',
    });
    const [isFull, setIsFull] = useState({
        name: true,
        birth: true,
    })
    const [modalVisible, setModalVisible] = useState(false);

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    useEffect(() => {
        const isNameFull = name !== '';
        const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
        setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull})));

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={() => {
                        if (isNameFull && isBirthFull) {
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
                    // onPress={handleNext}
                >
                    <Text style={styles.saveBtn}>저장</Text>
                </TouchableOpacity>
            ),
        });
    }, [name, birth, navigation]);

    const handleConfirm = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.UserInfoMain}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>이름*</Text>
                    <TextInput 
                        style={styles.customInput}
                        placeholder="이름을 입력하세요."
                        placeholderTextColor={theme.gray60}
                        keyboardType="default"
                        value={name}
                        onChangeText={setName}
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
                            value={birth.year}
                            onChangeText={(newYear) => {setBirth((prevBirth => ({...prevBirth, year: newYear})));}}
                            // onChangeText={setYear}
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
                            value={birth.month}
                            onChangeText={(newMonth) => {setBirth((prevBirth => ({...prevBirth, month: newMonth})));}}
                            // onChangeText={setMonth}
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
                            value={birth.day}
                            onChangeText={(newDay) => {setBirth((prevBirth => ({...prevBirth, day: newDay})));}}
                            // onChangeText={setDay}
                            maxLength={2}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input5.current.focus()}
                            ref={ref_input4}
                            blurOnSubmit={false}
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