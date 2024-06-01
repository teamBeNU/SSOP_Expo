import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Pressable, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./CancelModalStyle"

export default function CancelModal({modalVisible, setModalVisible, onConfirm}) {
    return (
        <View>
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
                            <Pressable
                                style={styles.yesBtn}
                                onPress={onConfirm}>
                                <Text style={styles.yesText}>네, 취소할래요</Text>
                            </Pressable>
                            <Pressable
                                style={styles.noBtn}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.noText}>마저 변경할래요</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
