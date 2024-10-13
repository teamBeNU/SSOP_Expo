import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import GridIcon from '../../assets/icons/ic_border_all.svg';
import ListIcon from '../../assets/icons/ic_list.svg';
import MyCardIcon from '../../assets/icons/ic_space.svg';
import AddIcon from '../../assets/icons/ic_add_small_line.svg';
import { GridCardView } from "../../components/MyCard/GridCardView";
import { ListCardView } from "../../components/MyCard/ListCardView";
import { styles } from './MyCardsViewStyle';
import { theme } from '../../theme';

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
        <MyCardIcon />
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
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
                <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
                <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
              </MenuOptions>
            </Menu>
         </View>  
       </View>
      </View>

      {viewOption === '그리드형' ? <GridCardView cardData={cardData}/> : <ListCardView cardData={cardData}/>}

      <TouchableOpacity style={styles.newCardBtn} onPress={() => {navigation.navigate('카드 만들기');}}>
        <AddIcon />
        <Text style={styles.newCardText}>새 카드 추가하기</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default CardsView;

