import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./MyPageStyle";
import RightArrow from "../../assets/icons/ic_RightArrow_small_line.svg";
import MyPageModal from "../../components/MyPage/MyPageModal";

function UserAccount({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);

    // 모달 - 취소 버튼 눌렀을 때
    const handleConfirm = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    return (
        <View style={styles.UserAccountMain}>
            <TouchableOpacity 
                style={[styles.flexDirectionRow, styles.infoBtn]}
                onPress={() => navigation.navigate('MY 이름 및 생년월일 변경')}
            >
                <Text style={styles.infoText}>이름 및 생년월일 변경</Text>
                <RightArrow />
            </TouchableOpacity>
            <View style={styles.borderBottom}></View>
            <TouchableOpacity 
                style={[styles.flexDirectionRow, styles.infoBtn]}
                onPress={() => navigation.navigate('MY 연락처 변경')}
            >
                <Text style={styles.infoText}>연락처 변경</Text>
                <RightArrow />
            </TouchableOpacity>
            <View style={styles.borderBottom}></View>
            <TouchableOpacity 
                style={[styles.flexDirectionRow, styles.infoBtn]}
                onPress={() => navigation.navigate('MY 비밀번호 변경')}
            >
                <Text style={styles.infoText}>비밀번호 변경</Text>
                <RightArrow />
            </TouchableOpacity>

            <View style={[styles.logoutContainer, {marginLeft: 0}]}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.deleteText}>탈퇴하기</Text>
                </TouchableOpacity>
            </View>

            {modalVisible && (
                <MyPageModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    onConfirm={handleConfirm}
                    modalTitle={'정말 탈퇴하시겠어요?'}
                    modalText={'탈퇴하면 모든 데이터가 삭제되며\n복구할 수 없습니다.'}
                    btn1={'취소하기'}
                    btn2={'탈퇴하기'}
                    btnMargin={42}
                />
            )}
        </View>
    );
}

export default UserAccount;