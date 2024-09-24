import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import EnterEndCard from '../../assets/teamSp/EnterEndCard';
import HostStudentTrue from "./HostStudentTrue";
import HostStudentFalse from "./HostStudentFalse";
import HostWorkerTrue from "./HostWorkerTrue";
import HostWorkerFalse from "./HostWorkerFalse";
import HostFanTrue from "./HostFanTrue";
import HostFanFalse from "./HostFanFalse";
import HostFreeTrue from "./HostFreeTrue";
import HostFreeFalse from "./HostFreeFalse";

export default function HostTemplate({ navigation, goToOriginal }) {
  const [step, setStep] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);

  const [card_name, setName] = useState('');
  const [card_introduction, setIntroduction] = useState('');
  const [card_birth, setBirth] = useState('');
  const [card_MBTI, setMBTI] = useState('');
  const [card_tel, setTel] = useState('');
  const [card_email, setEmail] = useState('');
  const [card_Insta, setInsta] = useState('');
  const [card_X, setX] = useState('');

  const [card_hobby, setHobby] = useState('');
  const [card_music, setMusic] = useState('');
  const [card_movie, setMovie] = useState('');
  const [card_address, setAddress] = useState('');

  const [showBirth, setShowBirth] = useState(1);
  const [showMBTI, setShowMBTI] = useState(1);
  const [showTel, setShowTel] = useState(1);
  const [showEmail, setShowEmail] = useState(1);
  const [showInsta, setShowInsta] = useState(1);
  const [showX, setShowX] = useState(1);

  const [showHobby, setShowHobby] = useState(1);
  const [showMusic, setShowMusic] = useState(1);
  const [showMovie, setShowMovie] = useState(1);
  const [showAddress, setShowAddress] = useState(1);
  const [cover, setCover] = useState(1);

  const emptyName = card_name.trim() === '';
  const emptyIntroduction = card_introduction.trim() === '';
  const emptyBirth = card_birth.trim() === '';
  const emptyMbti = card_MBTI.trim() === '';
  const emptyTel = card_tel.trim() === '';
  const emptyEmail = card_email.trim() === '';
  const emptyInsta = card_Insta.trim() === '';
  const emptyX = card_X.trim() === '';

  // 학생
  // const emptySchool = card_school.trim() === '';
  // const emptyGrade = card_grade.trim() === '';
  // const emptyStudNum = card_studNum.trim() === '';
  // const emptyMajor = card_major.trim() === '';
  // const emptyClub = card_club.trim() === '';

  const emptyHobby = card_hobby.trim() === '';
  const emptyMusic = card_music.trim() === '';
  const emptyMovie = card_movie.trim() === '';
  const emptyAddress = card_address.trim() === '';

  const handleNext = () => {
    if (step === 1) {
      // if (emptyName || emptyIntroduction || emptyBirth || emptyMbti) {
      //   setIsEmpty(true);
      // } else {
      //   setIsEmpty(false);
      setStep(2);
      // }
    }
    else if (step === 2) {
      // if (emptyTel || emptyEmail) {
      //   setIsEmpty(true);
      // } else {
      //   setIsEmpty(false);
      setStep(3);
      // }
    }
    else if (step === 3) {
      // if (emptySchool || emptyGrade || emptyStudNum || emptyMajor || emptyClub) {
      //   setIsEmpty(true);
      // } else {
      //   setIsEmpty(false);
      setStep(4);
      // }
    }
    else if (step === 4) {
      setStep(5);
    }
    else if (step === 5) {
      // if (emptyHobby || emptyMusic || emptyMovie || emptyAddress) {
      //   setIsEmpty(true);
      // } else {
      //   setIsEmpty(false);
        setStep(6);
    //   }
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
        // } else if (step === 3 && !showSchool && !showGrade && !showStudNum && !showMajor && !showClub && !showRole) {
        //   setStep(4);
      } else if (step === 4 && !showHobby && !showMusic && !showMovie && !showAddress) {
        setStep(5);
      }
    };

    checkAndSkipStep()
  }, [step, showBirth, showMBTI, showTel, showEmail, showInsta, showX, showHobby, showMusic, showMovie, showAddress]);


  const nameRef = useRef(null);
  const introductionRef = useRef(null);
  const birthRef = useRef(null);
  const MBTIRef = useRef(null);

  const telRef = useRef(null);
  const emailRef = useRef(null);
  const instaRef = useRef(null);
  const xRef = useRef(null);

  const hobbyRef = useRef(null);
  const musicRef = useRef(null);
  const movieRef = useRef(null);
  const addressRef = useRef(null);

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

        {/* 자유템플릿 선택지 추가란 때문 */}
        <View style={step === 4 ? { paddingVertical: 8, marginBottom: -12 } : { paddingVertical: 8, paddingHorizontal: 16, marginBottom: -12 }}>

          {/* 카드 앞면 - 기본 정보 */}
          {step === 1 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.title}>나에 대한 기본 정보를 알려주세요. </Text>
                <Text style={styles.subtitle}>자세하게 작성할수록 좋아요. </Text>

                {/* 이름 */}
                <View style={styles.nameContainer}>
                  <Text style={styles.nameBold}>이름 <Text style={styles.nameBold}> *</Text></Text>
                  <TextInput
                    style={[styles.nameInput, isEmpty && emptyName && styles.inputEmpty]}
                    placeholder="이름을 입력해 주세요."
                    keyboardType="default"
                    returnKeyType='next'
                    value={card_name}
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
                  <Text style={styles.nameBold}>한줄소개 <Text style={styles.nameBold}> *</Text></Text>
                  <TextInput
                    style={[styles.nameInput, isEmpty && emptyIntroduction && styles.inputEmpty]}
                    placeholder="나에 대해 간단히 알려주세요."
                    keyboardType="default"
                    value={card_introduction}
                    onChangeText={setIntroduction}
                    ref={introductionRef}
                    onSubmitEditing={() => birthRef.current.focus()}
                  />
                  {isEmpty && emptyIntroduction && (
                    <Text style={styles.inputEmptyText}> 한줄소개를 입력해 주세요.</Text>
                  )}
                </View>

                {/* MBTI */}
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>MBTI</Text>
                  <TextInput
                    style={[styles.nameInput, isEmpty && emptyMbti && styles.inputEmpty]}
                    placeholder="MBTI를 입력하세요."
                    keyboardType="default"
                    value={card_MBTI}
                    onChangeText={text => setMBTI(text.toUpperCase())}  // 입력 값을 대문자
                    ref={MBTIRef}
                  />
                  {isEmpty && emptyMbti && (
                    <Text style={styles.inputEmptyText}> MBTI를 입력해 주세요.</Text>
                  )}
                </View>

                <View style={styles.line} />

                <Text style={styles.midtitle}>나이를 표시하고 싶다면{'\n'}생년월일을 입력하세요. </Text>

                {/* 생년월일 */}
                {showBirth && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>생년월일 8자리 <Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyBirth && styles.inputEmpty]}
                      placeholder="YYYY/MM/DD"
                      keyboardType="numeric"
                      returnKeyType='next'
                      maxLength={8}
                      value={card_birth}
                      onChangeText={setBirth}
                      ref={birthRef}
                    />
                    {(isEmpty && emptyBirth) && (
                      <Text style={styles.inputEmptyText}> 생년월일 8자리를 올바르게 입력해 주세요. </Text>
                    )}
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

          {/* 카드 뒷면 - 연락처/이메일/인스타/X */}
          {step === 2 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.title}>내 연락처와 SNS 계정을 알려주세요.</Text>
                <Text style={styles.subtitle}>자세하게 작성할수록 좋아요.</Text>

                {/* 전화번호 */}
                {showTel && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>전화번호</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyTel && styles.inputEmpty]}
                      placeholder="전화번호를 입력해 주세요."
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={card_tel}
                      onChangeText={setTel}
                      ref={telRef}
                      onSubmitEditing={() => emailRef.current.focus()}
                    />
                    {isEmpty && emptyTel && (
                      <Text style={styles.inputEmptyText}> 전화번호를 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 이메일 */}
                {showEmail && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>이메일</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyEmail && styles.inputEmpty]}
                      placeholder="이메일 주소를 입력해 주세요."
                      keyboardType="email"
                      value={card_email}
                      onChangeText={setEmail}
                      ref={emailRef}
                      onSubmitEditing={() => instaRef.current.focus()}
                    />
                    {isEmpty && emptyEmail && (
                      <Text style={styles.inputEmptyText}> 이메일을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                <View style={styles.line} />

                {/* 인스타 */}
                {showInsta && (
                  <View style={[styles.nameContainer, { marginTop: 0 }]}>
                    <Text style={styles.name}>Instargram</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyInsta && styles.inputEmpty]}
                      placeholder="인스타그램 계정을 입력해주세요."
                      keyboardType="default"
                      value={card_Insta}
                      onChangeText={setInsta}
                      ref={instaRef}
                      onSubmitEditing={() => xRef.current.focus()}
                    />
                    {isEmpty && emptyInsta && (
                      <Text style={styles.inputEmptyText}> 인스타그램 계정을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 트위터 */}
                {showX && (
                  < View style={styles.nameContainer}>
                    <Text style={styles.name}>X(트위터)</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyX && styles.inputEmpty]}
                      placeholder="X 계정을 입력해 주세요."
                      keyboardType="default"
                      value={card_X}
                      onChangeText={setX}
                      ref={xRef}
                    />
                    {isEmpty && emptyX && (
                      <Text style={styles.inputEmptyText}> X 계정을 입력해 주세요.</Text>
                    )}
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

          {/* 템플릿 정보 - 필수 */}
          {step === 3 && (

            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* <HostStudentTrue /> */}
                {/* <HostWorkerTrue /> */}
                {/* <HostFanTrue /> */}
                <HostFreeTrue />
              </ScrollView>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                  <Text style={styles.btnText}> 다음으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* 템플릿 정보 - 선택 */}
          {step === 4 && (

            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* <HostStudentFalse /> */}
                {/* <HostWorkerFalse /> */}
                {/* <HostFanFalse /> */}
                <HostFreeFalse />
              </ScrollView>

              <View style={[styles.btnContainer, { paddingHorizontal: 16 }]}>
                <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                  <Text style={styles.btnText}> 다음으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 카드 뒷면 - 취미/인생음악/인생영화/거주지 */}
          {step === 5 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.title}>나에 대해 더 많이 알려주고 싶다면</Text>
                <Text style={styles.subtitle}>자세하게 작성할수록 좋아요.</Text>

                {/* 취미 */}
                {showHobby && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>취미</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyHobby && styles.inputEmpty]}
                      placeholder="취미를 입력해 주세요."
                      keyboardType="default"
                      value={card_hobby}
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
                      placeholder="노래 제목을 입력해 주세요."
                      keyboardType="default"
                      value={card_music}
                      onChangeText={setMusic}
                      ref={musicRef}
                      onSubmitEditing={() => movieRef.current.focus()}
                    />
                    {isEmpty && emptyMusic && (
                      <Text style={styles.inputEmptyText}> 노래 제목을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 인생 영화 */}
                {showMovie && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>인생 영화</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyMovie && styles.inputEmpty]}
                      placeholder="영화 제목을 입력해 주세요."
                      keyboardType="default"
                      value={card_movie}
                      onChangeText={setMovie}
                      ref={movieRef}
                      onSubmitEditing={() => addressRef.current.focus()}
                    />
                    {isEmpty && emptyMovie && (
                      <Text style={styles.inputEmptyText}> 영화 제목을 입력해 주세요.</Text>
                    )}
                  </View>
                )}

                {/* 거주지 */}
                {showAddress && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>거주지</Text>
                    <TextInput
                      style={[styles.nameInput, isEmpty && emptyAddress && styles.inputEmpty]}
                      placeholder="거주지를 입력해 주세요. 예) 서울특별시 강남구"
                      keyboardType="default"
                      value={card_address}
                      onChangeText={setAddress}
                      ref={addressRef}
                    />
                    {isEmpty && emptyAddress && (
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
          {step === 6 && (
            <View style={{ height: '100%' }}>
              <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

              <View style={{ alignItems: 'center', marginTop: 135 }}>
                <EnterEndCard />
              </View>

              <View style={[styles.btnContainer, { marginBottom: 8 }]}>
                <TouchableOpacity style={styles.btnBlue} onPress={() => navigation.navigate('스페이스')}>
                  <Text style={styles.btnText}> 팀스페이스 확인 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnWhite, { marginTop: 8 }]} onPress={() => navigation.navigate(" ")}>
                  <Text style={styles.btnTextBlack}> 홈화면으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View >
    </TouchableWithoutFeedback >
  )
}