import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import { RadioButton } from 'react-native-paper';
import "react-native-gesture-handler";

import EnterEndCard from '../../assets/teamSp/EnterEndCard';

export default function HostTemplate({ navigation }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState(''); 
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [tel, setTel] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState(''); 
  const [studNum, setStudNum] = useState('');
  const [job, setJob] = useState('');
  const [club, setClub] = useState('');
  const [status, setStatus] = useState('휴학');
  const [sns, setSns] = useState(['', '']);
  const [email, setEmail] = useState('');
  const [mbti, setMbti] = useState('');
  const [music, setMusic] = useState('');
  const [movie, setMovie] = useState('');

  const [showAge, setShowAge] = useState(1);
  const [showSchool, setShowSchool] = useState(1);
  const [showGrade, setShowGrade] = useState(1);
  const [showStudNum, setShowStudNum] = useState(1);
  const [showJob, setShowJob] = useState(1);
  const [showClub, setShowClub] = useState(1);
  const [showStatus, setShowStatus] = useState(1);
  const [showTel, setShowTel] = useState(1);
  const [showSns, setShowSns] = useState(1);
  const [showEmail, setShowEmail] = useState(1);
  const [showMbti, setShowMbti] = useState(1);
  const [showMusic, setShowMusic] = useState(1);
  const [showMovie, setShowMovie] = useState(1);
  // const [cover, setCover] = useState(1);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  useEffect(() => {
    const checkAndSkipStep = () => {
      if (step === 1 && !showAge && !showSchool && !showGrade) {
        handleNext();
      } else if (step === 2 && !showStudNum && !showJob && !showClub && !showStatus) {
        handleNext();
      } else if (step === 3 && !showTel && !showSns && !showEmail) {
        handleNext();
      } else if (step === 4 && !showMbti && !showMusic && !showMovie) {
        handleNext();
      }
    };

    checkAndSkipStep();
  }, [step, showAge, showSchool, showGrade, showStudNum, showJob, showClub, showStatus, showTel, showSns, showEmail, showMbti, showMusic, showMovie]);


  const nameRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const schoolRef = useRef(null);
  const gradeRef = useRef(null);
  const introductionRef = useRef(null);

  const studNumRef = useRef(null);
  const jobRef = useRef(null);
  const clubRef = useRef(null);

  const telRef = useRef(null);
  const instaRef = useRef(null);
  const xRef = useRef(null);
  const emailRef = useRef(null);

  const mbtiRef = useRef(null);
  const singerRef = useRef(null);
  const songRef = useRef(null);
  const movieRef = useRef(null);

  return (
    <View>
      {/* 카드 앞면 - 기본 정보 */}
      {step === 1 && (
        <View style={{height:'100%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 나에 대한 기본 정보를 알려주세요 </Text>

            {/* 이름 */}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>이름</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="이름을 입력하세요."
                keyboardType="default"
                returnKeyType='next'
                value={name}
                onChangeText={setName}
                ref={nameRef}
                onSubmitEditing={() => yearRef.current.focus()}
              />
            </View>

            {/* 생년월일 */}
            {showAge && (
              <View style={styles.nameContainer}>

                <Text style={styles.name}>생년월일</Text>

                <View style={styles.inputBirthContainer}>
                  <TextInput
                    style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                    placeholder="년"
                    keyboardType="numeric"
                    returnKeyType='done'
                    value={year}
                    onChangeText={setYear}
                    maxLength={4}
                    ref={yearRef}
                    onSubmitEditing={() => monthRef.current.focus()}
                  />
                  <TextInput
                    style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                    placeholder="월"
                    keyboardType="numeric"
                    value={month}
                    onChangeText={setMonth}
                    maxLength={2}
                    ref={monthRef}
                    returnKeyType='done'
                    onSubmitEditing={() => dayRef.current.focus()}
                  />
                  <TextInput
                    style={[styles.inputBirth, styles.inputBirthText]}
                    placeholder="일"
                    keyboardType="numeric"
                    value={day}
                    onChangeText={setDay}
                    maxLength={2}
                    ref={dayRef}
                    returnKeyType='done'
                    onSubmitEditing={() => schoolRef.current.focus()}
                  />
                </View>
              </View>
            )}

            {/* 학교 */}
            {showSchool && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>학교명</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="학교명을 입력하세요."
                  keyboardType="default"
                  returnKeyType='next'
                  value={school}
                  onChangeText={setSchool}
                  ref={schoolRef}
                  onSubmitEditing={() => gradeRef.current.focus()}
                />
              </View>
            )}

            {/* 학년 */}
            {showGrade && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>학년</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="학년을 입력하세요."
                  keyboardType="numeric"
                  returnKeyType='done'
                  value={grade}
                  onChangeText={setGrade}
                  ref={gradeRef}
                  onSubmitEditing={() => introductionRef.current.focus()}
                />
              </View>
            )}

            {/* 한줄소개 */}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>한줄소개</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="한줄소개를 입력하세요."
                keyboardType="default"
                value={introduction}
                onChangeText={setIntroduction}
                ref={introductionRef}
              />
            </View>

          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - 학번/직무/동아리/재학여부*/}
      {step === 2 && (
        <View style={{height:'100%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 나에 대해 더 알려주세요. </Text>

            {/* 학생번호 */}
            {showStudNum && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>학생번호</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="학생번호를 입력하세요"
                  keyboardType="numeric"
                  returnKeyType='done'
                  value={studNum}
                  onChangeText={setStudNum}
                  Ref={studNumRef}
                  onSubmitEditing={() => jobRef.current.focus()}
                />
              </View>
            )}

            {/* 직무 */}
            {showJob && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>직무</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="직무를 입력하세요."
                  keyboardType="default"
                  value={job}
                  onChangeText={setJob}
                  ref={jobRef}
                  onSubmitEditing={() => clubRef.current.focus()}
                />
              </View>
            )}

            {/* 동아리 */}
            {showClub && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>동아리</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="소속 동아리를 입력하세요."
                  keyboardType="default"
                  value={club}
                  onChangeText={setClub}
                  ref={clubRef}
                />
              </View>
            )}

            {/* 재학여부 */}
            {showStatus && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>재학여부</Text>
                <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                  <View style={styles.radioBtnGruopContainer}>
                    <TouchableOpacity style={styles.radioBtnContainer} onPress={() => setStatus('휴학')}>
                      <RadioButton value="휴학" uncheckedColor={theme.gray30} color={theme.skyblue} />
                      <Text style={styles.font16}>휴학 중</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.radioBtnContainer} onPress={() => setStatus('재학')}>
                      <RadioButton value="재학" uncheckedColor={theme.gray30} color={theme.skyblue} />
                      <Text style={styles.font16}>재학 중</Text>
                    </TouchableOpacity>
                  </View>
                </RadioButton.Group>
              </View>
            )}

          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}


      {/* 카드 뒷면 - 연락처/sns/이메일 */}
      {step === 3 && (
        <View style={{height: '100%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 추가적인 연락수단을 알려주세요. </Text>
            
            {/* 연락처 */}
            {showTel && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>연락처</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="연락처를 입력하세요"
                  keyboardType="numeric"
                  returnKeyType='done'
                  value={tel}
                  onChangeText={setTel}
                  ref={telRef}
                  onSubmitEditing={() => instaRef.current.focus()}
                />
              </View>
            )}

            {/* sns */}
            {showSns && (
              <View style={{marginTop: 32}}>
                
                <Text style={[styles.font16, {fontFamily:'PretendardSemiBold'}]}>SNS</Text>

                {/* 인스타 */}
                <View style={[styles.nameContainer, {marginTop: 16}]}>
                  <Text style={styles.name}>Instargram</Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="Instargram"
                    keyboardType="default"
                    value={sns[0]}
                    onChangeText={text => setSns(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                    ref={instaRef}
                    onSubmitEditing={() => xRef.current.focus()}
                  />
                </View>

                {/* 트위터 */}
                <View style={[styles.nameContainer, {marginTop: 16}]}>
                  <Text style={styles.name}>X(트위터)</Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="X"
                    keyboardType="default"
                    value={sns[1]}
                    onChangeText={text => setSns(prevState => [...prevState.slice(0, 2), text])}
                    ref={xRef}
                    onSubmitEditing={() => emailRef.current.focus()}
                  />
                </View>
              </View>
            )}

            {/* 이메일 */}
            {showEmail && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>이메일</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="이메일 주소"
                  keyboardType="email"
                  value={email}
                  onChangeText={setEmail}
                  ref={emailRef}
                />
              </View>
            )}

          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - MBTI/인생음악/인생영화 */}
      {step === 4 && (
        <View style={{height: '100%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 사소한 것까지 더 알려주세요. </Text>

            {/* MBTI */}
            {showMbti && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>MBTI</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="MBTI를 입력하세요."
                  keyboardType="default"
                  value={mbti}
                  onChangeText={setMbti}
                  ref={mbtiRef}
                  onSubmitEditing={() => singerRef.current.focus()}
                />
              </View>
            )}

            {/* 인생 음악 */}
            {showMusic && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>인생 음악</Text>
                <View style={{flexDirection: "row"}}>
                  <TextInput
                    style={[styles.musicInput, { marginRight: 6 }]}
                    placeholder="제목명"
                    keyboardType="default"
                    value={music[0]}
                    onChangeText={text => setMusic(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                    ref={singerRef}
                    onSubmitEditing={() => songRef.current.focus()}
                  />
                  <TextInput
                    style={styles.musicInput}
                    placeholder="가수명"
                    keyboardType="default"
                    value={music[1]}
                    onChangeText={text => setMusic(prevState => [...prevState.slice(0, 2), text])}
                    ref={songRef}
                    onSubmitEditing={() => movieRef.current.focus()}
                  />
                </View>
              </View>
            )}

            {/* 인생 영화 */}
            {showMovie && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>인생 영화</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="영화명을 입력하세요."
                  keyboardType="default"
                  value={movie}
                  onChangeText={setMovie}
                  ref={movieRef}
                />
              </View>
            )}
          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 카드 생성 완료할래요 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 팀스페이스 입장 완료 */}
      {step === 5 && (
        <View style={{ height: '100%' }}>
          <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

          <View style={{alignItems: 'center', marginTop: 135}}>
            <EnterEndCard/>
          </View>

          <View style={[styles.btnContainer, {marginBottom: 20}]}>
            <View style={styles.btnNext}>
              <Text onPress={() => navigation.navigate("카드 조회")} style={styles.btnText}> 팀스페이스 확인 </Text>
            </View>
            <View style={styles.btnWhite}>
              <Text onPress={() => navigation.navigate(" ")} style={styles.btnTextBlack}> 홈 화면으로 </Text>
            </View>
          </View>
        </View>
      )}



    </View>
  )
}