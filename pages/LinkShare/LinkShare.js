import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Clipboard, Alert } from "react-native";
import { styles } from './LinkShareStyle';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';

import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'

function Step1Screen({ navigation }) {
  // 카드 데이터 유무를 상태로 설정
  const [hasCards, setHasCards] = useState(true);
  const [selectedOption, setSelectedOption] = useState('최신순');

  // 카드 데이터
  const cardData = [
    { id: 'plusButton', Component: PlusCardButton, backgroundColor: '', avatar: '' },
    { id: '1', Component: ShareCard, backgroundColor: '#B6E96C', avatar: <AvatarSample1 style={{marginLeft: -10}} /> },
    { id: '2', Component: ShareCard, backgroundColor: '#83936D', avatar: <AvatarSample2 style={{marginLeft: -10}} /> },
    { id: '3', Component: ShareCard, backgroundColor: '#6ED5EC', avatar: <AvatarSample2 style={{marginLeft: -10}} /> },
    { id: '4', Component: ShareCard, backgroundColor: '#FCA5D7', avatar: <AvatarSample1 style={{marginLeft: -10}} /> },
    { id: '5', Component: ShareCard, backgroundColor: '#B6E96C', avatar: <AvatarSample1 style={{marginLeft: -10}} /> },
  ];

  const title = '공유할 카드를 선택하세요.';
  const sub = '공유할 수 있는 카드가 없어요.';

  const handleNext = () => {
    navigation.navigate('Step2');
  };

  if (!hasCards) {
    return (
      <NoCardsView 
        navigation={navigation} 
        title={title}
        sub={sub}
      />
    );
  }

  return (
    <CardsView 
      navigation={navigation} 
      selectedOption={selectedOption} 
      setSelectedOption={setSelectedOption} 
      handleNext={handleNext} 
      cardData={cardData} 
      title={title}
    />
  );
}

function Step2Screen({ navigation }) {
  const LinkShare = 'digitalmedia.com'; // 링크 

  // 링크 복사
  const copyLinkShare = () => {
    const textToCopy = LinkShare;
    Clipboard.setString(textToCopy);
    Alert.alert("클립보드에 복사되었습니다.");
  };    

  return (
    <View style={styles.container3}>
        <View style={styles.mainlayout}>
          <Text style={styles.title}>링크를 복사하여 전달해 주세요.</Text>
          <Text style={[styles.Text16, {marginBottom: 33}]}>링크는 10분 동안 유효해요.</Text>
          <Text style={[styles.Text14, {marginBottom: 8}]}> 링크 </Text>
          <View style={styles.linkShareContainer}>
            <Text style={styles.linkShare}> {LinkShare} </Text>
            <TouchableOpacity onPress={copyLinkShare}>
              <Text style={styles.copy}>복사</Text>
            </TouchableOpacity>
          </View>
        </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnNext} onPress={() => navigation.navigate(' ')}>
          <Text style={styles.btnText}> 홈 화면으로 </Text>
        </TouchableOpacity>
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
      }}/>
    </Stack.Navigator>
  );
}

export default LinkShare;