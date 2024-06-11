import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './CardViewsStyle';
import { PlusCardButton } from './ShareCard';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const CardsView = ({ navigation, selectedOption, setSelectedOption, handleNext, cardData, title, showPlusCardButton }) => {
    return (
      <View style={styles.mainlayout}>
        <Text style={styles.title}>{title}</Text>
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
                {showPlusCardButton && <PlusCardButton navigation={navigation} />}
                {cardData.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.btn1} onPress={handleNext}>
                    <item.Component backgroundColor={item.backgroundColor} avatar={item.avatar} />
                    </TouchableOpacity>
                ))}
            </View>
          </View>
          <View style={styles.innerView}></View>
        </ScrollView>
      </View>
    );
  };
  
  export default CardsView;
  
