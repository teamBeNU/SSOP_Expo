import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Clipboard, Alert } from "react-native";
import { styles } from './LinkShareStyle';
import { ShareCard, ShareCard2, ShareCard3, ShareCard4 } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { createStackNavigator } from '@react-navigation/stack';

import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';

function Step1Screen({ navigation }) {

  // 카드 데이터 유무를 상태로 설정
  const [hasCards, setHasCards] = useState(true);

  // 카드가 없는 경우
  if (!hasCards) {
    return (
      <View style={styles.mainlayout}>
        <Text style={styles.title}>공유할 카드를 선택하세요.</Text>
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
    { id: '4', Component: ShareCard4 },
    { id: '5', Component: ShareCard }
  ];

  const [selectedOption, setSelectedOption] = useState('최신순');

  const handleNext = () => {
    navigation.navigate('Step2');
  };

  return (
    <View style={styles.mainlayout}>  
        <View >
          <Text style={styles.title}>공유할 카드를 선택하세요</Text>
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
              {cardData.map((item) => (
                <TouchableOpacity key={item.id} style={styles.btn1} onPress={handleNext}>
                  <item.Component />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.innerView}></View>
          </ScrollView>
        </View>
    </View>
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
          <Text style={styles.title}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
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
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate(' ')}>
            <HomeIcon style={{ marginRight: 8 }} />
          </TouchableOpacity>
        ),
      }}/>
    </Stack.Navigator>
  );
}

export default LinkShare;