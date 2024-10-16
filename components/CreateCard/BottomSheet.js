import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./BottomSheetStyle";
import CloseBtn from '../../assets/icons/close.svg';

export default function BottomSheet({modalVisible, setModalVisible, setCreateStep, setStep, setCardTemplate}) {
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;    // 애니메이션 초기 상태
    const translateY = panY.interpolate({ // panY에 따라 BottomSheet의 y축 위치를 결정
    	inputRange: [-1, 0, 1], // inputRage의 -1을 outpuRage의 0으로 치환하기 때문에 panY가 0보다 작아져도 BottomSheet의 y축 위치에는 변화가 없음
    	outputRange: [0, 0, 1],
    });

    // 바텀시트를 초기 위치로 올리는 함수
    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,     // 어떤 값으로 변경할지(필수, Y축으로 0만큼 이동
        duration: 300,  // 애니메이션 걸리는 시간(ms)
        useNativeDriver: true  // 네이티브 드라이버 사용 여부(필수)
    })
    
    // 바텀시트를 내리는 함수
    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,  
        duration: 300,
        useNativeDriver: true  
    })

    useEffect(() => {
        if(modalVisible) {
            resetBottomSheet.start();
        }
    })

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false);
        })
    }

    return (
        <Modal
            visible={modalVisible}
            animationType="fade"    // 뒷 배경 흐려지는 효과
            transparent={true}      // 뒷 배경 투명으로 만드는 효과
            statusBarTranslucent    // 안드로이드 statusBar에 효과 적용
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{translateY: translateY}]}}
                >
                    <View style={styles.title}>
                        <Text style={styles.titleText}>학생 유형 선택</Text>
                        <TouchableOpacity 
                            style={styles.closeBtn}
                            onPress={closeModal}    
                        >
                            <CloseBtn />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                setCardTemplate("studentSchool");
                                setCreateStep(2);
                                setStep(1);
                            }}
                        >
                            <Text style={styles.btnText}>초/중/고등학생이에요</Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                setCardTemplate("studentUniv");
                                setCreateStep(2);
                                setStep(1);
                            }}
                        >
                            <Text style={styles.btnText}>대학(원)생이에요</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}
