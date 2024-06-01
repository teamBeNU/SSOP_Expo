import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import RightArrow from "../../assets/icons/ic_RightArrow_small_line.svg";

import { styles } from "./MyPageStyle";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

function UserAccount({navigation}) {
    return (
        <View style={styles.accountManageMain}>
            <View style={[styles.flexDirectionRow, styles.infoBtn, styles.borderBottom]}>
                <Text style={styles.infoText}>이름 및 생년월일 변경</Text>
                <TouchableOpacity>
                    <RightArrow />
                </TouchableOpacity>
            </View>
            <View style={[styles.flexDirectionRow, styles.infoBtn, styles.borderBottom]}>
                <Text style={styles.infoText}>연락처 변경</Text>
                <TouchableOpacity>
                    <RightArrow />
                </TouchableOpacity>
            </View>
            <View style={[styles.flexDirectionRow, styles.infoBtn]}>
                <Text style={styles.infoText}>비밀번호 변경</Text>
                <TouchableOpacity>
                    <RightArrow />
                </TouchableOpacity>
            </View>

            <View style={[styles.logoutContainer, {marginLeft: 0}]}>
                <TouchableOpacity>
                    <Text style={styles.logoutText}>탈퇴하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default UserAccount;