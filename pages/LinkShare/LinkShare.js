import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert, Modal, TouchableWithoutFeedback, Share } from "react-native";
import { styles } from './LinkShareStyle';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from "../../theme";

import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg';
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg';
import LinkShareImage from '../../assets/icons/LinkShareImage.svg';
import ShareIcon from '../../assets/icons/ic_share.svg';

function Step1Screen({ navigation }) {
  // 카드 데이터 유무를 상태로 설정
  const [hasCards, setHasCards] = useState(true);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [cardData, setCardData] = useState([]);  // 카드 데이터를 저장할 상태

  // 백엔드에서 카드 데이터를 가져오는 함수
  const fetchCardData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // 토큰 가져오기
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch('http://43.202.52.64:8080/api/card/view/mine', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,  // 인증 헤더에 토큰 추가
        },
      });

      const result = await response.json();  // 응답을 JSON으로 변환
      setCardData(result);  // 카드 데이터를 상태로 저장

      if (result.length > 0) {
        setHasCards(true);  // 카드가 있으면 true
      } else {
        setHasCards(false);  // 카드가 없으면 false
      }
    } catch (error) {
      console.error('카드 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

    // 카드 선택 후 링크를 생성하고 Step2로 이동
    const handleNext = async (selectedCardId) => {
      console.log("선택된 카드 ID:", selectedCardId);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('토큰이 없습니다.');
          return;
        }
        const response = await fetch('http://43.202.52.64:8080/api/link/create', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cardId: selectedCardId }),
        });

        console.log("서버 응답 상태:", response.status, response.statusText);  // 응답 상태 확인
        const result = await response.json();
        console.log("서버 응답 데이터:", result); 
        
        if (response.ok) {
          navigation.navigate('Step2', { link: result.link });
        } else {
          console.error('링크 생성 실패:', result.message);
        }
      } catch (error) {
        console.error('링크 생성 중 오류가 발생했습니다:', error);
      }
    };

  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  useEffect(() => {
    fetchCardData();  // 카드 데이터 가져오기
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Progress.Bar
        progress={0.5} 
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />
      <View style={styles.shareContainer}>
        {hasCards ? (
          <CardsView
            navigation={navigation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            viewOption={viewOption}
            setViewOption={setViewOption}
            handleNext={handleNext}
            cardData={cardData} 
            title={'공유할 카드를 선택하세요.'}
            showNewCardButton={true}
            showPlusCard={true}
          />
        ) : (
          <NoCardsView 
            navigation={navigation}
            title={'공유할 카드를 선택하세요.'}
            sub={'공유할 수 있는 카드가 없어요.'}
          />
        )}
      </View>
    </View>
  );
}

function Step2Screen({ route }) {
  const { link } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 링크 복사
  const copyLinkShare = async () => {
    await Clipboard.setStringAsync(link);
    Alert.alert('클립보드에 복사되었습니다.');
  };
  
  // const copyLinkShare = async () => {
  //   const textToCopy = LinkShare;
  //   await Clipboard.setStringAsync(textToCopy);
  //   Alert.alert("클립보드에 복사되었습니다.");
  // };
  
  // const shareLinkCode = async () => {
  //   try {
  //     const isAvailable = await Sharing.isAvailableAsync();
  //     if (!isAvailable) {
  //       Alert.alert('Sharing is not available on this device');
  //       return;
  //     }

  //     await Sharing.shareAsync('https://gyeong0210.notion.site/SSOP-fc8faf958fc14b738484dc9471ac4209?pvs=25', {
  //       dialogTitle: 'SSOP Share TEST',
  //     });
  //   } catch (error) {
  //     Alert.alert('Error sharing', error.message);
  //   }
  // };

  const handleLinkSharePress = async () => {
    setIsModalVisible(false);
    try {
      await Share.share({
        title: 'SSOP',
        message: `SSOP: Share Social Profile card\n${link}`,
      });
    } catch (error) {
      console.error('링크 공유 중 오류가 발생했습니다:', error);
    }
  };

//   const handleLinkSharePress = async () => {
//     setIsModalVisible(false);

//     const result = await Share.share({
//         title: `SSOP`, // android 단독
//         message: `SSOP: Share SOcial Profile card\nhttp://ssop2024.notion.site`,
//     });

//     if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//         // shared with activity type of result.activityType
//         } else {
//         // shared
//         }
//     } else if (result.action === Share.dismissedAction) {
//         // dismissed
//     }
// };


  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Progress.Bar
        progress={1.0} // Step2에서는 100%로 설정
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />
      <View style={styles.container3}>
        <View style={styles.mainlayout}>
          <Text style={styles.title}>링크가 생성되었어요.</Text>
          <Text style={[styles.Text16, {marginBottom: 33}]}>링크는 10분 동안 유효해요.</Text>
          <View style={styles.linkShareContainer}>
          <LinkShareImage/>
            <View>
              <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(!isModalVisible);
              }}>
              <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={styles.shareModalContainer}>
                  <TouchableWithoutFeedback>
                    <View style={styles.ShareModalView}>
                      <TouchableOpacity onPress={() => { copyLinkShare(); setIsModalVisible(false); }}>
                        <Text style={styles.ShareModalText}>링크 복사하기</Text>                   
                      </TouchableOpacity>
                      <View style={styles.line} />
                      <TouchableOpacity onPress={() => { handleLinkSharePress(); setIsModalVisible(false)}}>
                        <Text style={styles.ShareModalText}>링크 공유하기</Text>                   
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnNext} onPress={handleShareButtonPress}>
            <ShareIcon style={{marginRight: 8}}/>
            <Text style={styles.btnText}>링크 공유하기</Text>
          </TouchableOpacity >
        </View>
      </View>
    </View>
  );
}

function LinkShare({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Step1" component={Step1Screen} 
      options={{
        title: "링크 복사",
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <CloseIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
      }}/>
      <Stack.Screen name="Step2" component={Step2Screen} 
      options={{
        title: "링크 복사",
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <LeftArrowIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('홈')}>
            <HomeIcon style={{ marginRight: 8 }} />
          </TouchableOpacity>
        ),
      }}/>
    </Stack.Navigator>
  );
}

export default LinkShare;