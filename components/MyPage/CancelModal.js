import { View, Text, StatusBar, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./CancelModalStyle"

export default function CancelModal({modalVisible, setModalVisible, onConfirm}) {
    return (
        <View>
            <StatusBar backgroundColor="rgba(0,0,0,0.4)" translucent={true} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>정보 변경을 취소하시겠습니까?</Text>
                        <View style={styles.Btn}>
                            <TouchableOpacity
                                style={styles.yesBtn}
                                onPress={onConfirm}>
                                <Text style={styles.yesText}>네, 취소할래요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.noBtn}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.noText}>마저 변경할래요</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
