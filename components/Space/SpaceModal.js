import { View, Text, TouchableOpacity, Modal, TextInput, Keyboard } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";
import { theme } from "../../theme";

import { styles } from "./SpaceModalStyle"

export const SpaceModal = ({ isVisible, onClose, onConfirm, title, sub, btn1, btn2, toast }) => {

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{title}</Text>
                        {sub ? <Text style={styles.modalSubText}>{sub}</Text> : null}
                        <View style={styles.Btn}>
                            <TouchableOpacity
                                style={styles.yesBtn} onPress={onClose}>
                                <Text style={styles.yesText}>{btn1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.noBtn} onPress={() => { onConfirm(); onClose(); }}>
                                <Text style={styles.noText}>{btn2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const SpaceNameChangeModal = ({ isVisible, onClose, groupName, btn1, btn2, onConfirm }) => {

    const [inputName, setInputName] = useState(groupName);

    useEffect(() => {
        setInputName(groupName); // groupName이 변경될 때마다 inputName 업데이트
    }, [groupName]);

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={groupName}
                            placeholderTextColor={theme.gray60}
                            keyboardType='default'
                            value={inputName}
                            onChangeText={setInputName}
                            returnKeyType='done'
                            blurOnSubmit={false}
                        />
                        <View style={styles.Btn}>
                            <TouchableOpacity
                                style={styles.yesBtn} onPress={onClose}>
                                <Text style={styles.yesText}>{btn1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.noBtn} 
                                onPress={() => {
                                    onConfirm(inputName); // 새로운 이름 전달
                                    onClose(); // 모달 닫기
                                }}>
                                <Text style={styles.noText}>
                                    {btn2}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}