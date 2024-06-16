import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Clipboard, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { styles } from './LinkShareStyle';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import { theme } from "../../theme";

import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg';
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg';
import LinkShareImage from '../../assets/icons/LinkShareImage.svg';
import RightArrowBlueIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';

function Step1Screen({ navigation }) {
  // 카드 데이터 유무를 상태로 설정
  const [hasCards, setHasCards] = useState(true);
  const [selectedOption, setSelectedOption] = useState('최신순');

  // 카드 데이터
  const cardData = [
    { id: 'plusButton', Component: PlusCardButton, backgroundColor: '', avatar: '' },
    { id: '1', Component: ShareCard, backgroundColor: '#DFC4F0', avatar: <AvatarSample1 />, card_name: '김슈니', age: '23세', dot: '·', card_template: '학생' },
    { id: '2', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 />, card_name: '릴리', card_template: '팬' },
  ];

  const title = '공유할 카드를 선택하세요.';
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
          handleNext={handleNext}
          cardData={cardData}
          title={title}
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

function Step2Screen({ navigation }) {
  const LinkShare = 'digitalmedia.com'; // 링크 

  // 링크 복사
  const copyLinkShare = () => {
    const textToCopy = LinkShare;
    Clipboard.setString(textToCopy);
    Alert.alert("클립보드에 복사되었습니다.");
  };
  
  const [isModalVisible, setIsModalVisible] = useState(false);

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
            <View style={styles.linkShareBox}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleShareButtonPress}>
                <Text style={styles.linkShareText}>링크 공유하기</Text>
                <RightArrowBlueIcon style={styles.linkArrowIcon}/>
              </TouchableOpacity >
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
                      <TouchableOpacity onPress={() => setIsModalVisible(false)}>
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
          <TouchableOpacity style={styles.btnNext} onPress={() => navigation.navigate(' ')}>
            <Text style={styles.btnText}> 홈 화면으로 </Text>
          </TouchableOpacity>
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
      }}/>
    </Stack.Navigator>
  );
}

export default LinkShare;