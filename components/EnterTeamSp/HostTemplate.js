import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from "react-native";
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

export default function HostTemplate({ navigation, goToOriginal, data }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);

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

  const [showBirth, setShowBirth] = useState(null);
  const [showMBTI, setShowMBTI] = useState(null);
  const [showTel, setShowTel] = useState(null);
  const [showEmail, setShowEmail] = useState(null);
  const [showInsta, setShowInsta] = useState(null);
  const [showX, setShowX] = useState(null);

  const [showHobby, setShowHobby] = useState(null);
  const [showMusic, setShowMusic] = useState(null);
  const [showMovie, setShowMovie] = useState(null);
  const [showAddress, setShowAddress] = useState(null);
  const [plus, setPlus] = useState([]);
  const [card_free_A1, setFreeA1] = ('');
  const [card_free_A2, setFreeA2] = ('');
  const [card_free_A3, setFreeA3] = ('');
  const [card_free_A4, setFreeA4] = ('');
  const [card_free_A5, setFreeA5] = ('');
  const [cover, setCover] = useState(1);

  const [studentOptional, setStudentOptional] = useState([]);
  const [workerOptional, setWorkerOptional] = useState([]);
  const [fanOptional, setFanOptional] = useState([]);

  const emptyName = card_name.trim() === '';
  const emptyIntroduction = card_introduction.trim() === '';
  const emptyBirth = card_birth.trim() === '';
  const emptyMbti = card_MBTI.trim() === '';
  const emptyTel = card_tel.trim() === '';
  const emptyEmail = card_email.trim() === '';
  const emptyInsta = card_Insta.trim() === '';
  const emptyX = card_X.trim() === '';

  const emptyHobby = card_hobby.trim() === '';
  const emptyMusic = card_music.trim() === '';
  const emptyMovie = card_movie.trim() === '';
  const emptyAddress = card_address.trim() === '';

  // AsyncStorage에서 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    // 데이터가 준비되면 API 호출
    // if (data && data.teamId) {
    templateView();
    // }
  }, [data]);

  // 지정 템플릿 목록 API 호출
  const templateView = () => {
    const apiUrl = `${baseUrl}/teamsp?teamId=${data.teamId}`;
    // const apiUrl = `${baseUrl}/teamsp?teamId=73`;
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("템플릿 질문 목록 조회 : ", response.data);
        // console.log("학생 템플릿 : ", response.data.studentOptional);
        // console.log("직장인 템플릿 : ", response.data.workerOptional);
        // console.log("팬 템플릿 : ", response.data.fanOptional);

        setShowBirth(response.data.showAge || response.data.showBirth ? true : false);
        setShowMBTI(response.data.showMBTI ? true : false);
        setShowTel(response.data.showTel ? true : false);
        setShowEmail(response.data.showEmail ? true : false);
        setShowInsta(response.data.showInsta ? true : false);
        setShowX(response.data.showX ? true : false);
        setPlus(response.data.plus);

        setStudentOptional(response.data.studentOptional);
        setWorkerOptional(response.data.workerOptional);
        setFanOptional(response.data.fanOptional);

        setShowHobby(response.data.showHobby ? true : false);
        setShowMusic(response.data.showMusic ? true : false);
        setShowMovie(response.data.showMovie ? true : false);
        setShowAddress(response.data.showAddress ? true : false);
      })
      .catch((error) => {
        console.error("팀스페이스를 찾을 수 없습니다. :", error)
      });
  };

  const hasStudentOptional = studentOptional !== undefined;
  const hasWorkerOptional = workerOptional !== undefined;
  const hasFanOptional = fanOptional !== undefined;

  const optionsCount = [hasStudentOptional, hasWorkerOptional, hasFanOptional].filter(Boolean).length;

  const handleNext = () => {
    switch (step) {
      case 5:
        const requestData = {
          memberEssential: {
            card_name: card_name,
            card_introduction: card_introduction,
            // card_template: data.template,
            card_template: 'student',
            card_cover: cover
          },
          memberOptional: {
            card_birth: card_birth,
            card_MBTI: card_MBTI,
            card_tel: card_tel,
            card_email: card_email,
            card_insta: card_Insta,
            card_x: card_X,
            card_hobby: card_hobby,
            card_music: card_music,
            card_movie: card_movie,
            ard_address: card_address,
            card_free_A1: card_free_A1,
            card_free_A2: card_free_A2,
            card_free_A3: card_free_A3,
            ard_free_A4: card_free_A4,
            card_free_A5: card_free_A5
          },
          memberStudent: {
            card_student_school: studentOptional?.card_school || null,
            card_student_grade: studentOptional?.card_grade || null,
            card_student_id: studentOptional?.card_studNum || null,
            card_student_major: studentOptional?.card_major || null,
            card_student_club: studentOptional?.card_club || null,
            card_student_role: studentOptional?.card_role || null,
            card_student_status: studentOptional?.card_status || null,
          },
          memberWorker: {
            card_worker_company: workerOptional?.card_company || null,
            card_worker_job: workerOptional?.card_job || null,
            card_worker_position: workerOptional?.card_position || null,
            card_worker_department: workerOptional?.card_part || null
          },
          memberFan: {
            card_fan_genre: fanOptional?.card_genre || null,
            card_fan_first: fanOptional?.card_favorite || null,
            card_fan_second: fanOptional?.card_second || null,
            card_fan_reason: fanOptional?.card_reason || null
          }
        }
        const apiUrl = `${baseUrl}/teamsp/submit-card?teamId=${data.teamId}`;
        // const apiUrl = `${baseUrl}/teamsp/submit-card?teamId=73`;

        axios
          .post(apiUrl, { member: requestData }, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("작성한 카드:", requestData);
            setStep(3);
          })
          .catch((error) => {
            Alert.alert("카드 제출 중 오류가 발생했습니다.", error);
            console.log("작성한 카드:", requestData);
          });
        setStep(6);

      default:
        setStep(step + 1);
        break;
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
  const freeA1Ref = useRef(null);
  const freeA2Ref = useRef(null);
  const freeA3Ref = useRef(null);
  const freeA4Ref = useRef(null);
  const freeA5Ref = useRef(null);

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
                  {showMBTI ?
                    <Text style={styles.nameBold}>MBTI <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>MBTI</Text>}
                  <TextInput
                    style={[styles.nameInput, showMBTI && isEmpty && emptyMbti && styles.inputEmpty]}
                    placeholder="MBTI를 입력하세요."
                    keyboardType="default"
                    value={card_MBTI}
                    onChangeText={text => setMBTI(text.toUpperCase())}  // 입력 값을 대문자
                    ref={MBTIRef}
                  />
                  {showMBTI && isEmpty && emptyMbti && (
                    <Text style={styles.inputEmptyText}> MBTI를 입력해 주세요.</Text>
                  )}
                </View>

                <View style={styles.line} />

                <Text style={styles.midtitle}>나이를 표시하고 싶다면{'\n'}생년월일을 입력하세요. </Text>

                {/* 생년월일 */}
                <View style={styles.nameContainer}>
                  {showBirth ?
                    <Text style={styles.nameBold}>생년월일 8자리 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>생년월일 8자리</Text>}
                  <TextInput
                    style={[styles.nameInput, showBirth && isEmpty && emptyBirth && styles.inputEmpty]}
                    placeholder="YYYY/MM/DD"
                    keyboardType="numeric"
                    returnKeyType='next'
                    maxLength={8}
                    value={card_birth}
                    onChangeText={setBirth}
                    ref={birthRef}
                  />
                  {(showBirth && isEmpty && emptyBirth) && (
                    <Text style={styles.inputEmptyText}> 생년월일 8자리를 올바르게 입력해 주세요. </Text>
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

          {/* 카드 뒷면 - 연락처/이메일/인스타/X */}
          {step === 2 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.title}>내 연락처와 SNS 계정을 알려주세요.</Text>
                <Text style={styles.subtitle}>자세하게 작성할수록 좋아요.</Text>

                {/* 전화번호 */}
                <View style={styles.nameContainer}>
                  {showTel ?
                    <Text style={styles.nameBold}>전화번호 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>전화번호</Text>}
                  <TextInput
                    style={[styles.nameInput, showTel && isEmpty && emptyTel && styles.inputEmpty]}
                    placeholder="전화번호를 입력해 주세요."
                    keyboardType="numeric"
                    returnKeyType='done'
                    value={card_tel}
                    onChangeText={setTel}
                    ref={telRef}
                    onSubmitEditing={() => emailRef.current.focus()}
                  />
                  {showTel && isEmpty && emptyTel && (
                    <Text style={styles.inputEmptyText}> 전화번호를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 이메일 */}
                <View style={styles.nameContainer}>
                  {showEmail ?
                    <Text style={styles.nameBold}>이메일 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>이메일</Text>}
                  <TextInput
                    style={[styles.nameInput, showEmail && isEmpty && emptyEmail && styles.inputEmpty]}
                    placeholder="이메일 주소를 입력해 주세요."
                    keyboardType="email"
                    value={card_email}
                    onChangeText={setEmail}
                    ref={emailRef}
                    onSubmitEditing={() => instaRef.current.focus()}
                  />
                  {showEmail && isEmpty && emptyEmail && (
                    <Text style={styles.inputEmptyText}> 이메일을 입력해 주세요.</Text>
                  )}
                </View>

                <View style={styles.line} />

                {/* 인스타 */}
                <View style={[styles.nameContainer, { marginTop: 0 }]}>
                  {showInsta ?
                    <Text style={styles.nameBold}>Instagram <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>Instagram</Text>}
                  <TextInput
                    style={[styles.nameInput, showInsta && isEmpty && emptyInsta && styles.inputEmpty]}
                    placeholder="인스타그램 계정을 입력해주세요."
                    keyboardType="default"
                    value={card_Insta}
                    onChangeText={setInsta}
                    ref={instaRef}
                    onSubmitEditing={() => xRef.current.focus()}
                  />
                  {showInsta && isEmpty && emptyInsta && (
                    <Text style={styles.inputEmptyText}> 인스타그램 계정을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 트위터 */}
                <View style={styles.nameContainer}>
                  {showX ?
                    <Text style={styles.nameBold}>X(트위터) <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>X(트위터)</Text>}
                  <TextInput
                    style={[styles.nameInput, showX && isEmpty && emptyX && styles.inputEmpty]}
                    placeholder="X 계정을 입력해 주세요."
                    keyboardType="default"
                    value={card_X}
                    onChangeText={setX}
                    ref={xRef}
                  />
                  {showX && isEmpty && emptyX && (
                    <Text style={styles.inputEmptyText}> X 계정을 입력해 주세요.</Text>
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

          {/* 템플릿 정보 - 필수 */}
          {step === 3 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {hasStudentOptional && <HostStudentTrue studentOptional={studentOptional} />}
                {hasWorkerOptional && <HostWorkerTrue workerOptional={workerOptional} />}
                {hasFanOptional && <HostFanTrue fanOptional={fanOptional} />}

                {optionsCount >= 2 &&
                  <HostFreeTrue
                    studentOptional={studentOptional}
                    workerOptional={workerOptional}
                    fanOptional={fanOptional}
                  />}

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
                {studentOptional && <HostStudentFalse studentOptional={studentOptional} />}
                {workerOptional && <HostWorkerFalse workerOptional={workerOptional} />}
                {fanOptional && <HostFanFalse fanOptional={fanOptional} />}

                {optionsCount >= 2 && <HostFreeFalse
                  studentOptional={studentOptional}
                  workerOptional={workerOptional}
                  fanOptional={fanOptional}
                />}
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
                <View style={styles.nameContainer}>
                  {showHobby ?
                    <Text style={styles.nameBold}>취미<Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>취미</Text>}
                  <TextInput
                    style={[styles.nameInput, showHobby && isEmpty && emptyHobby && styles.inputEmpty]}
                    placeholder="취미를 입력해 주세요."
                    keyboardType="default"
                    value={card_hobby}
                    onChangeText={setHobby}
                    ref={hobbyRef}
                    onSubmitEditing={() => musicRef.current.focus()}
                  />
                  {showHobby && isEmpty && emptyHobby && (
                    <Text style={styles.inputEmptyText}> 취미를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 인생 음악 */}
                <View style={styles.nameContainer}>
                  {showMusic ?
                    <Text style={styles.nameBold}>인생 음악<Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>인생 음악</Text>}
                  <TextInput
                    style={[styles.nameInput, showMusic && isEmpty && emptyMusic && styles.inputEmpty]}
                    placeholder="노래 제목을 입력해 주세요."
                    keyboardType="default"
                    value={card_music}
                    onChangeText={setMusic}
                    ref={musicRef}
                    onSubmitEditing={() => movieRef.current.focus()}
                  />
                  {showMusic && isEmpty && emptyMusic && (
                    <Text style={styles.inputEmptyText}> 노래 제목을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 인생 영화 */}
                <View style={styles.nameContainer}>
                  {showMovie ?
                    <Text style={styles.nameBold}>인생 영화 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>인생 영화</Text>}
                  <TextInput
                    style={[styles.nameInput, showMovie && isEmpty && emptyMovie && styles.inputEmpty]}
                    placeholder="영화 제목을 입력해 주세요."
                    keyboardType="default"
                    value={card_movie}
                    onChangeText={setMovie}
                    ref={movieRef}
                    onSubmitEditing={() => addressRef.current.focus()}
                  />
                  {showMovie && isEmpty && emptyMovie && (
                    <Text style={styles.inputEmptyText}> 영화 제목을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 거주지 */}
                <View style={styles.nameContainer}>
                  {showAddress ?
                    <Text style={styles.nameBold}>거주지 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>거주지</Text>}
                  <TextInput
                    style={[styles.nameInput, showAddress && isEmpty && emptyAddress && styles.inputEmpty]}
                    placeholder="거주지를 입력해 주세요. 예) 서울특별시 강남구"
                    keyboardType="default"
                    value={card_address}
                    onChangeText={setAddress}
                    ref={addressRef}
                  />
                  {showAddress && isEmpty && emptyAddress && (
                    <Text style={styles.inputEmptyText}> 거주지를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 자유 질문 */}
                <>
                  {plus.map((item, index) => {
                    const cardValues = [
                      card_free_A1, card_free_A2, card_free_A3, card_free_A4, card_free_A5
                    ];
                    const setCardValues = [
                      setFreeA1, setFreeA2, setFreeA3, setFreeA4, setFreeA5
                    ];
                    const refs = [
                      freeA1Ref, freeA2Ref, freeA3Ref, freeA4Ref, freeA5Ref
                    ];

                    return (
                      <View key={index} style={styles.nameContainer}>
                        <Text style={styles.nameBold}>{item} <Text style={styles.nameBold}> *</Text></Text>
                        <TextInput
                          style={styles.nameInput}
                          placeholder={`${item}을(를) 입력해주세요`}
                          keyboardType="default"
                          value={cardValues[index]}
                          onChangeText={setCardValues[index]}
                          ref={refs[index]}
                        />
                      </View>
                    );
                  })}
                </>

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
                <TouchableOpacity style={[styles.btnWhite, { marginTop: 8 }]} onPress={() => navigation.navigate("홈")}>
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