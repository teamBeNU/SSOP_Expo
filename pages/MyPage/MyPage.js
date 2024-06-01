import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import RightArrow from "../../assets/icons/ic_RightArrow_small_line.svg";

import { styles } from "./MyPageStyle";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

function MyPage({navigation}) {
    return (
        <View style={styles.MyPageMain}>
            <View style={[styles.flexDirectionRow, styles.accountManageContainer]}>
                <Text style={styles.userName}>김슈니 님</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('계정관리')}
                >
                    <Text style={styles.accountManageText}>계정관리</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <View style={[styles.flexDirectionRow, styles.infoBtn, styles.borderBottom]}>
                    <Text style={styles.infoText}>자주 묻는 질문</Text>
                    <TouchableOpacity>
                        <RightArrow />
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexDirectionRow, styles.infoBtn, styles.borderBottom]}>
                    <Text style={styles.infoText}>개인정보 처리방침</Text>
                    <TouchableOpacity>
                        <RightArrow />
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexDirectionRow, styles.infoBtn]}>
                    <Text style={styles.infoText}>이용약관</Text>
                    <TouchableOpacity>
                        <RightArrow />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.logoutContainer}>
                <TouchableOpacity>
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MyPage;