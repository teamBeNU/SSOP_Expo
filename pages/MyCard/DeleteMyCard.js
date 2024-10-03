import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import GridIcon from '../../assets/icons/ic_border_all.svg';
import ListIcon from '../../assets/icons/ic_list.svg';
import { GridCardView } from "../../components/MyCard/GridCardView";
import { ListCardView } from "../../components/MyCard/ListCardView";
import { styles } from './MyCardsViewStyle';
import NotSelectedIcon from '../../assets/icons/ic_radioBtn_notSelect.svg';
import SelectedIcon from '../../assets/icons/ic_radioBtn_select.svg';

const DeleteMyCard = ({ route, navigation }) => {
  const { cardData } = route.params;
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');

  const [selectedCards, setSelectedCards] = useState([]);

  const toggleViewOption = () => {
    if (viewOption === '그리드형') {
      setViewOption('리스트형');
    } else {
      setViewOption('그리드형');
    }
  };

  const handleSelectAllToggle = () => {
    if (selectedCards.length === cardData.length) {
      setSelectedCards([]);
    } else {
      const allCardIds = cardData.map(card => card.cardId); 
      setSelectedCards(allCardIds);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: `${selectedCards.length}개 선택됨`,
        headerRight: () => (
            <RadioButton 
                selected={selectedCards.length === cardData.length} 
                onPress={handleSelectAllToggle} 
            />
        ),
    });
}, [selectedCards, cardData.length, navigation]);

  return (
    <View style={[styles.container, {paddingTop: 16}]}>

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

      {viewOption === '그리드형' ? <GridCardView cardData={cardData}/> : <ListCardView cardData={cardData} deleteMode={true} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />}
      
    </View>
  );
};

export default DeleteMyCard;

const RadioButton = ({ selected, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
          {selected ? <SelectedIcon /> : <NotSelectedIcon />}
        <Text style={styles.totalText}>전체</Text>
      </TouchableOpacity>
    );
  };