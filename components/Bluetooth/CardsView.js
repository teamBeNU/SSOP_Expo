import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js'
import { PlusCardButton, ShareCard } from './ShareCard';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import RadioWhiteIcon from '../../assets/icons/ic_radio_check_white.svg';
import ListCardsView from '../Bluetooth/ListCardsView.js';

import { getColor } from '../../utils/bgColorMapping';
import { calculateAge } from '../../utils/calculateAge';
import { getTemplate } from '../../utils/templateMapping';


// 리스트형 라디오
const CustomCardRadioButton = ({ selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <RadioWhiteIcon style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

// 격자형 라디오
const CustomCardRadioButton2 = ({ selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioContainer2}>
      <View style={[styles.radio2, selected && styles.radioSelected2]}>
        {selected && <RadioWhiteIcon style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const CardsView = ({
  navigation,
  selectedOption,
  setSelectedOption,
  viewOption,
  setViewOption,
  handleNext,
  cardData,
  title,
  showPlusCard = false,
  showTitle = true,
  showRadio = false,
  showNewCardButton = false,
  selectedCards = [],
  handleRadioSelect,
  showDate = false, // 날짜 표시 여부
}) => {
  const [sortedGroupedCardData, setSortedGroupedCardData] = useState([]);

  // 날짜 형식 변환 함수
  const formatDateWithDay = (dateString) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dayOfWeek = days[date.getDay()];
    return `${month}.${day}.${dayOfWeek}`;
  };

  // 카드 데이터를 날짜별로 그룹화
  const groupByDate = (data) => {
    if (!Array.isArray(data)) {
      return []; // cardData가 배열이 아닌 경우 빈 배열 반환
    }

    const grouped = data.reduce((acc, item) => {
      const date = item.savedAt.split('T')[0]; // 'YYYY-MM-DD' 추출
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // 날짜별 정렬 (최신순 또는 오래된 순)
    const sortedDates = Object.keys(grouped).sort((a, b) =>
      selectedOption === '오래된 순' ? new Date(a) - new Date(b) : new Date(b) - new Date(a)
    );

    // 각 그룹 안의 카드도 최신순으로 정렬
    return sortedDates.map((date) => ({
      date: formatDateWithDay(date),
      cards: grouped[date].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)), // 최신순 정렬
    }));
  };

  // 카드 데이터 정렬 및 그룹화
  useEffect(() => {
    if (showDate) {
      setSortedGroupedCardData(groupByDate(cardData)); // 날짜별 그룹화
    } else {
      const sortedData = Array.isArray(cardData) ? [...cardData] : [];
      setSortedGroupedCardData([
        { date: null, cards: selectedOption === '오래된 순' ? sortedData : sortedData.reverse() },
      ]);
    }
  }, [cardData, selectedOption, showDate]);

  return (
    <View style={styles.mainlayout2}>
      {/* 제목 표시 */}
      {showTitle && title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.container2}>
        <View style={styles.rowRange}>
          {/* 격자형/리스트형 토글 버튼 */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
            style={styles.iconContainer}
          >
            {viewOption === '격자형' ? <AllListIcon /> : <ListIcon />}
          </TouchableOpacity>

          {/* 최신순/오래된 순 옵션 */}
          <Menu>
            <MenuTrigger>
              <View style={styles.optionButton}>
                <Text style={styles.range}>{selectedOption}</Text>
                <DownArrowIcon style={styles.DownArrowIcon} />
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                width: 'auto',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 16,
              }}
            >
              <MenuOption
                style={{ marginBottom: 10.5 }}
                onSelect={() => setSelectedOption('최신순')}
                text="최신순"
              />
              <MenuOption onSelect={() => setSelectedOption('오래된 순')} text="오래된 순" />
            </MenuOptions>
          </Menu>
        </View>
      </View>

      {/* 카드 리스트 표시 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {sortedGroupedCardData.map((group, groupIndex) => (
            <View key={groupIndex} style={{ paddingBottom: showDate ? 24 : 0 }}>
              {/* 날짜 표시 (showDate=true일 때만) */}
              {showDate && group.date && (
                <Text style={styles.dateText}>{group.date}</Text>
              )}

              {/* 카드 렌더링 */}
              <View style={viewOption === '격자형' ? styles.gridContainer : undefined}>
                {viewOption === '격자형' && showPlusCard && (
                  <PlusCardButton navigation={navigation} />
                )}

                {group.cards.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={1.0}
                    key={item.cardId || index}
                    style={viewOption === '격자형' ? styles.cardWrapper : styles.radioCardWrapper}
                    onPress={() =>
                      showRadio
                        ? handleRadioSelect(item.cardId)
                        : handleNext(item.cardId , item.cardEssential.card_name)
                    }
                  >
                    {/* 라디오 버튼 표시 */}
                    {showRadio && (
                      <View
                        style={
                          viewOption === '격자형'
                            ? styles.radioButtonContainer
                            : styles.radioButtonWrapper
                        }
                      >
                        {viewOption === '격자형' ? (
                          <CustomCardRadioButton2
                            selected={selectedCards.includes(item.cardId)}
                            onPress={() => handleRadioSelect(item.cardId)}
                          />
                        ) : (
                          <CustomCardRadioButton
                            selected={selectedCards.includes(item.cardId)}
                            onPress={() => handleRadioSelect(item.cardId)}
                          />
                        )}
                      </View>
                    )}

                    {/* 카드 본문 */}
                    {viewOption === '리스트형' ? (
                      <View style={styles.ListContainer}>
                        <ListCardsView
                          avatar={
                            <Image
                              source={{
                                uri: item.profile_image_url,
                              }}
                              style={styles.listImage}
                            />
                          }
                          card_name={item.cardEssential.card_name}
                          card_introduction={item.cardEssential.card_introduction}
                          card_birth={item.cardOptional.card_birth}
                        />
                      </View>
                    ) : (
                      <ShareCard
                        avatar={item.avatar}
                        card_name={item.cardEssential.card_name}
                        card_birth={item.cardOptional.card_birth}
                        card_template={item.card_template}
                        card_cover={item.card_cover}
                        profile_image_url={item.profile_image_url}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* 새 카드 만들기 버튼 */}
        {showNewCardButton && viewOption !== '격자형' && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.newCardBtn}
            onPress={() => navigation.navigate('카드 만들기')}
          >
            <PlusCardIcon />
            <Text style={styles.Text14gray50}>새 카드 만들기</Text>
          </TouchableOpacity>
        )}

        <View style={styles.innerView}></View>
      </ScrollView>
    </View>
  );
};

export default CardsView;


