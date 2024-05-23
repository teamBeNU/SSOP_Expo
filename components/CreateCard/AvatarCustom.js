import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";

import { styles } from "./AvatarCustomStyles";

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
                        <Text>전</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>후</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarAuto}>
                    <TouchableOpacity style={styles.flexDirectionRow}>
                        <Text style={styles.avatarAutoText}>ㅁ</Text>
                        <Text style={styles.avatarAutoText}>자동생성</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarRestart}>
                    <TouchableOpacity>
                        <Text style={styles.avatarRestartText}>ㅁ</Text>
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
                        <View><Text>이목구비</Text></View>
                    )}
                    {avaIndex === 2 && (
                        <View><Text>헤어</Text></View>
                    )}
                    {avaIndex === 3 && (
                        <View><Text>옷</Text></View>
                    )}
                    {avaIndex === 4 && (
                        <View><Text>악세사리</Text></View>
                    )}
                    {avaIndex === 5 && (
                        <View><Text>배경</Text></View>
                    )}
                </View>
                <TouchableOpacity onPress={handleNext}>
                    <Text 
                        style={[styles.btnNextText, {backgroundColor: "black"}, {padding: 10}, {width: 200}]}>임시 버튼: 다음으로 넘어가기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}