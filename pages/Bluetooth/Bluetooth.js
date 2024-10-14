import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { styles } from './BluetoothStyle';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard.js";
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
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'

function Step1Screen() {
  const navigation = useNavigation(); 
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');
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

  const handleNext = () => {
    navigation.navigate('Step2');
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

function Step2Screen() {

  // 사람 데이터 유무를 상태로 설정
  const [hasRecipients, setHasRecipients] = useState(true);

  // 보낼 사람이 없는 경우
  if (!hasRecipients) {
    return (
      <View style={styles.mainlayout}>
        <Text style={styles.title}>보낼 사람을 선택하여 프로필을 공유하세요.</Text>
        <View style={styles.emptyContainer}>
              <Text style={styles.noCard}>주변에 공유할 사람이 없어요.</Text>
          </View>
      </View>
    );
  }

  const recipients = [
    { id: '1', name: '홍길동', status: '' },
    { id: '2', name: '홍길동', status: '' },
    { id: '3', name: '홍길동', status: '' },
    { id: '4', name: '홍길동', status: '공유 완료됨' },
    { id: '5', name: '홍길동', status: '' },
  ];

  const [recipientStatuses, setRecipientStatuses] = useState(
    recipients.reduce((acc, recipient) => {
      acc[recipient.id] = recipient.status;
      return acc;
    }, {})
  );

  const handlePressRecipient = (id) => {
    setRecipientStatuses((prevStatuses) => {
      if (prevStatuses[id] === '공유 완료됨') {
        return prevStatuses;
      }
      return {
        ...prevStatuses,
        [id]: '요청 중...'
      };
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Progress.Bar
        progress={1.0}
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />
      <View style={styles.mainlayout}>
        <Text style={[styles.title, {marginBottom: 46}]}>보낼 사람을 선택하여 프로필을 공유하세요.</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {recipients.map((recipient) => (
            <React.Fragment key={recipient.id}>
              <View>
                <TouchableOpacity style={styles.namebox} onPress={() => handlePressRecipient(recipient.id)}>
                  <Text style={styles.name}>{recipient.name}</Text>
                  {recipientStatuses[recipient.id] && (
                    <Text style={recipientStatuses[recipient.id] === '요청 중...' ? styles.stateCall : styles.stateFinish}>
                      {recipientStatuses[recipient.id]}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
            </React.Fragment>
          ))}
        </ScrollView>
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
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <CloseIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
      }}/>
      <Stack.Screen name="Step2" component={Step2Screen} 
      options={{
        title: "카드 보내기",
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <LeftArrowIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate(' ')}>
            <HomeIcon style={{ marginRight: 8 }} />
          </TouchableOpacity>
        ),
      }}/>
    </Stack.Navigator>
  );
}

export default Bluetooth;