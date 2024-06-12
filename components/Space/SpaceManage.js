import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import { styles } from '../../pages/Space/SpaceStyle.js';
import RadioWhiteIcon from '../../assets/icons/ic_radio_check_white'

const CustomRadioButton = ({ selected, onPress }) => {
  return (
    <View style={styles.radioContainer}>
      <TouchableOpacity onPress={onPress} style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <RadioWhiteIcon style={styles.radioInner} />}
      </TouchableOpacity>
      <Text style={styles.label}>모두 선택</Text>
    </View>
  );
};

const SpaceManage = ({ selectedCards, handleSelectAll, selectedOption, setSelectedOption, cardDataLength }) => {
  return (
    <View style={styles.personContainer}>
      <View style={styles.personRow}>
        <View style={styles.leftContainer}>
          <CustomRadioButton
            selected={selectedCards.length === cardDataLength}
            onPress={handleSelectAll}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.range2}>{selectedOption}</Text>
        <Menu style={styles.DownArrowIcon2}>
          <MenuTrigger><DownArrowIcon /></MenuTrigger>
          <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
            <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
            <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default SpaceManage;