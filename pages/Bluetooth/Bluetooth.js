import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from './BluetoothStyle';
import { ShareCard, ShareCard2, ShareCard3 } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_small_line_gray.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';

function Step1Screen() {
  const navigation = useNavigation(); 
  const [selectedOption, setSelectedOption] = useState('최신순');

// 카드 데이터 유무를 상태로 설정
  const [hasCards, setHasCards] = useState(true);

// 카드가 없는 경우
  if (!hasCards) {
    return (
      <View style={styles.mainlayout}>
        <Text style={styles.title}>블루투스로 보낼 카드를 선택하세요.</Text>
        <View style={styles.emptyContainer}>
              <Text style={styles.noCard}>공유할 수 있는 카드가 없어요.</Text>
              <TouchableOpacity onPress={() => navigation.navigate('카드 만들기')}>
                <View style={styles.newContainer}>
                  <Text style={styles.newCard}>새 카드 만들기</Text>
                  <RightIcon />
                </View>
              </TouchableOpacity>
          </View>
      </View>
    );
  }

  const cardData = [
    { id: '1', Component: ShareCard },
    { id: '2', Component: ShareCard2 },
    { id: '3', Component: ShareCard3 },
  ];

  const handleNext = () => {
    navigation.navigate('Step2');
  };

  return (
      <View style={styles.mainlayout}>
      <Text style={styles.title}>블루투스로 보낼 카드를 선택하세요</Text>
      <View style={styles.container2}>
        <View style={styles.row2}>
          <Text style={styles.range}>{selectedOption}</Text>
          <Menu style={styles.DownArrowIcon}>
            <MenuTrigger><DownArrowIcon/></MenuTrigger>
            <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
              <MenuOption style={{ marginBottom: 10.5}} onSelect={() => setSelectedOption('최신순')} text='최신순'/>
              <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순'/>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('카드 만들기')}>
            <PlusCardIcon/>
            <Text style={styles.Text14}>새 카드 만들기</Text>
          </TouchableOpacity>
          {cardData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.btn1} onPress={handleNext}>
              <item.Component />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </ScrollView>
      
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
        <Text style={styles.title}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
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
    { id: '4', name: '홍길동', status: '공유 완료됨' }
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
      <View style={styles.mainlayout}>
      <Text style={[styles.title, {marginBottom: 46}]}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
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
    
  );
}

function Bluetooth({ navigation }) {
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
          <TouchableOpacity onPress={() => navigation.navigate(' ')}>
            <HomeIcon style={{ marginRight: 8 }} />
          </TouchableOpacity>
        ),
      }}/>
    </Stack.Navigator>
  );
}

export default Bluetooth;