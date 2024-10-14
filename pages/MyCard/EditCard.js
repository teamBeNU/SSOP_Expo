import { Dimensions, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native"
import { styles } from "./EditCardStyle"
import React, { useState, useRef, useEffect } from 'react'
import { theme } from "../../theme"
import * as Progress from 'react-native-progress'
import { useNavigation, useRoute } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg'
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg'
import DoneIcon from '../../assets/icons/ic_done_small_line.svg'
import DownIcon from '../../assets/icons/ic_DownArrow_small_line.svg'

function EditCard() {

    const route = useRoute();
    const {card} = route.params;

    //기본 정보
    const [name, setName] = useState(card.cardEssential.card_name);
    const [MBTI, setMBTI] = useState(card.cardOptional.card_MBTI ? card.cardOptional.card_MBTI : '');
    const [birth, setBirth] = useState(card.cardOptional.card_bSecret === true ? card.cardOptional.card_birth : '');
    const [introduce, setIntroduce] = useState(card.cardEssential.card_introduction);
    const [isSecret, setIsSecret] = useState(card.cardOptional.card_bSecret === true ? true : false);

    const [tel, setTel] = useState(card.cardOptional.card_tel ? card.cardOptional.card_tel : '');
    const [email, setEmail] = useState(card.cardOptional.card_email ? card.cardOptional.card_email : '');
    const [insta, setInsta] = useState(card.cardOptional.card_sns_insta ? card.cardOptional.card_sns_insta : '');
    const [x, setX] = useState(card.cardOptional.card_sns_x ? card.cardOptional.card_sns_x : '');

    //학생
    const [school, setSchool] = useState(card.student.card_student_school ? card.student.card_student_school : '');
    const [grade, setGrade] = useState(card.student.card_student_grade ? card.student.card_student_grade : '');
    const [major, setMajor] = useState(card.student.card_student_major ? card.student.card_student_major : '');
    const [id, setId] = useState(card.student.card_student_id ? card.student.card_student_id : '');
    const [club, setClub] = useState(card.student.card_student_club ? card.student.card_student_club : '');
    const [role, setRole] = useState(card.student.card_student_role ? card.student.card_student_role : '');
    const [studentStatus, setStudentStatus] = useState(card.student.card_student_status ? card.student.card_student_status : '');
    //직장인
    //팬

    const [step, setStep] = useState(1);
    const ref_input = useRef();

    const handleMBTI = (input) => {
        // 영어만 입력되도록 정규식 필터 적용
        const filteredText = input.replace(/[^a-zA-Z]/g, '');
        setMBTI(filteredText.toUpperCase());
    }

    const navigation = useNavigation();

    const handleSubmit = async () =>  {
        const editCardData = {
            card_name: name,
            card_introduction: introduce,
            card_birth: birth, 
            card_bSecret: isSecret,
            card_tel: tel,
            card_sns_insta: insta,
            card_sns_x: x,
            card_email: email,
            card_MBTI: MBTI,
            // card_music: music,
            // card_movie: movie,
            // card_hobby: hobby,
            // card_address: address,
        };
    
        switch (card.card_template) {
            case 'studentUniv':
                editCardData.student = {
                    card_student_school: school,
                    card_student_grade: grade,
                    card_student_major: major,
                    card_student_id: id,
                    card_student_club: club,
                    card_student_role: role,
                    card_student_status: studentStatus,
                };
                break;
            case 'studentSchool':
                editCardData.student = {
                    card_student_school: school,
                    card_student_grade: grade,
                    card_student_major: major,
                    card_student_id: id,
                    card_student_club: club,
                    card_student_role: role,
                };
                break;
            case 'worker':
                // editCardData.worker = {
    
                // }
                break;
            case 'fan':
            //     editCardData.fan = {
    
            //   }
              break;
            case 'free':
              break;
        }
        console.log('edit : ', editCardData);

        const token = await AsyncStorage.getItem('token');

        const formData = new FormData();
        formData.append('card', {name: 'card', string: JSON.stringify(editCardData), type: 'application/json',});

        try {
            const response = await axios.patch(`http://43.202.52.64:8080/api/card/edit?cardId=${card.cardId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            });

        // Check response status
        if (response.status !== 200) {
            throw new Error(response.data.message || '서버 오류 발생');
        }
    
        console.log('성공:', response.data, '\nform : ', formData);  // response.data already contains parsed JSON
    
        } catch (error) {
        // Show error message from the server or a generic error
        Alert.alert(error.response?.data?.message || error.message || 'Request failed');
        }
    
        navigation.goBack();
    };

    const handleNext = () => {
        if (step === 1 ) {
            setStep(2);
        } else if (step === 2) {
           if (card.card_template === 'studentUniv') setStep(3);
           else if (card.card_template === 'studentSchool') setStep(4);
            // else if (card.card_template === 'worker') setStep(5);
            // else if (card.card_template === 'fan') setStep(6);
            // else if (card.card_template === 'free') setStep(7);
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
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder={name}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>한줄소개*</Text>
                <TextInput 
                    value={introduce}
                    onChangeText={setIntroduce}
                    style={styles.input}
                    placeholder={introduce}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>MBTI</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={MBTI ? MBTI : 'MBTI를 입력해 주세요.'}
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
                    placeholder={birth ? birth : "YYYY/MM/DD"}
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
                        value={tel}
                        onChangeText={setTel}
                        placeholder={tel ? tel : "전화번호를 입력해 주세요."}
                        placeholderTextColor={theme.gray60}
                        keyboardType="number-pad"
                        maxLength={11}
                        />
                    </View>

                    <View style={{...styles.inputContainer, marginBottom: 28}}>
                    <Text style={styles.subTitle}>이메일</Text>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={email ? email : "이메일을 입력해 주세요."}
                        placeholderTextColor={theme.gray60}
                        keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.line} />

                    <View style={{...styles.inputContainer, marginBottom: 28}}>
                    <Text style={styles.subTitle}>Instagram</Text>
                    <TextInput 
                        style={styles.input}
                        value={insta}
                        onChangeText={setInsta}
                        placeholder={insta ? insta : "인스타그램 계정을 입력해 주세요."}
                        placeholderTextColor={theme.gray60}
                        />
                    </View>

                    <View style={{...styles.inputContainer, marginBottom: 28}}>
                    <Text style={styles.subTitle}>X(트위터)</Text>
                    <TextInput 
                        style={styles.input}
                        value={x}
                        onChangeText={setX}
                        placeholder={x ? x : "X 계정을 입력해 주세요."}
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

            
            {step === 3 && ( // 대학생
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
                    value={school}
                    onChangeText={setSchool}
                    placeholder= {school ? school : "학교명을 입력해 주세요."}
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
                    { label: '1학년', value: '1학년', key: '1' },
                    { label: '2학년', value: '2학년', key: '2' },
                    { label: '3학년', value: '3학년', key: '3' },
                    { label: '4학년', value: '4학년', key: '4' },
                    { label: '추가학기', value: '추가학기', key: '5' },
                    { label: '그 외', value: '그 외', key: '6' },
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
                    value={major}
                    onChangeText={setMajor}
                    placeholder={major ? major : "전공을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={styles.line} />

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>학생번호</Text>
                <TextInput 
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder={id ? id : "학번을 입력해 주세요. 예) 17학번"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>역할</Text>
                <TextInput 
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder={role ? role : "프로젝트 혹은 학과 내 역할을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>동아리</Text>
                <TextInput 
                    style={styles.input}
                    value={club}
                    onChangeText={setClub}
                    placeholder={club ? club :"소속된 동아리가 있다면 입력해 주세요."}
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
                    { label: '재학', value: '재학', key: '1' },
                    { label: '휴학', value: '휴학', key: '2' },
                    { label: '졸업 예정', value: '졸업 예정', key: '3' },
                    { label: '졸업', value: '졸업', key: '4' },
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
                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>수정완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}

        {step === 4 && ( // 초중고
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
                    value={school}
                    onChangeText={setSchool}
                    placeholder= {school ? school : "학교명을 입력해 주세요."}
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
                    { label: '1학년', value: '1학년', key: '1' },
                    { label: '2학년', value: '2학년', key: '2' },
                    { label: '3학년', value: '3학년', key: '3' },
                    { label: '4학년', value: '4학년', key: '4' },
                    { label: '5학년', value: '5학년', key: '5' },
                    { label: '6학년', value: '6학년', key: '6' },
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

                <View style={styles.line} />

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>학생번호</Text>
                <TextInput 
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder={id ? id : "학생 번호를 입력해 주세요. 예) 17번"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>역할</Text>
                <TextInput 
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder={role ? role : "학급 혹은 학교 내 역할을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>동아리</Text>
                <TextInput 
                    style={styles.input}
                    value={club}
                    onChangeText={setClub}
                    placeholder={club ? club :"소속된 동아리가 있다면 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>   

                <View style={{...styles.inputContainer, marginBottom: 28}}>
                <Text style={styles.subTitle}>전공</Text>
                <TextInput 
                    style={styles.input}
                    value={major}
                    onChangeText={setMajor}
                    placeholder={major ? major : "전공을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                </ScrollView>

                </View>
                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>수정완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}
            
            
            </View>
            </TouchableWithoutFeedback>
    );
}
export default EditCard;

