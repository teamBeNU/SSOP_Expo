import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";
import AvatarCustom from "./AvatarCustom";
import DoneIcon from "../../assets/icons/ic_done_small_line.svg";
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import DownArrow from "./FreeTemplate/DownArrow";
import SelectBtn from "./FreeTemplate/SelectBtn";
import SelectTextInput from "./FreeTemplate/SelectTextInput";
import DropDown from "./DropDown";
import SelectCover from "./SelectCover";

export default function TemplateFree ({navigation, card_template}) {
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

    const [card_student_school, setCardStudentSchool] = useState('');   // 학교
    const [card_student_grade, setCardStudentGrade] = useState('');   // 학년
    const [card_student_major, setCardStudentMajor] = useState('');   // 전공
    const [card_student_id, setCardStudentId] = useState('');   // 학번
    const [card_student_club, setCardStudentClub] = useState('');   // 동아리
    const [card_student_role, setCardStudentRole] = useState('');   // 역할
    const [card_student_status, setCardStudentStatus] = useState('');   // 재학 상태

    const [card_worker_company, setCardWorkerCompany] = useState('');   // 회사
    const [card_worker_job, setCardWorkerJob] = useState('');   // 직무
    const [card_worker_position, setCardWorkerPosition] = useState('');   // 직위
    const [card_worker_department, setCardWorkerDepartment] = useState('');   // 부서
    
    const [card_fan_genre, setCardFanGenre] = useState('');  // 덕질 장르
    const [card_fan_first, setCardFanFirst] = useState('');  // 최애
    const [card_fan_second, setCardFanSecond] = useState('');  // 차애
    const [card_fan_reason, setCardFanReason] = useState('');  // 입덕 계기

    const [isFull, setIsFull] = useState({
        name: true,
        introduction: true,
        birth: false,
    })

    // 유형 선택지 버튼 클릭 여부
    const [isClick, setIsClick] = useState({
        student: false,
        worker: false,
        fan: false,

        school: false,
        grade: false,
        major: false,
        id: false,
        role: false,
        club: false,
        status: false,
        company: false,
        job: false,
        position: false,
        department: false,
        genre: false,
        first: false,
        second: false,
        reason: false,
    })

    // school, grade, major 등 중 하나라도 true인 경우
    const isClickTrue = Object.keys(isClick).some(key => 
        ['school', 'grade', 'major', 'id', 'role', 'club', 'status', 'company', 'job', 'position', 'department', 'genre', 'first', 'second', 'reason'].includes(key) && isClick[key]
    );

    // 유셩 선택지 버튼
    const studentItems = [
        { key: 'school', btnName: '학교', isClick: isClick.school, cardValue: card_student_school, setCardValue: setCardStudentSchool },
        { key: 'grade', btnName: '학년', isClick: isClick.grade, cardValue: card_student_grade, setCardValue: setCardStudentGrade },
        { key: 'major', btnName: '전공', isClick: isClick.major, cardValue: card_student_major, setCardValue: setCardStudentMajor },
        { key: 'id', btnName: '학생번호', isClick: isClick.id, cardValue: card_student_id, setCardValue: setCardStudentId },
        { key: 'club', btnName: '동아리', isClick: isClick.club, cardValue: card_student_club, setCardValue: setCardStudentClub },
        { key: 'role', btnName: '역할', isClick: isClick.role, cardValue: card_student_role, setCardValue: setCardStudentRole },
        { key: 'status', btnName: '재학상태', isClick: isClick.status, cardValue: card_student_status, setCardValue: setCardStudentStatus },
    ]
    const workerItems = [
        { key: 'company', btnName: '회사', isClick: isClick.company, cardValue: card_worker_company, setCardValue: setCardWorkerCompany },
        { key: 'job', btnName: '직무', isClick: isClick.job, cardValue: card_worker_job, setCardValue: setCardWorkerJob },
        { key: 'position', btnName: '직위', isClick: isClick.position, cardValue: card_worker_position, setCardValue: setCardWorkerPosition },
        { key: 'department', btnName: '부서', isClick: isClick.department, cardValue: card_worker_department, setCardValue: setCardWorkerDepartment },
    ]
    const fanItems = [
        { key: 'genre', btnName: '덕질장르', isClick: isClick.genre, cardValue: card_fan_genre, setCardValue: setCardFanGenre },
        { key: 'first', btnName: '최애', isClick: isClick.first, cardValue: card_fan_first, setCardValue: setCardFanFirst },
        { key: 'second', btnName: '차애', isClick: isClick.second, cardValue: card_fan_second, setCardValue: setCardFanSecond },
        { key: 'reason', btnName: '입덕계기', isClick: isClick.reason, cardValue: card_fan_reason, setCardValue: setCardFanReason },
    ]

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

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
            setStep(4);
        } else if (step === 4 ) {
            setStep(5);
        } else if (step === 5 ) {
            setStep(6);
        } else if (step === 6 ) {
            setStep(7);
        }
    };

    // 선택지 체크 해제하면 값 지워지도록(isClick이 false 면 값 ''로 변경)
    useEffect(() => {
        studentItems.forEach(item => {
            if(!item.isClick) {
                item.setCardValue('');
            }
        });
        workerItems.forEach(item => {
            if(!item.isClick) {
                item.setCardValue('');
            }
        });
        fanItems.forEach(item => {
            if (!item.isClick) {
                item.setCardValue('');
            }
        });
    }, [isClick]);

    // 상단바 타이틀 변경, 버튼 변경
    useEffect(() => {   
        if (step !== 7) {
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
    
        if (step === 1 || step === 2 || step === 3 || step === 4) {
            navigation.setOptions({
                headerTitle: '카드 정보 작성',
                // headerLeft: () => {
                //     setStep(step - 1);
                // }
            });
        } else if (step === 5) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerRight: null,
            });
        } else if ( step === 7) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => {navigation.goBack();}}>
                        <CloseIcon style={{ marginLeft: 8 }}/>
                    </TouchableOpacity>
                ),
                headerRight: null,
            });
        } else if (step === 6) {
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
        <View style={{flex:1}}>
            {step !== 6 && (        // 프로그레스 바
                <Progress.Bar
                    progress={step / 7}
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
                        <SafeAreaView style={styles.selectViewContainer}>
                            <ScrollView 
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Text style={[styles.title, styles.paddingH16]}>나에 대해 알려주세요.</Text>
                                <Text style={[styles.subTitle, styles.paddingH16]}>카드 뒷면에 표시돼요.</Text>
                                <View style={[styles.selectContaienr, styles.paddingH16]}>
                                    <View style={[styles.selectBtnContainer, isClick.student ? styles.paddignB24 : styles.paddignB0]}>
                                        <TouchableOpacity 
                                            style={[styles.selectBtnTitleContainer, isClick.student ? styles.paddignB0 : styles.paddignB24]}
                                            onPress={() => {
                                                setIsClick(prev => ({ ...prev, student: !prev.student }));
                                            }}
                                        >
                                            <Text style={styles.selectBtnTitle}>학생 유형 선택지</Text>
                                            {isClick.student ? 
                                                <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                                            }
                                        </TouchableOpacity>
                                        {isClick.student && (
                                            <View style={styles.selectBtns}>
                                                {studentItems.map(item => (
                                                    <SelectBtn
                                                        key={item.key}
                                                        itemKey={item.key}
                                                        btnName={item.btnName}
                                                        isClick={item.isClick}
                                                        setIsClick={setIsClick}
                                                    />
                                                ))}
                                            </View> 
                                        )}
                                    </View>
                                    <View style={[styles.selectBtnContainer, isClick.worker ? styles.paddignB24 : styles.paddignB0]}>
                                        <TouchableOpacity 
                                            style={[styles.selectBtnTitleContainer, isClick.worker ? styles.paddignB0 : styles.paddignB24]}
                                            onPress={() => {
                                                setIsClick(prev => ({ ...prev, worker: !prev.worker }));
                                            }}
                                        >
                                            <Text style={styles.selectBtnTitle}>직장인 유형 선택지</Text>
                                            {isClick.worker ? 
                                                <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                                            }
                                        </TouchableOpacity>
                                        {isClick.worker && (
                                            <View style={styles.selectBtns}>
                                                {workerItems.map(item => (
                                                    <SelectBtn
                                                        key={item.key}
                                                        itemKey={item.key}
                                                        btnName={item.btnName}
                                                        isClick={item.isClick}
                                                        setIsClick={setIsClick}
                                                    />
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                    <View style={[styles.selectBtnContainer, isClick.fan ? styles.paddignB24 : styles.paddignB0]}>
                                        <TouchableOpacity 
                                            style={[styles.selectBtnTitleContainer, isClick.fan ? styles.paddignB0 : styles.paddignB24]}
                                            onPress={() => {
                                                setIsClick(prev => ({ ...prev, fan: !prev.fan }));
                                            }}
                                        >
                                            <Text style={styles.selectBtnTitle}>팬 유형 선택지</Text>
                                            {isClick.fan ? 
                                                <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                                            }
                                        </TouchableOpacity>
                                        {isClick.fan && (
                                            <View style={styles.selectBtns}>
                                                {fanItems.map(item => (
                                                    <SelectBtn
                                                        key={item.key}
                                                        itemKey={item.key}
                                                        btnName={item.btnName}
                                                        isClick={item.isClick}
                                                        setIsClick={setIsClick}
                                                    />
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.spaceContainer}></View>
                                <View style={styles.selectInputContainer}>
                                    {isClickTrue ? 
                                        <View style={styles.selectTextInputContainer}>
                                            {studentItems.map(item => (
                                                item.isClick && (
                                                    (item.key === "grade" || item.key === "status") ? 
                                                    null :
                                                    <SelectTextInput
                                                        key={item.key}
                                                        btnName={item.btnName}
                                                        cardValue={item.cardValue}
                                                        setCardValue={item.setCardValue}
                                                    />
                                                )
                                            ))}
                                            {workerItems.map(item => (
                                                item.isClick && (
                                                    
                                                    <SelectTextInput
                                                        key={item.key}
                                                        btnName={item.btnName}
                                                        cardValue={item.cardValue}
                                                        setCardValue={item.setCardValue}
                                                    />
                                                )
                                            ))}
                                            {fanItems.map(item => (
                                                item.isClick && (
                                                    <SelectTextInput
                                                        key={item.key}
                                                        btnName={item.btnName}
                                                        cardValue={item.cardValue}
                                                        setCardValue={item.setCardValue}
                                                    />
                                                )
                                            ))}
                                        </View>
                                        : <Text style={styles.selectTitle}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                                    }
                                    
                                    <Text>{card_fan_first}</Text>
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

            {step === 5 && (
                <SelectCover card_cover={card_cover} handleNext={handleNext} setCardCover={setCardCover} />
            )}

            {step === 6 && (
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

            {step === 7 && (
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