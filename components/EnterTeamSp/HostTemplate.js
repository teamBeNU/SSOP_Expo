import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Dimensions, Linking } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

import EnterEndCard from '../../assets/teamSp/EnterEndCard';
import HostStudentTrue from "./HostStudentTrue";
import HostStudentFalse from "./HostStudentFalse";
import HostWorkerTrue from "./HostWorkerTrue";
import HostWorkerFalse from "./HostWorkerFalse";
import HostFanTrue from "./HostFanTrue";
import HostFanFalse from "./HostFanFalse";
import HostFreeFalse from "./HostFreeFalse";

import CoverAvatar from "../../assets/createCard/coverAvatar.svg";
import CoverPicture from "../../assets/createCard/coverPicture.svg";
import AvatarCustom from "../CreateCard/AvatarCustom";
import SelectCover from "../CreateCard/SelectCover";

export default function HostTemplate({ navigation, goToOriginal, data }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [step, setStep] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const SCREEN_WIDTH = Dimensions.get('window').width;

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
  const [card_cover, setCover] = useState("free");

  const [studentOptional, setStudentOptional] = useState([]);
  const [workerOptional, setWorkerOptional] = useState([]);
  const [fanOptional, setFanOptional] = useState([]);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyIntroduction, setEmptyIntroduction] = useState(false);
  const [emptyBirth, setEmptyBirth] = useState(false);
  const [emptyMbti, setEmptyMbti] = useState(false);
  const [emptyTel, setEmptyTel] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyInsta, setEmptyInsta] = useState(false);
  const [emptyX, setEmptyX] = useState(false);
  const [emptyHobby, setEmptyHobby] = useState(false);
  const [emptyMusic, setEmptyMusic] = useState(false);
  const [emptyMovie, setEmptyMovie] = useState(false);
  const [emptyAddress, setEmptyAddress] = useState(false);
  
  const [profile_image_url, setProfileImageUrl] = useState(null);
  const [isPictureComplete, setIsPictureComplete] = useState(false);
  const [isAvatarComplete, setIsAvatarComplete] = useState(false);
  const [coverInit, setCoverInit] = useState(null);   // 호스트가 지정한 커버 (free, avtar, picture)

  const [isBirthCorrect, setIsBirthCorrect] = useState({ year: true, month: true, day: true });

  const currentYear = new Date().getFullYear();

  const [templateData, setTemplateData] = useState({}); // 하위 템플릿에서 전달된 데이터를 저장하는 곳

  // 하위 템플릿 컴포넌트에서 데이터를 받아오는 콜백 함수
  const handleTemplateData = (data) => {
    setTemplateData(data);
  };

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
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("템플릿 질문 목록 조회 : ", response.data);
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
        setCover(response.data.cardCover);
        setCoverInit(response.data.cardCover);

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

  // post 요청
  const handleSubmit = async () => {
    const formData = new FormData();
    const requestData = {
      memberEssential: {
        card_name: card_name,
        card_introduction: card_introduction,
        card_template: data.template,
        card_cover: card_cover
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
        card_student_school: templateData?.card_school || null,
        card_student_grade: templateData?.card_grade || null,
        card_student_id: templateData?.card_studNum || null,
        card_student_major: templateData?.card_major || null,
        card_student_club: templateData?.card_club || null,
        card_student_role: templateData?.card_role || null,
        card_student_status: templateData?.card_status || null,
      },
      memberWorker: {
        card_worker_company: templateData?.card_company || null,
        card_worker_job: templateData?.card_job || null,
        card_worker_position: templateData?.card_position || null,
        card_worker_department: templateData?.card_part || null
      },
      memberFan: {
        card_fan_genre: templateData?.card_genre || null,
        card_fan_first: templateData?.card_favorite || null,
        card_fan_second: templateData?.card_second || null,
        card_fan_reason: templateData?.card_reason || null
      }
    };

    // member card
    formData.append('member', {
      name: 'member',
      string: JSON.stringify(requestData),
      type: 'application/json',
    });

    // image URI
    if (profile_image_url) {
      const localUri = profile_image_url;
      const filename = localUri.split('/').pop();
      const fileMatch = /\.(\w+)$/.exec(filename);
      const type = fileMatch ? `image/${fileMatch[1]}` : 'image'  
      formData.append('image', {
          uri: localUri,
          name: filename,
          type: type
      });
    }

    try {
      const response = await axios.post(
        `${baseUrl}/teamsp/member/create/${data.teamId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.data.code === 200) {
        console.log('멤버 카드 생성 완료');
        console.log("작성한 멤버 카드:", requestData);
        setStep(9);
      } else {
        console.log('멤버 카드 생성 실패');
      }
    } catch (error) {
      Alert.alert("카드 제출 중 오류가 발생했습니다.", error);
      console.error('멤버 카드 생성 API 에러 발생: ', error);
    }
  }

  const hasStudentOptional = studentOptional !== undefined;
  const hasWorkerOptional = workerOptional !== undefined;
  const hasFanOptional = fanOptional !== undefined;

  const optionsCount = [hasStudentOptional, hasWorkerOptional, hasFanOptional].filter(Boolean).length;

  const handleNext = () => {
    if (step === 1) { // 기본 정보
      const newEmptyName = card_name.trim() === '';
      const newEmptyIntroduction = card_introduction.trim() === '';
      const newEmptyBirth = card_birth.trim() === '';
      const newEmptyMbti = card_MBTI.trim() === '';

      setEmptyName(newEmptyName);
      setEmptyIntroduction(newEmptyIntroduction);
      setEmptyBirth(newEmptyBirth);
      setEmptyMbti(newEmptyMbti);

      const year = card_birth.slice(0, 4);
      const month = card_birth.slice(5, 7);
      const day = card_birth.slice(8, 10);

      const isBirthFull = year !== '' && month !== '' && day !== '';

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

      const days = getDayInMonth(year, month);

      const isYearCorrect = year >= currentYear - 110 && year <= currentYear;
      const isMonthCorrect = month.length === 2 && (1 <= parseInt(month) && parseInt(month) <= 12);
      const isDayCorrect = day.length === 2 && (1 <= parseInt(day) && parseInt(day) <= days);

      setIsBirthCorrect((prev) => ({
        ...prev,
        year: isYearCorrect,
        month: isMonthCorrect,
        day: isDayCorrect,
      }));

      if (!newEmptyName && !newEmptyIntroduction &&
        (!showBirth || !newEmptyBirth) &&
        (!showMBTI || !newEmptyMbti)
      )
        setStep(2);

    } else if (step === 2) { // 연락처
      const newEmptyTel = card_tel.trim() === '';
      const newEmptyEmail = card_email.trim() === '';
      const newEmptyInsta = card_Insta.trim() === '';
      const newEmptyX = card_X.trim() === '';

      setEmptyTel(newEmptyTel);
      setEmptyEmail(newEmptyEmail);
      setEmptyInsta(newEmptyInsta);
      setEmptyX(newEmptyX);

      if ((!showTel || !newEmptyTel) &&
        (!showEmail || !newEmptyEmail) &&
        (!showInsta || !newEmptyInsta) &&
        (!showX || !newEmptyX)
      )
        setStep(3);

    } else if (step === 3) { // 템플릿 필수
      setStep(4);
    } else if (step === 4) { // 템플릿 자유
      setStep(5);
    } else if (step === 5) { // 추가 정보
      const newEmptyHobby = card_hobby.trim() === '';
      const newEmptyMusic = card_music.trim() === '';
      const newEmptyMovie = card_movie.trim() === '';
      const newEmptyAddress = card_address.trim() === '';

      setEmptyHobby(newEmptyHobby);
      setEmptyMusic(newEmptyMusic);
      setEmptyMovie(newEmptyMovie);
      setEmptyAddress(newEmptyAddress);

      if ((!showHobby || !newEmptyHobby) &&
        (!showMusic || !newEmptyMusic) &&
          (!showMovie || !newEmptyMovie) &&
        (!showAddress || !newEmptyAddress)
      )
        if (card_cover === "free") {
          setStep(6) // 아바타와 사진 중 택 1
        }
        else {
          setStep(7); // 호스트가 지정한 아바타/사진으로 안내
        }
    } else if (step === 6) { // 아바타/사진 선택
      if(card_cover === "avatar") {   // card cover가 avatar인 경우
        setStep(8);
      } else if (card_cover === "picture" && profile_image_url) { // card cover가 picture 인 경우(step 8이 없음)
        handleSubmit();
        setStep(9);
      }
    } else if (step === 7) { // 커버 아바타 안내 / 사진 업로드
      if(card_cover === "avatar") {   // card cover가 avatar인 경우
        setStep(8);
      } else if (card_cover === "picture" && profile_image_url) { // card cover가 picture 인 경우(step 8이 없음)
        handleSubmit();
        setStep(9);
      }
    } else if (step === 8) { // 아바타 커스텀
      handleSubmit();
      setStep(9);
    }
  }

  // step 단위로 뒤로가기
  useEffect(() => {
    if (step === 8) {
      navigation.setOptions({
        headerTitle: '아바타 커스터마이징',
        headerLeft: handleHeaderLeft,
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => {
              setIsAvatarComplete(true);
            }}
          >
            <Text style={styles.avatarNext}>완료</Text>
          </TouchableOpacity>
        ),
      });
    } else {
        navigation.setOptions({
          headerTitle: '카드 생성',
          headerLeft: handleHeaderLeft
        });
    }
  }, [navigation, step]);

  const handleHeaderLeft = (onPress) => {
    if (step < 9) {
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
        break;
      case 5:
        setStep(3);
        break;
      case 7:
        setStep(5);
        break;
      case 8:
        if(coverInit === "free") {    // 호스트가 지정한 커버가 free일 경우
          setStep(6);
        } else if (coverInit === "avatar") {    // 호스트가 지정한 커버가 avatar일 경우
          setStep(7);
        }
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

  // 이미지 권한 요청을 위한 hooks
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  // 갤러리 열기
  const handleImagePicker = async () => {
    // 권한 확인: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();   // 파일 및 미디어 액세스 권한 요청
      if (!permission.granted) {   // 권한 거부
        Alert.alert(
          "필수 권한 허용 안내", // 제목
          "이미지를 게시하려면 설정에서 사진 및 동영상 권한을 허용해 주세요.",   // 메시지
          [
            {
              text: "닫기",
              onPress: () => console.log("권한 취소"),
              style: "cancel"
            },
            { text: "설정으로 가기", onPress: () => Linking.openSettings() }  // 설정으로 이동
          ]
        );
        return null
      }
    }

    // 이미지 업로드
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,    // 어떤 타입의 파일 업로드할지 (이미지만 받기 위해 Images로 설정)
      allowsEditing: true,    // 이미지 업로드 전에 자르기 등의 편집 가능 여부 설정
      quality: 1,     // 이미지 압축 여부(1: 가장 높은 품질)
      // aspect: [1, 1]    // 이미지 비율
    });

    if (!result.canceled) {     // 이미지 업로드
      setProfileImageUrl(result.assets[0].uri);
      setIsPictureComplete(true);
    } else {        // 이미지 업로드 취소
      setStep(step);
    }
  }

  useEffect(() => {
    if(isAvatarComplete && profile_image_url) {
      handleNext();
      setIsAvatarComplete(false);
    }
    if(isPictureComplete && profile_image_url) {
      handleNext();
      setIsPictureComplete(false);
    }
  }, [isAvatarComplete, isPictureComplete, profile_image_url]);

  // progressBar
  const maxSteps = 9;
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
                    style={[styles.nameInput, emptyName && styles.inputEmpty]}
                    placeholder="이름을 입력해 주세요."
                    keyboardType="default"
                    returnKeyType='next'
                    value={card_name}
                    onChangeText={setName}
                    ref={nameRef}
                    onSubmitEditing={() => introductionRef.current.focus()}
                  />
                  {emptyName && (
                    <Text style={styles.inputEmptyText}> 이름을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 한줄소개 */}
                <View style={styles.nameContainer}>
                  <Text style={styles.nameBold}>한줄소개 <Text style={styles.nameBold}> *</Text></Text>
                  <TextInput
                    style={[styles.nameInput, emptyIntroduction && styles.inputEmpty]}
                    placeholder="나에 대해 간단히 알려주세요."
                    keyboardType="default"
                    value={card_introduction}
                    onChangeText={setIntroduction}
                    ref={introductionRef}
                  />
                  {emptyIntroduction && (
                    <Text style={styles.inputEmptyText}> 한줄소개를 입력해 주세요.</Text>
                  )}
                </View>

                {/* MBTI */}
                <View style={styles.nameContainer}>
                  {showMBTI ?
                    <Text style={styles.nameBold}>MBTI <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>MBTI</Text>}
                  <TextInput
                    style={[styles.nameInput, showMBTI && emptyMbti && styles.inputEmpty]}
                    placeholder="MBTI를 입력하세요."
                    keyboardType="default"
                    maxLength={4}
                    value={card_MBTI}
                    onChangeText={text => setMBTI(text.toUpperCase())}  // 입력 값을 대문자
                    ref={MBTIRef}
                  />
                  {showMBTI && emptyMbti && (
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
                    style={[styles.birthInput, styles.birthInputbox, styles.marginR8, showBirth && emptyBirth && styles.inputEmpty]}
                    placeholder="YYYY/MM/DD"
                    placeholderTextColor={theme.gray60}
                    keyboardType="numeric"
                    value={card_birth}
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
                    }}
                    maxLength={10}
                    returnKeyType="next"
                    ref={birthRef}
                    blurOnSubmit={false}
                  />
                  {showBirth && emptyBirth ? (
                    <Text style={styles.inputEmptyText}>생년월일을 입력해 주세요.</Text>
                  ) : (
                    <View></View>
                  )}
                  {!emptyBirth && (!isBirthCorrect.year || !isBirthCorrect.month || !isBirthCorrect.day) ? (
                    <Text style={styles.inputEmptyText}>생년월일을 올바르게 입력해 주세요 (e.g., 2001년 01월 01일)</Text>
                  ) : (
                    <View></View>
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
                    style={[styles.nameInput, showTel && emptyTel && styles.inputEmpty]}
                    placeholder="전화번호를 입력해 주세요."
                    keyboardType="numeric"
                    returnKeyType='done'
                    value={card_tel}
                    onChangeText={setTel}
                    ref={telRef}
                    onSubmitEditing={() => emailRef.current.focus()}
                  />
                  {showTel && emptyTel && (
                    <Text style={styles.inputEmptyText}> 전화번호를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 이메일 */}
                <View style={styles.nameContainer}>
                  {showEmail ?
                    <Text style={styles.nameBold}>이메일 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>이메일</Text>}
                  <TextInput
                    style={[styles.nameInput, showEmail && emptyEmail && styles.inputEmpty]}
                    placeholder="이메일 주소를 입력해 주세요."
                    keyboardType="email"
                    value={card_email}
                    onChangeText={setEmail}
                    ref={emailRef}
                    onSubmitEditing={() => instaRef.current.focus()}
                  />
                  {showEmail && emptyEmail && (
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
                    style={[styles.nameInput, showInsta && emptyInsta && styles.inputEmpty]}
                    placeholder="인스타그램 계정을 입력해주세요."
                    keyboardType="default"
                    value={card_Insta}
                    onChangeText={setInsta}
                    ref={instaRef}
                    onSubmitEditing={() => xRef.current.focus()}
                  />
                  {showInsta && emptyInsta && (
                    <Text style={styles.inputEmptyText}> 인스타그램 계정을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 트위터 */}
                <View style={styles.nameContainer}>
                  {showX ?
                    <Text style={styles.nameBold}>X(트위터) <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>X(트위터)</Text>}
                  <TextInput
                    style={[styles.nameInput, showX && emptyX && styles.inputEmpty]}
                    placeholder="X 계정을 입력해 주세요."
                    keyboardType="default"
                    value={card_X}
                    onChangeText={setX}
                    ref={xRef}
                  />
                  {showX && emptyX && (
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

                <Text style={styles.title}>호스트가 지정한 정보를 입력해 주세요.</Text>
                <Text style={styles.subtitle}>필수로 입력해야 하는 정보예요. </Text>

                {hasStudentOptional && <HostStudentTrue studentOptional={studentOptional} onDataChange={handleTemplateData} />}
                {hasWorkerOptional && <HostWorkerTrue workerOptional={workerOptional} onDataChange={handleTemplateData} />}
                {hasFanOptional && <HostFanTrue fanOptional={fanOptional} onDataChange={handleTemplateData} />}

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

                <Text style={[styles.title, { marginLeft: 16 }]}>정보를 더 추가할 수 있어요.</Text>
                <Text style={[styles.subtitle, { marginLeft: 16 }]}>더 보여주고 싶은 정보만 선택하여 입력하세요. </Text>

                {optionsCount >= 2 ? (
                  <HostFreeFalse onDataChange={handleTemplateData} />
                ) : (
                  <>
                    {hasStudentOptional && <HostStudentFalse studentOptional={studentOptional} onDataChange={handleTemplateData} />}
                    {hasWorkerOptional && <HostWorkerFalse workerOptional={workerOptional} onDataChange={handleTemplateData} />}
                    {hasFanOptional && <HostFanFalse fanOptional={fanOptional} onDataChange={handleTemplateData} />}
                  </>
                )}

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
                    style={[styles.nameInput, showHobby && emptyHobby && styles.inputEmpty]}
                    placeholder="취미를 입력해 주세요."
                    keyboardType="default"
                    value={card_hobby}
                    onChangeText={setHobby}
                    ref={hobbyRef}
                    onSubmitEditing={() => musicRef.current.focus()}
                  />
                  {showHobby && emptyHobby && (
                    <Text style={styles.inputEmptyText}> 취미를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 인생 음악 */}
                <View style={styles.nameContainer}>
                  {showMusic ?
                    <Text style={styles.nameBold}>인생 음악<Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>인생 음악</Text>}
                  <TextInput
                    style={[styles.nameInput, showMusic && emptyMusic && styles.inputEmpty]}
                    placeholder="노래 제목을 입력해 주세요."
                    keyboardType="default"
                    value={card_music}
                    onChangeText={setMusic}
                    ref={musicRef}
                    onSubmitEditing={() => movieRef.current.focus()}
                  />
                  {showMusic && emptyMusic && (
                    <Text style={styles.inputEmptyText}> 노래 제목을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 인생 영화 */}
                <View style={styles.nameContainer}>
                  {showMovie ?
                    <Text style={styles.nameBold}>인생 영화 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>인생 영화</Text>}
                  <TextInput
                    style={[styles.nameInput, showMovie && emptyMovie && styles.inputEmpty]}
                    placeholder="영화 제목을 입력해 주세요."
                    keyboardType="default"
                    value={card_movie}
                    onChangeText={setMovie}
                    ref={movieRef}
                    onSubmitEditing={() => addressRef.current.focus()}
                  />
                  {showMovie && emptyMovie && (
                    <Text style={styles.inputEmptyText}> 영화 제목을 입력해 주세요.</Text>
                  )}
                </View>

                {/* 거주지 */}
                <View style={styles.nameContainer}>
                  {showAddress ?
                    <Text style={styles.nameBold}>거주지 <Text style={styles.nameBold}> *</Text></Text>
                    : <Text style={styles.name}>거주지</Text>}
                  <TextInput
                    style={[styles.nameInput, showAddress && emptyAddress && styles.inputEmpty]}
                    placeholder="거주지를 입력해 주세요. 예) 서울특별시 강남구"
                    keyboardType="default"
                    value={card_address}
                    onChangeText={setAddress}
                    ref={addressRef}
                  />
                  {showAddress && emptyAddress && (
                    <Text style={styles.inputEmptyText}> 거주지를 입력해 주세요.</Text>
                  )}
                </View>

                {/* 자유 질문 */}
                <>
                  {plus?.map((item, index) => {
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
                        <Text style={styles.nameBold}>
                          {item} <Text style={styles.nameBold}> *</Text>
                        </Text>
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
                  }) || null}
                </>

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

          {/* 카드 커버 선택 */}
          {step === 6 && (
            <View style={{ height: '100%', backgroundColor: theme.white, marginHorizontal: -16 }}>
              <SelectCover
                step={step}
                setStep={setStep}
                card_cover={card_cover}
                handleNext={handleNext}
                setCardCover={setCover}
                setProfileImageUrl={setProfileImageUrl}
                setIsPictureComplete={setIsPictureComplete}
              />
            </View>
          )}

          {/* 커버 아바타 안내 / 사진선택 */}
          {step === 7 && (
            <View style={{ height: '100%' }}>
              {card_cover === "avatar" && (
                <View>
                  <Text style={styles.coverTitle}>호스트가 카드 커버를{'\n'}아바타로 지정했어요.</Text>
                  <View
                    style={[styles.coverImg, { marginLeft: (SCREEN_WIDTH - imageWidth) / 3, marginTop: 34 }]}
                    onLayout={(event) => {
                      const { width } = event.nativeEvent.layout;
                      setImageWidth(width);
                    }}
                  >
                    <CoverAvatar width="130%" height="130%" />
                  </View>
                </View>
              )}

              {card_cover === "picture" && (
                <>
                  <Text style={styles.coverTitle}>호스트가 카드 커버를{'\n'}사진으로 지정했어요.</Text>
                  <View
                    style={[styles.coverImg, { marginLeft: (SCREEN_WIDTH - imageWidth) / 3, marginTop: 34 }]}
                    onLayout={(event) => {
                      const { width } = event.nativeEvent.layout;
                      setImageWidth(width);
                    }}
                  >
                    <CoverPicture width="130%" height="130%" />
                  </View>
                </>

              )}
              <View style={styles.btnContainer}>
                {card_cover === "avatar" && (
                  <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                    <Text style={styles.btnText}> 아바타 커스터마이징하러 가기 </Text>
                  </TouchableOpacity>
                )}
                {card_cover === "picture" && (
                  <TouchableOpacity style={styles.btnNext} onPress={() => handleImagePicker()}>
                    <Text style={styles.btnText}> 사진 선택하기 </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {step === 8 && (
            <View style={{ marginLeft: -16, marginTop: -16 }}>
              {card_cover === "avatar" && (
                <AvatarCustom setProfileImageUrl={setProfileImageUrl} avatar={null} setAvatar={null} />
              )}
            </View>
          )}

          {/* 팀스페이스 입장 완료 */}
          {step === 9 && (
            <View style={{ height: '100%' }}>
              <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

              <View style={{ alignItems: 'center', marginTop: 135 }}>
                <EnterEndCard />
              </View>

              <View style={[styles.btnContainer, { marginBottom: 8 }]}>
                <TouchableOpacity style={[styles.btnNext, { marginBottom: 0 }]} onPress={() => navigation.navigate('스페이스')}>
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