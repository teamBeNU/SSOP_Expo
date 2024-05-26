import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from './BluetoothStyle';
import { ShareCard, ShareCard2, ShareCard3 } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_small_line_gray.svg';

function Bluetooth() {

  const cardData = [
    { id: '1', Component: ShareCard },
    { id: '2', Component: ShareCard2 },
    { id: '3', Component: ShareCard3 },
  ];

  const recipients = [
    { id: '1', name: '홍길동', status: '' },
    { id: '2', name: '홍길동', status: '' },
    { id: '3', name: '홍길동', status: '' },
    { id: '4', name: '홍길동', status: '공유 완료됨' }
  ];

    const navigation = useNavigation(); 

    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
    };

    const [recipientStatuses, setRecipientStatuses] = useState(
      recipients.reduce((acc, recipient) => {
        acc[recipient.id] = recipient.status;
        return acc;
      }, {})
    );

    const handlePressRecipient = (id) => {
      setRecipientStatuses((prevStatuses) => {
        if (prevStatuses[id] === '공유 완료됨') {
          return prevStatuses; // "공유 완료됨" 상태인 경우 안 변함
        }
        return {
          ...prevStatuses,
          [id]: '요청 중...'
        };
      });
    };

    const [selectedOption, setSelectedOption] = useState('최신순');

    return (
      <ScrollView showsVerticalScrollIndicator={false}> 
        {step === 1 ? (          
          <View style={styles.mainlayout}>
            <Text style={styles.title}>블루투스로 보낼 카드를 선택하세요</Text>
            <View style={styles.container2}>
              <View style={styles.row2}>
                <Text style={styles.range}>{selectedOption}</Text>
                <Menu style={styles.DownArrowIcon}>
                  <MenuTrigger><DownArrowIcon/></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                    <MenuOption style={{ marginBottom: 10.5}}
                     onSelect={() => setSelectedOption('최신순')} text='최신순'/>
                    <MenuOption 
                     onSelect={() => setSelectedOption('오래된 순')} text='오래된 순'/>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
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
          </View>
        ) : (
          <View style={styles.mainlayout}>
            <Text style={[styles.title, {marginBottom: 46}]}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
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
          </View>
        )}
      </ScrollView>
    );
  }

  export default Bluetooth;