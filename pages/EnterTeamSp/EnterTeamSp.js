import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './EnterTeamSpStyle';
import { theme } from "../../theme";
import { View, Text, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Progress from 'react-native-progress';
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import People from '../../assets/icons/ic_people_small_fill.svg';

import AvatarSample1 from '../../assets/icons/AbatarSample1';
import AvatarSample2 from '../../assets/icons/AbatarSample2';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard";
import CardsView from '../../components/Bluetooth/CardsView.js';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import HostTemplate from '../../components/EnterTeamSp/HostTemplate.js';
import CardSample from '../../assets/teamSp/bg_gradation';
import EnterEndCard from '../../assets/teamSp/EnterEndCard';

function EnterTeamSp({ navigation }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMkBuYXZlci5jb20iLCJleHAiOjE3MjcxOTI4ODIsInVzZXJJZCI6NSwiZW1haWwiOiJ1c2VyMkBuYXZlci5jb20iLCJ1c2VybmFtZSI6InVzZXIxIn0.PWVCTkADgj5j5bHDcTkPeub4sA8HtgnHJBad8_BOeYjv529O062T98lb8wd-QgtNC97WsojtWNBwppwm-SMAvQ';

  const [data, setData] = useState(null);
  const [team_name, setTeam_name] = useState('알 수 없음');
  const [team_comment, setTeam_comment] = useState('알 수 없음');
  const [isTemplate, setIsTemplate] = useState(true);
  const [step, setStep] = useState(4); // 테스트용 - 호스트지정템플릿 페이지로 이동

  const [inputcode, setInputCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // 팀스페이스 확인 모달창

  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형')
  const [hasCards, setHasCards] = useState(1); // 공유할 카드 유무


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

  // 팀스페이스 입장 API 호출
  const handleEnterModal = () => {
    const apiUrl = `${baseUrl}/teamsp/enter`;
    axios
      .post(apiUrl, { inviteCode: inputcode }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        setIsTemplate(response.data.isTemplate);
        if (isTemplate) {
          setStep(4);
        } else {
          setStep(2);
        }
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error('팀스페이스 입장 API 요청 에러:', error);
        Alert.alert("존재하지 않는 초대코드입니다.");
      });
  };

  const handleNext = () => {
    if (!token) {
      Alert.alert("로그인이 필요한 페이지입니다. 로그인 화면으로 이동합니다.");
      navigation.navigate('로그인');
      return; 
    }

    if (step === 1) {
      // 초대코드 확인
      const apiUrl = `${baseUrl}/teamsp/search?inviteCode=${inputcode}`;
      axios
        .get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTeam_name(response.data.team_name);
          setTeam_comment(response.data.team_comment);
          setIsModalVisible(true);
        })
        .catch((error) => {
          console.error('초대코드 검색 API 요청 에러:', error);
          Alert.alert("존재하지 않는 초대코드입니다.");
        });
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    } else if (step === 4) {
      setStep(5)
    }
  }

  // 컴포넌트에서 페이지로 이동 함수
  const goToOriginal = () => {
    setStep(1);
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
        navigation.goBack();
        break;
      case 4:
        setStep(1);
        break;
      default:
        setStep(step - 1);
        break;
    }
  };

  const cardData = [
    { id: 'plusButton', Component: PlusCardButton, backgroundColor: '', avatar: '' },
    { id: '1', Component: ShareCard, backgroundColor: '#DFC4F0', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김슈니', age: '23세', dot: '·', card_template: '학생' },
    { id: '2', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{ marginLeft: -10 }} />, card_name: '릴리', card_template: '팬' },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ backgroundColor: theme.white, flex: 1 }}>

        {/* progressBar */}
        {isTemplate ? (
          step !== 5 && (
            <Progress.Bar
              progress={step === 4 ? 0.2857 : step / 7}
              width={null}
              height={2}
              color={theme.green}
              borderWidth={0}
            />
          )
        ) : (
          <Progress.Bar
            progress={step / 3}
            width={null}
            height={2}
            color={theme.green}
            borderWidth={0}
          />
        )}

        {step === 0 && (
          <View>
          </View>
        )}

        <View style={step === 2 ? styles.noPaddingMainlayout : styles.mainlayout}>

          {/* 초대코드 입력 */}
          {step === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.title}> 팀스페이스에 입장하려면 {"\n"} 초대코드를 입력하세요. </Text>

              <View style={styles.nameContainer}>
                <Text style={styles.name}>초대코드 입력</Text>
                <TextInput style={styles.nameInput} placeholder='초대코드를 입력하세요.'
                  maxLength={6}
                  value={inputcode}
                  keyboardType='numeric'
                  returnKeyType='done'
                  onChangeText={setInputCode}
                  onSubmitEditing={handleNext} />
              </View>

              <View style={styles.flexSpacer} />

              <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}> 입장하기 </Text>
              </TouchableOpacity>

              <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  setIsModalVisible(!isModalVisible);
                }}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => setIsModalVisible(false)}>
                      <CloseIcon />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.font18}>찾으시는 팀스페이스가 맞나요?</Text>
                    </View>

                    <View style={styles.modalContent}>
                      <Text style={[styles.font18, { marginLeft: 0 }]}> {team_name} </Text>
                      <Text style={styles.font16}> {team_comment} </Text>
                      <Text style={styles.people}> <People />  8 / 150명 </Text>
                    </View>

                    <View style={[styles.btnContainer, { marginLeft: 16 }]}>
                      <TouchableOpacity style={[styles.btnNext, { marginBottom: 16 }]} onPress={handleEnterModal}>
                        <Text style={styles.btnText}> 네, 입장할래요 </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}

          {/* 제출할 카드 선택 */}
          {step === 2 && (
            <View style={styles.stepContainer}>
              {hasCards ? (
                <CardsView
                  navigation={navigation}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  viewOption={viewOption}
                  setViewOption={setViewOption}
                  handleNext={handleNext}
                  cardData={cardData}
                  title={"팀스페이스에 보여질 카드를 선택하세요."}
                />

              ) : (
                <NoCardsView
                  navigation={navigation}
                  sub={"공유할 수 있는 카드가 없어요."}
                />
              )}
            </View>

          )}

          {/* 팀스페이스 입장 완료 */}
          {step === 3 && (
            <View style={styles.stepContainer}>
              <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

              <View style={{ alignItems: 'center', marginTop: 135 }}>
                <EnterEndCard />
              </View>

              <View style={styles.flexSpacer} />

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

          {/* 호스트가 템플릿 지정 */}
          {step === 4 && (
            <View style={styles.stepContainer}>
              <Text style={styles.font22}>
                호스트가 템플릿을 지정했어요.
                {"\n"}팀스페이스에 보여질
                {"\n"}카드를 새로 만들어 봐요!
              </Text>
              <View style={styles.container}>
                <CardSample />
              </View>

              <View style={styles.flexSpacer} />

              <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}> 카드 만들기 </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* 호스트 지정 템플릿으로 이동 */}
        {step === 5 && (
          <HostTemplate navigation={navigation} goToOriginal={goToOriginal} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EnterTeamSp;