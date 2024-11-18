import React, { useLayoutEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import GridIcon from '../../assets/icons/ic_border_all.svg';
import ListIcon from '../../assets/icons/ic_list.svg';
import NotSelectedIcon from '../../assets/icons/ic_radioBtn_all.svg';
import SelectedIcon from '../../assets/icons/ic_radioBtn_select.svg';
import TrashIcon from '../../assets/icons/ic_trash.svg';
import { deleteCard } from '../../components/MyCard/DeleteCardAPI';
import { GridCardView } from "../../components/MyCard/GridCardView";
import { ListCardView } from "../../components/MyCard/ListCardView";
import { styles } from './MyCardsViewStyle';

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
  await deleteCard(selectedCards, navigation);
  setModalVisible(false);
}

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

      {viewOption === '그리드형' ? <GridCardView cardData={cardData} deleteMode={true} selectedCards={selectedCards} setSelectedCards={setSelectedCards}/> : <ListCardView cardData={cardData} deleteMode={true} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />}

      <TouchableOpacity style={styles.delteBtnContainer} onPress={handleDelete}>
        <View style={styles.delteBtn}>
        <TrashIcon />
        <Text style={styles.delteBtnText}>삭제</Text>
        </View>
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