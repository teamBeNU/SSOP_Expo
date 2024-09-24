import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostWorkerFalse() {

    const [card_company, setCompany] = useState('');
    const [card_job, setJob] = useState('');
    const [card_position, setPosition] = useState('');
    const [card_part, setPart] = useState('');

    const [showCompany, setShowCompany] = useState(0);
    const [showJob, setShowJob] = useState(0);
    const [showPosition, setShowPosition] = useState(0);
    const [showPart, setShowPart] = useState(0);

    const companyRef = useRef(null);
    const jobRef = useRef(null);
    const positionRef = useRef(null);
    const partRef = useRef(null);

    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Text style={styles.title}> 더 자세히 알려주실래요? </Text>
            <Text style={styles.subtitle}> 정보를 더 추가할 수 있어요. </Text>

            {/* 회사 */}
            {!showCompany && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학교명</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="회사명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_company}
                        onChangeText={setCompany}
                        ref={companyRef}
                    />
                </View>
            )}

            {/* 직무 */}
            {!showJob && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>직무</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="직무를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_job}
                        onChangeText={setJob}
                        ref={jobRef}
                    />
                </View>
            )}

            {/* 직위 */}
            {!showPosition && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>직위</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="직위를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_position}
                        onChangeText={setPosition}
                        ref={positionRef}
                    />
                </View>
            )}

            {/* 부서 */}
            {!showPart && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>부서</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="소속 부서를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_part}
                        onChangeText={setPart}
                        ref={partRef}
                    />
                </View>
            )}
        </View>
    )
}