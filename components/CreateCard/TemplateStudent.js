import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";
import AvatarCustom from "./AvatarCustom";

import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import DoneIcon from "../../assets/icons/ic_done_small_line.svg";
import CreateCardDoneSvg from "../../assets/createCard/createCardDone.svg";
import CoverAvatar from "../../assets/createCard/coverAvatar.svg";
import CoverPicture from "../../assets/createCard/coverPicture.svg";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function TemplateStudent({navigation, goToStepOne}) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState({
        year: '',
        month: '',
        day: '',
    });
    const [bSecret, setBSecret] = useState(false);
    const [tel, setTel] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [major, setMajor] = useState('');
    const [role, setRole] = useState('');
    const [club, setClub] = useState('');
    const [sns, setSns] = useState({
        instargram: '',
        x: '',
    });
    const [email, setEmail] = useState('');
    const [mbti, setMbti] = useState('');
    const [music, setMusic] = useState({
        title: '',
        musician: '',
    });
    const [movie, setMovie] = useState('');
    const [showStudentNumber, setShowStudentNumber] = useState(false);
    const [showMajor, setShowMajor] = useState(false);
    const [showRole, setShowRole] = useState(false);
    const [showClub, setShowClub] = useState(false);
    const [showSns, setShowSns] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showMbti, setShowMbti] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [showMovie, setShowMovie] = useState(false);
    const [cover, setCover] = useState('avatar');
    const [isFull, setIsFull] = useState({
        name: true,
        birth: true,
        tel: true,
        school: true,
        grade: true,
        introduction: true,
    })
    const [imageWidth, setImageWidth] = useState(0);
    const [avatar, setAvatar] = useState({
        face: 1,
        hair: 1,
        hairColor: 1,
        clothes: 1,
        acc: 0,
        bg: 0,
        bgColor: 1,
    })
    const [isBirthValid, setIsBirthValid] = useState({
        year: true,
        month: true,
        day: true,
    });
    const [dayInMonth, setDayInMonth] = useState(0);

    const currentYear = new Date().getFullYear();

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    const isLeapYear = (year) => {    // 윤년 구하기
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    const getDayInMonth = (year, month) => {    // 윤달 구하기
        month = parseInt(month);
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:   // 31일
                return 31;
            case 4: case 6: case 9: case 11:    //30일
                return 30;
            case 2:
                return isLeapYear(year) ? 29 : 28;      // 윤달(2/29), 2/28
            default:
                return 0;
        }
    }

    const handleNext = () => {
        if (step === 1) {
            const isNameFull = name !== '';
            const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
            const isTelFull = tel !== '';
            setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull, tel: isTelFull})));
        
            // 생년월일 올바른지 구하기 
            const days = getDayInMonth(birth.year, birth.month);    
            const isBirthYearValid = birth.year > currentYear - 110 && birth.year <= currentYear;
            const isBirthMonthValid = birth.month >= 1 && birth.month <= 12;
            const isBirthDayValid = birth.day >= 1 && birth.day <= days;
            setIsBirthValid((prev => ({...prev, year: isBirthYearValid, month: isBirthMonthValid, day: isBirthDayValid})));

            if (isNameFull && isBirthFull && isBirthYearValid && isBirthMonthValid && isBirthDayValid && isTelFull) {
                setStep(2);
            }
        } else if (step === 2 ) {
            const isSchoolFull = school !== '';
            const isGradeFull = grade !== '';
            const isIntroductionFull = introduction !== '';
            setIsFull((prev => ({...prev, school: isSchoolFull, grade: isGradeFull, introduction: isIntroductionFull})));
            
            if (isSchoolFull && isGradeFull && isIntroductionFull) {
                setStep(3);
            }
        } else if (step === 3 ) {
            setStep(4);
        } else if (step === 4 ) {
            setStep(5);
        } else if (step === 5 ) {
            setStep(6);
        } else if (step === 6 ) {
            setStep(7);
        } else if (step === 7 ) {
            setStep(8);
        }
    };

    const handleScroll = (event) => {
        // const contentOffsetX = event.nativeEvent.contentOffset.x;
        // const currentIndex = Math.floor(contentOffsetX / (SCREEN_WIDTH));
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH));
        if (currentIndex == 0) {setCover('avatar');}
        else if (currentIndex == 1) {setCover('picture');}
    }

    useEffect(() => {   // 상단바 타이틀 변경
        if (step === 1 || step === 2 || step === 3 || step === 4 || step === 5) {
            navigation.setOptions({
                headerTitle: '카드 정보 작성',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {
                            if (step === 1) {
                                goToStepOne();
                            } else {
                                setStep(step-1);
                            }
                        }}
                    >
                        <LeftArrowIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
                headerRight: null,
            });
        } else if (step === 6 || step === 8) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {setStep(step-1);}}
                    >
                        <LeftArrowIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
                headerRight: null,
            });
        } else if (step === 7) {
            navigation.setOptions({
                headerTitle: '아바타 커스터마이징',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {setStep(step-1);}}
                    >
                        <LeftArrowIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        style={{marginRight: 20}}
                        onPress={handleNext}
                    >
                        <Text style={styles.avatarNext}>다음</Text>
                    </TouchableOpacity>
                ),
            });
        }
    }, [step]);

    return (
        <View>
            {step !== 7 && (        // 프로그레스 바
                <Progress.Bar
                    progress={step / 8}
                    width={null}
                    height={2}
                    color={theme.green}
                    borderWidth={0}
                />
            )}

            {step === 0 && (
                <View style={styles.container}>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                </View>
            )}

            {step === 1 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>나에 대한 기본 정보를 알려주세요.</Text>
                            <View style={styles.informContainer}>
                                <View style={[styles.inputContainer, !isFull.name && {marginBottom: 15}]}>
                                    <Text style={styles.inputText}>이름*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.name && styles.inputError]}
                                        placeholder="이름을 입력하세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={name}
                                        onChangeText={setName}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.name && (
                                        <Text style={styles.inputErrorText}>이름을 입력해 주세요.</Text>
                                    )}
                                </View>
                                <View style={[styles.inputContainer, !isFull.birth && {marginBottom: 15}, 
                                    (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && {marginBottom: 15}]}>
                                    <View style={styles.birthTextContainer}>
                                        <Text style={styles.inputText}>생년월일*</Text>
                                        <TouchableOpacity 
                                            style={styles.birthSecret} 
                                            onPress={() => setBSecret(!bSecret)}>
                                            <DoneIcon style={[styles.doneIcon, {color: bSecret ? theme.skyblue : theme.gray60}]} />
                                            <Text style={bSecret ? styles.birthSecretOn : styles.birthSecretOff}>생년월일은 비밀로 할래요</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.inputBirthContainer}>
                                        <TextInput
                                            style={[styles.inputBirth, styles.inputBirthText, styles.marginR8, !isFull.birth && styles.inputError]}
                                            placeholder="년"
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="numeric"
                                            value={birth.year}
                                            onChangeText={(newYear) => {setBirth((prevBirth => ({...prevBirth, year: newYear})));}}
                                            // onChangeText={setYear}
                                            maxLength={4}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input3.current.focus()}
                                            ref={ref_input2}
                                            blurOnSubmit={false}
                                        />
                                        <TextInput
                                            style={[styles.inputBirth, styles.inputBirthText, styles.marginR8, !isFull.birth && styles.inputError]}
                                            placeholder="월"
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="numeric"
                                            value={birth.month}
                                            onChangeText={(newMonth) => {setBirth((prevBirth => ({...prevBirth, month: newMonth})));}}
                                            // onChangeText={setMonth}
                                            maxLength={2}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input4.current.focus()}
                                            ref={ref_input3}
                                            blurOnSubmit={false}
                                        />
                                        <TextInput
                                            style={[styles.inputBirth, styles.inputBirthText, !isFull.birth && styles.inputError]}
                                            placeholder="일"
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="numeric"
                                            value={birth.day}
                                            onChangeText={(newDay) => {setBirth((prevBirth => ({...prevBirth, day: newDay})));}}
                                            // onChangeText={setDay}
                                            maxLength={2}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input5.current.focus()}
                                            ref={ref_input4}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    {!isFull.birth ? (
                                        <Text style={[styles.inputErrorText]}>생년월일을 입력해 주세요.</Text>
                                    ) : null}
                                    {isFull.birth && (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) ? (
                                        <Text style={styles.inputErrorText}>생년월일을 올바르게 입력해 주세요 (ex 2024년 01월 01일)</Text>
                                    ) : null}
                                </View>
                                <View style={[styles.inputContainer, !isFull.tel && {marginBottom: 15}]}>
                                    <Text style={styles.inputText}>연락처*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.tel && styles.inputError]}
                                        placeholder="연락처를 입력하세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="phone-pad"
                                        value={tel}
                                        onChangeText={setTel}
                                        returnKeyType="next"
                                        ref={ref_input5}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.tel && (
                                        <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                <Text style={styles.btnNextText}>다음으로</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 2 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>학교와 관련된 정보를 알려주세요.</Text>
                            <View style={styles.informContainer}>
                                <View style={[styles.inputContainer, !isFull.school && {marginBottom: 15}]}>
                                    <Text style={styles.inputText}>학교명*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.school && styles.inputError]}
                                        placeholder="학교명을 입력하세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={school}
                                        onChangeText={setSchool}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.school && (
                                        <Text style={styles.inputErrorText}>학교명을 입력해 주세요.</Text>
                                    )}
                                </View>
                                <View style={[styles.inputContainer, !isFull.grade && {marginBottom: 15}]}>
                                    <Text style={styles.inputText}>학년*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.grade && styles.inputError]}
                                        placeholder="학년을 입력하세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="numeric"
                                        value={grade}
                                        onChangeText={setGrade}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input3.current.focus()}
                                        ref={ref_input2}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.grade && (
                                        <Text style={styles.inputErrorText}>학년을 입력해 주세요.</Text>
                                    )}
                                </View>
                                <View style={[styles.inputContainer, !isFull.introduction && {marginBottom: 15}]}>
                                    <Text style={styles.inputText}>한줄소개*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.introduction && styles.inputError]}
                                        placeholder="간단하게 자신을 소개해 보세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={introduction}
                                        onChangeText={setIntroduction}
                                        returnKeyType="next"
                                        ref={ref_input3}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.introduction && (
                                        <Text style={styles.inputErrorText}>한줄소개를 입력해 주세요.</Text>
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                <Text style={styles.btnNextText}>다음으로</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 3 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>학교 속 나에 대해 더 알려주고 싶다면</Text>
                            <View style={[styles.flexDirectionRow, styles.btnMores]}>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showStudentNumber ? styles.btnOn : styles.btnOff]}  
                                    onPress={() => setShowStudentNumber(!showStudentNumber)}
                                >
                                    {showStudentNumber && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showStudentNumber ? styles.btnTextOn : styles.btnTextOff}>학생번호</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showMajor ? styles.btnOn : styles.btnOff]}  
                                    onPress={() => setShowMajor(!showMajor)}
                                >
                                    {showMajor && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showMajor ? styles.btnTextOn : styles.btnTextOff}>전공</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showRole ? styles.btnOn : styles.btnOff]}  
                                    onPress={() => setShowRole(!showRole)}
                                >
                                    {showRole && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showRole ? styles.btnTextOn : styles.btnTextOff}>역할</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showClub ? styles.btnOn : styles.btnOff]} 
                                    onPress={() => setShowClub(!showClub)}
                                >
                                    {showClub && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showClub ? styles.btnTextOn : styles.btnTextOff}>동아리</Text>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={styles.line}></View>
                            {!showStudentNumber && !showMajor && !showRole && !showClub && (
                                <Text style={styles.addText}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                            )}
                            <View style={styles.marginT32}>
                                {showStudentNumber && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>학생번호</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="학번이나 출석번호를 입력하세요. e.g., 17(학)번"
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={studentNumber}
                                            onChangeText={setStudentNumber}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input2.current.focus()}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                                {showMajor && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>전공</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="전공을 입력하세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={major}
                                            onChangeText={setMajor}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input3.current.focus()}
                                            ref={ref_input2}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                                {showRole && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>역할</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="역할을 입력하세요. e.g., 회장, 디자이너 등"
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={role}
                                            onChangeText={setRole}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input4.current.focus()}
                                            ref={ref_input3}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                                {showClub && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>동아리</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="소속 동아리명을 입력하세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={club}
                                            onChangeText={setClub}
                                            returnKeyType="next"
                                            ref={ref_input4}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                <Text style={styles.btnNextText}>다음으로</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 4 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>추가적인 연락 수단을 알려주고 싶다면</Text>
                            <View style={[styles.flexDirectionRow, styles.btnMores]}>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showSns ? styles.btnOn : styles.btnOff]}
                                    onPress={() => setShowSns(!showSns)}
                                >
                                    {showSns && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showSns ? styles.btnTextOn : styles.btnTextOff}>SNS 계정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showEmail ? styles.btnOn : styles.btnOff]}
                                    onPress={() => setShowEmail(!showEmail)}
                                >
                                    {showEmail && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showEmail ? styles.btnTextOn : styles.btnTextOff}>이메일</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line}></View>
                            {!showSns && !showEmail && (
                                <Text style={styles.addText}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                            )}
                            <View style={styles.marginT32}>
                                {showSns && (
                                    <View>
                                        <Text style={styles.snsText}>SNS</Text>
                                        <View style={styles.margintB16}>
                                            <Text style={styles.inputText}>Instargram</Text>
                                            <TextInput 
                                                style={styles.customInput}
                                                placeholder="인스타그램 계정을 입력하세요."
                                                placeholderTextColor={theme.gray60}
                                                keyboardType="default"
                                                value={sns.instargram}
                                                onChangeText={(newInstargram) => {setSns((prevSns => ({...prevSns, instargram: newInstargram})));}}
                                                returnKeyType="next"
                                                onSubmitEditing={() => ref_input2.current.focus()}
                                                blurOnSubmit={false}
                                            />
                                        </View>
                                        <View style={styles.margintB48}>
                                            <Text style={styles.inputText}>X(트위터)</Text>
                                            <TextInput 
                                                style={styles.customInput}
                                                placeholder="X 계정을 입력하세요."
                                                placeholderTextColor={theme.gray60}
                                                keyboardType="default"
                                                value={sns.x}
                                                onChangeText={(newX) => {setSns((prevSns => ({...prevSns, x: newX})));}}
                                                returnKeyType="next"
                                                onSubmitEditing={() => ref_input3.current.focus()}
                                                ref={ref_input2}
                                                blurOnSubmit={false}
                                            />
                                        </View>
                                    </View>
                                )}
                                {showEmail && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>이메일</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="이메일 주소를 입력하세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="email"
                                            value={email}
                                            onChangeText={setEmail}
                                            returnKeyType="next"
                                            ref={ref_input3}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                            </View>
                            
                            <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                <Text style={styles.btnNextText}>다음으로</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 5 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>사소한 것까지 더 알려주고 싶다면</Text>
                            <View style={[styles.flexDirectionRow, styles.btnMores]}>
                                <TouchableOpacity
                                    style={[styles.flexDirectionRow, styles.btnMore, showMbti ? styles.btnOn : styles.btnOff]}
                                    onPress={() => setShowMbti(!showMbti)}
                                >
                                    {showMbti && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showMbti ? styles.btnTextOn : styles.btnTextOff}>MBTI</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.flexDirectionRow, styles.btnMore, showMusic ? styles.btnOn : styles.btnOff]}
                                    onPress={() => setShowMusic(!showMusic)}
                                >
                                    {showMusic && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showMusic ? styles.btnTextOn : styles.btnTextOff}>인생 음악</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.flexDirectionRow, styles.btnMore, showMovie ? styles.btnOn : styles.btnOff]}
                                    onPress={() => setShowMovie(!showMovie)}
                                >
                                    {showMovie && (
                                        <DoneIcon style={styles.doneIcon} />
                                    )}
                                    <Text style={showMovie ? styles.btnTextOn : styles.btnTextOff}>인생 영화</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line}></View>
                            {!showMbti && !showMusic && !showMovie && (
                                <Text style={styles.addText}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                            )}
                            <View style={styles.marginT32}>
                                {showMbti && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>MBTI</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="MBTI를 입력하세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={mbti}
                                            onChangeText={setMbti}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input2.current.focus()}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                                {showMusic && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>인생 음악</Text>
                                        <View style={styles.flexDirectionRow}>
                                            <TextInput 
                                                style={[styles.musicInput, styles.marginR6]}
                                                placeholder="제목명"
                                                placeholderTextColor={theme.gray60}
                                                keyboardType="default"
                                                value={music.title}
                                                // onChangeText={text => setMusic(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                                                onChangeText={(newTitle) => {setMusic((prevMusic => ({...prevMusic, title: newTitle})));}}
                                                returnKeyType="next"
                                                onSubmitEditing={() => ref_input3.current.focus()}
                                                ref={ref_input2}
                                                blurOnSubmit={false}
                                            />
                                            <TextInput 
                                                style={styles.musicInput}
                                                placeholder="가수명"
                                                placeholderTextColor={theme.gray60}
                                                keyboardType="default"
                                                value={music.musician}
                                                // onChangeText={text => setMusic(prevState => [...prevState.slice(0, 2), text])}
                                                onChangeText={(newMusician) => {setMusic((prevMusic => ({...prevMusic, musician: newMusician})));}}
                                                returnKeyType="next"
                                                onSubmitEditing={() => ref_input4.current.focus()}
                                                ref={ref_input3}
                                                blurOnSubmit={false}
                                            />
                                        </View>
                                    </View>
                                )}
                                {showMovie && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>인생 영화</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="영화 제목을 입력하세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={movie}
                                            onChangeText={setMovie}
                                            returnKeyType="next"
                                            ref={ref_input4}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                <Text style={styles.btnNextText}>다음으로</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 6 && (
                <View style={{height: '100%', backgroundColor: theme.white}}>
                    <Text style={styles.coverTitle}>카드 커버를 선택하세요.</Text>
                    <Text style={styles.coverSubTitle}>카드 앞면에 커버가 보여요.</Text>   
                    <View>
                        <ScrollView
                            pagingEnabled
                            horizontal
                            decelerationRate={0}
                            snapToInterval={SCREEN_WIDTH}
                            snapToAlignment={"center"}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.coverScrollView}
                            onScroll={handleScroll}
                        >
                            <TouchableOpacity  
                                onPress={() => {handleNext(); setCover("avatar");}}    
                            >
                                {/* <Image 
                                    source={require("../../assets/images/cardCover-1.png")}
                                    style={[styles.coverImg, {marginLeft: (SCREEN_WIDTH - imageWidth)/2, marginRight:16}]}
                                    resizeMode="contain"
                                    onLayout={(event) => {
                                        const { width } = event.nativeEvent.layout;
                                        setImageWidth(width);
                                    }}
                                /> */}
                                <View
                                    style={{marginLeft: (SCREEN_WIDTH - imageWidth)/2, marginRight:16}}
                                    onLayout={(event) => {
                                        const { width } = event.nativeEvent.layout;
                                        setImageWidth(width);
                                    }}
                                >
                                    <CoverAvatar />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {handleNext(); setCover("picture");}}  
                            >
                                {/* <Image 
                                    source={require("../../assets/images/cardCover-2.png")}
                                    style={[styles.coverImg, {marginRight: (SCREEN_WIDTH - imageWidth)/2}]}
                                    resizeMode="contain"
                                /> */}
                                <View style={{marginRight: (SCREEN_WIDTH - imageWidth)/2}}>
                                <CoverPicture />
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.circles}>
                        <View 
                            style={[
                                styles.circle,
                                cover === "avatar" ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                        <View
                            style={[
                                styles.circle,
                                cover === "picture" ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                    </View>
                </View> 

            )}

            {step === 7 && (
                <View>
                    {cover === "avatar" && (
                        <AvatarCustom step={7} onStepChange={(newStep) => setStep(newStep)} avatar={avatar} setAvatar={setAvatar} />
                    )}
                    {cover === "picture" && (
                        <></>
                        // <AvatarCustom step={7} onStepChange={(newStep) => setStep(newStep)} />
                    )}
                </View>
            )}  

            {step === 8 && (
                <View style={styles.container}>
                    <Text style={styles.title}>너무 멋진 카드가 완성되었어요!{"\n"}바로 확인해 보세요.</Text>
                    <View style={styles.cardDone} >
                        {/* <Image
                            source={require('../../assets/images/cardDone.png')}
                            style={{widht: '100%', height: '100%', backgroundColor: "white"}} 
                            resizeMode="contain"
                        />  */}
                        <CreateCardDoneSvg />
                    </View>
                    <View style={styles.btnDone}>
                        <TouchableOpacity 
                                style={styles.btnCheckCard}
                                onPress={() => navigation.navigate('MyCard')}
                            >
                            <Text style={styles.btnNextText}>카드 확인하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={styles.btnHome}
                                onPress={() => navigation.navigate('홈')}
                            >
                            <Text style={styles.btnHomeText}>홈 화면으로</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}      
        </View>
    );
}
