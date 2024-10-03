import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View, Alert } from 'react-native';
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

  const handleDelete  = async () => {
    if (selectedCards.length === 0) {
        Alert.alert("삭제 오류", "삭제할 카드가 선택되지 않았습니다.");
        return;
    }

    const lastSelectedCardId = selectedCards[selectedCards.length - 1];

    Alert.alert('프로필을 삭제하시겠어요?', '이 작업은 실행 취소할 수 없습니다.', [
        {
            text: '수정할래요',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: '삭제할래요', onPress:  async () => await deleteMyCard(lastSelectedCardId) },
        ],
        { cancelable: false }
    )
};


const deleteMyCard  = async (cardId) => {
    try {   
        const token = await AsyncStorage.getItem('token');

         // const cardIdsParam = selectedCards.join(',');
        
        const response = await fetch(`http://43.202.52.64:8080/api/card/delete?cardId=${cardId}`,
        {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if (response.status === 200) {
            Alert.alert("삭제 완료", "선택된 카드가 삭제되었습니다.");
            setSelectedCards([]); // Clear selected cards
            navigation.goBack(); // Navigate back or refresh card data as needed
        } else {
            Alert.alert("삭제 실패", "카드 삭제 중 오류가 발생했습니다1.");
        }

    } catch (error) {
        console.error("Error deleting cards:", error);
        Alert.alert("삭제 실패", "카드 삭제 중 오류가 발생했습니다.");
    }
};

  const handleSelectAllToggle = () => {
    if (selectedCards.length === cardData.length) {
      setSelectedCards([]);
    } else {
      const allCardIds = cardData.map(card => card.cardId); 
      setSelectedCards(allCardIds);
      console.log('선택카드: ', selectedCards);
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

      <TouchableOpacity style={styles.delteBtn} onPress={handleDelete}>
        <Text style={styles.delteBtnText}>삭제</Text>
      </TouchableOpacity>
      
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