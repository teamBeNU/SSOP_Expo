import React, { useState, useEffect } from "react";
import { View, Share } from "react-native";
import { styles } from './BluetoothStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import { theme } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';

function Step1Screen() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [hasCards, setHasCards] = useState(true);
  const [cardData, setCardData] = useState([]);

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

  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  useEffect(() => {
    fetchCardData();
  }, []);

  const title = '블루투스로 보낼 프로필을 선택하세요.';
  const sub = '공유할 수 있는 카드가 없어요.';

  const handleNext = async (cardId, card_name) => {
    try {
      const result = await Share.share({
        title: 'SSOP',
        message: `Card ID: ${cardId}, Card Name: ${card_name}`,  // 카드 ID를 메시지로 전달
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('특정 앱에서 공유 완료');
        } else {
          console.log('공유 완료');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('공유 취소');
      }
    } catch (error) {
      console.error('공유 오류:', error);
    }
  };

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
            title={title}
            showNewCardButton={true}
            showPlusCard={true}
          />
        ) : (
          <NoCardsView
            navigation={navigation}
            title={title}
            sub={sub}
          />
        )}
      </View>
    </View>
  );
}

function Bluetooth({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Step1" component={Step1Screen}
        options={{
          title: "카드 보내기",
          headerTitleAlign: 'center',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ),
        }} />
    </Stack.Navigator>
  );
}

export default Bluetooth;