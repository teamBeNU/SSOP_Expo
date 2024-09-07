import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import { RadioButton } from 'react-native-paper';
import Select from "../../assets/teamSp/select.svg";
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import EnterEndCard from '../../assets/teamSp/EnterEndCard';

export default function HostSrudTemplate({ navigation, goToOriginal }) {
  const [step, setStep] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);

  const [card_student_name, setName] = useState('');
  const [card_student_introduction, setIntroduction] = useState('');
  const [card_student_birth, setBirth] = useState({ year: '', month: '', day: '' });
  const [card_student_MBTI, setMBTI] = useState('');
  const [card_student_tel, setTel] = useState('');
  const [card_student_email, setEmail] = useState('');
  const [card_student_Insta, setInsta] = useState('');
  const [card_student_X, setX] = useState('');
  const [card_student_school, setSchool] = useState('');
  const [card_student_grade, setGrade] = useState('');
  const [card_student_studNum, setStudNum] = useState('');
  const [card_student_major, setMajor] = useState('');
  const [card_student_club, setClub] = useState('');
  const [card_student_hobby, setHobby] = useState('');
  const [card_student_music, setMusic] = useState('');
  const [card_student_movie, setMovie] = useState('');
  const [card_student_live, setLive] = useState('');

  const [showBirth, setShowBirth] = useState(1);
  const [showMBTI, setShowMBTI] = useState(1);
  const [showTel, setShowTel] = useState(1);
  const [showEmail, setShowEmail] = useState(1);
  const [showInsta, setShowInsta] = useState(1);
  const [showX, setShowX] = useState(1);
  const [showSchool, setShowSchool] = useState(1);
  const [showGrade, setShowGrade] = useState(1);
  const [showStudNum, setShowStudNum] = useState(1);
  const [showMajor, setShowMajor] = useState(1);
  const [showClub, setShowClub] = useState(1);
  const [showRole, setShowRole] = useState(1);
  const [showHobby, setShowHobby] = useState(1);
  const [showMusic, setShowMusic] = useState(1);
  const [showMovie, setShowMovie] = useState(1);
  const [showLive, setShowLive] = useState(1);
  const [cover, setCover] = useState(1);

  const [card_student_role, setRoleList] = useState([
    { role: '회장', selected: false },
    { role: '부회장', selected: false },
    { role: '팀장', selected: false },
    { role: '팀원', selected: false },
  ]);

  const roleSelected = (index) => {
    setRoleList(prevList => {
      const updatedList = [...prevList];
      updatedList[index].selected = !updatedList[index].selected;
      return updatedList;
    });
  };

  const emptyName = card_student_name.trim() === '';
  const emptyIntroduction = card_student_introduction.trim() === '';
  const emptyYear = card_student_birth.year.trim() === '';
  const emptyMonth = card_student_birth.month.trim() === '';
  const emptyDay = card_student_birth.day.trim() === '';
  const emptyMbti = card_student_MBTI.trim() === '';
  const emptySchool = card_student_school.trim() === '';
  const emptyGrade = card_student_grade.trim() === '';
  const emptyStudNum = card_student_studNum.trim() === '';
  const emptyMajor = card_student_major.trim() === '';
  const emptyClub = card_student_club.trim() === '';

  const emptyTel = card_student_tel.trim() === '';
  const emptyEmail = card_student_email.trim() === '';

  const emptyHobby = card_student_hobby.trim() === '';
  const emptyMusic = card_student_music.trim() === '';
  const emptyMovie = card_student_movie.trim() === '';
  const emptyLive = card_student_live.trim() === '';

  const handleNext = () => {
    if (step === 1) {
      if (emptyName || emptyIntroduction || emptyYear || emptyMonth || emptyDay || emptyMbti) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setStep(2);
      }
    }
    else if (step === 2) {
      if (emptyTel || emptyEmail) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setStep(3);
      }
    }
    else if (step === 3) {
      if (emptySchool || emptyGrade || emptyStudNum || emptyMajor || emptyClub) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setStep(4);
      }
    }
    else if (step === 4) {
      if (emptyHobby || emptyMusic || emptyMovie || emptyLive) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setStep(5);
      }
    }
  };

  // step 단위로 뒤로가기
  useEffect(() => {
    navigation.setOptions({
      headerLeft: handleHeaderLeft
    });
  }, [navigation, step]);

  const handleHeaderLeft = (onPress) => {
    if (step < 6) {
      return (
        <TouchableOpacity onPress={handleBack}>
          <LeftArrowIcon style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      );
    }
  };

  const handleBack = () => {
    switch (step) {
      case 1:
        goToOriginal();
        break;
      default:
        setStep(step - 1);
        break;
    }
  };

  // 호스트가 지정해서 보이는 항목 설정 -> 호스트가 한페이지의 모든 항목을 선택하지 않았다면 skip
  useEffect(() => {
    const checkAndSkipStep = () => {
      if (step === 1 && !showBirth && !showMBTI) {
        setStep(2);
      } else if (step === 2 && !showTel && !showEmail && !showInsta && !showX) {
        setStep(3);
      } else if (step === 3 && !showSchool && !showGrade && !showStudNum && !showMajor && !showClub && !showRole) {
        setStep(4);
      } else if (step === 4 && !showHobby && !showMusic && !showMovie && !showLive) {
        setStep(5);
      }
    };

    checkAndSkipStep()
  }, [step, showBirth, showMBTI, showTel, showEmail, showInsta, showX, showSchool, showGrade, showStudNum, showMajor, showClub, showRole, showHobby, showMusic, showMovie, showLive]);


  const nameRef = useRef(null);
  const introductionRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const MBTIRef = useRef(null);

  const telRef = useRef(null);
  const emailRef = useRef(null);
  const instaRef = useRef(null);
  const xRef = useRef(null);

  const schoolRef = useRef(null);
  const gradeRef = useRef(null);
  const studNumRef = useRef(null);
  const majorRef = useRef(null);
  const clubRef = useRef(null);


  const hobbyRef = useRef(null);
  const musicRef = useRef(null);
  const movieRef = useRef(null);
  const liveRef = useRef(null);

  // progressBar
  const maxSteps = 7;
  const initialProgress = 0.4285;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    style={[styles.nameInput, isEmpty && emptyName && styles.inputEmpty]}
                    placeholder="이름을 입력하세요."
                    keyboardType="default"
                    returnKeyType='next'
                    value={card_student_name}
                    onChangeText={setName}
                    ref={nameRef}
                    onSubmitEditing={() => introductionRef.current.focus()}
                  />
                  {isEmpty && emptyName && (
                    <Text style={styles.inputEmptyText}> 이름을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 한줄소개 */}
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>한줄소개</Text>
                  <TextInput
                    style={[styles.nameInput, isEmpty && emptyIntroduction && styles.inputEmpty]}
                    placeholder="한줄소개를 입력하세요."
                    keyboardType="default"
                    value={card_student_introduction}
                    onChangeText={setIntroduction}
                    ref={introductionRef}
                    onSubmitEditing={() => yearRef.current.focus()}
                  />
                  {isEmpty && emptyIntroduction && (
                    <Text style={styles.inputEmptyText}> 한줄소개를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 생년월일 */}
                {showBirth && (
                  <View style={styles.nameContainer}>

                    <Text style={styles.name}>생년월일</Text>

                    <View style={styles.inputBirthContainer}>
                      <TextInput
                        style={[styles.inputBirth, styles.inputBirthText, styles.marginR8, isEmpty && emptyYear && styles.inputEmpty]}
                        placeholder="년"
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={card_student_birth.year}
                        onChangeText={(text) => setBirth(prevState => ({ ...prevState, year: text }))}
                        maxLength={4}
                        ref={yearRef}
                        onSubmitEditing={() => monthRef.current.focus()}
                      />
                      <TextInput
                        style={[styles.inputBirth, styles.inputBirthText, styles.marginR8, isEmpty && emptyMonth && styles.inputEmpty]}
                        placeholder="월"
                        keyboardType="numeric"
                        value={card_student_birth.month}
                        onChangeText={(text) => setBirth(prevState => ({ ...prevState, month: text }))}
                        maxLength={2}
                        ref={monthRef}
                        returnKeyType='done'
                        onSubmitEditing={() => dayRef.current.focus()}
                      />
                      <TextInput
                        style={[styles.inputBirth, styles.inputBirthText, isEmpty && emptyDay && styles.inputEmpty]}
                        placeholder="일"
                        keyboardType="numeric"
                        value={card_student_birth.day}
                        onChangeText={(text) => setBirth(prevState => ({ ...prevState, day: text }))}
                        maxLength={2}
                        ref={dayRef}
                        returnKeyType='done'
                        onSubmitEditing={() => MBTIRef.current.focus()}
                      />
                    </View>
                    {isEmpty && (emptyYear || emptyMonth || emptyDay) && (
                      <Text style={styles.inputEmptyText}> 생년월일을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* MBTI */}
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>MBTI</Text>
                  <TextInput
                    style={[styles.nameInput, isEmpty && emptyMbti && styles.inputEmpty]}
                    placeholder="MBTI를 입력하세요."
                    keyboardType="default"
                    value={card_student_MBTI}
                    onChangeText={text => setMBTI(text.toUpperCase())}  // 입력 값을 대문자
                    ref={MBTIRef}
                  />
                  {isEmpty && emptyMbti && (
                    <Text style={styles.inputEmptyText}> MBTI를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 키보드에 가려진 부분 스크롤 */}
                <View style={{ marginBottom: 300 }} />

              </ScrollView>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                  <Text style={styles.btnText}> 다음으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 카드 뒷면 - 연락처/SNS/이메일 */}
          {step === 2 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.title}> 추가적인 연락수단을 알려주세요. </Text>

                {/* 연락처 */}
                {showTel && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>연락처</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyTel && styles.inputEmpty]}
                      placeholder="연락처를 입력하세요"
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={card_student_tel}
                      onChangeText={setTel}
                      ref={telRef}
                      onSubmitEditing={() => emailRef.current.focus()}
                    />
                    {isEmpty && emptyTel && (
                      <Text style={styles.inputEmptyText}> 연락처를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 이메일 */}
                {showEmail && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>이메일</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyEmail && styles.inputEmpty]}
                      placeholder="이메일 주소"
                      keyboardType="email"
                      value={card_student_email}
                      onChangeText={setEmail}
                      ref={emailRef}
                      onSubmitEditing={() => instaRef.current.focus()}
                    />
                    {isEmpty && emptyEmail && (
                      <Text style={styles.inputEmptyText}> 이메일을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* SNS */}
                {showInsta && (
                  <View style={{ marginTop: 32 }}>

                    <Text style={[styles.font16, { fontFamily: 'PretendardSemiBold' }]}>SNS</Text>

                    {/* 인스타 */}
                    <View style={[styles.nameContainer, { marginTop: 16 }]}>
                      <Text style={styles.name}>Instargram</Text>
                      <TextInput
                        style={styles.nameInput}
                        placeholder="Instargram"
                        keyboardType="default"
                        value={card_student_Insta}
                        onChangeText={setInsta}
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
                        value={card_student_X}
                        onChangeText={setX}
                        ref={xRef}
                      />
                    </View>
                  </View>
                )}

                {/* 키보드에 가려진 부분 스크롤 */}
                <View style={{ marginBottom: 300 }} />

              </ScrollView>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                  <Text style={styles.btnText}> 다음으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 학생정보 - 학교/학과/학번/전공/동아리/역할*/}
          {step === 3 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.title}> 나에 대해 더 알려주세요. </Text>

                {/* 학교 */}
                {showSchool && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>학교명</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptySchool && styles.inputEmpty]}
                      placeholder="학교명을 입력하세요."
                      keyboardType="default"
                      returnKeyType='next'
                      value={card_student_school}
                      onChangeText={setSchool}
                      ref={schoolRef}
                      onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptySchool && (
                      <Text style={styles.inputEmptyText}> 학교명을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 학년 */}
                {showGrade && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>학년</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyGrade && styles.inputEmpty]}
                      placeholder="학년을 입력하세요."
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={card_student_grade}
                      onChangeText={setGrade}
                      ref={gradeRef}
                      onSubmitEditing={() => studNumRef.current.focus()}
                    />
                    {isEmpty && emptyGrade && (
                      <Text style={styles.inputEmptyText}> 학년을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 학생번호 */}
                {showStudNum && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>학생번호</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyStudNum && styles.inputEmpty]}
                      placeholder="학생번호를 입력하세요"
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={card_student_studNum}
                      onChangeText={setStudNum}
                      ref={studNumRef}
                      onSubmitEditing={() => majorRef.current.focus()}
                    />
                    {isEmpty && emptyStudNum && (
                      <Text style={styles.inputEmptyText}> 학생번호를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 전공 */}
                {showMajor && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>전공</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyMajor && styles.inputEmpty]}
                      placeholder="전공을 입력하세요"
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={card_student_major}
                      onChangeText={setMajor}
                      ref={majorRef}
                    />
                    {isEmpty && emptyMajor && (
                      <Text style={styles.inputEmptyText}> 전공을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 동아리 */}
                {showClub && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>동아리</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyClub && styles.inputEmpty]}
                      placeholder="소속 동아리를 입력하세요."
                      keyboardType="default"
                      value={card_student_club}
                      onChangeText={setClub}
                      ref={clubRef}
                    />
                    {isEmpty && emptyClub && (
                      <Text style={styles.inputEmptyText}> 동아리를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/*  역할 */}
                {showRole && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>역할</Text>

                    <View style={[styles.elementContainer, { marginLeft: 8, marginTop: 8 }]}>
                      {card_student_role.map((item, index) => (
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

                {/* 키보드에 가려진 부분 스크롤 */}
                <View style={{ marginBottom: 300 }} />

              </ScrollView>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                  <Text style={styles.btnText}> 다음으로 </Text>
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
                {showHobby && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>취미</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyHobby && styles.inputEmpty]}
                      placeholder="취미를 입력하세요."
                      keyboardType="default"
                      value={card_student_hobby}
                      onChangeText={setHobby}
                      ref={hobbyRef}
                      onSubmitEditing={() => musicRef.current.focus()}
                    />
                    {isEmpty && emptyHobby && (
                      <Text style={styles.inputEmptyText}> 취미를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 인생 음악 */}
                {showMusic && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>인생 음악</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyMusic && styles.inputEmpty]}
                      placeholder="인생 음악을 입력하세요."
                      keyboardType="default"
                      value={card_student_music}
                      onChangeText={setMusic}
                      ref={musicRef}
                      onSubmitEditing={() => movieRef.current.focus()}
                    />
                    {isEmpty && emptyMusic && (
                      <Text style={styles.inputEmptyText}> 인생 음악을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 인생 영화 */}
                {showMovie && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>인생 영화</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyMovie && styles.inputEmpty]}
                      placeholder="영화명을 입력하세요."
                      keyboardType="default"
                      value={card_student_movie}
                      onChangeText={setMovie}
                      ref={movieRef}
                      onSubmitEditing={() => liveRef.current.focus()}
                    />
                    {isEmpty && emptyMovie && (
                      <Text style={styles.inputEmptyText}> 인생 영화를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 거주지 */}
                {showLive && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>거주지</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyLive && styles.inputEmpty]}
                      placeholder="거주지를 입력하세요."
                      keyboardType="default"
                      value={card_student_live}
                      onChangeText={setLive}
                      ref={liveRef}
                    />
                    {isEmpty && emptyLive && (
                      <Text style={styles.inputEmptyText}> 거주지를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 키보드에 가려진 부분 스크롤 */}
                <View style={{ marginBottom: 300 }} />

              </ScrollView>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                  <Text style={styles.btnText}> 카드 생성 완료할래요 </Text>
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

              <View style={[styles.btnContainer, { marginBottom: 8 }]}>
                <TouchableOpacity style={[styles.btnNext, { marginBottom: 40 }]} onPress={() => navigation.navigate("스페이스")}>
                  <Text style={styles.btnText}> 팀스페이스 확인 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnWhite} onPress={() => navigation.navigate(" ")}>
                  <Text style={styles.btnTextBlack}> 홈 화면으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View >
    </TouchableWithoutFeedback >
  )
}