import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg'
import DoneIcon from '../../assets/icons/ic_done_small_line.svg'
import DownIcon from '../../assets/icons/ic_DownArrow_small_line.svg'
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg'
import RightArrowIcon from '../../assets/icons/ic_RightArrow_small_line.svg'
import DropDown from '../../components/CreateCard/DropDown.js'
import DropDownOption from '../../components/CreateCard/DropDownOption.js'
import { theme } from "../../theme"
import { styles } from "./EditCardStyle"

function EditCard() {
    const route = useRoute();
    const {card, isDetail, index} = route.params;

    //기본 정보
    const [name, setName] = useState(card.cardEssential.card_name);
    const [MBTI, setMBTI] = useState(card.cardOptional.card_MBTI ? card.cardOptional.card_MBTI : '');
    const [birth, setBirth] = useState(card.cardOptional.card_birth ? card.cardOptional.card_birth : '');
    const [introduce, setIntroduce] = useState(card.cardEssential.card_introduction);
    const [isSecret, setIsSecret] = useState(card.cardOptional.card_bSecret === true ? true : false);

    const [tel, setTel] = useState(card.cardOptional.card_tel ? card.cardOptional.card_tel : '');
    const [email, setEmail] = useState(card.cardOptional.card_email ? card.cardOptional.card_email : '');
    const [insta, setInsta] = useState(card.cardOptional.card_sns_insta ? card.cardOptional.card_sns_insta : '');
    const [x, setX] = useState(card.cardOptional.card_sns_x ? card.cardOptional.card_sns_x : '');

    //학생
    const [school, setSchool] = useState(card.student ? card.student.card_student_school : '');
    const [grade, setGrade] = useState(card.student ? card.student.card_student_grade : '');
    const [major, setMajor] = useState(card.student ? card.student.card_student_major : '');
    const [id, setId] = useState(card.student ? card.student.card_student_id : '');
    const [club, setClub] = useState(card.student ? card.student.card_student_club : '');
    const [role, setRole] = useState(card.student ? card.student.card_student_role : '');
    const [studentStatus, setStudentStatus] = useState(card.student ? card.student.card_student_status : '');
   
    //직장인
    const [company, setCompany] = useState(card.worker ? card.worker.card_worker_company : '');
    const [job, setJob] = useState(card.worker ? card.worker.card_worker_job : '');
    const [position, setPosition] = useState(card.worker ? card.worker.card_worker_position : '');
    const [department, setDepartment] = useState(card.worker ? card.worker.card_worker_department : '');

    //팬
    const [genre, setGenre] = useState(card.fan ? card.fan.card_fan_genre : '');
    const [first, setFirst] = useState(card.fan ? card.fan.card_fan_first : '');
    const [second, setSecond] = useState(card.fan ? card.fan.card_fan_second : '');
    const [reason, setReason] = useState(card.fan ? card.fan.card_fan_reason : '');

    //추가 정보
    const [music, setMusic] = useState(card.cardOptional.card_music ? card.cardOptional.card_music : '');
    const [hobby, setHobby] = useState(card.cardOptional.card_hobby ? card.cardOptional.card_hobby : '');
    const [movie, setMovie] = useState(card.cardOptional.card_movie ? card.cardOptional.card_movie : '');
    const [address, setAddress] = useState(card.cardOptional.card_address ? card.cardOptional.card_address : '');

    const [step, setStep] = useState(0);
    const ref_input = useRef();

    // 유효성 검사 
    const [isNameValid, setIsNameValid] = useState(true);
    const [isIntroduceValid, setIsIntroduceValid] = useState(true);
    const [isBirthValid, setIsBirthValid] = useState(true);
    const [isSchoolValid, setIsSchoolValid] = useState(true);
    const [ismajorValid, setIsmajorValid] = useState(true);
    const [isGradeValid, setIsGradeValid] = useState(true);
    const [isCompanyValid, setIsCompanyValid] = useState(true);
    const [isJobValid, setIsJobValid] = useState(true);
    const [isGenreValid, setIsGenreValid] = useState(true);
    const [isFirstValid, setIsFirstValid] = useState(true);

    const validateField = (value, setValidity) => {
        const valid = value.trim().length > 0;
        setValidity(valid);
        return valid;
    };
    
    const validateName = () => validateField(name, setIsNameValid);
    const validateIntroduce = () => validateField(introduce, setIsIntroduceValid);
    const validateSchool = () => validateField(school, setIsSchoolValid);
    const validateMajor = () => validateField(major, setIsmajorValid);
    const validateGrade = () => validateField(grade, setIsGradeValid);
    const validateCompany = () => validateField(company, setIsCompanyValid);
    const validateJob = () => validateField(job, setIsJobValid);
    const validateGenre = () => validateField(genre, setIsGenreValid);
    const validateFirst = () => validateField(first, setIsFirstValid);

    const validateBirth = () => {
        if (!birth) {
            setIsBirthValid(true); // 생일이 없으면 유효한 것으로 간주
            return true;
        }
    
        if (birth.length !== 10) {
            setIsBirthValid(false);
            return false;
        }
    
        const [year, month, day] = birth.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        const isValidDate =
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;
    
        setIsBirthValid(isValidDate);
        return isValidDate;
    };
    
    // 드롭다운
    const [dropDownMbti1Open, setDropDownMbti1Open] = useState(false);
    const [dropDownMbti2Open, setDropDownMbti2Open] = useState(false);
    const [mbti1Items, setMbti1Items] = useState([
        { label: 'EN', value: 'EN' },
        { label: 'ES', value: 'ES' },
        { label: 'IN', value: 'IN' },
        { label: 'IS', value: 'IS' },
    ]);
    const [mbti2Items, setMbti2Items] = useState([
        { label: 'TJ', value: 'TJ' },
        { label: 'TP', value: 'TP' },
        { label: 'FJ', value: 'FJ' },
        { label: 'FP', value: 'FP' },
    ]);

     // mbti
     const [mbti1, setMbit1] = useState(card.cardOptional.card_MBTI.slice(0, 2));
     const [mbti2, setMbit2] = useState(card.cardOptional.card_MBTI.slice(2));
 
     useEffect(() => {
         let mbti = '';
         if (mbti1 !== null && mbti2 !== null) { 
             mbti = mbti1 + mbti2;
         }
         setMBTI(mbti);
     }, [mbti1, mbti2]);

    const navigation = useNavigation();

    // 카드 수정
    const handleSubmit = async () => {
        const validate = () => {
            if (step === 1) {
                return validateName() && validateIntroduce() && validateBirth();
            }
            if (step === 3) {
                return validateSchool() && validateGrade() && validateMajor();
            }
            if (step === 4) {
                return validateSchool() && validateGrade();
            }
            if (step === 5) {
                return validateCompany() && validateJob();
            }
            if (step === 6) {
                return validateGenre() && validateFirst();
            }
            return true;
        };
    
        if (!validate()) {
            return; 
        }
    
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
            card_music: music,
            card_movie: movie,
            card_hobby: hobby,
            card_address: address,
        };
    
        if (step > 2) {
            const templateData = {
                student: {
                    card_student_school: school,
                    card_student_grade: grade,
                    card_student_major: major,
                    card_student_id: id,
                    card_student_club: club,
                    card_student_role: role,
                    card_student_status: studentStatus,
                },
                worker: {
                    card_worker_company: company,
                    card_worker_job: job,
                    card_worker_position: position,
                    card_worker_department: department,
                },
                fan: {
                    card_fan_genre: genre,
                    card_fan_first: first,
                    card_fan_second: second,
                    card_fan_reason: reason,
                },
            };
    
            switch (card.card_template) {
                case 'studentUniv':
                case 'studentSchool':
                    editCardData.student = templateData.student;
                    break;
                case 'worker':
                    editCardData.worker = templateData.worker;
                    break;
                case 'fan':
                    editCardData.fan = templateData.fan;
                    break;
                case 'free':
                    editCardData.student = templateData.student;
                    editCardData.worker = templateData.worker;
                    editCardData.fan = templateData.fan;
                    break;
                default:
                    break;
            }
        }
    
        const token = await AsyncStorage.getItem('token');
    
        const formData = new FormData();
        formData.append('card', {
            name: 'card',
            string: JSON.stringify(editCardData),
            type: 'application/json',
        });
    
        try {
            const response = await axios.patch(
                `http://43.202.52.64:8080/api/card/edit?cardId=${card.cardId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (isDetail) {
                navigation.navigate('카드 상세보기', { cardId: card.cardId });
            } else {
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert(
                error.response?.data?.message || error.message || 'Request failed'
            );
        }
    };

    const handleTemplateStep = () => {
        switch(card.card_template) {
            case 'studentUniv':
                setStep(3);
                break;
            case 'studentSchool':
                setStep(4);
                break;
            case 'worker':
                setStep(5);
                break;
            case 'fan':
                setStep(6);
                break;
            case 'free':
                setStep(7);
                break;

        }
    };

    const handleBack = () => {
        setStep(0);
      };

      const handleGoBack = () => {
        //navigation.goBack();
        navigation.navigate('카드 상세보기', { index });
      };

    const handleHeaderLeft = (onPress) => {
        if (step > 0) {
          return (
            <TouchableOpacity onPress={handleBack}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          );
        } else if (step === 0) {
            return (
              <TouchableOpacity onPress={handleGoBack}>
                <CloseIcon style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            );
          }
      };

      useEffect(() => {
        const headerRight = step > 0 ? (
            <TouchableOpacity onPress={() => handleSubmit(step)}>
                <Text style={styles.submit}>완료</Text>
            </TouchableOpacity>
        ) : null;
    
        navigation.setOptions({
            headerLeft: handleHeaderLeft,
            //headerRight: () => headerRight,
        });
    }, [navigation, step]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            { step == 0 && (
                <View style={[styles.container,{paddingTop: 8}]}>
                    <View style={[styles.btnContainer]}>
                        <TouchableOpacity style={[styles.editBtn]} onPress={() => setStep(1)}>
                            <Text style={[styles.editTitle]}>내 기본 정보</Text>
                            <RightArrowIcon style={[styles.rightArrow]}/>
                            <Text style={[styles.editSub]}>이름, 한줄소개, MBTI, 생년월일</Text>
                        </TouchableOpacity>
                        <View style={[styles.line]} />
                        <TouchableOpacity style={[styles.editBtn]} onPress={() => setStep(2)}>
                            <Text style={[styles.editTitle]}>연락수단</Text>
                            <RightArrowIcon style={[styles.rightArrow]}/>
                            <Text style={[styles.editSub]}>전화번호, 이메일, Instagram, X</Text>
                        </TouchableOpacity>
                        <View style={[styles.line]} />
                        <TouchableOpacity style={[styles.editBtn]} onPress={handleTemplateStep}>
                            <Text style={[styles.editTitle]}>정체성 정보</Text>
                            <RightArrowIcon style={[styles.rightArrow]}/>
                            <Text style={[styles.editSub]}>학생, 직장인, 팬, 자유</Text>
                        </TouchableOpacity>
                        <View style={[styles.line]} />
                        <TouchableOpacity style={[styles.editBtn]} onPress={() => setStep(8)}>
                            <Text style={[styles.editTitle]}>기타 정보</Text>
                            <RightArrowIcon style={[styles.rightArrow]}/>
                            <Text style={[styles.editSub]}>취미, 인생 음악, 인생 영화, 거주지</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}


            {step === 1 && (
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
            <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            keyboardShouldPersistTaps="handled" 
            showsVerticalScrollIndicator={false} >
            <View style={{marginBottom: 120}}>

                <Text style={styles.title}>나에 대한 기본 정보 수정하기</Text>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>이름*</Text>
                <TextInput 
                    value={name}
                    onChangeText={text => {
                        setName(text);
                        setIsNameValid(true);
                    }} 
                    style={isNameValid ? styles.input : styles.warningInput }
                    placeholder={name ? name : '이름을 입력해 주세요.'}
                    placeholderTextColor={theme.gray60}
                />
                {!isNameValid && (
                    <Text style={styles.warningText}>이름을 입력해 주세요.</Text>
                )}
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>한줄소개*</Text>
                <TextInput 
                    value={introduce}
                    onChangeText={text => {
                        setIntroduce(text);
                        setIsIntroduceValid(true); 
                    }}
                    style={isIntroduceValid  ? styles.input : styles.warningInput }
                    placeholder={introduce ? introduce : '한줄소개를 입력해 주세요.'}
                    placeholderTextColor={theme.gray60}
                    />
                {!isIntroduceValid && (
                    <Text style={styles.warningText}>한줄소개를 입력해 주세요.</Text>
                )}
                </View>

                <View style={[styles.inputContainer, {marginBottom: 40}]}>
                    <Text style={styles.subTitle}>MBTI</Text>
                    <View style={[styles.dropDownContainerZIndex1, styles.flexDirectionRow]}>
                        <DropDownOption
                            dropDownOpen={dropDownMbti1Open}
                            dropDownValue={mbti1}
                            setDropDownOpen={setDropDownMbti1Open}
                            setDropDownValue={setMbit1}
                            items={mbti1Items}
                            setItems={setMbti1Items}
                            placeholder={'앞 2자리'}
                            isError={true}
                        />
                        <View style={styles.marginR8}></View>
                        <DropDownOption
                            dropDownOpen={dropDownMbti2Open}
                            dropDownValue={mbti2}
                            setDropDownOpen={setDropDownMbti2Open}
                            setDropDownValue={setMbit2}
                            items={mbti2Items}
                            setItems={setMbti2Items}
                            placeholder={'뒤 2자리'}
                            isError={true}
                        />
                    </View>
                </View>

                <View style={[styles.line, {marginBottom: 40}]} />

                <View style={styles.inputContainer}>
                <Text style={styles.subTitle}>생년월일 8자리</Text>
                <TextInput 
                    //style={{...styles.input, marginBottom: 20}}
                    style={isBirthValid ? styles.input : styles.warningInput}
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
                        setIsBirthValid(true);
                       }}
                       maxLength={10}
                       ref={ref_input}
                    />
                    {!isBirthValid && (
                        <Text style={styles.warningText}>생년월일을 올바르게 입력해 주세요.{"\n"}월과 일이 한자릿수인 경우 0을 꼭 붙여 주세요.</Text>
                    )}
                <TouchableOpacity style={styles.birthSecret} onPress={() => setIsSecret(!isSecret)}>
                    <DoneIcon style={{width: 16, height:16, color: isSecret ? '#00C2ED' : '#949494'}}/>
                    <Text>생년월일은 나이 계산에만 사용하고 공개 안 할래요</Text>
                </TouchableOpacity>
                </View>
                </View>
                </ScrollView>
                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
            )}

            {step === 2 && (
                <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
                >
                <View style={{marginBottom: 120}}>

                    <Text style={styles.title}>내 연락처와 SNS 계정 수정하기</Text>
                    
                    <View style={{marginBottom: 120}}>
                    <View style={{...styles.inputContainer, marginBottom: 40}}>
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

                    <View style={{...styles.inputContainer, marginBottom: 40}}>
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

                    <View style={[styles.line, {marginBottom: 40}]} />

                    <View style={{...styles.inputContainer, marginBottom: 40}}>
                    <Text style={styles.subTitle}>Instagram</Text>
                    <TextInput 
                        style={styles.input}
                        value={insta}
                        onChangeText={setInsta}
                        placeholder={insta ? insta : "인스타그램 계정을 입력해 주세요."}
                        placeholderTextColor={theme.gray60}
                        />
                    </View>

                    <View style={{...styles.inputContainer, marginBottom: 40}}>
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

                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
           
            </KeyboardAvoidingView>
            )}

            
            {step === 3 && ( // 대학생
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120}}>

                <Text style={styles.title}>학교 속 나에 대한 정보 수정하기</Text>

                <ScrollView>
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>학교*</Text>
                <TextInput 
                    style={isSchoolValid ? styles.input : styles.warningInput}
                    value={school}
                    onChangeText={text => {
                        setSchool(text);
                        setIsSchoolValid(true);
                    }} 
                    placeholder= {school ? school : "학교명을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                {!isSchoolValid && (
                    <Text style={styles.warningText}>학교명을 입력해 주세요.</Text>
                )}
                </View>
               
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>전공*</Text>
                <TextInput 
                    style={ismajorValid ? styles.input : styles.warningInput}
                    value={major}
                    onChangeText={text => {
                        setMajor(text);
                        setIsmajorValid(true);
                    }}
                    placeholder={major ? major : "전공을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                {!ismajorValid && (
                    <Text style={styles.warningText}>전공을 입력해 주세요.</Text>
                )}
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
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


                <View style={styles.line} />

                <View style={{...styles.inputContainer, marginBottom: 40, marginTop: 40}}>
                <Text style={styles.subTitle}>학생번호</Text>
                <TextInput 
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder={id ? id : "학번을 입력해 주세요. 예) 17학번"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>역할</Text>
                <TextInput 
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder={role ? role : "프로젝트 혹은 학과 내 역할을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>동아리</Text>
                <TextInput 
                    style={styles.input}
                    value={club}
                    onChangeText={setClub}
                    placeholder={club ? club :"소속된 동아리가 있다면 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>   

                <View style={{...styles.inputContainer, marginBottom: 40}}>
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
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
            )}

        {step === 4 && ( // 초중고
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120}}>

                <Text style={styles.title}>학교 속 나에 대한 정보 수정하기</Text>

                <ScrollView>
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>학교*</Text>
                <TextInput 
                    style={isSchoolValid ? styles.input : styles.warningInput}
                    value={school}
                    onChangeText={text => {
                        setSchool(text);
                        setIsSchoolValid(true);
                    }} 
                    placeholder= {school ? school : "학교명을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                {!isSchoolValid && (
                    <Text style={styles.warningText}>학교명을 입력해 주세요.</Text>
                )}
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
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

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>학생번호</Text>
                <TextInput 
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder={id ? id : "학생 번호를 입력해 주세요. 예) 17번"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>역할</Text>
                <TextInput 
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder={role ? role : "학급 혹은 학교 내 역할을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>동아리</Text>
                <TextInput 
                    style={styles.input}
                    value={club}
                    onChangeText={setClub}
                    placeholder={club ? club :"소속된 동아리가 있다면 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>   

                <View style={{...styles.inputContainer, marginBottom: 40}}>
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
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}

        {step === 5 && ( // 직장인
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120}}>

                <Text style={styles.title}>직장 속 나에 대한 정보 수정하기</Text>

                <ScrollView>
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>회사*</Text>
                <TextInput 
                    style={isCompanyValid ? styles.input : styles.warningInput}
                    value={company}
                    onChangeText={text => {
                        setCompany(text);
                        setIsCompanyValid(true);
                    }}
                    placeholder= {company ? company : "회사명을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                {!isCompanyValid && (
                    <Text style={styles.warningText}>회사명을 입력해 주세요.</Text>
                )}
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>직무*</Text>
                <TextInput 
                    style={isJobValid ? styles.input : styles.warningInput}
                    value={job}
                    onChangeText={text => {
                        setJob(text);
                        setIsJobValid(true);
                    }}
                    placeholder= {job ? job : "직무를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                {!isJobValid && (
                    <Text style={styles.warningText}>직무를 입력해 주세요.</Text>
                )}
                </View>

                <View style={[styles.line, {marginBottom: 40}]} />

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>직위</Text>
                <TextInput 
                    style={styles.input}
                    value={position}
                    onChangeText={setPosition}
                    placeholder={position ? position : "직위를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>부서</Text>
                <TextInput 
                    style={styles.input}
                    value={department}
                    onChangeText={setDepartment}
                    placeholder={department ? department : "소속 부서를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    
                </ScrollView>

                </View>

                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}

        {step === 6 && ( // 팬
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120}}>

                <Text style={styles.title}>팬으로서의 나에 대한 정보 수정하기</Text>

                <ScrollView>
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>덕질 장르*</Text>
                <TextInput 
                    style={isGenreValid ? styles.input : styles.warningInput}
                    value={genre}
                    onChangeText={text => {
                        setGenre(text);
                        setIsGenreValid(true);
                    }}
                    placeholder= {genre ? genre : "덕질 장르를 입력해 주세요. 예)아이돌, 야구 등"}
                    placeholderTextColor={theme.gray60}
                    />
                {!isGenreValid && (
                    <Text style={styles.warningText}>덕질 장르를 입력해 주세요.</Text>
                )}
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>최애*</Text>
                <TextInput 
                    style={isFirstValid ? styles.input : styles.warningInput}
                    value={first}
                    onChangeText={text => {
                        setFirst(text);
                        setIsFirstValid(true);
                    }}
                    placeholder= {first ? first : "최애를 입력해 주세요. 예)차은우, 뉴진스 하니"}
                    placeholderTextColor={theme.gray60}
                    />
                {!isFirstValid && (
                    <Text style={styles.warningText}>최애를 입력해 주세요.</Text>
                )}
                </View>

                <View style={styles.line} />

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>차애</Text>
                <TextInput 
                    style={styles.input}
                    value={second}
                    onChangeText={setSecond}
                    placeholder={second ? second : "차애를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>

                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>입덕 계기</Text>
                <TextInput 
                    style={styles.input}
                    value={reason}
                    onChangeText={setReason}
                    placeholder={reason ? reason : "입덕하게된 계기를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    
                </ScrollView>

                </View>

                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )}

        {step === 7 && ( // 자유
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120}}>

                <Text style={styles.title}>카드 속 정보를 수정하기</Text>

                <ScrollView>
                {card.student?.card_student_school && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>학교</Text>
                <TextInput 
                    style={styles.input}
                    value={school}
                    onChangeText={setSchool}
                    placeholder={school ? school : "학교명을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View> 
                )}
                {card.student?.card_student_grade && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>학년</Text>
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
                    { label: '추가학기', value: '추가학기', key: '7' },
                    { label: '그 외', value: '그 외', key: '8' },
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
                )}
                {card.student?.card_student_school && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>전공</Text>
                <TextInput 
                    style={styles.input}
                    value={major}
                    onChangeText={setMajor}
                    placeholder={major ? major : "전공을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>                 
                )}
                {card.student?.card_student_id && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>학생번호</Text>
                <TextInput 
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder={id ? id : "학번을 입력해 주세요. 예) 17학번"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.student?.card_student_role && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>역할</Text>
                <TextInput 
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder={role ? role : "프로젝트 혹은 학과 내 역할을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    
                )}
                {card.student?.card_student_club && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>동아리</Text>
                <TextInput 
                    style={styles.input}
                    value={club}
                    onChangeText={setClub}
                    placeholder={club ? club :"소속된 동아리가 있다면 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>   
                )}
                {card.student?.card_student_grade && (  
                <View style={{...styles.inputContainer, marginBottom: 40}}>
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
                )}
                
                {card.worker?.card_worker_company && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>회사</Text>
                <TextInput 
                    style={styles.input }
                    value={company}
                    onChangeText={setCompany}
                    placeholder= {company ? company : "회사명을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.worker?.card_worker_job && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>직무</Text>
                <TextInput 
                    style={styles.input}
                    value={job}
                    onChangeText={setJob}
                    placeholder= {job ? job : "직무를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.worker?.card_worker_position && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>직위</Text>
                <TextInput 
                    style={styles.input}
                    value={position}
                    onChangeText={setPosition}
                    placeholder={position ? position : "직위를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.worker?.card_worker_department && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>부서</Text>
                <TextInput 
                    style={styles.input}
                    value={department}
                    onChangeText={setDepartment}
                    placeholder={department ? department : "소속 부서를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    
                )}
                
                {card.fan?.card_fan_genre && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>덕질 장르</Text>
                <TextInput 
                    style={styles.input}
                    value={genre}
                    onChangeText={setGenre}
                    placeholder= {genre ? genre : "덕질 장르를 입력해 주세요. 예)아이돌, 야구 등"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.fan?.card_fan_first && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>최애</Text>
                <TextInput 
                    style={styles.input}
                    value={first}
                    onChangeText={setFirst}
                    placeholder= {first ? first : "최애를 입력해 주세요. 예)차은우, 뉴진스 하니"}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.fan?.card_fan_first && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>차애</Text>
                <TextInput 
                    style={styles.input}
                    value={second}
                    onChangeText={setSecond}
                    placeholder={second ? second : "차애를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>
                )}
                {card.fan?.card_fan_first && (
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>입덕 계기</Text>
                <TextInput 
                    style={styles.input}
                    value={reason}
                    onChangeText={setReason}
                    placeholder={reason ? reason : "입덕하게된 계기를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View>    
                )}
                </ScrollView>
                </View>

                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )}

        {step === 8 && ( // 추가 정보
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // iOS용 설정
            >
                <View style={{marginBottom: 120}}>

                <Text style={styles.title}>추가 정보를 수정하기</Text>

                <ScrollView>
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>취미</Text>
                <TextInput 
                    style={styles.input}
                    value={hobby}
                    onChangeText={setHobby}
                    placeholder={hobby ? hobby : "취미를 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View> 
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>인생 음악</Text>
                <TextInput 
                    style={styles.input}
                    value={music}
                    onChangeText={setMusic}
                    placeholder={music ? music : "노래 제목을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View> 
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>인생 영화</Text>
                <TextInput 
                    style={styles.input}
                    value={movie}
                    onChangeText={setMovie}
                    placeholder={movie ? movie : "영화 제목을 입력해 주세요."}
                    placeholderTextColor={theme.gray60}
                    />
                </View> 
                <View style={{...styles.inputContainer, marginBottom: 40}}>
                <Text style={styles.subTitle}>거주지</Text>
                <TextInput 
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholder={address ? address : "거주지를 입력해 주세요. 예)서울특별시 강남구"}
                    placeholderTextColor={theme.gray60}
                    />
                </View> 
                </ScrollView>

                </View>
                <TouchableOpacity style={styles.memoBtn} onPress={handleSubmit}>
                <Text style={styles.memoBtnText}>완료</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )}
            
            
            </View>
            </TouchableWithoutFeedback>
    );
}
export default EditCard;
