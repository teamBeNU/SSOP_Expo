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
        { label: '추가학기', value: '추가학기' }
    ]);
    const [statusItems, setStatusItems] = useState([
        { label: '재학 중', value: '재학 중' },
        { label: '휴학 중', value: '휴학 중' },
        { label: '졸업 예정', value: '졸업 예정' }
    ]);
    
    
    
    const [showJob, setShowJob] = useState(false);
    const [showClub, setShowClub] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showSns, setShowSns] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showMbti, setShowMbti] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [showMovie, setShowMovie] = useState(false);
    const [isFull, setIsFull] = useState({
        name: true,
        birth: true,
        tel: true,
        school: true,
        grade: true,
        introduction: true,
    })
    const [imageWidth, setImageWidth] = useState(0);

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    const handleNext = () => {
        if (step === 1) {
            // const isNameFull = card_name !== '';
            // const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
            // const isTelFull = tel !== '';
            // setIsFull((prev => ({...prev, card_name: isNameFull, birth: isBirthFull, tel: isTelFull})));
            
            // if (isNameFull && isBirthFull && isTelFull) {
            //     setStep(2);
            // }
            setStep(2);
        } else if (step === 2 ) {
            // const isSchoolFull = school !== '';
            // const isGradeFull = grade !== '';
            // const isIntroductionFull = introduction !== '';
            // setIsFull((prev => ({...prev, school: isSchoolFull, grade: isGradeFull, introduction: isIntroductionFull})));
            
            // if (isSchoolFull && isGradeFull && isIntroductionFull) {
            //     setStep(3);
            // }
            setStep(3);
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
        if (currentIndex == 0) {setCardCover('avatar');}
        else if (currentIndex == 1) {setCardCover('picture');}
    }

    useEffect(() => {   // 상단바 타이틀 변경
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
{/* 
            {step === 0 && (
                <View style={styles.container}>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                    <Text> dddd</Text>
                </View>
            )} */}

            {step === 1 && (
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>나에 대한 기본 정보를 알려주세요.</Text>
                            <View style={styles.marginT64}>
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
                                    {/* {!isFull.name && (
                                        <Text style={styles.inputErrorText}>이름을 입력해 주세요.</Text>
                                    )} */}
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
                                    {/* {!isFull.introduction && (
                                        <Text style={styles.inputErrorText}>한줄소개를 입력해 주세요.</Text>
                                    )} */}
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

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>생년월일 8자리</Text>
                                    <TextInput 
                                        style={styles.customInput}
                                        placeholder="YYYY/MM/DD"
                                        placeholderTextColor={theme.gray60}
                                        keyboardType="numeric"
                                        value={card_birth}
                                        onChangeText={setCardBirth}
                                        returnKeyType="next"
                                        ref={ref_input4}
                                        blurOnSubmit={false}
                                    />
                                    {/* {!isFull.tel && (
                                        <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                                    )} */}
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
                            <View style={styles.marginT64}>
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
                            <View style={styles.marginT49}>
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
                            <Text style={styles.subTitle}>나를 더 자세히 알려줄 정보를 자유롭게 추가하세요.</Text>
                            <View style={styles.marginT49}>
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
                            <Text style={styles.title}>사소한 것까지 더 알려주고 싶다면</Text>
                            <View style={styles.marginT64}>
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
