import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from './SpaceStyle';
import { RadioCard } from "../../components/Bluetooth/ShareCard.js";
import SpaceManage from "../../components/Space/SpaceManage.js";
import Toast from 'react-native-toast-message';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg';
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg';

const showCustomToast = (text) => {
  Toast.show({
    text1: text,
    type: 'selectedToast',
    position: 'bottom',
    visibilityTime: 2000,
  });
};

const handleSaveTel = () => {
  showCustomToast('연락처가 저장되었습니다.');
};

function MySpaceManage() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const handlePress = (cardId) => {
    setSelectedCards(prevSelectedCards => 
      prevSelectedCards.includes(cardId)
        ? prevSelectedCards.filter(id => id !== cardId)
        : [...prevSelectedCards, cardId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCards.length === cardData.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(cardData.map(card => card.id));
    }
  };

  const cardData = [
    { id: '1', Component: RadioCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '2', Component: RadioCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 />, card_name: '이사나', age: '23세', dot: '·', card_template: '학생' },
    { id: '3', Component: RadioCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
    { id: '4', Component: RadioCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 />, card_name: '임지니', age: '22세', dot: '·', card_template: '팬' },
    { id: '5', Component: RadioCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '6', Component: RadioCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
  ];

  return (
    <View style={styles.backgroundColor}>
      <SpaceManage
        selectedCards={selectedCards}
        handleSelectAll={handleSelectAll}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        cardDataLength={cardData.length}
      />
      <View style={styles.cardLayout}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.row}>
              {cardData.map((item) => (
                <View key={item.id} style={styles.card}>
                  <item.Component
                    backgroundColor={item.backgroundColor}
                    avatar={item.avatar}
                    card_name={item.card_name}
                    age={item.age}
                    dot={item.dot}
                    card_template={item.card_template}
                    host={item.host}
                    filter={item.filter}
                    selected={selectedCards.includes(item.id)} 
                    onPress={() => handlePress(item.id)}
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.innerView}></View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSaveTel}>
          <Text style={styles.bottomText}>연락처 저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MySpaceManage;
