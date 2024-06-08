import { View, Text, StatusBar, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./SpaceModalStyle"

export default function SpaceModal({isVisible, onClose, title, sub, btn1, btn2}) {
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
                                style={styles.noBtn}>
                                <Text style={styles.noText}>{btn2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
