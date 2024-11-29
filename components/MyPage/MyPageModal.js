import { View, Text, StatusBar, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./MyPageModalStyle"

export const MyPageModal= ({ modalVisible, setModalVisible, handleBtn1, handleBtn2, modalTitle, modalText, btn1, btn2 }) => {
    return (
        <View>
            {/* <StatusBar backgroundColor="rgba(0,0,0,0.4)" translucent={true} /> */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalTextContainer}>
                                <Text style={styles.modalTitle}>{modalTitle}</Text>
                                {modalText &&
                                    <Text style={styles.modalText}>{modalText}</Text>
                                }
                            </View>
                            <View style={styles.Btn}>
                                {btn1 && (
                                    <TouchableOpacity
                                        style={styles.btn1}
                                        onPress={handleBtn1}>
                                        <Text style={styles.btn1Text}>{btn1}</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={styles.btn2}
                                    onPress={handleBtn2}>
                                    <Text style={styles.btn2Text}>{btn2}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}


export const WithdrawModal = ({ modalVisible, setModalVisible, handleBtn, modalTitle, modalText, btn }) => {
    return (
        <View>
            {/* <StatusBar backgroundColor="rgba(0,0,0,0.4)" translucent={true} /> */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalTextContainer}>
                                <Text style={styles.modalTitle}>{modalTitle}</Text>
                                {modalText &&
                                    <Text style={styles.modalText}>{modalText}</Text>
                                }
                            </View>
                            <View style={styles.Btn}>
                                <TouchableOpacity
                                    style={styles.btnWithdraw}
                                    onPress={handleBtn}>
                                    <Text style={styles.btnWithdrawText}>{btn}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}