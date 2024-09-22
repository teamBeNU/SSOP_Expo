import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './MyCardsViewStyle';
import { PlusCardButton } from '../../components/Bluetooth/ShareCard';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';
import SampleIcon from '../../assets/icons/iconSample.svg';
import ListIcon from '../../assets/icons/ic_list.svg';
import GridIcon from '../../assets/icons/ic_border_all.svg';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

// navigation, selectedOption, setSelectedOption, viewOption, setViewOption, handleNext, cardData, showPlusCardButton
const CardsView = ({ }) => {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');

  const toggleViewOption = () => {
    setViewOption(!viewOption);
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
          {viewOption === '격자형' ? <GridIcon /> : <ListIcon />}
        </TouchableOpacity>
          
        <View style={styles.optionToggleContainer}>
          <Text style={styles.range}>{selectedOption}</Text>
          <Menu style={styles.DownArrowIcon}>
              <MenuTrigger><DownArrowIcon /></MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
                <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
              </MenuOptions>
          </Menu>
        </View>  
      </View>
    </View>
    
    </View>
  );
};

export default CardsView;

