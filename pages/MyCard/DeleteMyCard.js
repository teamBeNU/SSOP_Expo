import React, { useLayoutEffect, useState, useEffect } from "react";
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
  const { cardData, viewOption: initialViewOption, selectedOption: initialSelectedOption } = route.params;

  const [viewOption, setViewOption] = useState(initialViewOption); // 초기값 전달받은 viewOption
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption); // 초기값 전달받은 selectedOption
  const [sortedCardData, setSortedCardData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // 정렬 함수
  const sortData = (data, option) => {
    const dataCopy = [...(data || [])];
    return option === '오래된 순' ? dataCopy : dataCopy.reverse();
  };

  // 데이터 정렬: cardData 또는 selectedOption이 변경될 때만 트리거
  useEffect(() => {
    setSortedCardData(sortData(cardData, selectedOption));
  }, [cardData, selectedOption]);

  // 전체 선택/해제 토글
  const handleSelectAllToggle = () => {
    setSelectedCards(selectedCards.length === cardData.length ? [] : cardData.map((card) => card.cardId));
  };

  // 삭제 확인 함수
  const confirmDelete = async () => {
    await deleteCard(selectedCards, navigation); // 카드 삭제 처리 로직 추가
    setModalVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${selectedCards.length}개 선택됨`,
      headerTitleAlign: 'center',
      headerRight: () => (
        <RadioButton
          selected={selectedCards.length === cardData.length}
          onPress={handleSelectAllToggle}
        />
      ),
    });
  }, [selectedCards, cardData.length, navigation]);

  return (
    <View style={[styles.container, { paddingTop: 16 }]}>
      <View style={styles.container2}>
        <View style={styles.row2}>
          {/* 뷰 옵션 토글 */}
          <TouchableOpacity
            style={{ ...styles.DownArrowIcon, ...styles.viewToggleContainer }}
            onPress={() => setViewOption((prev) => (prev === '그리드형' ? '리스트형' : '그리드형'))}
          >
            {viewOption === '리스트형' ? <GridIcon /> : <ListIcon />}
          </TouchableOpacity>

          {/* 정렬 옵션 토글 */}
          <View style={styles.optionToggleContainer}>
            <Text style={styles.range}>{selectedOption}</Text>
            <Menu>
              <MenuTrigger>
                <DownArrowIcon />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
                <MenuOption onSelect={() => setSelectedOption('최신순')} text="최신순" />
                <MenuOption onSelect={() => setSelectedOption('오래된 순')} text="오래된 순" />
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>

      {/* 카드 리스트 렌더링 */}
      {viewOption === '그리드형' ? (
        <GridCardView
          cardData={sortedCardData}
          deleteMode={true}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          selectedOption={selectedOption}
        />
      ) : (
        <ListCardView
          cardData={sortedCardData}
          setCardData={setSortedCardData}
          deleteMode={true}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          selectedOption={selectedOption}
        />
      )}

      {/* 삭제 버튼 */}
      <TouchableOpacity style={styles.delteBtnContainer} onPress={() => setModalVisible(true)}>
        <View style={styles.delteBtn}>
          <TrashIcon />
          <Text style={styles.delteBtnText}>삭제</Text>
        </View>
      </TouchableOpacity>

      {/* 삭제 확인 모달 */}
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