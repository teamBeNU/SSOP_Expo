import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import Select from "../../assets/teamSp/select.svg";
import "react-native-gesture-handler";

export default function HostWorkerTrue() {

    const [isEmpty, setIsEmpty] = useState(false);

    const [card_company, setCompany] = useState('');
    const [card_job, setJob] = useState('');
    const [card_position, setPosition] = useState('');
    const [card_part, setPart] = useState('');

    const [showCompany, setShowCompany] = useState(1);
    const [showJob, setShowJob] = useState(1);
    const [showPosition, setShowPosition] = useState(1);
    const [showPart, setShowPart] = useState(1);

    const emptyCompany = card_company.trim() === '';
    const emptyJob = card_job.trim() === '';
    const emptyPosition = card_position.trim() === '';
    const emptyPart = card_part.trim() === '';

    const companyRef = useRef(null);
    const jobRef = useRef(null);
    const positionRef = useRef(null);
    const partRef = useRef(null);
    return (
        <View>
            <Text style={styles.title}> 학교 속 나에 대해 더 알려주세요. </Text>
            <Text style={styles.subtitle}> 호스트가 지정한 필수 정보예요. </Text>

            {/* 회사 */}
            {showCompany && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>회사명</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyCompany && styles.inputEmpty]}
                        placeholder="회사명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_company}
                        onChangeText={setCompany}
                        ref={companyRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyCompany && (
                        <Text style={styles.inputEmptyText}> 회사명을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 직무 */}
            {showJob && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>직무</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyJob && styles.inputEmpty]}
                        placeholder="직무를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_job}
                        onChangeText={setJob}
                        ref={jobRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyJob && (
                        <Text style={styles.inputEmptyText}> 직무를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 직위 */}
            {showPosition && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>직위</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyPosition && styles.inputEmpty]}
                        placeholder="직위를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_position}
                        onChangeText={setPosition}
                        ref={positionRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyPosition && (
                        <Text style={styles.inputEmptyText}> 직위를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 부서 */}
            {showPart && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>부서</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyPart && styles.inputEmpty]}
                        placeholder="소속 부서를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_part}
                        onChangeText={setPart}
                        ref={partRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyPart && (
                        <Text style={styles.inputEmptyText}> 소속 부서를 입력해 주세요.</Text>
                    )}
                </View>
            )}
        </View>
    )
}