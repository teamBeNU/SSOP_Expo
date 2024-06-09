import { View, Text, TouchableOpacity, Modal, TextInput, Keyboard } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";
import { theme } from "../../theme";

import { styles } from "./SpaceModalStyle"

export const SpaceModal = ({isVisible, onClose, title, sub, btn1, btn2, toast}) => {
    
    const handleBtn2Press = () => {
        if (typeof toast === 'function') {
            toast();
        }
    };

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
                                style={styles.noBtn} onPress={() => {handleBtn2Press(); onClose();}}>
                                <Text style={styles.noText}>{btn2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const SpaceNameChangeModal = ({isVisible, onClose, groupName, btn1, btn2, toast}) => {
    
    const [inputName, setInputName] = useState();

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
                                style={styles.noBtn} onPress={onClose}>
                                <Text style={styles.noText}>{btn2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}