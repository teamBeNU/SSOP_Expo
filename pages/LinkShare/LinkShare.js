import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Clipboard, Alert } from "react-native";
import { styles } from './LinkShareStyle';
import { ShareCard, ShareCard2, ShareCard3, ShareCard4 } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';

function LinkShare() {

  const cardData = [
    { id: '1', Component: ShareCard },
    { id: '2', Component: ShareCard2 },
    { id: '3', Component: ShareCard3 },
    { id: '4', Component: ShareCard4 },
    { id: '5', Component: ShareCard }
  ];

    const navigation = useNavigation(); 

    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
    };

    const [selectedOption, setSelectedOption] = useState('최신순');

    const LinkShare = 'digitalmedia.com'; // 링크 

    // 링크 복사
    const copyLinkShare = () => {
        const textToCopy = LinkShare;
        Clipboard.setString(textToCopy);
        Alert.alert("클립보드에 복사되었습니다.");
      };    

    return (
      <View style={styles.mainlayout}>
        {step === 1 ? (     
        <ScrollView showsVerticalScrollIndicator={false}>     
          <View >
            <Text style={styles.title}>공유할 카드를 선택하세요</Text>
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
                {cardData.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.btn1} onPress={handleNext}>
                    <item.Component />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.innerView}></View>
          </View>
        </ScrollView>
        ) : (
          <View>
            <Text style={styles.title}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
            <Text style={[styles.Text16, {marginBottom: 33}]}>링크는 10분 동안 유효해요.</Text>
            <Text style={[styles.Text14, {marginBottom: 8}]}> 링크 </Text>
                <View style={styles.linkShareContainer}>
                  <Text style={styles.linkShare}> {LinkShare} </Text>
                  <TouchableOpacity onPress={copyLinkShare}>
                    <Text style={styles.copy}>복사</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <View style={styles.btnNext}>
                    <Text onPress={() => navigation.navigate(' ')} style={styles.btnText}> 홈 화면으로 </Text>
                  </View>
                </View>
          </View>
        )}
    </View>
    );
}
  export default LinkShare;