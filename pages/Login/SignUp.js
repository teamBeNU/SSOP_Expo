import React, {useState, useEffect, useRef} from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { theme } from "../../theme";
import { styles } from "./SignUpStyle.js";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { ScrollView } from "react-native-gesture-handler";
import { serviceAgreeText, infoAgreeText } from "./AgreeContent.js";

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import VisibilityIcon from '../../assets/Login/ic_visibility.svg';
import VisibilityOffIcon from '../../assets/Login/ic_visibility_off.svg';
import CheckIcon from '../../assets/Login/ic_done_small_line.svg';
import BlueCheckIcon from '../../assets/Login/ic_done_small_line_blue.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import SignUpDone from '../../assets/Login/graphic_signUpDone.svg';

function SignUp() {
    const navigation = useNavigation();
    const route = useRoute();

    // 1. email 입력
    const [email, setEmail] = useState('');

    // 2. email 인증번호 입력
    const [emailCode, setEmailCode] = useState('');
    const [testEmailCode, setTestEmailCode] = useState('123');
    const [testPhoneCode, setTestPhoneCode] = useState('123');
    const [emailCodeIsCorrect, setEmailCodeIsCorrect] = useState(true);
    const [isResend, setIsResend] = useState(false);
    const handleEmailCodeChange = (text) => {
      setEmailCode(text);
      if(emailCode === testEmailCode) setEmailCodeIsCorrect(true);
    };
    
    const handleEmailCode = () => {
      if(emailCode !== testEmailCode) setEmailCodeIsCorrect(false);
      else if((emailCode === testEmailCode)) setEmailCodeIsCorrect(false);
    };

    // 3. pw 입력
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [hasEnglish, setHasEnglish] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLeng, setHasLeng] = useState(false);
    const passwordCheck = (password) => {
      setHasEnglish(/[a-zA-Z]/.test(password));
      setHasNum(/[0-9]/.test(password));
      setHasLeng(/^.{6,20}$/.test(password));
    };
    const togglePwVisibility = () => {
      setShowPw(!showPw);
    };

    // 4. 이름, 생년월일 입력
    const [name, setName] = useState("");
    const [birth, setBirth] = useState({
        year: '',
        month: '',
        day: '',
    });
    const [isFull, setIsFull] = useState({
      name: true,
      birth: true,
    })
    const [isBirthCorrect, setIsBirthCorrect] = useState({year: true, month: true, day: true});
    const [bSecret, setBSecret] = useState(false);
        
    const currentYear = new Date().getFullYear();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    // 5. 연락처 입력
    const [phoneNumber, setPhoneNumber] = useState('');

    // 6. 연락처 인증번호 입력
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneCodeIsCorrect, setPhoneCodeIsCorrect] = useState(true);
    const handlePhoneCodeChange = (text) => {
      setPhoneCode(text);
      if(phoneCode === testPhoneCode) setPhoneCodeIsCorrect(true);
    };
    
    const handlePhoneCode = () => {
      if(phoneCode !== testPhoneCode) setPhoneCodeIsCorrect(false);
      else if((phoneCode === testPhoneCode)) setPhoneCodeIsCorrect(false);
    };

    const handleRequest = () => {
      setIsResend(true);
      setSeconds(180);
    };

      // 카운트다운
    const [seconds, setSeconds] = useState(180);
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
      let timer;
  
      if (timerActive && seconds > 0) {
        timer = setInterval(() => {
          setSeconds((prevTime) => prevTime - 1);
        }, 1000);
      } else if (seconds === 0) {
        clearInterval(timer);
      }
  
      return () => clearInterval(timer);
    }, [timerActive, seconds]);

    const formatTime = (time) => {
      const min = Math.floor(time / 60);
      const sec = time % 60;
      return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    // 7. 약관 동의
    const [isAgree, setIsAgree] = useState({
      serviceAgree: false,
      informationAgree: false,
    });

    const handleAgreeAll = () => {
      if(!isAgree.serviceAgree || !isAgree.informationAgree)
        setIsAgree({
          serviceAgree: true,
          informationAgree: true
        });
      else 
        setIsAgree({
          serviceAgree: false,
          informationAgree: false
        });
    };

    const handleServiceAgree = () => {
      setIsAgree((prevState) => ({
        ...prevState,
        serviceAgree: !prevState.serviceAgree,
      }));
    };
    
    const handleInfoAgree = () => {
      setIsAgree((prevState) => ({
        ...prevState,
        informationAgree: !prevState.informationAgree,
      }));
    };

    // 페이지 이동
    const [step, setStep] = useState(1);
     // step 단위 뒤로 가기
     const handleBack = () => {
        // 현재 단계(step)에 따라 이전 단계로 이동
        switch (step) {
          case 1:
            // 1단계에서는 이동하지 않음
            break;
          case 6:
            setStep(5);
            break;
          case 7:
            setStep(5);
            break;
          default:
            setStep(step - 1);
            break;
        }
      };
      

      // 테스트용 다음 step
      const handleNext = () => {
        if (step === 1 ) {
          if(email !== '')
          setStep(2);
        } else if (step === 2 ) {
          if(password !== '')
          setStep(3);
        } else if (step === 3 ) {
          const isNameFull = name !== '';
          const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
          setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull})));
        
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

         const days = getDayInMonth(birth.year, birth.month);

          const isYearCorrect = birth.year >= currentYear - 110 && birth.year <= currentYear;
          const isMonthCorrect = birth.month.length === 2 && (1 <= parseInt(birth.month) && parseInt(birth.month) <= 12);
          const isDayCorrect = birth.day.length === 2 && (1 <= parseInt(birth.day) && parseInt(birth.day) <= days);

          if (isFull) {
            setIsBirthCorrect((prev) => ({
              ...prev,
              year: isYearCorrect,
              month: isMonthCorrect,
              day: isDayCorrect,
            }));
          }
          
          if (isNameFull && isBirthFull && isBirthCorrect.year && isBirthCorrect.month && isBirthCorrect.day) {
              setStep(4);
          }
        } else if (step === 4) {
          if(phoneNumber !== '')
          setStep(5);
        } else if (step === 5 ) {
          if(Object.values(isAgree).every(value => value === true)) setStep(8);
          else null;
        } else if (step === 6 ) {
          setStep(5);
        } else if (step === 7 ) {
          setStep(5);
        } else if (step === 8 ) {
          navigation.navigate('홈');
        }
      };

      const handleSeviceDetail = () => {
        setStep(6);
      };
      const handleInfoDetail = () => {
        setStep(7);
      };
      
      const handleGoBack = () => {
        navigation.goBack();
      };

      const handleHeaderLeft = (onPress) => {
        if (step > 1 && step !== 6 && step !== 7) {
          return (
            <TouchableOpacity onPress={handleBack}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          );
        } else if (step === 6 || step === 7) {
          return (
            <TouchableOpacity onPress={handleBack}>
              <CloseIcon style={{ marginLeft: 8 }} />
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

      const handleHeaderTitle = () => {
        if (step === 6) return navigation.setOptions({headerTitle: "서비스 이용약관"});
        else if (step === 7) return navigation.setOptions({headerTitle: "개인정보 처리방침"});
        else return navigation.setOptions({headerTitle: "회원가입"});
      };
      
      useEffect(() => {
        navigation.setOptions({
          headerLeft: handleHeaderLeft,
          headerTitle: handleHeaderTitle,
        });
      }, [navigation, step]);
  
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            {step !== 6 && step !== 7 && (        // 프로그레스 바
                <Progress.Bar
                    progress={step / 6}
                    width={null}
                    height={2}
                    color={theme.green}
                    borderWidth={0}
                />
            )}
            {step === 1 && (
            <View style={styles.container}>
                <Text style={styles.title}>이메일 주소를 입력하세요.</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>이메일</Text>
                    <TextInput
                    style={styles.input} 
                    placeholder="이메일 주소를 입력하세요."
                    keyboardType= "email-address"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="next"
                    onSubmitEditing={handleNext}
                    />
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>
            </View>
            )}

             {step === 2 && (
              <View style={styles.container}>
                <Text style={styles.title}>비밀번호를 입력하세요.</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>비밀번호</Text>
                    <View style={{...styles.input, ...styles.pwInput }}>
                    <TextInput
                    style={{width:  Dimensions.get('window').width - 96}} 
                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                    maxLength={20}
                    secureTextEntry = {showPw ? false : true}
                    onChange={(e) => {setPassword(e.target.value)}}
                    onChangeText={passwordCheck}
                    value={password}
                    returnKeyType="next"
                    onSubmitEditing={handleNext}
                    />
                    {showPw ? <VisibilityIcon onPress={togglePwVisibility} style={styles.visibility}/> : <VisibilityOffIcon onPress={togglePwVisibility} style={styles.visibility}/>}
                    </View>
                    <View style={styles.checkContainer}>
                      <View style={styles.check}>
                      {hasEnglish ? <BlueCheckIcon/> : <CheckIcon />}
                      <Text>영문 포함</Text>  
                      </View>
                      <View style={styles.check}>
                      {hasNum ? <BlueCheckIcon/> : <CheckIcon />}
                      <Text>숫자 포함</Text>  
                      </View>
                      <View style={styles.check}>
                      {hasLeng ? <BlueCheckIcon/> : <CheckIcon />}
                      <Text>6-20자 이내</Text>  
                    </View>
                  </View>
                </View> 
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === 3 && (
              <View style={styles.container}>
              <Text style={styles.title}>이름과 생년월일을 입력하세요.</Text>
                 <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>이름*</Text>
                     <TextInput 
                         style={[styles.input, !isFull.name && styles.inputError]}
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
                 <View style={[styles.inputContainer, !isFull.name ? {marginTop: 15}: {marginTop: 40}]}>
                     <Text style={styles.inputTitle}>생년월일*</Text>
                     <View style={styles.birthContainer}>
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
                             <Text style={styles.inputErrorText}>생년월일을 입력해 주세요.</Text>
                         ) : (
                             <View></View>
                         )}
                         {isFull.birth && (!isBirthCorrect.year || !isBirthCorrect.month || !isBirthCorrect.day) ? (
                             <Text style={styles.inputErrorText}>생년월일을 올바르게 입력해 주세요 (e.g., 2001년 01월 01일)</Text>
                         ) : (
                             <View></View>
                         )}
                   </View>
           
             <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                 <Text style={styles.nextText}>다음으로</Text>
             </TouchableOpacity>                
         </View>
            )}

            {step === 4 && ( 
              <View style={styles.container}>
              <Text style={styles.title}>연락처를 입력해 주세요.</Text>
              <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>연락처</Text>
                  <TextInput
                  style={styles.input} 
                  placeholder="연락처를 입력하세요."
                  keyboardType= "number-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  />
              </View>
              <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                  <Text style={styles.nextText}>다음으로</Text>
              </TouchableOpacity>
             </View>
            )}

           {step === 5 && (
            <View style={styles.container}>
            <Text style={styles.title}>서비스 약관에 동의해 주세요.</Text>
            <View style={styles.agreeContainer}>
              <View style={styles.agreeAll}>
                <TouchableOpacity onPress={handleAgreeAll}>
                  {isAgree.serviceAgree && isAgree.informationAgree  ? <BlueCheckIcon/> : <CheckIcon/>}
                </TouchableOpacity>
                <Text style={styles.agreeAllText}> 약관 전체 동의</Text>
              </View>

              <View style={{gap: 8, marginHorizontal: 12, marginTop: 16}}>
                <View style={styles.agreeDetail}>
                  <TouchableOpacity onPress={handleServiceAgree}>
                    {isAgree.serviceAgree ? <BlueCheckIcon/> : <CheckIcon/>}
                  </TouchableOpacity >
                  <Text style={styles.agreeDetailText}>[필수] 서비스 이용약관 동의</Text>
                  <TouchableOpacity onPress={handleSeviceDetail}>
                  <RightIcon />
                  </TouchableOpacity>
                </View>
                <View style={styles.agreeDetail}>
                  <TouchableOpacity onPress={handleInfoAgree}>
                   {isAgree.informationAgree ? <BlueCheckIcon/> : <CheckIcon/>}
                  </TouchableOpacity>
                  <Text style={styles.agreeDetailText}>[필수] 개인정보 처리방침 동의</Text>
                  <TouchableOpacity onPress={handleInfoDetail}>
                  <RightIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                <Text style={styles.nextText}>다음으로</Text>
            </TouchableOpacity>
           </View>            
          )}

          {step === 6 && (
          <ScrollView showsVerticalScrollIndicator={false} style={{...styles.container, paddingTop: 24}}>
          <Text style={styles.agreeContent}>{serviceAgreeText}</Text>
          </ScrollView>                     
          )}

          {step === 7 && (
          <ScrollView showsVerticalScrollIndicator={false} style={{...styles.container, paddingTop: 24}}>
          <Text style={{paddingBottom: 100}}>{infoAgreeText}</Text>
          </ScrollView>
          )}

          {step === 8 && (
            <View style={styles.container}>
            <Text style={styles.title}>회원가입이 완료되었습니다!{`\n`}환영합니다.</Text>
            <SignUpDone style={{marginTop: 72}}/>

            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                <Text style={styles.nextText}>쏩 시작하기</Text>
            </TouchableOpacity>
           </View>
          )}
            </View>
        </TouchableWithoutFeedback>
    )
 }

export default SignUp;