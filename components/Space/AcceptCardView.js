import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Modal } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ShareCard } from '../Bluetooth/ShareCard.js';
import { getColor } from '../../utils/bgColorMapping';
import ExchangeModal from '../../components/Space/ExchangeModal.js';

import RightIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';
import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';


const AcceptCardView = ({
  navigation,
  title,
  sub,
  members,
  isHost,
  userId,
  selectedOption,
  setSelectedOption,
  viewOption,
  setViewOption,
  handleNext,
  cardData,
  showMenu = true,
  onMoveGroup,
  onDeleteCard,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupedCardData, setGroupedCardData] = useState([]);

  // 생년월일 -> 나이 계산
  const calculateAge = (birthDate) => {
    if (!birthDate) return ''; // birthDate가 없으면 빈 문자열 반환
  
    const today = new Date();
    const [year, month, day] = birthDate.split('/').map(Number);
  
    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() + 1 - month;
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
      age--;
    }
  
    return age;
  };
  

  // 날짜 형식 변환 함수
  const formatDateWithDay = (dateString) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dayOfWeek = days[date.getDay()]; // 요일 가져오기
    return `${month}.${day}.${dayOfWeek}`;
  };

  // 카드 데이터를 날짜별로 그룹화
  const groupByDate = (data) => {
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

  // 데이터 정렬 및 그룹화
  useEffect(() => {
    const groupedData = groupByDate(cardData);
    setGroupedCardData(groupedData);
  }, [cardData, selectedOption]);

  const handleBluetoothPress = () => {
    setIsModalVisible(false);
    navigation.navigate('내 카드 보내기');
  };

  const handleLinkSharePress = () => {
    setIsModalVisible(false);
    navigation.navigate('링크 복사');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} 
    style={styles.backgroundColor}>
      <View style={styles.backgroundColor2}>
        <Text style={[styles.detailtitle, { marginBottom: 8 }]}>{title}</Text>
        {sub ? <Text style={[styles.subteamsp, { marginBottom: 8 }]}>{sub}</Text> : null}
        <View style={styles.leftContainer}>
          <Text style={styles.detailPeople}>
            <People /> {members}
          </Text>
        </View>

        <View style={styles.rowRange3}>
          {groupedCardData.length > 0 ? (
            <View style={styles.rightButtonGroup}>
              {/* 격자형, 리스트형 버튼 */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
                style={styles.iconContainer}
              >
                {viewOption === '격자형' ? <AllListIcon /> : <ListIcon />}
              </TouchableOpacity>

              {/* 최신순, 오래된순 메뉴 */}
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
                  <MenuOption
                    onSelect={() => setSelectedOption('오래된 순')}
                    text="오래된 순"
                  />
                </MenuOptions>
              </Menu>
            </View>
          ) : (
            // 카드가 없을 때 빈 공간을 렌더링
            <View style={{ height: 48 }} />
          )}
        </View>
      </View>

      <View style={styles.mainlayout}>
        {groupedCardData.length > 0 ? (
          groupedCardData.map(({ date, cards }) => (
            <View key={date} style={{paddingTop: 24}}>
              {/* 날짜 헤더 */}
              <Text style={styles.dateText}>{date}</Text>
              <View>
                {viewOption === '격자형' ? (
                  <View style={[styles.row, styles.container]}>
                    {cards.map((item) => (
                      <TouchableOpacity
                        activeOpacity={1.0}
                        key={item.cardId}
                        style={styles.btn1}
                        onPress={() => handleNext(item.cardId)}
                      >
                        <ShareCard
                          avatar={item.avatar}
                          card_name={item.cardEssential.card_name}
                          card_birth={item.cardOptional.card_birth}
                          card_template={item.card_template}
                          card_cover={item.card_cover}
                          profile_image_url={item.profile_image_url}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  cards.map((item) => (
                    <View key={item.cardId} style={styles.ListContainer}>
                      <TouchableOpacity onPress={() => handleNext(item.cardId)}>
                        <View style={styles.row2}>
                          <View style={styles.gray}>
                            <Image
                              source={{ uri: item.profile_image_url }} // 항상 profile_image_url 렌더링
                              resizeMode="cover"
                              style={styles.gray} // 스타일 유지
                            />
                          </View>
                          <View style={styles.infoContainer}>
                            <View style={styles.rowName}>
                              <Text style={styles.Text16gray10}>
                                {item.cardEssential.card_name}
                              </Text>
                              <Text style={styles.Text16gray50}>
                                {item.cardOptional?.card_birth
                                  ? calculateAge(item.cardOptional.card_birth)
                                  : ''}
                              </Text>
                            </View>
                            <Text style={styles.Text14gray30}>
                              {item.cardEssential.card_introduction}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.menuContainer}>
                        {showMenu && (
                          <Menu>
                            <MenuTrigger>
                              <MoreGrayIcon style={{ marginRight: 24, marginTop: 9 }} />
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
                                text="삭제하기"
                                onSelect={() => onDeleteCard(item.cardId)}
                              />
                              <MenuOption
                                text="그룹 이동하기"
                                onSelect={() => onMoveGroup(item.cardId)}
                              />
                            </MenuOptions>
                          </Menu>
                        )}
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          ))
        ) : (
            <View style={styles.emptyContainer2}>
              <Text style={styles.noCard}>공유받은 카드가 없어요.</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View style={styles.newContainer}>
                  <Text style={styles.newCard}>카드 교환하기</Text>
                  <RightIcon style={{marginTop: 2}}/>
                </View>
              </TouchableOpacity>
            </View>
        )}
        <View style={styles.innerView}></View>
      </View>

      <ExchangeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOption1Press={handleBluetoothPress}
        onOption2Press={handleLinkSharePress}
        title="카드 공유하기"
        option1Text="QR 공유"
        option1SubText="주변에 있다면"
        option2Text="링크 공유"
        option2SubText="연락처가 있다면"
        option1Icon={BluetoothIcon}
        option2Icon={LinkIcon}
      />
    </ScrollView>
  );
};

export default AcceptCardView;
