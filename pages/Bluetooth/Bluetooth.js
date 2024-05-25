import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from './BluetoothStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_small_line_gray.svg';
import cardTmb1 from '../../assets/images/cardTmb1.svg';
import cardTmb2 from '../../assets/images/cardTmb2.svg';
import cardTmb3 from '../../assets/images/cardTmb3.svg';

function Bluetooth() {

    const navigation = useNavigation(); 

    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
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
                <TouchableOpacity style={styles.btn1} onPress={handleNext}>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} onPress={handleNext}>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} onPress={handleNext}>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainlayout}>
            <Text style={[styles.title, {marginBottom: 46}]}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                    <Text style={styles.stateCall}>요청 중...</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                    <Text style={styles.stateFinish}>공유 완료됨</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
        )}
      </ScrollView>
    );
  }

  export default Bluetooth;