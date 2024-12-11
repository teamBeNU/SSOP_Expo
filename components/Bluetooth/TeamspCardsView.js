import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import { ShareCard } from './ShareCard';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import RadioWhiteIcon from '../../assets/icons/ic_radio_check_white.svg';
import ListCardsView from '../Bluetooth/ListCardsView.js';

// 리스트형 라디오
const CustomCardRadioButton = ({ selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <RadioWhiteIcon style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);

// 격자형 라디오
const CustomCardRadioButton2 = ({ selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioContainer2}>
    <View style={[styles.radio2, selected && styles.radioSelected2]}>
      {selected && <RadioWhiteIcon style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);

const TeamspCardsView = ({
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
}) => {

  // 통합 데이터
  const combinedCardData = [
    ...cardData.cardIdData.filter(item => typeof item !== "number"),
    ...cardData.memberData.filter(item => typeof item !== "number"),
  ];

  return (
    <View style={styles.mainlayout2}>
      {/* 제목 표시 */}
      {showTitle && title && <Text style={styles.title}>{title}</Text>}

      <View>
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
        <View style={viewOption === '격자형' ? styles.gridContainer : undefined}>
          {combinedCardData.map((item, index) => (
            <TouchableOpacity
              key={item.cardId || index}
              activeOpacity={1.0}
              style={viewOption === '격자형' ? styles.cardWrapper : styles.radioCardWrapper}
              onPress={() =>
                showRadio
                  ? handleRadioSelect(item.cardId || item.userId)
                  : handleNext(item.cardId || item.userId, item.cardEssential?.card_name || item.memberEssential?.card_name)
              }
            >
              {/* 라디오 버튼 */}
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
                      selected={selectedCards.includes(item.cardId || item.userId)}
                      onPress={() => handleRadioSelect(item.cardId || item.userId)}
                    />
                  ) : (
                    <CustomCardRadioButton
                      selected={selectedCards.includes(item.cardId || item.userId)}
                      onPress={() => handleRadioSelect(item.cardId || item.userId)}
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
                          uri: item.profile_image_url || item.memberEssential?.profile_image_url || ' ',
                        }}
                        style={styles.listImage}
                      />
                    }
                    card_name={item.cardEssential?.card_name || item.memberEssential?.card_name || ' '}
                    card_introduction={item.cardEssential?.card_introduction || item.memberEssential?.card_introduction || ' '}
                    card_birth={item.cardOptional?.card_birth || item.memberOptional?.card_birth || ' '}
                  />
                </View>
              ) : (
                <ShareCard
                  avatar={item.avatar || ""}
                  card_name={item.cardEssential?.card_name || item.memberEssential?.card_name || ' '}
                  card_birth={item.cardOptional?.card_birth || item.memberOptional?.card_birth || ' '}
                  card_template={item.card_template || item.memberEssential?.card_template || ' '}
                  card_cover={item.memberEssential?.card_cover || ' '}
                  profile_image_url={item.profile_image_url || item.memberEssential?.profile_image_url || ' '}
                />
              )}
            </TouchableOpacity>
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

export default TeamspCardsView;