import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View, Alert, Modal } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { showMessage } from 'react-native-flash-message';
import Toast from 'react-native-toast-message';

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
  const [modalVisible, setModalVisible] = useState(false);

  const toggleViewOption = () => {
    setViewOption(viewOption === '그리드형' ? '리스트형' : '그리드형');
  };

  const handleDelete  = async () => {
    if (selectedCards.length === 0) {
        setModalVisible(true);
        return;
    }
    setModalVisible(true);
};

const confirmDelete = async () => {
  await deleteMyCard(selectedCards);
  setModalVisible(false);
}

const deleteMyCard  = async (cardId) => {
    try {   
        const token = await AsyncStorage.getItem('token');
        
        const response = await fetch(`http://43.202.52.64:8080/api/card/delete?cardIds=${cardId.join(',')}`,
        {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if (response.status === 200) {
            setSelectedCards([]); 
            navigation.goBack();

            Toast.show({
              text1: "프로필 카드가 삭제되었어요.",
              type: 'success',
              position: 'bottom',
              visibilityTime: 3000,
              autoHide: true,
            });
        } else {
          Toast.show({
            text1: "삭제에 실패하였습니다.",
            type: 'fail',
            position: 'bottom',
            visibilityTime: 3000,
            autoHide: true,
          });
        }

    } catch (error) {
        Toast.show({
          text1: "카드 삭제 중 오류가 발생했습니다.",
          type: 'fail',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        });
    }
};

  const handleSelectAllToggle = () => {
    setSelectedCards(selectedCards.length === cardData.length ? [] : cardData.map(card => card.cardId));
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

      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>프로필을 삭제하시겠어요?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>수정할래요</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                <Text style={styles.deleteText}>삭제할래요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
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