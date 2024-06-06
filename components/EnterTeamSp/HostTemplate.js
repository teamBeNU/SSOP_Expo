import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import { RadioButton } from 'react-native-paper';
import Select from "../../assets/teamSp/select.svg";
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import EnterEndCard from '../../assets/teamSp/EnterEndCard';

export default function HostTemplate({ navigation }) {
  const [step, setStep] = useState(1);
  const [card_name, setName] = useState('');
  const [card_introduction, setIntroduction] = useState('');
  const [card_birth, setBirth] = { year: '', month: '', day: '' };
  const [card_tel, setTel] = useState('');
  const [card_school, setSchool] = useState('');
  const [card_grade, setGrade] = useState('');
  const [card_studNum, setStudNum] = useState('');
  const [card_role, setRole] = useState('');
  const [card_club, setClub] = useState('');
  const [card_SNS, setSNS] = { insta: '', x: '' }
  const [card_email, setEmail] = useState('');
  const [card_MBTI, setMBTI] = useState('');
  const [card_music, setMusic] = { title: '', singer: '' };
  const [card_movie, setMovie] = useState('');

  const [showAge, setShowAge] = useState(1);
  const [showSchool, setShowSchool] = useState(1);
  const [showGrade, setShowGrade] = useState(1);
  const [showStudNum, setShowStudNum] = useState(1);
  const [showRole, setShowRole] = useState(1);
  const [showClub, setShowClub] = useState(1);
  const [showStatus, setShowStatus] = useState(1);
  const [showTel, setShowTel] = useState(1);
  const [showSNS, setShowSNS] = useState(1);
  const [showEmail, setShowEmail] = useState(1);
  const [showMBTI, setShowMBTI] = useState(1);
  const [showMusic, setShowMusic] = useState(1);
  const [showMovie, setShowMovie] = useState(1);
  // const [cover, setCover] = useState(1);

  const [roleList, setRoleList] = useState([
    { role: '회장', selected: false },
    { role: '부회장', selected: false },
    { role: '팀장', selected: false },
    { role: '팀원', selected: false },
    { role: '마케터', selected: false },
    { role: '기획자', selected: false },
    { role: '디자이너', selected: false },
    { role: '백엔드', selected: false },
    { role: '프론트엔드', selected: false },
  ]);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  useEffect(() => {
    const checkAndSkipStep = () => {
      if (step === 1 && !showAge && !showSchool && !showGrade) {
        handleNext();
      } else if (step === 2 && !showStudNum && !showRole && !showClub && !showStatus) {
        handleNext();
      } else if (step === 3 && !showTel && !showSNS && !showEmail) {
        handleNext();
      } else if (step === 4 && !showMBTI && !showMusic && !showMovie) {
        handleNext();
      }
    };

    checkAndSkipStep();
  }, [step, showAge, showSchool, showGrade, showStudNum, showRole, showClub, showStatus, showTel, showSNS, showEmail, showMBTI, showMusic, showMovie]);


  const nameRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const schoolRef = useRef(null);
  const gradeRef = useRef(null);
  const introductionRef = useRef(null);

  const studNumRef = useRef(null);
  const roleRef = useRef(null);
  const clubRef = useRef(null);

  const telRef = useRef(null);
  const instaRef = useRef(null);
  const xRef = useRef(null);
  const emailRef = useRef(null);

  const MBTIRef = useRef(null);
  const titleRef = useRef(null);
  const singerRef = useRef(null);
  const movieRef = useRef(null);

  // progressBar
  const maxSteps = 7;
  const initialProgress = 0.4285;

  return (
    <View>
      <Progress.Bar
        progress={initialProgress + (step - 1) / maxSteps}
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
        marginTop={-16}
      />

      <View style={{ paddingVertical: 8, paddingHorizontal: 16, marginBottom: -12 }}>

        {/* 카드 앞면 - 기본 정보 */}
        {step === 1 && (
          <View style={{ height: '100%' }}>
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
                  value={card_name}
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
                      value={card_birth.year}
                      onChangeText={setBirth.year}
                      maxLength={4}
                      ref={yearRef}
                      onSubmitEditing={() => monthRef.current.focus()}
                    />
                    <TextInput
                      style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                      placeholder="월"
                      keyboardType="numeric"
                      value={card_birth.month}
                      onChangeText={setBirth.month}
                      maxLength={2}
                      ref={monthRef}
                      returnKeyType='done'
                      onSubmitEditing={() => dayRef.current.focus()}
                    />
                    <TextInput
                      style={[styles.inputBirth, styles.inputBirthText]}
                      placeholder="일"
                      keyboardType="numeric"
                      value={card_birth.day}
                      onChangeText={setBirth.day}
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
                    value={card_school}
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
                    value={card_grade}
                    onChangeText={setGrade}
                    ref={gradeRef}
                    onSubmitEditing={() => introductionRef.current.focus()}
                  />
                </View>
              )}

              {/* 한줄소개 */}
              <View style={[styles.nameContainer, { marginBottom: 200 }]}>
                <Text style={styles.name}>한줄소개</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="한줄소개를 입력하세요."
                  keyboardType="default"
                  value={card_introduction}
                  onChangeText={setIntroduction}
                  ref={introductionRef}
                />
              </View>

            </ScrollView>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnNext}>
                <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 카드 뒷면 - 학번/동아리/역할*/}
        {step === 2 && (
          <View style={{ height: '100%' }}>
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
                    value={card_studNum}
                    onChangeText={setStudNum}
                    Ref={studNumRef}
                    onSubmitEditing={() => roleRef.current.focus()}
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
                    value={card_club}
                    onChangeText={setClub}
                    ref={clubRef}
                  />
                </View>
              )}

              {/*  역할 */}
              {showRole && (
                <View style={styles.nameContainer}>
                  <Text style={[styles.font16, { marginTop: 28 }]}>역할</Text>
                  <Text style={styles.subtitle}>역할을 등록해두면 통일하여 필터링하기 편해요.</Text>

                  <View style={styles.elementContainer}>
                    {roleList.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => roleSelected(index)}
                        style={item.selected ? styles.selectedElement : styles.element}>
                        {item.selected && (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Select />
                            <Text style={styles.selectedText}> #{item.role} </Text>
                          </View>
                        )}
                        {!item.selected && <Text> #{item.role} </Text>}
                      </TouchableOpacity>
                    ))}
                  </View>
                
                </View>
              )}
            </ScrollView>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnNext}>
                <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}


        {/* 카드 뒷면 - 연락처/SNS/이메일 */}
        {step === 3 && (
          <View style={{ height: '100%' }}>
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
                    value={card_tel}
                    onChangeText={setTel}
                    ref={telRef}
                    onSubmitEditing={() => instaRef.current.focus()}
                  />
                </View>
              )}

              {/* SNS */}
              {showSNS && (
                <View style={{ marginTop: 32 }}>

                  <Text style={[styles.font16, { fontFamily: 'PretendardSemiBold' }]}>SNS</Text>

                  {/* 인스타 */}
                  <View style={[styles.nameContainer, { marginTop: 16 }]}>
                    <Text style={styles.name}>Instargram</Text>
                    <TextInput
                      style={styles.nameInput}
                      placeholder="Instargram"
                      keyboardType="default"
                      value={card_SNS.insta}
                      onChangeText={setSNS.insta}
                      ref={instaRef}
                      onSubmitEditing={() => xRef.current.focus()}
                    />
                  </View>

                  {/* 트위터 */}
                  <View style={[styles.nameContainer, { marginTop: 16 }]}>
                    <Text style={styles.name}>X(트위터)</Text>
                    <TextInput
                      style={styles.nameInput}
                      placeholder="X"
                      keyboardType="default"
                      value={card_SNS.x}
                      onChangeText={setSNS.x}
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
                    value={card_email}
                    onChangeText={setEmail}
                    ref={emailRef}
                  />
                </View>
              )}

            </ScrollView>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnNext}>
                <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 카드 뒷면 - MBTI/인생음악/인생영화 */}
        {step === 4 && (
          <View style={{ height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>

              <Text style={styles.title}> 사소한 것까지 더 알려주세요. </Text>

              {/* MBTI */}
              {showMBTI && (
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>MBTI</Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="MBTI를 입력하세요."
                    keyboardType="default"
                    value={card_MBTI}
                    onChangeText={setMBTI}
                    ref={MBTIRef}
                    onSubmitEditing={() => singerRef.current.focus()}
                  />
                </View>
              )}

              {/* 인생 음악 */}
              {showMusic && (
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>인생 음악</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={[styles.musicInput, { marginRight: 6 }]}
                      placeholder="제목명"
                      keyboardType="default"
                      value={card_music.title}
                      onChangeText={setMusic.title}
                      ref={titleRef}
                      onSubmitEditing={() => songRef.current.focus()}
                    />
                    <TextInput
                      style={styles.musicInput}
                      placeholder="가수명"
                      keyboardType="default"
                      value={card_music.singer}
                      onChangeText={setMusic.singer}
                      ref={singerRef}
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
                    value={card_movie}
                    onChangeText={setMovie}
                    ref={movieRef}
                  />
                </View>
              )}
            </ScrollView>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnNext}>
                <Text onPress={handleNext} style={styles.btnText}> 카드 생성 완료할래요 </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 팀스페이스 입장 완료 */}
        {step === 5 && (
          <View style={{ height: '100%' }}>
            <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

            <View style={{ alignItems: 'center', marginTop: 135 }}>
              <EnterEndCard />
            </View>

            <View style={[styles.btnContainer, { marginBottom: 20 }]}>
              <TouchableOpacity style={[styles.btnNext, { marginBottom: 40 }]}>
                <Text onPress={() => navigation.navigate("Space")} style={styles.btnText}> 팀스페이스 확인 </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnWhite}>
                <Text onPress={() => navigation.navigate(" ")} style={styles.btnTextBlack}> 홈 화면으로 </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}