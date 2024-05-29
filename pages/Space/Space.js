import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';

import React, { useState, useEffect } from "react";
import { ShareCard } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';

import NotiIcon from '../../assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'

function MySpaceScreen() {
  const navigation = useNavigation(); 
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasCards, setHasCards] = useState(true);

  const cardData = [
    { id: '1', Component: ShareCard, backgroundColor: '#B6E96C', avatar: <AvatarSample1 style={{marginLeft: -10}} /> },
    { id: '2', Component: ShareCard, backgroundColor: '#83936D', avatar: <AvatarSample2 style={{marginLeft: -10}} /> },
    { id: '3', Component: ShareCard, backgroundColor: '#6ED5EC', avatar: <AvatarSample2 style={{marginLeft: -10}} /> },
  ];

  const title = '블루투스로 보낼 카드를 선택하세요.'
  const sub = '공유할 수 있는 카드가 없어요.'

  const handleNext = () => {
    navigation.navigate('Step2');
  };

  return hasCards ? (
    <CardsView
      navigation={navigation}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      handleNext={handleNext}
      cardData={cardData}
    />
  ) : (
    <NoCardsView 
      navigation={navigation}
      title={title}
      sub={sub}
       />
  );
  }

function TeamSpaceScreen() {
  return (
    <View style={styles.container}>
      <Text>팀스페이스</Text>
    </View>
  );
}

function Space() {
    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();
    const Stack = createStackNavigator();
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { backgroundColor: 'white' },
            }}
            >
            <Tab.Screen name="마이스페이스" component={MySpaceScreen}/>
            <Tab.Screen name="팀스페이스" component={TeamSpaceScreen}/>
        </Tab.Navigator>
    );
  }
  export default Space;