import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";

import { styles } from "./AvatarCustomStyles";
import AutoAvatarIcon from "../../assets/icons/ic_autoAvatar_small_line.svg";
import UndoIcon from "../../assets/icons/ic_undo_small_line.svg";
import RedoIcon from "../../assets/icons/ic_redo_small_line.svg";
import RestartIcon from "../../assets/icons/ic_restart_small_line.svg";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function AvatarCustom({step: initalStep, onStepChange}) {
    const [step, setStep] = useState(initalStep);
    const [avaIndex, setAvaIndex] = useState(1);

    const handleAvata = (id) => {
        setAvaIndex(id);
    }

    const handleNext = () => {
        const nextStep = step + 1;
        setStep(nextStep);
        onStepChange(nextStep);
    }

    return (
        <View style={styles.avatarContainer}>
            <View style={styles.avatarView}>
                <View style={styles.avatarDo}>
                    <TouchableOpacity>
                        <UndoIcon />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <RedoIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarAuto}>
                    <TouchableOpacity style={styles.flexDirectionRow}>
                        <AutoAvatarIcon style={styles.autoAvatarIcon} />
                        <Text style={styles.avatarAutoText}>자동생성</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarRestart}>
                    <TouchableOpacity>
                        <RestartIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarBg}></View>
            </View>
            <View style={styles.avatarItemContainer}>
                <View style={styles.avatarItemList}>
                    <TouchableOpacity
                        onPress={() => handleAvata(1)}
                    >
                        <Text style={avaIndex === 1 ? styles.avatarItemListTextOn : styles.avatarItemListTextOff}>이목구비</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleAvata(2)}
                    >
                        <Text style={avaIndex === 2 ? styles.avatarItemListTextOn : styles.avatarItemListTextOff}>헤어</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleAvata(3)}
                    >
                        <Text style={avaIndex === 3 ? styles.avatarItemListTextOn : styles.avatarItemListTextOff}>옷</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleAvata(4)}
                    >
                        <Text style={avaIndex === 4 ? styles.avatarItemListTextOn : styles.avatarItemListTextOff}>악세사리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleAvata(5)}
                    >
                        <Text style={avaIndex === 5 ? styles.avatarItemListTextOn : styles.avatarItemListTextOff}>배경</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {avaIndex === 1 && (
                        <Text>이목구비</Text>
                    )}
                    {avaIndex === 2 && (
                        <Text>헤어</Text>
                    )}
                    {avaIndex === 3 && (
                        <Text>옷</Text>
                    )}
                    {avaIndex === 4 && (
                        <Text>악세사리</Text>
                    )}
                    {avaIndex === 5 && (
                        <Text>배경</Text>
                    )}
                </View>
                {/* <TouchableOpacity onPress={handleNext}>
                    <Text 
                        style={[styles.btnNextText, {backgroundColor: "black"}, {padding: 10}, {width: 200}]}>임시 버튼: 다음으로 넘어가기
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}