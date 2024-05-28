import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { theme } from "../../theme";
import { useNavigation, useRoute } from '@react-navigation/native';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import VisibilityIcon from '../../assets/Login/ic_visibility.svg';
import VisibilityOffIcon from '../../assets/Login/ic_visibility_off.svg';
import CheckIcon from '../../assets/Login/ic_done_small_line.svg';
import BlueCheckIcon from '../../assets/Login/ic_done_small_line_blue.svg';

function SignUp() {
    const navigation = useNavigation();
    const route = useRoute();

    const [code, setCode] = useState('');
    const [testCode, setTestCode] = useState('12345');
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState([]);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const [codeIsCorrect, setCodeIsCorrect] = useState(true);
    const [isResend, setIsResend] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [hasEnglish, setHasEnglish] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLeng, setHasLeng] = useState(false);
    const [hasName, setHasName] = useState(true);
    const [hasBirth, setHasBirth] = useState(true);

    const passwordCheck = (password) => {
        setHasEnglish(/[a-zA-Z]/.test(password));
        setHasNum(/[0-9]/.test(password));
        setHasLeng(/^.{6,20}$/.test(password));
    };
      
    const handleName = (text) => {
        if (typeof text === 'string' && text.trim() !== '') {
          setHasName(true);
        } else {
          setHasName(false);
        }
        console.log(hasName);
      };

    const handleCodeChange = (text) => {
      setCode(text);
      if(code === testCode) setCodeIsCorrect(true);
    };
    
    const handleCode = () => {
      if(code !== testCode) setCodeIsCorrect(false);
      else if((code === testCode)) setCodeIsCorrect(false);
    };

    const handleRequest = () => {
      setIsResend(true);
    };

    const handleBirth = (birth) => {
    if (typeof year === 'string' && year.trim() !== '') {
        setHasBirth(false);
    } else {
        setHasBirth(true);
    }
    };

    const togglePwVisibility = () => {
      setShowPw(!showPw);
    };

    const [step, setStep] = useState(1);
     // step 단위 뒤로 가기
     const handleBack = () => {
        // 현재 단계(step)에 따라 이전 단계로 이동
        if (step > 1) {
          setStep(step => step - 1);
        }
      };
      
      // 테스트용 다음 step
      const handleNext = () => {
        if (step === 1 ) {
          setStep(2);
        } else if (step === 2 ) {
          setStep(3);
        } else if (step === 3 ) {
          setStep(4);
        } 
      };

      useEffect(() => {
        navigation.setOptions({
          headerLeft: ({onPress}) => (
            step > 1 ?
            <TouchableOpacity onPress={handleBack}>
              <LeftArrowIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ),
        });
      }, [navigation, step]);
  
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            {step === 1 && (
            <View style={styles.container}>
                <Text style={styles.title}>이메일 주소를 입력하세요.</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>이메일</Text>
                    <TextInput
                    style={styles.input} 
                    placeholder="이메일 주소를 입력하세요."
                    keyboardType= "email-address"
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
                    onChangeText={handleCodeChange}             
                    />
                    <TouchableOpacity onPress={handleRequest}>
                        <Text style={styles.request}>인증메일 재요청</Text>
                    </TouchableOpacity>

                    {!codeIsCorrect  && <Text style={styles.uncorrect}>인증번호가 일치하지 않습니다.</Text>}
                    {isResend && <Text style={styles.resend}>인증번호가 재발송되었습니다.{`\n`}재발송이 재차 필요한 경우 15초 후에 시도해 주세요.</Text>}
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={(code === testCode) ? handleNext : handleCode}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>
            </View>
            )}

            {step === 3 && (
            <View style={styles.container}>
                <Text style={styles.title}>비밀번호를 입력하세요.</Text>
                <View style={{...styles.inputContainer, marginTop: 62}}>
                    <Text style={styles.inputTitle}>비밀번호</Text>
                    <View style={{...styles.input, ...styles.pwInput }}>
                    <TextInput
                    style={{width:  Dimensions.get('window').width - 96}} 
                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                    maxLength={20}
                    secureTextEntry = {showPw ? false : true}
                    onChange={(e) => {setPassword(e.target.value)}}
                    onChangeText={passwordCheck}
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
                <View style={{...styles.inputContainer, marginTop: 62}}>
                    <Text style={styles.inputTitle}>이름*</Text>
                    {hasName ? 
                    <TextInput
                    style={styles.input} 
                    placeholder="이름을 입력하세요."
                    onChangeText={(text) => setName(text)}
                    value={name}
                    />
                    :
                    <View>
                    <TextInput
                    style={{...styles.input, borderWidth: 1, borderColor: theme.red}} 
                    placeholder="이름을 입력하세요."
                    onChangeText={(text) => setName(text)}
                    value={name}
                    />
                    <Text style={styles.warning}>이름을 입력해 주세요.</Text>
                    </View>
                    }
                </View>
                <View style={{...styles.inputContainer, marginTop: 40}}>
                    <Text style={styles.inputTitle}>생년월일*</Text>
                    {hasBirth ? 
                    <View style={styles.birthContainer}>
                        <View style={styles.birthInputbox}>
                            <TextInput
                            style={styles.birthInput} 
                            keyboardType="number-pad"
                            maxLength={4}
                            onChangeText={(text) => setYear(text)}
                            value={year}
                            onChange={handleBirth}
                            />
                            <Text style={styles.birthText}>년</Text>
                        </View>
                        <View style={styles.birthInputbox}>
                            <TextInput
                            style={styles.birthInput} 
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={(text) => setMonth(text)}
                            value={month}
                            onChange={handleBirth}
                            />
                            <Text style={styles.birthText}>월</Text>
                        </View>
                        <View style={styles.birthInputbox}>
                            <TextInput
                            style={styles.birthInput} 
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={(text) => setDay(text)}
                            value={day}
                            onChange={handleBirth}
                            />
                            <Text style={styles.birthText}>일</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.birthContainer}>
                        <View style={{...styles.birthInputbox, borderRadius: 8, borderWidth:1, borderColor: theme.red}}>
                        <TextInput
                        style={styles.birthInput} 
                        keyboardType="number-pad"
                        maxLength={4}
                        />
                        <Text style={styles.birthText}>년</Text>
                        </View>
                        <View style={{...styles.birthInputbox, borderRadius: 8, borderWidth:1, borderColor: theme.red}}>
                        <TextInput
                        style={styles.birthInput} 
                        keyboardType="number-pad"
                        maxLength={2}
                        />
                        <Text style={styles.birthText}>월</Text>
                        </View>
                        <View style={{...styles.birthInputbox, borderRadius: 8, borderWidth:1, borderColor: theme.red}}>
                        <TextInput
                        style={styles.birthInput} 
                        keyboardType="number-pad"
                        maxLength={2}
                        />
                        <Text style={styles.birthText}>일</Text>
                        </View>
                        <Text style={styles.warning}>생년월일을 입력해 주세요.</Text>
                    </View>
                    }
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={hasName ? handleNext : handleName}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>                
            </View>
            )}
            </View>
        </TouchableWithoutFeedback>
    )
 }

export default SignUp;

const styles = StyleSheet.create({
    container:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32
    },
    title: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: -0.4
    },
    inputContainer: {
    gap: 8,
    marginTop: 62,
    },
    inputTitle: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Pretendard',
    color: theme.gray40,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.14,
    },
    input: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: theme.gray95,
    borderRadius: 8,
    placeholderTextColo: theme.gray60,
    },
    nextBtn: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.gray10,
    position: 'absolute',
    left: 16,
    bottom: 16,
    },
    nextText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    },
    request: {
    color: theme.skyblue,
    textAlign: 'right',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    marginTop: 16
    },
    uncorrect: {
    color: theme.gray40,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    marginTop: 16,
    paddingHorizontal: 8,
    },
    resend: {
    color: theme.gray40,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.14,
    marginTop: 16,
    paddingHorizontal: 8,
    },
    pwInput: {
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    },
    visibility: {
    position: 'absulute'
    },
    checkContainer: {
    marginTop: 16,
    paddingLeft: 8,
    flexDirection: 'row',
    gap: 12,
    },
    check: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    },
    warning: {
    marginTop: 8,
    paddingHorizontal: 8,
    color: theme.red,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.14,
    },
    birthContainer: {
    //width: Dimensions.get('window').width -32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    },
    birthInput: {
    width: (Dimensions.get('window').width -48) / 3,
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: theme.gray95,
    borderRadius: 8,
    placeholderTextColo: theme.gray60,
    },
    birthInputbox: {
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    }, 
    birthText: {
    color: theme.gray60,
    textAlign: 'right',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: -0.32,
    position: 'absolute',
    right: 16
    },
})