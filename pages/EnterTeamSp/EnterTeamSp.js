import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Progress from 'react-native-progress';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import HomeIcon from '../../assets/icons/ic_home_gray.svg';
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import People from '../../assets/icons/ic_people_small_fill.svg';
import { theme } from "../../theme";
import { styles } from './EnterTeamSpStyle';
import Toast from "react-native-toast-message";
import CustomModal from "../../components/CreateCard/Modal/CustomModal.js";

import CardSample from '../../assets/teamSp/bg_gradation.svg';
import ShareIcon from '../../assets/icons/ic_share_white.svg';
import DoneEndCard from '../../assets/teamSp/graphic_invite.svg';
import EnterEndCard from '../../assets/Login/graphic_done.svg';
import CardsView from '../../components/Bluetooth/CardsView.js';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import HostTemplate from '../../components/EnterTeamSp/HostTemplate.js';

function EnterTeamSp({ navigation, route }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);

  const [data, setData] = useState(null);
  const [team_name, setTeam_name] = useState('알 수 없음');
  const [team_comment, setTeam_comment] = useState('알 수 없음');
  const [memberCount, setMemberCount] = useState('0');
  const [isTemplate, setIsTemplate] = useState(true);
  const [step, setStep] = useState(1);
  const [isHost, setIsHost] = useState(false);

  const [inputcode, setInputCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // 팀스페이스 확인 모달창

  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형')
  const [hasCards, setHasCards] = useState(true);
  const [cardData, setCardData] = useState([]);

  // 팀스페이스 스텝
  const [teamStep, setTeamStep] = useState(1);

  // 모달
  const [modalVisible, setModalVisible] = useState(false);    // 홈 버튼 클릭 시 모달 여부
  const handleBtn1 = () => {    // 모달 - '계속 만들래요'
    setModalVisible(false);
  };
  const handleBtn2 = () => {    // 모달 - '네, 돌아갈래요'
    setModalVisible(false);
    navigation.navigate('홈');
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
    if (data) {
      setIsTemplate(data.isTemplate);
      if (data.isTemplate) {
        setStep(4);
      } else {
        setStep(2);
      }
    }
  }, [data]);

  useEffect(() => {
    // 호스트가 팀스페이스 생성하자마자 카드 생성하러 옴
    if (route.params && token) {
      const newStep = route.params.step || 1; // step 기본값 1
      setStep(newStep); // step 상태 업데이트
      console.log("받아온 초대코드 :", route.params.inviteCode);

      const apiUrl = `${baseUrl}/teamsp/search?inviteCode=${route.params.inviteCode}`;
      axios
        .get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
          setIsHost(true); // 호스트임을 표시
        })
        .catch((error) => {
          console.error('호스트 카드 생성 - 초대코드 검색 API 요청 에러:', error);
        });
    }
  }, [route.params, token]); // route.params를 의존성 배열에 추가

  // 팀스페이스 입장 API 호출
  const handleEnterModal = () => {
    const apiUrl = `${baseUrl}/teamsp/enter`;
    axios
      .post(apiUrl, { inviteCode: inputcode }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        setIsModalVisible(false);
      })
      .catch((error) => {
        // console.error('팀스페이스 입장 API 요청 에러:', error);
        Alert.alert("이미 입장한 팀스페이스입니다.");
      });
  };

  const handleNext = () => {
    if (step === 1) {
      // 초대코드 확인
      const apiUrl = `${baseUrl}/teamsp/search?inviteCode=${inputcode}`;
      axios
        .get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // console.log(response.data);
          setTeam_name(response.data.team_name);
          setTeam_comment(response.data.team_comment);
          setMemberCount(response.data.memberCount);

          setIsModalVisible(true);
        })
        .catch((error) => {
          // console.error('초대코드 검색 API 요청 에러:', error);
          showCustomToast("존재하지 않는 초대코드입니다.");
        });
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    } else if (step === 4) {
      setStep(5)
      setTeamStep(2);
    }
  }

  // Toast 표시 함수
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000, // 2초간 표시
    });
  };

  // 카드 제출 API 호출
  const handleCardSelect = (cardId) => {
    console.log("선택된 CardId :", cardId);
    handleSubmitCard(cardId); // 카드 선택 시 바로 제출
  };

  const handleSubmitCard = (cardId) => {
    const apiUrl = `${baseUrl}/teamsp/submit-card?teamId=${data.teamId}`;

    axios
      .post(apiUrl, { cardId: cardId }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log("Response:", response.data);
        // console.log("제출한 카드 ID : ", cardId);
        setStep(3);
      })
      .catch((error) => {
        Alert.alert("카드 제출 중 오류가 발생했습니다.", error);
      });
  };

  // 내 카드 데이터 호출
  const fetchCardData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch('http://43.202.52.64:8080/api/card/view/mine', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setCardData(result);

      if (result.length > 0) {
        setHasCards(true);
      } else {
        setHasCards(false);
      }
    } catch (error) {
      console.error('카드 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

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
    if (step === 1) {
      return (
        <TouchableOpacity onPress={handleBack}>
          <CloseIcon style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      );
    } else if (step < 6) {
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
      case 2:
        break;
      case 4:
        setStep(1);
        break;
      default:
        setStep(step - 1);
        break;
    }
  };

  useEffect(() => {
    if (step === 4) {
      navigation.setOptions({
        headerTitle: '카드 만들기',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <CloseIcon style={{marginLeft: 8}}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {setModalVisible(true);}}>
            <HomeIcon style={{marginRight: 20}}/>
          </TouchableOpacity>
        ),
      });
    } else if (step === 5 && teamStep === 2) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => {setTeamStep(1); setStep(4);}}>
            <LeftArrowIcon style={{marginLeft: 8}}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('홈');}}>
            <HomeIcon style={{marginRight: 20}}/>
          </TouchableOpacity>
        ),
      });
    } else if (step === 2) {
      navigation.setOptions({
        headerTitle: '카드 등록하기',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <LeftArrowIcon style={{marginLeft: 8}}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('홈');}}>
            <HomeIcon style={{marginRight: 20}}/>
          </TouchableOpacity>
        ),
      });
    }
  })

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

        {/* progressBar */}
        {isTemplate ? (
          step >= 4 && (
            <Progress.Bar
              progress={teamStep / 8}
              width={null}
              height={2}
              color={theme.green}
              borderWidth={0}
            />
          )
        ) : (
          step === 2 ? (
            <Progress.Bar
              progress={1.5 / 3}
              width={null}
              height={2}
              color={theme.green}
              borderWidth={0}
            />
          ) : (
            <Progress.Bar
              progress={step / 3}
              width={null}
              height={2}
              color={theme.green}
              borderWidth={0}
            />
          )
        )}

        {step === 0 && (
          <View>
          </View>
        )}

        {/* <View style={[{flex:1}, step === 2 ? styles.noPaddingMainlayout : styles.mainlayout]}> */}
        <View style={(step === 2 || step === 5) ? styles.noPaddingMainlayout : styles.mainlayout}>

          {/* 초대코드 입력 */}
          {step === 1 && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                      <Text style={styles.people}> <People />  {memberCount} / 150명 </Text>
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
            </TouchableWithoutFeedback>
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
                  handleNext={handleCardSelect} // 제출 카드 선택
                  cardData={cardData}
                  title={"팀스페이스에 보여질 카드를 선택하세요."}
                  showNewCardButton={true}
                  showPlusCard={true}
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
              <Text style={styles.font22}> 
                {isHost
                  ? `팀스페이스를 다 만들었어요!\n바로 멤버를 초대해 보세요.`
                  : `팀스페이스에 입장했어요!\n다른 구성원을 확인해 보세요.`
                }
              </Text>

              <View style={{ alignItems: 'center', marginTop: 100 }}>
                {isHost
                  ? <DoneEndCard width="300" height='300'/>
                  : <EnterEndCard width="300" height='300'/>
                }
              </View>

              <View style={styles.flexSpacer} />
              <View style={[styles.btnContainer3, { marginBottom: 8,  marginHorizontal: 0 }]}>
                <TouchableOpacity
                  style={[isHost ? styles.btnCheckCard : styles.btnShareCard, { marginBottom: 8 }]}
                  onPress={() => navigation.navigate('스페이스')}
                >
                  <Text style={isHost ? styles.btnCheckText: styles.btnText}>팀스페이스 확인</Text>
                </TouchableOpacity>

                {isHost && 
                  <TouchableOpacity
                    style={[styles.btnShareCard, { marginBottom: 0 }]}
                  >
                    <ShareIcon />
                    <Text style={styles.btnText}>초대코드 및 링크 공유하기</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          )}

          {/* 호스트가 템플릿 지정 */}
          {step === 4 && (
            <View style={styles.stepContainer}>
              <Text style={styles.font22}>
                이제 팀스페이스에 보일
                {"\n"}프로필 카드를 새로 만들어 볼까요?
              </Text>
              <Text style={[styles.subFont16, {marginTop: 14}]}>
              호스트가 필수 제출 항목을 지정했기 때문에 
              {"\n"}카드를 새로 만들어 등록해야 해요.
              </Text>
              <View style={styles.container}>
                <CardSample width={400} height={400} />
              </View>

              <View style={styles.flexSpacer} />

              <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}> 카드 만들기 </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* 호스트 지정 템플릿으로 이동 */}
          {step === 5 && (
            <HostTemplate 
              navigation={navigation}
              goToOriginal={goToOriginal}
              data={data} isHost={isHost}
              teamStep={teamStep}
              setTeamStep={setTeamStep}
            />
          )}

          {/* 홈 버튼 모달 */}
          {modalVisible && (
            <CustomModal 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              handleBtn1={handleBtn1}
              handleBtn2={handleBtn2}
              modalTitle={`카드 만들기를 취소하고 홈으로 돌아가시겠어요?`}
              modalText={'지금까지 작성한 내용이 없어져요.'}
              btn1={'계속 만들래요'}
              btn2={'네 돌아갈래요'}
            />
          )}
        </View>
        {/* 호스트 지정 템플릿으로 이동 */}
        {/* {step === 5 && (
          // <HostTemplate navigation={navigation} goToOriginal={goToOriginal} data={data} isHost={isHost} />
          <View style={{backgroundColor: 'green'}}>
            <Text>ddddd</Text>
          </View>
        )} */}
      </View>
    {/* </TouchableWithoutFeedback> */}
    </View>
  );
}

export default EnterTeamSp;