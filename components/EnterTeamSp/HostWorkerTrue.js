import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostWorkerTrue({ workerOptional }) {

    const [isEmpty, setIsEmpty] = useState(false);

    const [card_company, setCompany] = useState('');
    const [card_job, setJob] = useState('');
    const [card_position, setPosition] = useState('');
    const [card_part, setPart] = useState('');

    const [showCompany, setShowCompany] = useState(1);
    const [showJob, setShowJob] = useState(1);
    const [showPosition, setShowPosition] = useState(1);
    const [showPart, setShowPart] = useState(1);

    const companyRef = useRef(null);
    const jobRef = useRef(null);
    const positionRef = useRef(null);
    const partRef = useRef(null);

    useEffect(() => {
        if (workerOptional) {
            setShowCompany(workerOptional.showCompany);
            setShowJob(workerOptional.showJob);
            setShowPosition(workerOptional.showPosition);
            setShowPart(workerOptional.showPart);
        }
    }, [workerOptional]);
    
    return (
        <View>
            <Text style={styles.title}> 학교 속 나에 대해 더 알려주세요. </Text>
            <Text style={styles.subtitle}> 호스트가 지정한 필수 정보예요. </Text>

            {/* 회사 */}
            {showCompany && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>회사명<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="회사명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_company}
                        onChangeText={setCompany}
                        ref={companyRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 회사명을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 직무 */}
            {showJob && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>직무<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="직무를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_job}
                        onChangeText={setJob}
                        ref={jobRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 직무를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 직위 */}
            {showPosition && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>직위<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="직위를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_position}
                        onChangeText={setPosition}
                        ref={positionRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 직위를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 부서 */}
            {showPart && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>부서<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="소속 부서를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_part}
                        onChangeText={setPart}
                        ref={partRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 소속 부서를 입력해 주세요.</Text>
                    )}
                </View>
            )}
        </View>
    )
}