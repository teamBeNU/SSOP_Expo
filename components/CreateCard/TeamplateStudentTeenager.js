import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";
import DropDown from "./DropDown";
import AvatarCustom from "./AvatarCustom";
import DoneIcon from "../../assets/icons/ic_done_small_line.svg";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function TemplateStudentTeenager ({navigation, card_template}) {
    const [step, setStep] = useState(1);

    const [card_name, setCardName] = useState('');
    const [card_introduction, setCardIntroduction] = useState('');
    const [card_cover, setCardCover] = useState('');

    const [card_birth, setCardBirth] = useState('');
    const [card_bSecret, setCardBSecret] = useState(false);
    const [card_tel, setCardTel] = useState('');
    const [card_email, setCardEmail] = useState('');
    const [card_sns_insta, setCardSnsInsta] = useState('');
    const [card_sns_x, setCardSnsX] = useState('');
    const [card_mbti, setCardMbti] = useState('');
    const [card_music, setCardMusic] = useState('');
    const [card_movie, setCardMovie] = useState('');
    const [card_hobby, setCardHobby] = useState('');
    const [card_address, setCardAddress] = useState('');

    const [card_student_school, setCardStudentSchool] = useState('');
    const [card_student_grade, setCardStudentGrade] = useState('');
    const [card_student_major, setCardStudentMajor] = useState('');
    const [card_student_id, setCardStudentId] = useState('');
    const [card_student_club, setCardStudentClub] = useState('');
    const [card_student_role, setCardStudentRole] = useState('');
    const [card_student_status, setCardStudentStatus] = useState('');

    // 드롭다운
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [teenGradeItems, setTeenGradeItems] = useState([
        { label: '1학년', value: '1학년' },
        { label: '2학년', value: '2학년' },
        { label: '3학년', value: '3학년' },
        { label: '4학년', value: '4학년' },
        { label: '5학년', value: '5학년' },
        { label: '6학년', value: '6학년' }
    ]);
    const [youthGradeItems, setYouthGradeItems] = useState([
        { label: '1학년', value: '1학년' },
        { label: '2학년', value: '2학년' },
        { label: '3학년', value: '3학년' },
        { label: '4학년', value: '4학년' },
        { label: '추가학기', value: '추가학기' },
        { label: '그 외', value: '그 외' },
    ]);
    const [statusItems, setStatusItems] = useState([
        { label: '재학', value: '재학' },
        { label: '휴학', value: '휴학' },
        { label: '졸업 예정', value: '졸업 예정' },
        { label: '졸업', value: '졸업' },
    ]);
    
    const [isFull, setIsFull] = useState({
        name: true,
        introduction: true,
        school: true,
        grade: true,
        major: true,
    })
    const [imageWidth, setImageWidth] = useState(0);

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    
    // 생년월일 '/' 자동 추가
    useEffect(() => {
        const formatBirth = (input) => {
            const cleaned = input.replace(/\D/g, ''); // 숫자 이외의 문자 제거
            const match = cleaned.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/);
            if (match) {
                return [match[1], match[2], match[3]].filter(Boolean).join('/');
            }
            return input;
        };

        const formattedBirth = formatBirth(card_birth);
        setCardBirth(formattedBirth);
    }, [card_birth]);

    // 생년월일 올바른지 확인
    const [isBirthValid, setIsBirthValid] = useState({
        year: true,
        month: true,
        day: true,
    });

    const currentYear = new Date().getFullYear();

    const isLeapYear = (year) => {    // 윤년 구하기
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    const getDayInMonth = (year, month) => {    // 윤달 구하기
        month = parseInt(month, 10) || 0;
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

    const isBirthCorrect = (b) => {
        const birth = b.split('/');

        const year = birth[0];
        const month = birth[1];
        const day = birth[2];

        const days = getDayInMonth(year, month);
        const isYearValid = year > currentYear - 110 && year <= currentYear;
        const isMonthValid = month >= 1 && month <= 12;
        const isDayValid = day >= 1 && day <= days;
    
        setIsBirthValid({
            year: isYearValid,
            month: isMonthValid,
            day: isDayValid,
        });
    }

    // 다음으로 버튼
    const handleNext = () => {
        if (step === 1) {
            const isNameFull = card_name !== '';
            const isIntroductionFull = card_introduction !== '';
            // const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
            // const isTelFull = tel !== '';
            setIsFull((prev => ({ ...prev, name: isNameFull, introduction: isIntroductionFull })));
            isBirthCorrect(card_birth);

            if (isNameFull && isIntroductionFull && isBirthValid.year && isBirthValid.month && isBirthValid.day) {
                setStep(2);
            }
        } else if (step === 2 ) {
            setStep(3);
        } else if (step === 3 ) {
            const isSchoolFull = card_student_school !== '';
            const isGradeFull = card_student_grade !== '';
            setIsFull((prev => ({ ...prev, school: isSchoolFull, grade: isGradeFull })));
            
            if (isSchoolFull && isGradeFull) {
                setStep(4);
            }
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

    // 커버
    const handleScroll = (event) => {
        // const contentOffsetX = event.nativeEvent.contentOffset.x;
        // const currentIndex = Math.floor(contentOffsetX / (SCREEN_WIDTH));
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH));
        if (currentIndex == 0) {setCardCover('avatar');}
        else if (currentIndex == 1) {setCardCover('picture');}
    }

    // 상단바 타이틀 변경, 버튼 변경
    useEffect(() => {   
        if (step === 1 || step === 2 || step === 3 || step === 4 || step === 5) {
            navigation.setOptions({
                headerTitle: '카드 정보 작성',
                // headerLeft: () => {
                //     setStep(step - 1);
                // }
            });
        } else if (step === 6) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerRight: null,
            });
        } else if ( step === 8) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerRight: null,
            });
        } else if (step === 7) {
            navigation.setOptions({
                headerTitle: '아바타 커스터마이징',
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

            {step === 1 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>나에 대한 기본 정보를 알려주세요.</Text>
                            <Text style={styles.subTitle}>자세하게 작성할수록 좋아요.</Text>
                            <View style={styles.informContainer}>
                                <View style={[styles.inputContainer, !isFull.name && {marginBottom: 15}]}>
                                    <Text style={styles.inputTextEssential}>이름*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.name && styles.inputError]}
                                        placeholder="이름을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_name}
                                        onChangeText={setCardName}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.name && (
                                        <Text style={styles.inputErrorText}>이름을 입력해 주세요.</Text>
                                    )}
                                </View>
                                <View style={[styles.inputContainer, !isFull.introduction && {marginBottom: 15}]}>
                                    <Text style={styles.inputTextEssential}>한줄소개*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.introduction && styles.inputError]}
                                        placeholder="나에 대해 간단히 알려주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_introduction}
                                        onChangeText={setCardIntroduction}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input3.current.focus()}
                                        ref={ref_input2}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.introduction && (
                                        <Text style={styles.inputErrorText}>한줄소개를 입력해 주세요.</Text>
                                    )}
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>MBTI</Text>
                                    <TextInput
                                        style={styles.customInput}
                                        placeholder="MBTI를 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_mbti}
                                        onChangeText={setCardMbti}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input4.current.focus()}
                                        ref={ref_input3}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.line}></View>
                                <Text style={styles.birthTitle}>나이를 표시하고 싶다면{"\n"}생년월일을 입력하세요.</Text>
                                <View style={[styles.inputContainer, (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && {marginBottom: 15}]}>
                                    <Text style={styles.inputText}>생년월일 8자리</Text>
                                    <TextInput 
                                        style={[styles.customInput, (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && styles.inputError]}
                                        placeholder="YYYY/MM/DD"
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="numeric"
                                        value={card_birth}
                                        onChangeText={setCardBirth}
                                        returnKeyType="next"
                                        ref={ref_input4}
                                        blurOnSubmit={false}
                                    />
                                    {(!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && (
                                        <Text style={styles.inputErrorText}>생년월일을 올바르게 입력해 주세요.{"\n"}월과 일이 한자릿수인 경우 0을 꼭 붙여 주세요.</Text>
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
                            <Text style={styles.title}>내 연락처와 SNS 계정을 알려주세요.</Text>
                            <Text style={styles.subTitle}>자세하게 작성할수록 좋아요.</Text>
                            <View style={styles.informContainer}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>전화번호</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="전화번호를 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="phone-pad"
                                        value={card_tel}
                                        onChangeText={setCardTel}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>이메일</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="이메일 주소를 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_email}
                                        onChangeText={setCardEmail}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input3.current.focus()}
                                        ref={ref_input2}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.line, styles.marginB28]}></View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>Instargram</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="인스타그램 계정을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_sns_insta}
                                        onChangeText={setCardSnsInsta}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input4.current.focus()}
                                        ref={ref_input3}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>X(트위터)</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="X 계정을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_sns_x}
                                        onChangeText={setCardSnsX}
                                        returnKeyType="next"
                                        ref={ref_input4}
                                        blurOnSubmit={false}
                                    />
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
                            <Text style={styles.title}>학교 속 나에 대해 알려주세요.</Text>
                            <Text style={styles.subTitle}>날 소개하기 위한 필수 정보들이에요.</Text>
                            <View style={styles.informContainer}>
                                <View style={[styles.inputContainer, !isFull.school && {marginBottom: 15}]}>
                                    <Text style={styles.inputTextEssential}>학교*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.school && styles.inputError]}
                                        placeholder="학교명을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_student_school}
                                        onChangeText={setCardStudentSchool}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.school && (
                                        <Text style={styles.inputErrorText}>학교명을 입력해 주세요.</Text>
                                    )}
                                </View>
                                <View style={[styles.inputContainer, !isFull.grade && {marginBottom: 15}]}>
                                    <Text style={styles.inputTextEssential}>학년*</Text>
                                    <View style={{marginRight: "63%"}}>
                                    <DropDown
                                        dropDownOpen={dropDownOpen}
                                        dropDownValue={card_student_grade}
                                        setDropDownOpen={setDropDownOpen}
                                        setDropDownValue={setCardStudentGrade}
                                        items={teenGradeItems}
                                        setItems={setTeenGradeItems}
                                        placeholder={'학년'}
                                    />
                                    </View>
                                    {!isFull.grade && (
                                        <Text style={styles.inputErrorText}>학년을 입력해 주세요.</Text>
                                    )}
                                </View>
                                {/* <View style={[styles.inputContainer]}>
                                    <Text style={styles.inputTextEssential}>전공*</Text>
                                    <TextInput 
                                        style={[styles.customInput, !isFull.introduction && styles.inputError]}
                                        placeholder="전공을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_student_major}
                                        onChangeText={setCardStudentMajor}
                                        returnKeyType="next"
                                        ref={ref_input3}
                                        blurOnSubmit={false}
                                    />
                                    {!isFull.introduction && (
                                        <Text style={styles.inputErrorText}>한줄소개를 입력해 주세요.</Text>
                                    )}
                                </View> */}
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
                            <Text style={styles.title}>더 자세히 알려주실래요?</Text>
                            <Text style={styles.subTitle}>정보를 자유롭게 추가하세요.</Text>
                            <View style={styles.informContainer}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>학생번호</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="학생 번호를 입력해 주세요. 예) 17번"
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_student_id}
                                        onChangeText={setCardStudentId}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>역할</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="학급 혹은 학교 내 역할을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_student_role}
                                        onChangeText={setCardStudentRole}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input3.current.focus()}
                                        ref={ref_input2}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>동아리</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="소속된 동아리가 있다면 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_student_club}
                                        onChangeText={setCardStudentClub}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input4.current.focus()}
                                        ref={ref_input3}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.inputContainer]}>
                                    <Text style={styles.inputText}>전공</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="전공을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_student_major}
                                        onChangeText={setCardStudentMajor}
                                        returnKeyType="next"
                                        ref={ref_input4}
                                        blurOnSubmit={false}
                                    />
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

            {step === 5 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>나에 대해 더 많이 알려주고 싶다면</Text>
                            <Text style={styles.subTitle}>자세하게 작성할수록 좋아요.</Text>
                            <View style={styles.informContainer}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>취미</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="취미를 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_hobby}
                                        onChangeText={setCardHobby}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input2.current.focus()}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>인생 음악</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="노래 제목을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_music}
                                        onChangeText={setCardMusic}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input3.current.focus()}
                                        ref={ref_input2}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>인생 영화</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="영화 제목을 입력해 주세요."
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_movie}
                                        onChangeText={setCardMovie}
                                        returnKeyType="next"
                                        onSubmitEditing={() => ref_input4.current.focus()}
                                        ref={ref_input3}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.inputContainer]}>
                                    <Text style={styles.inputText}>거주지</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="거주지를 입력해 주세요. 예) 서울특별시 강남구 테헤란로"
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="default"
                                        value={card_address}
                                        onChangeText={setCardAddress}
                                        returnKeyType="next"
                                        ref={ref_input4}
                                        blurOnSubmit={false}
                                    />
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
                                onPress={() => {handleNext(); setCardCover("avatar");}}    
                            >
                                <Image 
                                    source={require("../../assets/images/cardCover-1.png")}
                                    style={[styles.coverImg, {marginLeft: (SCREEN_WIDTH - imageWidth)/2, marginRight:16}]}
                                    resizeMode="contain"
                                    onLayout={(event) => {
                                        const { width } = event.nativeEvent.layout;
                                        setImageWidth(width);
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {handleNext(); setCardCover("picture");}}  
                            >
                                <Image 
                                    source={require("../../assets/images/cardCover-2.png")}
                                    style={[styles.coverImg, {marginRight: (SCREEN_WIDTH - imageWidth)/2}]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.circles}>
                        <View 
                            style={[
                                styles.circle,
                                (card_cover === "avatar" || card_cover === '') ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                        <View
                            style={[
                                styles.circle,
                                card_cover === "picture" ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                    </View>
                </View> 

            )}

            {step === 7 && (
                <View>
                    {card_cover === "avatar" && (
                        <AvatarCustom step={7} onStepChange={(newStep) => setStep(newStep)} />
                    )}
                    {card_cover === "picture" && (
                        <></>
                        // <AvatarCustom step={7} onStepChange={(newStep) => setStep(newStep)} />
                    )}
                </View>
            )}  

            {step === 8 && (
                <View style={styles.container}>
                    <Text style={styles.title}>너무 멋진 카드가 완성되었어요!{"\n"}바로 확인해 보세요.</Text>
                    <View style={styles.cardDone} >
                        <Image
                            source={require('../../assets/images/cardDone.png')}
                            style={{widht: '100%', height: '100%', backgroundColor: "white"}} 
                            resizeMode="contain"
                        /> 
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
