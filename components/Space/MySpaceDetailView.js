import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import CloseIcon from '../../assets/icons/ic_close_small_line.svg';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import ListCardsView from '../Bluetooth/ListCardsView.js';
import { ShareCard } from '../Bluetooth/ShareCard.js';

const MySpaceDetailView = ({
  title,
  sub,
  members,
  hostId,
  userId,
  selectedOption,
  setSelectedOption,
  viewOption,
  setViewOption,
  filteredData,
  cardData,
  selectedFilters = {},
  handleFilterNext,
  showMenu = true,
  onChangeGroupName,
  showFilterButton = true
}) => {

  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [selectedMemberData, setSelectedMemberData] = useState([]);

  const [sortedCardIdData, setSortedCardIdData] = useState([]);
  const [sortedMemberData, setSortedMemberData] = useState([]);
  const navigation = useNavigation();

  // AsyncStorage에서 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    fetchToken();
  }, []);

  // 선택된 필터 값이 모두 null인지 확인
  const hasSelectedFilters = selectedFilters && Object.values(selectedFilters).some(filterArray => Array.isArray(filterArray) && filterArray.length > 0);

  const templateTextMapping = {
    student: '학생',
    studentSchool: '초중고등학생',
    studentUniv: '대학생',
    worker: '직장인',
    fan: '팬',
    free: '자유',
  };

  // 최신순 / 오래된 순 정렬 함수
  const sortData = (data) => {
    const dataCopy = [...(data || [])];
    return selectedOption === '최신순' ? dataCopy : dataCopy.reverse(); // 최신순은 그대로, 오래된 순은 역순
  };

  // 데이터 정렬
  useEffect(() => {
    setSortedCardIdData(sortData(cardData.cardIdData));
    setSortedMemberData(sortData(cardData.memberData));
  }, [cardData, selectedOption]);

  // 카드 상세보기
  const handleCardDetail = async (cardData) => {
    console.log("클릭한 카드: ", cardData);

    if (typeof cardData === 'number') {
      try {
        const response = await axios.get(`${baseUrl}/card/view?cardId=${cardData}`);
        console.log("카드 상세보기 API 요청: ", response.data);
        setSelectedCardData(response.data);
        navigation.navigate('팀스페이스 카드 상세보기', { cardId: sortedMemberData });
        console.log("보내는 cardId : ", sortedMemberData)

      } catch (error) {
        console.error("팀스페이스 - 카드 상세보기 API 호출 에러: ", error.message);
      }
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.backgroundColor} >
      <View style={styles.backgroundColor2}>
        <Text style={[styles.detailtitle, { marginBottom: 8 }]}>{title}</Text>
        {sub ? (
          <Text style={[styles.subteamsp, { marginBottom: 8 }]}>{sub}</Text>
        ) : null}
        <View style={styles.leftContainer}>
          <Text style={styles.detailPeople}>
            <People /> {members}
          </Text>
        </View>

        <View>
          <View style={styles.rowRange2}>
            {/* 필터 버튼 표시 여부 제어 */}
            {showFilterButton && (hasSelectedFilters ? (
              <TouchableOpacity
                style={styles.selectedFilterButton}
                onPress={handleFilterNext}
              >
                <Text style={styles.selectFilterButtonText}>필터  </Text><CloseIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleFilterNext}
              >
                <Text style={styles.filterButtonText}>필터</Text>
              </TouchableOpacity>
            ))}

            {!showFilterButton && <View style={{ flex: 1 }} />}

            <View style={styles.rightButtonGroup}>
              {/* 격자형, 리스트형 버튼 */}
              <TouchableOpacity
                onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
                style={styles.iconContainer}
              >
                {viewOption === '격자형' ? (
                  <AllListIcon />
                ) : (
                  <ListIcon />
                )}
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
                    text='최신순'
                  />
                  <MenuOption
                    onSelect={() => setSelectedOption('오래된 순')}
                    text='오래된 순'
                  />
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.mainlayout}>

        {/* 선택한 필터 목록 */}
        {hasSelectedFilters ? (
          <View style={styles.elementContainer}>
            {Object.entries(selectedFilters).map(([key, values]) => (
              values.map((value, index) => (
                <TouchableOpacity
                  key={`${key}-${index}`} // 고유한 key 추가
                  style={styles.selectedElement}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.selectedText}>
                      {/* card_template인 경우 변환된 텍스트 사용 */}
                      {key === 'card_template' ? templateTextMapping[value] || value : value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ))}
          </View>
        ) : (
          <></>
        )}

        <View>
          <View>
            {viewOption === '격자형' && (
              <View style={{ paddingTop: Array.isArray(filteredData) && filteredData.length > 0 ? 2 : 10 }}>
                <View style={[styles.row, styles.container]}>
                  {/* 필터링한 데이터 */}
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <TouchableOpacity
                        key={item.cardId || `fallback-${index}`}
                        style={styles.btn1}
                        onPress={() => {
                          if (item.userId === null) {
                            handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                          } else {
                            const matchingMember = sortedMemberData.find(member => member.userId === item.userId);
                            if (matchingMember) {
                              navigation.navigate('팀스페이스 카드 상세보기', { memberData: matchingMember });
                            } else {
                              console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                            }
                          }
                        }}
                      >
                        <ShareCard
                          avatar={item.avatar}
                          profile_image_url={item.profile_image_url}
                          isHost={hostId == item.userId}
                          card_name={item.card_name}
                          card_birth={item.card_birth || ''}
                          dot=' · '
                          card_template={item.card_template || '기타'}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    // cardIdData가 있을 경우
                    (Array.isArray(sortedCardIdData) && sortedCardIdData.length > 0) ? (
                      sortedCardIdData.map((item) => (
                        <TouchableOpacity
                          key={item.cardId}
                          style={styles.btn1}
                          onPress={() => {
                            handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                          }}
                        >
                          <ShareCard
                            avatar={item.avatar}
                            profile_image_url={item.profile_image_url}
                            isHost={hostId == item.userId}
                            card_name={item.cardEssential.card_name}
                            card_birth={item.cardOptional.card_birth || ''}
                            dot=' · '
                            card_template={item.card_template || '기타'}
                          />
                        </TouchableOpacity>
                      ))
                    ) : (
                      // memberData가 있을 경우
                      Array.isArray(sortedMemberData) && sortedMemberData.length > 0) ? (
                      sortedMemberData.map((item) => (
                        <TouchableOpacity
                          key={item.userId}
                          style={styles.btn1}
                          onPress={() => {
                            navigation.navigate('팀스페이스 카드 상세보기', { memberData: item });
                          }}
                        >
                          <ShareCard
                            avatar={item.avatar}
                            profile_image_url={item.memberEssential.profile_image_url}
                            isHost={hostId == item.userId}
                            card_name={item.memberEssential.card_name}
                            card_birth={item.memberOptional.card_birth || ''}
                            dot=' · '
                            card_template={item.memberEssential.card_template || '기타'}
                          />
                        </TouchableOpacity>
                      ))
                    ) : (
                      null
                    )
                  )}
                </View>
              </View>
            )}

            {viewOption === '리스트형' && (
              <View style={{ paddingTop: Array.isArray(filteredData) && filteredData.length > 0 ? 8 : 16 }}>
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <View key={item.cardId || `fallback-${index}`} style={styles.ListContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.userId === null) {
                            handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                          } else {
                            const matchingMember = sortedMemberData.find(member => member.userId === item.userId);
                            if (matchingMember) {
                              setSelectedMemberData(matchingMember);
                            } else {
                              console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                            }
                          }
                        }}
                      >
                        <ListCardsView
                          avatar={
                            <Image
                              source={{ uri: item.profile_image_url }}
                              style={styles.listImage}
                            />
                          }
                          isHost={hostId == item.userId}
                          card_name={item.card_name}
                          card_introduction={item.card_introduction}
                          card_birth={item.card_birth || ''}
                          me={userId == item.userId}
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  // cardIdData가 있을 경우 먼저 반환
                  Array.isArray(sortedCardIdData) && sortedCardIdData.length > 0 ? (
                    sortedCardIdData.map((item) => (
                      <View key={item.cardId} style={styles.ListContainer}>
                        <TouchableOpacity
                          onPress={() => handleCardDetail(item.cardId)} // 기존 카드 제출일 경우
                        >
                          <ListCardsView
                            avatar={
                              <Image
                                source={{ uri: item.profile_image_url }}
                                style={styles.listImage}
                              />
                            }
                            isHost={hostId == item.userId}
                            card_name={item.cardEssential.card_name}
                            card_introduction={item.cardEssential.card_introduction}
                            card_birth={item.cardOptional.card_birth || ''}
                            me={userId == item.userId}
                          />
                        </TouchableOpacity>
                      </View>
                    ))
                  ) : (
                    // memberData가 있을 경우
                    Array.isArray(sortedMemberData) && sortedMemberData.length > 0 ? (
                      sortedMemberData.map((item) => (
                        <View key={item.userId} style={styles.ListContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('팀스페이스 카드 상세보기', { memberData: item });
                            }}
                          >
                            <ListCardsView
                              avatar={
                                <Image
                                  source={{ uri: item.memberEssential.profile_image_url }}
                                  style={styles.listImage}
                                />
                              }
                              isHost={hostId == item.userId}
                              card_name={item.memberEssential.card_name}
                              card_introduction={item.memberEssential.card_introduction}
                              card_birth={item.memberOptional.card_birth || ''}
                              me={userId == item.userId}
                              userId={userId}
                            />
                          </TouchableOpacity>
                        </View>
                      ))
                    ) : null
                  )
                )}
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.innerView} />
      </View>
    </ScrollView>
  );
};

export default MySpaceDetailView;