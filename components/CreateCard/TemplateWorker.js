import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";
import axios from 'axios';

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";
import AvatarCustom from "./AvatarCustom";
import DoneIcon from "../../assets/icons/ic_done_small_line.svg";
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import SelectCover from "./SelectCover";

export default function TemplateWorker ({navigation, card_template}) {
    const baseUrl = 'http://172.19.13.198:8080/api';
    const [token, setToken] = useState(null);

    const [step, setStep] = useState(1);

    const [card_name, setCardName] = useState('');
    const [card_introduction, setCardIntroduction] = useState('');
    const [card_cover, setCardCover] = useState('');
    const [profile_image_url, setProfileImageUrl] = useState('');

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

    const [card_worker_company, setCardWorkerCompany] = useState('');   // 회사
    const [card_worker_job, setCardWorkerJob] = useState('');   // 직무
    const [card_worker_position, setCardWorkerPosition] = useState('');   // 직위
    const [card_worker_department, setCardWorkerDepartment] = useState('');   // 부서
    
    const [isFull, setIsFull] = useState({
        name: true,
        introduction: true,
        birth: false,
        company: true,
        job: true,
    })

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const [isAvatarComplete, setIsAvatarComplete] = useState(false);
    const [isPictureComplete, setIsPictureComplete] = useState(false);
    
    // post 요청
    const handleSubmit = async () => {
        const formData = new FormData();

        // 카드 데이터
        const cardData = {
            cardEssential: {
                card_name,
                card_introduction,
                card_template,
                card_cover,
            },
            cardOptional: {
                card_birth,
                card_bSecret,
                card_tel,
                card_email,
                card_sns_insta,
                card_sns_x,
                card_MBTI: card_mbti,
                card_music,
                card_movie,
                card_hobby,
                card_address,
            },
            worker: {
                card_worker_company,
                card_worker_job,
                card_worker_position,
                card_worker_department,
            },
        };

        // card
        formData.append('card', {
            name: 'card',
            string: JSON.stringify(cardData),
            type: 'application/json',
        });

        // image URI
        if (profile_image_url) {
            const localUri = profile_image_url;
            const filename = localUri.split('/').pop();
            const fileMatch = /\.(\w+)$/.exec(filename);
            const type = fileMatch ? `image/${fileMatch[1]}` : 'image';

            formData.append('image', {
                uri: localUri,
                name: filename,
                type: type
            });
        }

        try {
            // const token = await AsyncStorage.getItem('authToken');
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFAZ21haWwuY29tIiwiZXhwIjoxNzI3MjkxMTU0LCJ1c2VySWQiOjEsImVtYWlsIjoiYWFhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoi6rmA7JeQ7J20In0.9pOh9tnGjcQr1mly5NO1fpFeyeK7RLpZob5zC0DGH5WuDS2MyGdriQPB0y8IxVhoTKC6myMh3d_lgL2RDIZqrg';
            // const storedToken = await AsyncStorage.getItem('token');
            // setToken(storedToken);
            // console.log('token', token);
            // console.log('storedToken', storedToken);

            const response = await axios.post(
                `${baseUrl}/card/create`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.data.code === 200) {
                console.log('카드 생성 완료');
            } else {
                console.log('카드 생성 실패');
            }
        } catch (error) {
            console.error('카드 생성 API 에러 발생: ', error);
        }
    }

    // mbti
    const handleMBTI = (input) => {
        // 영어만 입력되도록 정규식 필터 적용
        const filteredText = input.replace(/[^a-zA-Z]/g, '');
        setCardMbti(filteredText.toUpperCase());
    }
    
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
    }, [card_birth, isFull.birth]);

    // 생년월일 올바른지 확인
    const [isBirthValid, setIsBirthValid] = useState({
        year: false,
        month: false,
        day: false,
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
        const isYearValid = year > currentYear - 150 && year <= currentYear;
        const isMonthValid = month >= 1 && month <= 12;
        const isDayValid = day >= 1 && day <= days;
    
        setIsBirthValid({
            year: isYearValid,
            month: isMonthValid,
            day: isDayValid,
        });
    }

    // 생년월일 비밀
    const handleBSecret = () => {
        if(card_birth !== '') {
            setCardBSecret(!card_bSecret);
        }
    }

    // 다음으로 버튼
    const handleNext = () => {
        if (step === 1) {
            const isNameFull = card_name !== '';
            const isIntroductionFull = card_introduction !== '';
            const isBirthFull = card_birth !== '';

            setIsFull((prev => ({ ...prev, name: isNameFull, introduction: isIntroductionFull, birth: isBirthFull })));
            isBirthCorrect(card_birth);

            if (isNameFull && isIntroductionFull) {
                if(!isBirthFull || (isBirthFull && isBirthValid.year && isBirthValid.month && isBirthValid.day)) {
                    setStep(2);
                }
            }
        } else if (step === 2 ) {
            setStep(3);
        } else if (step === 3 ) {
            const isCompanyFull = card_worker_company !== '';
            const isJobFull = card_worker_job !== '';
            setIsFull((prev => ({ ...prev, company: isCompanyFull, job: isJobFull })));
            
            if (isCompanyFull && isJobFull) {
                setStep(4);
            }
        } else if (step === 4 ) {
            setStep(5);
        } else if (step === 5 ) {
            setStep(6);
        } else if (step === 6 ) {
            if(card_cover === "avatar") {   // card cover가 avatar인 경우
                setStep(7);
            } else if (card_cover === "picture" && profile_image_url) { // card cover가 picture 인 경우(step 7이 없음)
                handleSubmit();
                setStep(8);
            }
        } else if (step === 7 ) {
            handleSubmit();
            setStep(8);
        }
    };

    // 상단바 타이틀 변경, 버튼 변경
    useEffect(() => {   
        if (step !== 8) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => {
                        if (step !== 1) {
                            setStep(step - 1);  //  이전 단계로 이동
                        } else {
                            navigation.goBack();
                        }
                    }}>
                        <LeftArrowIcon style={{ marginLeft: 8 }}/>
                    </TouchableOpacity>
                )
            });
        }
    
        if (step === 1 || step === 2 || step === 3 || step === 4 || step === 5) {
            navigation.setOptions({
                headerTitle: '카드 정보 작성',
                headerRight: null,
            });
        } else if (step === 6) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerRight: null,
            });
        } else if ( step === 8) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => {navigation.goBack();}}>
                        <CloseIcon style={{ marginLeft: 8 }}/>
                    </TouchableOpacity>
                ),
                headerRight: null,
            });
        } else if (step === 7) {
            navigation.setOptions({
                headerTitle: '아바타 커스터마이징',
                headerRight: () => (
                    <TouchableOpacity
                        style={{marginRight: 20}}
                        onPress={() => {
                            setIsAvatarComplete(true);
                        }}
                    >
                        <Text style={styles.avatarNext}>완료</Text>
                    </TouchableOpacity>
                ),
            });
        }
    }, [step]);

    useEffect(() => {
        if(isAvatarComplete && profile_image_url) {
            handleNext();
            setIsAvatarComplete(false);
        }
        if(isPictureComplete && profile_image_url) {
            handleNext();
            setIsPictureComplete(false);
        }
    });

    return (
        <View style={{flex:1}}>
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
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.viewContainer}>
                            <ScrollView 
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
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
                                            onChangeText={handleMBTI}
                                            maxLength={4}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input4.current.focus()}
                                            ref={ref_input3}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={styles.line}></View>
                                    <Text style={styles.birthTitle}>나이를 표시하고 싶다면{"\n"}생년월일을 입력하세요.</Text>
                                    <View style={[styles.inputContainer, isFull.birth && (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && {marginBottom: 15}]}>
                                        <Text style={styles.inputText}>생년월일 8자리</Text>
                                        <TextInput 
                                            style={[styles.customInput, isFull.birth && (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && styles.inputError]}
                                            placeholder="YYYY/MM/DD"
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="numeric"
                                            maxLength={10}
                                            value={card_birth}
                                            onChangeText={setCardBirth}
                                            returnKeyType="done"
                                            ref={ref_input4}
                                            blurOnSubmit={true}
                                        />
                                        {isFull.birth && (!isBirthValid.year || !isBirthValid.month || !isBirthValid.day) && (
                                            <Text style={styles.inputErrorText}>생년월일을 올바르게 입력해 주세요.{"\n"}월과 일이 한자릿수인 경우 0을 꼭 붙여 주세요.</Text>
                                        )}
                                        <TouchableOpacity 
                                            style={styles.birthSecret} 
                                            onPress={handleBSecret}
                                        >
                                            <DoneIcon style={[styles.doneIcon, {color: card_bSecret ? theme.skyblue : theme.gray60}]} />
                                            <Text style={card_bSecret ? styles.birthSecretOn : styles.birthSecretOff}>생년월일은 나이 계산에만 사용하고 공개 안 할래요</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                    <Text style={styles.btnNextText}>다음으로</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 2 && (
                <KeyboardAvoidingView 
                    behavior="padding"
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.viewContainer}>
                            <ScrollView 
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
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
                                    <View style={[styles.line, styles.marginB40]}></View>
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
                                            returnKeyType="done"
                                            ref={ref_input4}
                                            blurOnSubmit={true}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                    <Text style={styles.btnNextText}>다음으로</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 3 && (
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SafeAreaView style={styles.viewContainer}>
                            <ScrollView 
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Text style={styles.title}>직장 속 나에 대해 알려주세요.</Text>
                                <Text style={styles.subTitle}>카드 앞면에 표시돼요.</Text>
                                <View style={styles.informContainer}>
                                    <View style={[styles.inputContainer, !isFull.company && {marginBottom: 15}]}>
                                        <Text style={styles.inputTextEssential}>회사*</Text>
                                        <TextInput 
                                            style={[styles.customInput, !isFull.company && styles.inputError]}
                                            placeholder="회사명을 입력해 주세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={card_worker_company}
                                            onChangeText={setCardWorkerCompany}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input2.current.focus()}
                                            blurOnSubmit={false}
                                        />
                                        {!isFull.company && (
                                            <Text style={styles.inputErrorText}>회사명을 입력해 주세요.</Text>
                                        )}
                                    </View>
                                    <View style={[styles.inputContainer, !isFull.job && {marginBottom: 15}]}>
                                        <Text style={styles.inputTextEssential}>직무*</Text>
                                        <TextInput 
                                            style={[styles.customInput, !isFull.job && styles.inputError]}
                                            placeholder="직무를 입력해 주세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={card_worker_job}
                                            onChangeText={setCardWorkerJob}
                                            returnKeyType="done"
                                            ref={ref_input2}
                                            blurOnSubmit={true}
                                        />
                                        {!isFull.job && (
                                            <Text style={styles.inputErrorText}>직무를 입력해 주세요.</Text>
                                        )}
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                    <Text style={styles.btnNextText}>다음으로</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 4 && (
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SafeAreaView style={styles.viewContainer}>
                            <ScrollView 
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Text style={styles.title}>더 자세히 알려주실래요?</Text>
                                <Text style={styles.subTitle}>카드 뒷면에 표시돼요.</Text>
                                <View style={styles.informContainer}>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>직위</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="직위를 입력해 주세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={card_worker_position}
                                            onChangeText={setCardWorkerPosition}
                                            returnKeyType="next"
                                            onSubmitEditing={() => ref_input2.current.focus()}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputText}>부서</Text>
                                        <TextInput 
                                            style={styles.customInput}
                                            placeholder="부서를 입력해 주세요."
                                            placeholderTextColor={theme.gray60}
                                            keyboardType="default"
                                            value={card_worker_department}
                                            onChangeText={setCardWorkerDepartment}
                                            returnKeyType="done"
                                            ref={ref_input2}
                                            blurOnSubmit={true}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                    <Text style={styles.btnNextText}>다음으로</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 5 && (
                <KeyboardAvoidingView 
                    behavior="padding"
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.viewContainer}>
                            <ScrollView 
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
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
                            </ScrollView>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity 
                                    style={styles.btnNext}
                                    onPress={handleNext}
                                >
                                    <Text style={styles.btnNextText}>다음으로</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}

            {step === 6 && (
                <SelectCover 
                    step={step} 
                    setStep={setStep} 
                    card_cover={card_cover} 
                    handleNext={handleNext} 
                    setCardCover={setCardCover} 
                    setProfileImageUrl={setProfileImageUrl} 
                    setIsPictureComplete={setIsPictureComplete}
                />
            )}

            {step === 7 && (
                <View>
                    {card_cover === "avatar" && (
                        <AvatarCustom setProfileImageUrl={setProfileImageUrl} />
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