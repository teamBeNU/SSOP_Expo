import { Dimensions, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles } from "./EditCardStyle";
import React, { useState, useRef } from 'react';
import { theme } from "../../theme";
import * as Progress from 'react-native-progress';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import DoneIcon from '../../assets/icons/ic_done_small_line.svg';
import DoneIconBlue from '../../assets/icons/ic_done_small_line_blue.svg';

function EditCard() {
    const [isSecret, setIsSecret] = useState(false);
    const [step, setStep] = useState(1);
    const ref_input = useRef();

    const [birth, setBirth] = useState('');
    const [MBTI, setMBTI] = useState('');

    const handleMBTI = (input) => {
        setMBTI(input.toUpperCase());
    }

    const handleNext = () => {
        if (step === 1 ) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            {( // 프로그레스 바
                <Progress.Bar
                    progress={step / 3}
                    width={null}
                    height={2}
                    color={theme.green}
                    borderWidth={0}
                />
            )}
            {step === 1 && (
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
            <View style={styles.content}>

                <Text style={styles.title}>나에 대한 기본 정보 수정하기</Text>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>이름*</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="이름을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>한줄소개*</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="나에 대해 간단히 알려주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>MBTI</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="MBTI를 입력해 주세요."
                    value={MBTI}
                    onChangeText={handleMBTI}
                    placeholderTextColor={theme.gray60}
                    maxLength={4}
                    />
                </View>

                <View style={styles.line} />

                <View style={styles.inputContainer}>
                <Text style={styles.subTitle}>생년월일 8자리</Text>
                <TextInput 
                    style={{...styles.input, marginBottom: 20}}
                    placeholder="YYYY/MM/DD"
                    placeholderTextColor={theme.gray60}
                    keyboardType="numeric"
                    value={birth}
                    onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9]/g, '');
                        
                        let formatted = cleaned;
                        if (cleaned.length > 4) {
                            formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}`;
                        }
                        if (cleaned.length > 6) {
                            formatted = `${formatted}/${cleaned.slice(6, 8)}`;
                        }
            
                        setBirth(formatted);
                       }}
                       maxLength={10}
                       ref={ref_input}
                    />
                <TouchableOpacity style={styles.birthSecret} onPress={() => setIsSecret(!isSecret)}>
                    <DoneIcon style={{width: 16, height:16, color: isSecret ? '#00C2ED' : '#949494'}}/>
                    <Text>생년월일은 나이 계산에만 사용하고 공개 안 할래요</Text>
                </TouchableOpacity>
                </View>
                </View>

                <TouchableOpacity style={styles.memoBtn} onPress={handleNext}>
                <Text style={styles.memoBtnText}>다음으로</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}

            {step === 2 && (
            <View style={styles.container}>
                <Text style={styles.title}>내 연락처와 SNS 계정 수정하기</Text>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>전화번호</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="전화번호를 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>이메일</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="이메일을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={styles.line} />

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>Instagram</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="인스타그램 계정을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>X(트위터)</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="X 계정을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <TouchableOpacity style={styles.memoBtn} onPress={handleNext}>
                <Text style={styles.memoBtnText}>다음으로</Text>
                </TouchableOpacity>
            </View>
            )}

            {step === 3 && (
            <View style={styles.container}>
                <Text style={styles.title}>나에 대한 기본 정보 수정하기</Text>

                <TouchableOpacity style={styles.memoBtn} onPress={handleNext}>
                <Text style={styles.memoBtnText}>수정완료</Text>
                </TouchableOpacity>
            </View>
            )}
            
            
            </View>
            </TouchableWithoutFeedback>
    );
}
export default EditCard;

