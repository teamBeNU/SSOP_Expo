import React, { useState }from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js'
import { PlusCardButton, ShareCard } from './ShareCard';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from'../../assets/icons/ic_border_all.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import RadioWhiteIcon from '../../assets/icons/ic_radio_check_white.svg';

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
  showTitle = true,
  showRadio = false,
  showNewCardButton = false,
  selectedCards = [], // 선택된 카드 목록 상태
  handleRadioSelect, // 카드 선택 상태 변경 함수
}) => {
  return (
    <View style={styles.mainlayout}>
      {showTitle && title && (
        <Text style={styles.title}>{title}</Text>
      )}

      <View style={styles.container2}>
        <View style={styles.rowRange}>
          {/* 격자형, 리스트형 */}
          <TouchableOpacity
            onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
            style={styles.iconContainer}>
            {viewOption === '격자형' ? (
              <AllListIcon/>
            ) : (
              <ListIcon/>
            )}
          </TouchableOpacity>

          {/* 최신순, 오래된순 */}
          <Menu>
            <MenuTrigger>
              <View style={styles.optionButton}>
                <Text style={styles.range}>{selectedOption}</Text>
                <DownArrowIcon style={styles.DownArrowIcon} />
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
              <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
              <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {viewOption === '격자형' && (
            <View style={styles.gridContainer}>
              <PlusCardButton navigation={navigation} />
              {/* 카드 데이터 목록 렌더링 */}
              {cardData.map((item) => (
                <View key={item.id} style={styles.cardWrapper}>
                  {showRadio && (
                    <View style={styles.radioButtonContainer}>
                      <CustomCardRadioButton2
                        selected={selectedCards.includes(item.id)} // 선택 여부를 확인하여 표시
                        onPress={() => handleRadioSelect(item.id)} // 개별 카드 선택/해제 처리
                      />
                    </View>
                  )}

                  {/* 카드 본문 */}
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={showRadio ? () => handleRadioSelect(item.id) : handleNext}
                  >
                  <ShareCard
                    avatar={item.avatar}
                    card_name={item.cardEssential.card_name}
                    card_birth={item.cardOptional.card_birth}
                    card_template={item.card_template}
                    card_cover={item.card_cover}
                  />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {viewOption === '리스트형' && (
            <View>
              {cardData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.radioCardWrapper}
                  onPress={() => handleRadioSelect(item.id)} // 카드 클릭 시 선택 처리
                >
                  {/* showRadio가 true일 때만 라디오 버튼을 왼쪽에 표시 */}
                  {showRadio && (
                    <View style={styles.radioButtonWrapper}>
                      <CustomCardRadioButton
                        selected={selectedCards.includes(item.id)} // 선택 여부 확인
                        onPress={() => handleRadioSelect(item.id)} // 라디오 버튼 클릭 시 선택 처리
                      />
                    </View>
                  )}

                  {/* 카드 본문 */}
                  <View style={styles.ListContainer}>
                    <View style={[styles.row2, showRadio ? { marginLeft: 12 } : {}]}>
                      <View style={[styles.gray, { backgroundColor: item.backgroundColor }]}>
                        {item.card_cover === 'avatar' ? 
                        (<View style={{...styles.cardImgArea, backgroundColor: getColor(item.avatar.bgColor)}}>
                        
                        </View>)
                        :
                        (<Image
                              source={{ uri: item.profile_image_url }}
                              resizeMode="cover"
                              style={styles.cardImgArea}
                          />)
                      }
                      </View>
                      <View style={styles.infoContainer}>
                        <View style={styles.rowName}>
                          <Text style={styles.Text16gray10}>{item.cardEssential.card_name}</Text>
                          <Text style={styles.Text16gray50}>{calculateAge(item.cardOptional.card_birth)}</Text>
                        </View>
                        <Text style={styles.Text14gray30}>{item.cardEssential.card_introduction}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              {showNewCardButton && (
                <TouchableOpacity style={styles.newCardBtn} onPress={() => navigation.navigate('카드 만들기')}>
                  <PlusCardIcon />
                  <Text style={styles.Text14gray50}>새 카드 만들기</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View style={styles.innerView}></View>
      </ScrollView>
    </View>
  );
};

export default CardsView;


