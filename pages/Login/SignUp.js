import React, {useState, useEffect, useRef} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { theme } from "../../theme";
import { styles } from "./SignUpStyle.js";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { ScrollView } from "react-native-gesture-handler";

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

    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [testEmailCode, setTestEmailCode] = useState('123');
    const [testPhoneCode, setTestPhoneCode] = useState('123');
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState({
        year: '',
        month: '',
        day: '',
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCode, setPhoneCode] = useState('');

    const [emailCodeIsCorrect, setEmailCodeIsCorrect] = useState(true);
    const [phoneCodeIsCorrect, setPhoneCodeIsCorrect] = useState(true);
    const [isResend, setIsResend] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [hasEnglish, setHasEnglish] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLeng, setHasLeng] = useState(false);
    const [hasName, setHasName] = useState(true);
    const [hasBirth, setHasBirth] = useState(true);
    const [isFull, setIsFull] = useState({
      name: true,
      birth: true,
  })
    const [bSecret, setBSecret] = useState(false);
    const [isAgree, setIsAgree] = useState({
      serviceAgree: false,
      informationAgree: false,
    });

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    const passwordCheck = (password) => {
        setHasEnglish(/[a-zA-Z]/.test(password));
        setHasNum(/[0-9]/.test(password));
        setHasLeng(/^.{6,20}$/.test(password));
    };

    const handleEmailCodeChange = (text) => {
      setEmailCode(text);
      if(emailCode === testEmailCode) setEmailCodeIsCorrect(true);
    };
    
    const handleEmailCode = () => {
      if(emailCode !== testEmailCode) setEmailCodeIsCorrect(false);
      else if((emailCode === testEmailCode)) setEmailCodeIsCorrect(false);
    };

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
    };

    const togglePwVisibility = () => {
      setShowPw(!showPw);
    };

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
    

    const [step, setStep] = useState(1);
     // step 단위 뒤로 가기
     const handleBack = () => {
        // 현재 단계(step)에 따라 이전 단계로 이동
        switch (step) {
          case 1:
            // 1단계에서는 이동하지 않음
            break;
          case 9:
            setStep(7);
            break;
          case 10:
            setStep(7);
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
          setStep(3);
        } else if (step === 3 ) {
          if(password !== '')
          setStep(4);
        } else if (step === 4) {
          const isNameFull = name !== '';
          const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
          setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull})));
          
          if (isNameFull && isBirthFull) {
              setStep(5);
          }
        } else if (step === 5 ) {
          if(phoneNumber !== '')
          setStep(6);
        } else if (step === 6 ) {
          setStep(7);
        } else if (step === 7 ) {
          if(Object.values(isAgree).every(value => value === true)) setStep(10);
          else null;
        } else if (step === 8 ) {
          setStep(7);
        } else if (step === 9 ) {
          setStep(6);
        } else if (step === 10) {
          navigation.navigate('홈');
        }
      };

      const handleSeviceDetail = () => {
        setStep(8);
      };
      const handleInfoDetail = () => {
        setStep(9);
      };
      
      const handleGoBack = () => {
        navigation.goBack();
      };

      const handleHeaderLeft = (onPress) => {
        if (step > 1 && step !== 8 && step !== 9) {
          return (
            <TouchableOpacity onPress={handleBack}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          );
        } else if (step === 8 || step === 9) {
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
        if (step === 8) return navigation.setOptions({headerTitle: "서비스 이용약관"});
        else if (step === 9) return navigation.setOptions({headerTitle: "개인정보 처리방침"});
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
            {step !== 8 && step !== 9 && (        // 프로그레스 바
                <Progress.Bar
                    progress={step / 8}
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
                    <Text style={styles.nextText}>이메일 주소 인증하기</Text>
                </TouchableOpacity>
            </View>
            )}

             {step === 2 && (
            <View style={styles.container}>
                <Text style={styles.title}>이메일 주소로 발송된{`\n`}인증번호를 입력하세요.</Text>
                <View style={{...styles.inputContainer, marginTop: 32}}>
                    <Text style={styles.inputTitle}>인증번호</Text>
                    <TextInput
                    style={styles.input} 
                    placeholder="이메일 주소를 확인하세요."
                    keyboardType= "number-pad"
                    onChangeText={handleEmailCodeChange}
                    value={emailCode}         
                    />
                    <TouchableOpacity onPress={handleRequest}>
                        <Text style={styles.request}>인증메일 재요청</Text>
                    </TouchableOpacity>

                    {!emailCodeIsCorrect  && <Text style={styles.uncorrect}>인증번호가 일치하지 않습니다.</Text>}
                    {isResend && <Text style={styles.resend}>인증번호가 재발송되었습니다.{`\n`}재발송이 재차 필요한 경우 15초 후에 시도해 주세요.</Text>}
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={(emailCode === testEmailCode) ? handleNext : handleEmailCode}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>
            </View>
            )}

            {step === 3 && (
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

            {step === 4 && ( 
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
                      </View>
              
                <TouchableOpacity style={styles.nextBtn} onPress={hasName ? handleNext : handleName}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>                
            </View>
            )}

           {step === 5 && (
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
                <Text style={styles.nextText}>연락처 인증하기</Text>
            </TouchableOpacity>
           </View>
          )}

          {step === 6 && (
          <View style={styles.container}>
            <Text style={styles.title}>문자로 발송된 인증번호를 입력하세요. </Text>
            <View style={{...styles.inputContainer, marginTop: 32}}>
                <Text style={styles.inputTitle}>인증번호</Text>
                <TextInput
                style={styles.input} 
                placeholder="인증번호를 입력하세요."
                keyboardType= "number-pad"
                onChangeText={handlePhoneCodeChange}
                value={phoneCode}       
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.request, color: theme.gray40, fontWeight: '400', marginLeft: 8}}>잔여시간</Text>
                    <Text style={{...styles.request, color: theme.gray40, marginLeft: 4}}>3:00</Text>
                  </View>
                <TouchableOpacity onPress={handleRequest}>
                    <Text style={styles.request}>인증문자 재요청</Text>
                </TouchableOpacity>
                </View>

                {!phoneCodeIsCorrect  && <Text style={styles.uncorrect}>인증번호가 일치하지 않습니다.</Text>}
                {isResend && <Text style={styles.resend}>인증번호가 재발송되었습니다.{`\n`}재발송이 재차 필요한 경우 15초 후에 시도해 주세요.</Text>}
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={(phoneCode === testPhoneCode) ? handleNext : handlePhoneCode}>
                <Text style={styles.nextText}>다음으로</Text>
            </TouchableOpacity>
         </View>
          )}

          {step === 7 && (
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

          {step === 8 && (
              <ScrollView showsVerticalScrollIndicator={false} style={{...styles.container, paddingTop: 24}}>
               <Text style={styles.agreeContent}>{serviceAgreeText}</Text>
              </ScrollView>
          )}
          {step === 9 && (
            <ScrollView showsVerticalScrollIndicator={false} style={{...styles.container, paddingTop: 24}}>
            <Text style={{paddingBottom: 100}}>{infoAgreeText}</Text>
           </ScrollView>
          )}

          {step === 10 && (
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

const serviceAgreeText = 
`제1조(목적)
본 약관은 팀 비누가 제공하는 서비스"SSOP"(이하 '서비스'라 합니다)를 이용함에 있어 당사자의 권리 의무 및 책임사항을 규정하는 것을 목적으로 합니다.

제2조(정의)
1. '회사'라 함은, '팀 비누'가 이용자에게 서비스를 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정한 앱을 운영하는 사람들을 말합니다.
2. '이용자'라 함은, '사이트'에 접속하여 본 약관에 따라 '회사'가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
3. '회원'이라 함은, '회사'에 개인정보를 제공하고 회원으로 등록한 자로서, '회사'의 서비스를 계속하여 이용할 수 있는 자를 말합니다.
4. '비회원'이라 함은, 회원으로 등록하지 않고, '회사'가 제공하는 서비스를 이용하는 자를 말합니다.

제3조(약관 외 준칙)
본 약관에서 정하지 아니한 사항은 법령 또는 회사가 정한 서비스의 개별 약관, 운영정책 및 규칙(이하 '세부지침'이라 합니다)의 규정에 따릅니다. 또한 본 약관과 세부지침이 충돌할 경우에는 세부지침이 우선합니다.

제4조(약관의 명시 및 개정)
1. '회사'는 이 약관의 내용과 상호 및 팀원 성명 등을 이용자가 쉽게 알 수 있도록 마이페이지에 게시합니다. 본 약관의 내용은 '이용자'가 연결화면을 통하여 확인할 수 있도록 할 수 있습니다.
2. '회사'는 '전자상거래 등에서의 소비자보호에 관한 법률', '약관의 규제에 관한 법률','전자거래기본법', '정보통신망 이용촉진등에 관한 법률', '소비자보호법' 등 관련법령(이하 '관계법령'이라 합니다)에 위배되지 않는 범위내에서 본 약관을 개정할 수 있습니다.
3. '회사'가 본 약관을 개정하고자 할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께 초기화면에 그 적용일자 7일전부터 적용일자 전날까지 공지합니다.
4. '회사'가 본 약관을 개정한 경우, 개정약관은 적용일자 이후 체결되는 계약에만 적용되며 적용일자 이전 체결된 계약에 대해서는 개정 전 약관이 적용됩니다. 다만, 이미 계약을 체결한 '이용자'가 개정약관의 내용을 적용받고자 하는 뜻을 '회사'에 전달하고 '회사'가 여기에 동의한 경우 개정약관을 적용합니다.
5. 본 약관에서 정하지 아니한 사항 및 본 약관의 해석에 관하여는 관계법령 및 건전한 상관례에 따릅니다.

제5조(서비스의 중단 등)
1. '회사'가 제공하는 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다. 다만 '회사' 시스템의 유지 · 보수를 위한 점검, 통신장비의 교체 등 특별한 사유가 있는 경우 서비스의 전부 또는 일부에 대하여 일시적인 제공 중단이 발생할 수 있습니다.
2. '회사'는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우, 전기통신사업법에 의한 기간통신사업자가 전기통신서비스를 중지하는 등 부득이한 사유가 발생한 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
3. '회사'가 서비스를 정지하거나 이용을 제한하는 경우 그 사유 및 기간, 복구 예정 일시 등을 지체 없이 '이용자'에게 알립니다.

제6조(회원가입)
1. '회사'가 정한 양식에 따라 '이용자'가 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
2. '회사'는 전항에 따라 회원가입을 신청한 '이용자' 중 다음 각호의 사유가 없는 한 '회원'으로 등록합니다.
    a. 가입신청자가 본 약관에 따라 회원자격을 상실한 적이 있는 경우. 다만, '회사'의 재가입 승낙을 얻은 경우에는 예외로 합니다.
    b. 회원정보에 허위, 기재누락, 오기 등 불완전한 부분이 있는 경우
    c. 기타 회원으로 등록하는 것이 '회사'의 운영에 현저한 지장을 초래하는 것으로 인정되는 경우
3. 회원가입 시기는 '회사'의 가입승낙 안내가 '회원'에게 도달한 시점으로 합니다.

제7조(회원탈퇴 및 자격상실 등)
1. '회원'은 '회사'에 언제든지 탈퇴를 요청할 수 있으며, '회사'는 지체없이 회원탈퇴 요청을 처리합니다. 다만 이미 체결된 거래계약을 이행할 필요가 있는 경우에는 본약관이 계속 적용됩니다.
2. '쇼다음 각호의 사유가 발생한 경우 '회사'의 자격을 제한 또는 정지시킬 수 있습니다.
    a. 회원가입 시 허위정보를 기재한 경우
    b. 다른 이용자의 정상적인 이용을 방해하는 경우
    c. 관계법령 또는 본 약관에서 금지하는 행위를 한 경우
    d. 공서양속에 어긋나는 행위를 한 경우
    e. 기타 '회원'으로 등록하는 것이 적절하지 않은 것으로 판단되는 경우

제8조(회원에 대한 통지)
1. '회사'는 '회원' 회원가입 시 기재한 전자우편, 이동전화번호, 주소 등을 이용하여 '회원'에게 통지 할 수 있습니다.
2. '회사'가 불특정 다수 '회원'에게 통지하고자 하는 경우 1주일 이상 서비스의 초기화면에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만 '회원'이 서비스를 이용함에 있어 중요한 사항에 대하여는 개별 통지합니다.

제9조(개인정보보호)
1. '회사'는 '구매자'의 정보수집시 다음의 필수사항 등 구매계약 이행에 필요한 최소한의 정보만을 수집합니다.
    a. 성명
    b. 전화번호(또는 이동전화번호)
    c. 비밀번호
    d. 전자우편(e-mail)주소
    e. 생년월일
2. '회사'가 개인정보보호법 상의 고유식별정보 및 민감정보를 수집하는 때에는 반드시 대상자의 동의를 받습니다.
3. '회사'는 제공된 개인정보를 '구매자'의 동의 없이 목적외 이용, 또는 제3자 제공할 수 없으며 이에 대한 모든 책임은 '회사'가 부담합니다. 다만 다음의 경우에는 예외로 합니다.
    a. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우
    b. 도용방지를 위하여 본인 확인이 필요한 경우
    c. 관계법령의 규정에 따른 경우

제10조('회사'의 의무)
1. '회사'는 관계법령, 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않습니다.
2. '회사'는 '이용자'가 안전하게 인터넷 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.
3. '회사'는 '이용자'의 수신동의 없이 영리목적으로 광고성 전자우편, 휴대전화 메시지, 전화, 우편 등을 발송하지 않습니다.

제11조(이용자 및 회원의 의무)
1. '이용자'는 회원가입 신청 시 사실에 근거하여 신청서를 작성해야 합니다. 허위, 또는 타인의 정보를 등록한 경우 '회사'에 대하여 일체의 권리를 주장할 수 없으며, '회사'는 이로 인하여 발생한 손해에 대하여 책임을 부담하지 않습니다.
2. '이용자'는 본 약관에서 규정하는 사항과 기타 '회사'가 정한 제반 규정 및 공지사항을 준수하여야 합니다. 또한 '이용자'는 '회사'의 업무를 방해하는 행위 및 '회사'의 명예를 훼손하는 행위를 하여서는 안 됩니다.
3. '이용자'는 주소, 연락처, 전자우편 주소 등 회원정보가 변경된 경우 즉시 이를 수정해야 합니다. 변경된 정보를 수정하지 않거나 수정을 게을리하여 발생하는 책임은 '이용자'가 부담합니다.
4. '이용자'는 다음의 행위를 하여서는 안됩니다.
    a. '회사'에 게시된 정보의 변경
    b. '회사'가 정한 정보 외의 다른 정보의 송신 또는 게시
    c. '회사' 및 제3자의 저작권 등 지식재산권에 대한 침해
    d. '회사' 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위
    e. 외설 또는 폭력적인 메시지, 화상, 음성 기타 관계법령 및 공서양속에 반하는 정보를 '회사'의 '사이트'에 공개 또는 게시하는 행위
5. '회원'은 부여된 아이디(ID)와 비밀번호를 직접 관리해야 합니다.
6. '회원'이 자신의 아이디(ID) 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 '회사'에 통보하고 안내에 따라야 합니다.

제12조(저작권의 귀속 및 이용)
1. '회사'가 제공하는 서비스 및 이와 관련된 모든 지식재산권은 '회사'에 귀속됩니다
2. '이용자'는 '회사'에게 지식재산권이 있는 정보를 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나, 제3자가 이용하게 하여서는 안됩니다.
3. '이용자'가 서비스 내에 게시한 게시물, 이용후기 등 콘텐츠(이하 '콘텐츠')의 저작권은 해당 '콘텐츠'의 저작자에게 귀속됩니다.
4. 전항의 규정에도 불구하고 '회사'는 서비스의 운영, 전시, 전송, 배포, 홍보 등의 목적으로 별도의 허락 없이 무상으로 저작권법 및 공정한 거래관행에 합치되는 범위 내에서 다음 각호와 같이 '이용자'가 등록한 저작물을 이용할 수 있습니다.
    a. '회사'가 제공하는 서비스 내에서 '이용자'가 작성한 '콘텐츠'의 복제, 수정, 전시, 전송, 배포 등 저작권을 침해하지 않는 범위 내의 2차적 저작물 또는 편집 저작물 작성을 위한 사용. 다만 '이용자'가 해당 '콘텐츠'의 삭제 또는 사용중지를 요청하는 경우 관련법에 따라 보존해야하는 사항을 제외하고 관련 '콘텐츠'를 모두 삭제 또는 사용중지합니다.
    b. 미디어, 통신사 등을 통한 홍보목적으로 '콘텐츠'를 제공, 전시하도록 하는 등의 사용

제13조(분쟁의 해결)
1. '회사'는 '이용자'가 제기하는 불만사항 및 의견을 지체없이 처리하기 위하여 노력합니다. 다만 신속한 처리가 곤란한 경우 '이용자'에게 그 사유와 처리일정을 즉시 통보해 드립니다.
2. '회사'와 '이용자'간 발생한 분쟁에 관한 소송은 민사소송법에 따른 관할법원에 제기하며, 준거법은 대한민국의 법령을 적용합니다.

부 칙

제1조(시행일)
본 약관은 2024.05.23.부터 적용합니다.
`;

const infoAgreeText = 
`제1조(목적)
팀 비누(이하 ‘회사'라고 함)는 회사가 제공하고자 하는 서비스(이하 ‘회사 서비스’)를 이용하는 개인(이하 ‘이용자’ 또는 ‘개인’)의 정보(이하 ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 ‘본 방침’)을 수립합니다.

제2조(개인정보 처리의 원칙)
개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.

제3조(본 방침의 공개)
1. 회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다.
2. 회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.

제4조(본 방침의 변경)
1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.
2. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다.
    a. 회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여 공지하는 방법
    b. 서면·모사전송·전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법
3. 회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.

제5조(회원 가입을 위한 정보)
회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과 같은 정보를 수집합니다.
1. 필수 수집 정보: 이메일 주소, 비밀번호, 이름, 생년월일 및 휴대폰 번호

제6조(본인 인증을 위한 정보)
회사는 이용자의 본인인증을 위하여 다음과 같은 정보를 수집합니다.
1. 필수 수집 정보: 휴대폰 번호 및 이메일 주소
2. 선택 수집 정보: 사진, 닉네임, 학번이나 직장과 같은 신상 정보

제7조(개인정보 수집 방법)
회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.
1. 이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식
2. 어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가 자신의 개인정보를 입력하는 방식
3. 이용자가 고객센터의 상담, 게시판에서의 활동 등 회사의 서비스를 이용하는 과정에서 이용자가 입력하는 방식

제8조(개인정보의 이용)
회사는 개인정보를 다음 각 호의 경우에 이용합니다.
1. 공지사항의 전달 등 회사운영에 필요한 경우
2. 이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한 경우
3. 회사의 서비스를 제공하기 위한 경우
4. 법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우
5. 신규 서비스 개발을 위한 경우
6. 이벤트 및 행사 안내 등 마케팅을 위한 경우
7. 인구통계학적 분석, 서비스 방문 및 이용기록의 분석을 위한 경우
8. 개인정보 및 관심에 기반한 이용자간 관계의 형성을 위한 경우
9. 논문이나 과제와 같이 학업을 위해 필요한 정보인 경우

제9조(사전동의 등에 따른 개인정보의 제공)
1. 회사는 개인정보 제3자 제공 금지에도 불구하고, 이용자가 사전에 공개하거나 다음 각호 사항에 대하여 동의한 경우에는 제3자에게 개인정보를 제공할 수 있습니다. 다만 이 경우에도 회사는 관련 법령 내에서 최소한으로 개인정보를 제공합니다.
    a. 학교에게 학업을 위하여 서비스 운영을 위한 정보을 제공
2. 회사는 전항의 제3자 제공 관계에 변화가 있거나 제3자 제공 관계가 종결될 때도 같은 절차에 의해 이용자에게 고지 및 동의를 구합니다.

제10조(개인정보의 보유 및 이용기간)
1. 회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다.
2. 전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.

제11조(법령에 따른 개인정보의 보유 및 이용기간)
회사는 관계법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다.
1. 전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유정보 및 보유기간
    a. 계약 또는 청약철회 등에 관한 기록 : 5년
    b. 대금결제 및 재화 등의 공급에 관한 기록 : 5년
    c. 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
    d. 표시•광고에 관한 기록 : 6개월
2. 통신비밀보호법에 따른 보유정보 및 보유기간
    a. 웹사이트 로그 기록 자료 : 3개월
3. 전자금융거래법에 따른 보유정보 및 보유기간
    a. 전자금융거래에 관한 기록 : 5년
4. 위치정보의 보호 및 이용 등에 관한 법률
    a. 개인위치정보에 관한 기록 : 6개월

제12조(개인정보의 파기원칙)
회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유·이용기간의 경과 등 개인정보가 필요하지 않을 경우에는 해당 정보를 지체 없이 파기합니다.

제13조(개인정보파기절차)
1. 이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기 되어집니다.
2. 회사는 파기 사유가 발생한 개인정보를 개인정보보호 책임자의 승인절차를 거쳐 파기합니다.

제14조(개인정보파기방법)
회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이로 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.

제15조(광고성 정보의 전송 조치)
1. 회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 이용자의 명시적인 사전동의를 받습니다. 다만, 다음 각호 어느 하나에 해당하는 경우에는 사전 동의를 받지 않습니다
    a. 회사가 재화 등의 거래관계를 통하여 수신자로부터 직접 연락처를 수집한 경우, 거래가 종료된 날로부터 6개월 이내에 회사가 처리하고 수신자와 거래한 것과 동종의 재화 등에 대한 영리목적의 광고성 정보를 전송하려는 경우
    b. 「방문판매 등에 관한 법률」에 따른 전화권유판매자가 육성으로 수신자에게 개인정보의 수집출처를 고지하고 전화권유를 하는 경우
2. 회사는 전항에도 불구하고 수신자가 수신거부의사를 표시하거나 사전 동의를 철회한 경우에는 영리목적의 광고성 정보를 전송하지 않으며 수신거부 및 수신동의 철회에 대한 처리 결과를 알립니다.
3. 회사는 오후 9시부터 그다음 날 오전 8시까지의 시간에 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우에는 제1항에도 불구하고 그 수신자로부터 별도의 사전 동의를 받습니다.
4. 회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음의 사항 등을 광고성 정보에 구체적으로 밝힙니다.
    a. 회사명 및 연락처
    b. 수신 거부 또는 수신 동의의 철회 의사표시에 관한 사항의 표시
5. 회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음 각 호의 어느 하나에 해당하는 조치를 하지 않습니다.
    a. 광고성 정보 수신자의 수신거부 또는 수신동의의 철회를 회피·방해하는 조치
    b. 숫자·부호 또는 문자를 조합하여 전화번호·전자우편주소 등 수신자의 연락처를 자동으로 만들어 내는 조치
    c. 영리목적의 광고성 정보를 전송할 목적으로 전화번호 또는 전자우편주소를 자동으로 등록하는 조치
    d. 광고성 정보 전송자의 신원이나 광고 전송 출처를 감추기 위한 각종 조치
    e. 영리목적의 광고성 정보를 전송할 목적으로 수신자를 기망하여 회신을 유도하는 각종 조치

제16조(이용자의 의무)
1. 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.
2. 타인의 개인정보를 도용한 회원가입의 경우 이용자 자격을 상실하거나 관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.
3. 이용자는 전자우편주소, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.

제17조(국외 이전 개인정보의 보호)
1. 회사는 이용자의 개인정보에 관하여 개인정보보호법 등 관계 법규를 위반하는 사항을 내용으로 하는 국제계약을 체결하지 않습니다.
2. 회사는 이용자의 개인정보를 국외에 제공(조회되는 경우를 포함)ㆍ처리위탁ㆍ보관(이하 "이전"이라 함)하려면 이용자의 동의를 받습니다. 다만, 본조 제3항 각 호의 사항 모두를 개인정보보호법 등 관계 법규에 따라 공개하거나 전자우편 등 대통령령으로 정하는 방법에 따라 이용자에게 알린 경우에는 개인정보 처리위탁ㆍ보관에 따른 동의절차를 거치지 아니할 수 있습니다.
3. 회사는 본조 제2항 본문에 따른 동의를 받으려면 미리 다음 각 호의 사항 모두를 이용자에게 고지합니다.
    a. 이전되는 개인정보 항목
    b. 개인정보가 이전되는 국가, 이전일시 및 이전방법
    c. 개인정보를 이전받는 자의 성명(법인인 경우 그 명칭 및 정보관리 책임자의 연락처를 말한다)
    d. 개인정보를 이전받는 자의 개인정보 이용목적 및 보유ㆍ이용 기간
4. 회사는 본조 제2항 본문에 따른 동의를 받아 개인정보를 국외로 이전하는 경우 개인정보보호법 대통령령 등 관계법규에서 정하는 바에 따라 보호조치를 합니다.

제18조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)
1. 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 개인정보 자동 수집장치(이하 '쿠키')를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 웹브라우저(PC 및 모바일을 포함)에게 보내는 소량의 정보이며 이용자의 저장공간에 저장되기도 합니다.
2. 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
3. 다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 회사의 일부 서비스는 이용에 어려움이 있을 수 있습니다.

제19조(쿠키 설치 허용 지정 방법)
웹브라우저 옵션 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을 할 수 있습니다.
1. Edge : 웹브라우저 우측 상단의 설정 메뉴 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제
2. Chrome : 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터
3. Whale : 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 보호 > 쿠키 및 기타 사이트 데이터

제20조(회사의 개인정보 보호 책임자 지정)
1. 회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호 책임자를 지정하고 있습니다.
    a. 개인정보 보호 책임자
        ⅰ. 성명: 송의진
        ⅱ. 직책: 학생
        ⅲ. 전화번호: 010-3366-5697
        ⅳ. 이메일: elli2168@naver.com

제21조(권익침해에 대한 구제방법)
1. 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
    a. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
    b. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
    c. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
    d. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
2. 회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 제1항의 담당부서로 연락해주시기 바랍니다.
3. 개인정보 보호법 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
    a. 중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)

부칙
제1조 본 방침은 2024.05.23.부터 시행됩니다.
`;