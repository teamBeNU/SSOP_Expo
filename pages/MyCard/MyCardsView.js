import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './MyCardsViewStyle';
import { useNavigation } from '@react-navigation/native';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';
import SampleIcon from '../../assets/icons/iconSample.svg';
import ListIcon from '../../assets/icons/ic_list.svg';
import GridIcon from '../../assets/icons/ic_border_all.svg';
import { GridCardView } from "../../components/MyCard/GridCardView";
import { ListCardView } from "../../components/MyCard/ListCardView";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard.js";
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'

const CardsView = ({ cardData }) => {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');
  const navigation = useNavigation();

  const toggleViewOption = () => {
    if (viewOption === '그리드형') {
      setViewOption('리스트형');
    } else {
      setViewOption('그리드형');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <SampleIcon />
        <Text style={styles.title}>내 카드</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.row2}>

        <TouchableOpacity style={{...styles.DownArrowIcon, ...styles.viewToggleContainer}} onPress={toggleViewOption}>
          {viewOption === '리스트형' ? <GridIcon /> : <ListIcon />}
        </TouchableOpacity>
          
        <View style={styles.optionToggleContainer}>
          <Text style={styles.range}>{selectedOption}</Text>
          <Menu>
              <MenuTrigger><DownArrowIcon /></MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
                <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
              </MenuOptions>
            </Menu>
         </View>  
       </View>
      </View>

      {viewOption === '그리드형' ? <GridCardView viewOption={viewOption} cardData={cardData}/> : <ListCardView cardData={cardData}/>}

      <TouchableOpacity style={styles.newCardBtn} onPress={() => {navigation.navigate('카드 만들기');}}>
        <Text style={styles.newCardText}>새 카드 추가하기</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default CardsView;

