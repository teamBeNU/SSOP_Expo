import { Dimensions, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles } from "./EditCardStyle";
import React, { useState, useRef, useEffect } from 'react';
import { theme } from "../../theme";
import * as Progress from 'react-native-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import DoneIcon from '../../assets/icons/ic_done_small_line.svg';
import DownIcon from '../../assets/icons/ic_DownArrow_small_line.svg'

function EditCard() {
    const [isSecret, setIsSecret] = useState(false);
    const [step, setStep] = useState(1);
    const ref_input = useRef();

    const [birth, setBirth] = useState('');
    const [MBTI, setMBTI] = useState('');

    const [grade, setGrade] = useState('');
    const [studentStatus, setStudentStatus] = useState('');

    const handleMBTI = (input) => {
          // 영어만 입력되도록 정규식 필터 적용
        const filteredText = input.replace(/[^a-zA-Z]/g, '');
        setMBTI(filteredText.toUpperCase());
    }

    const navigation = useNavigation();

    const handleSubmit = () =>  {
        navigation.goBack();
    }

    const handleNext = () => {
        if (step === 1 ) {
            setStep(2);
        } else if (step === 2) {

            setStep(3);
        } else if (step === 3) {
            
        }
    }

    const handleBack = () => {
        switch (step) {
          case 1:
            break;
          default:
            setStep(step - 1);
            break;
        }
      };

      const handleGoBack = () => {
        navigation.goBack();
      };

    const handleHeaderLeft = (onPress) => {
        if (step > 1) {
          return (
            <TouchableOpacity onPress={handleBack}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          );
        } else if (step === 1) {
            return (
              <TouchableOpacity onPress={handleGoBack}>
                <CloseIcon style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            );
          }
      };

      const handleHeaderRight = (onPress) => {
        if(step === 1 || step === 2) {
            return (
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.submit}>완료</Text>
                </TouchableOpacity>
            )
        }
      }

      useEffect(() => {
        navigation.setOptions({
          headerLeft: handleHeaderLeft,
          headerRight: handleHeaderRight
        });
      }, [navigation, step]);

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
            <View style={{marginBottom: 120, marginTop: 17}}>

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
                <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
                >
                <View style={{marginBottom: 120, marginTop: 20}}>

                    <Text style={styles.title}>내 연락처와 SNS 계정 수정하기</Text>
                    
                    <View style={{marginBottom: 120}}>
                    <View style={{...styles.inputContainer, marginBottom: 28}}>
                    <Text style={styles.subTitle}>전화번호</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="전화번호를 입력해 주세요."
                        placeholderTextColor={theme.gray60}
                        keyboardType="number-pad"
                        maxLength={11}
                        />
                    </View>

                    <View style={{...styles.inputContainer, marginBottom: 28}}>
                    <Text style={styles.subTitle}>이메일</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="이메일을 입력해 주세요."
                        placeholderTextColor={theme.gray60}
                        keyboardType="email-address"
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
                 </View>
                </View>

                <TouchableOpacity style={styles.memoBtn} onPress={handleNext}>
                <Text style={styles.memoBtnText}>다음으로</Text>
                </TouchableOpacity>
           
            </KeyboardAvoidingView>
            )}

            {step === 3 && (
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120, marginTop: 33}}>

                <Text style={styles.title}>학교 속 나에 대한 정보 수정하기</Text>

                <ScrollView>
                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>학교*</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="학교명을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>학년*</Text>
                <View style={styles.dropDown}>
                <RNPickerSelect
                    onValueChange={(value) => setGrade(value)}
                    value={grade}
                    items={[
                    { label: '1학년', value: '1학년' },
                    { label: '2학년', value: '2학년' },
                    { label: '3학년', value: '3학년' },
                    { label: '4학년', value: '4학년' },
                    { label: '추가학기', value: '추가학기' },
                    { label: '그 외', value: '그 외' },
                    ]}
                    placeholder={{ label: '학년', value: null }}
                    useNativeAndroidPickerStyle={false} // Android에서 기본 스타일을 비활성화
                    style={{
                        inputIOS: styles.dropDownInput, // iOS 스타일 적용
                        inputAndroid: styles.dropDownInput, // Android 스타일 적용
                        iconContainer: styles.dropDownIconContainer, // 아이콘 위치 조정
                      }}
                      Icon={() => <DownIcon />} // 드롭다운 화살표 아이콘
                />
                </View>
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>전공*</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="전공을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={styles.line} />

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>학생번호</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="학번을 입력해 주세요. 예) 17학번"
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>역할</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="프로젝트 혹은 학과 내 역할을 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>    

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>동아리</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="소속된 동아리가 있다면 입력해 주세요."
                    placeholderTextColor={theme.gray60}
                    />
                </View>   

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>재학상태</Text>
                <View style={styles.dropDown}>
                <RNPickerSelect
                    onValueChange={(value) => setStudentStatus(value)}
                    value={studentStatus}
                    items={[
                    { label: '재학', value: '재학' },
                    { label: '휴학', value: '휴학' },
                    { label: '졸업 예정', value: '졸업 예정' },
                    { label: '졸업', value: '졸업' },
                    ]}
                    placeholder={{ label: '학년', value: null }}
                    useNativeAndroidPickerStyle={false} // Android에서 기본 스타일을 비활성화
                    style={{
                        inputIOS: styles.dropDownInput, // iOS 스타일 적용
                        inputAndroid: styles.dropDownInput, // Android 스타일 적용
                        iconContainer: styles.dropDownIconContainer, // 아이콘 위치 조정
                      }}
                      Icon={() => <DownIcon />} // 드롭다운 화살표 아이콘
                />
                </View>
                </View>
                </ScrollView>

                </View>
                <TouchableOpacity style={styles.memoBtn} onPress={handleNext}>
                <Text style={styles.memoBtnText}>수정완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}
            
            
            </View>
            </TouchableWithoutFeedback>
    );
}
export default EditCard;

