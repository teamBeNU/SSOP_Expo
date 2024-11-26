import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostWorkerTrue({ workerOptional, onData, onDataChange, isNextClick, setIsNextClick, setStep }) {

    const [isEmpty, setIsEmpty] = useState({
        company: true,
        job: true,
        position: true,
        part: true,
    });
    const [isOk, setIsOk] = useState({
        company: true,
        job: true,
        position: true,
        part: true,
    });

    const [card_company, setCompany] = useState(onData?.card_company || '');
    const [card_job, setJob] = useState(onData?.card_job || '');
    const [card_position, setPosition] = useState(onData?.card_position || '');
    const [card_part, setPart] = useState(onData?.card_part || '');

    const [showCompany, setShowCompany] = useState(1);
    const [showJob, setShowJob] = useState(1);
    const [showPosition, setShowPosition] = useState(1);
    const [showPart, setShowPart] = useState(1);

    const companyRef = useRef(null);
    const jobRef = useRef(null);
    const positionRef = useRef(null);
    const partRef = useRef(null);

    // 상위 컴포넌트(HostTemplate)로 데이터를 전달
    useEffect(() => {
        onDataChange({ card_company, card_job, card_position, card_part });
    }, [card_company, card_job, card_position, card_part]);

    useEffect(() => {
        if (workerOptional) {
            setShowCompany(workerOptional.showCompany);
            setShowJob(workerOptional.showJob);
            setShowPosition(workerOptional.showPosition);
            setShowPart(workerOptional.showPart);
        }
    }, [workerOptional]);
    
    // 질문 입력했는지 여부
    useEffect(() => {
        setIsNextClick(false);
        setIsEmpty({
            company: card_company === '' ? true : false,
            job: card_job === '' ? true : false,
            position: card_position === '' ? true : false,
            part: card_part === '' ? true : false,
        });
    }, []);
    
    const handleEmpty = (key, value) => {
        setIsEmpty((prev) => ({ ...prev, [key]: value === '' }));
    };
    
    // 다음으로 버튼
    useEffect(() => {
        if (isNextClick) {
            let companyOk = !showCompany || !isEmpty.company;
            let jobOk = !showJob || !isEmpty.job;
            let positionOk = !showPosition || !isEmpty.position;
            let partOk = !showPart || !isEmpty.part;
    
            setIsOk({
                company: companyOk,
                job: jobOk,
                position: positionOk,
                part: partOk,
            })

            if (companyOk && jobOk && positionOk && partOk) {
                setStep(4);
            }
    
            setIsNextClick(false);
        }
    }, [isNextClick, showCompany, showJob, showPosition, showPart, isEmpty]);
    
    return (
        <View>
            {/* 회사 */}
            {showCompany && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>회사명<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.company && styles.inputEmpty]}
                        placeholder="회사명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_company}
                        onChangeText={(text) => {setCompany(text); handleEmpty('company', text);}}
                        ref={companyRef}
                    />
                    {!isOk.company && (
                        <Text style={styles.inputEmptyText}> 회사명을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 직무 */}
            {showJob && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>직무<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.job && styles.inputEmpty]}
                        placeholder="직무를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_job}
                        onChangeText={(text) => {setJob(text); handleEmpty('job', text);}}
                        ref={jobRef}
                    />
                    {!isOk.job && (
                        <Text style={styles.inputEmptyText}> 직무를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 직위 */}
            {showPosition && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>직위<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.position && styles.inputEmpty]}
                        placeholder="직위를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_position}
                        onChangeText={(text) => {setPosition(text); handleEmpty('position', text);}}
                        ref={positionRef}
                    />
                    {!isOk.position && (
                        <Text style={styles.inputEmptyText}> 직위를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 부서 */}
            {showPart && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>부서<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.part && styles.inputEmpty]}
                        placeholder="소속 부서를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_part}
                        onChangeText={(text) => {setPart(text); handleEmpty('part', text);}}
                        ref={partRef}
                    />
                    {!isOk.part && (
                        <Text style={styles.inputEmptyText}> 소속 부서를 입력해 주세요.</Text>
                    )}
                </View>
            )}
        </View>
    )
}