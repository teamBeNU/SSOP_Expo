// 팀스페이스 연락처 저장 리스트

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
  showDate = false, // 날짜 표시 여부
}) => {
  console.log("cardData", cardData)


   // 통합 데이터 배열 생성
   const combinedCardData = [
    ...(cardData.cardIdData || []),
    ...(cardData.memberData || []),
  ];
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
          {combinedCardData.map((group, groupIndex) => (
            <View key={groupIndex} style={{ paddingBottom: showDate ? 24 : 0 }}>
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
                        ? handleRadioSelect(item.cardId || item.userId)
                        : handleNext(item.cardId || item.userId, item.cardEssential?.card_name || item.memberEssential?.card_name)
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
                                uri: item.profile_image_url || item.memberEssential?.profile_image_url || "",
                              }}
                              style={styles.listImage}
                            />
                          }
                          card_name={item.cardEssential?.card_name || item.memberEssential?.card_name || ""}
                          card_introduction={item.cardEssential?.card_introduction || item.memberEssential?.card_introduction || ""}
                          card_birth={item.cardOptional?.card_birth || item.memberOptional?.card_birth || ""}
                        />
                      </View>
                    ) : (
                      <ShareCard
                        avatar={item.avatar || ""}
                        card_name={item.cardEssential?.card_name || item.memberEssential?.card_name || "Unknown Name"}
                        card_birth={item.cardOptional?.card_birth || item.memberOptional?.card_birth || "Unknown Birth"}
                        card_template={item.card_template || item.memberEssential?.card_template || "Unknown Template"}
                        card_cover={item.memberEssential?.card_cover || "Default Cover"}
                        profile_image_url={item.profile_image_url || item.memberEssential?.profile_image_url || "Default Profile Image"}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TeamspCardsView;


