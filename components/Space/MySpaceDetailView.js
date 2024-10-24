import React, { useState, useEffect } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import CloseIcon from '../../assets/icons/ic_close_small_line.svg';
import CloseIcon2 from '../../assets/icons/ic_close_regular_line.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ShareCard } from '../Bluetooth/ShareCard.js';
import { Card } from '../MyCard/Card.js';
import { CardMember } from '../MyCard/CardMember.js';
import { calculateAge } from '../../utils/calculateAge.js';

const MySpaceDetailView = ({
  title,
  sub,
  members,
  isHost,
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
  const [modalCardVisible, setModalCardVisible] = useState(false);
  const [modalMemberVisible, setModalMemberVisible] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [selectedMemberData, setSelectedMemberData] = useState([]);

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
    worker: '직장인',
    fan: '팬',
    free: '자유',
  };

  // 카드 상세보기
  const handleCardDetail = async (cardData) => {
    // console.log("클릭한 카드: ", cardData);

    if (typeof cardData === 'number') {
      try {
        const response = await axios.get(`${baseUrl}/card/view?cardId=${cardData}`);
        console.log("카드 상세보기 API 요청: ", response.data);
        // setData(response.data);
        setSelectedCardData(response.data);
        setModalCardVisible(true);
      } catch (error) {
        console.error("팀스페이스 - 카드 상세보기 API 호출 에러: ", error.message);
      }
    }
    else {
      setModalMemberVisible(true);
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
              <View>
                <View style={[styles.row, styles.container]}>
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TouchableOpacity
                        key={item.cardId}
                        style={styles.btn1}
                        onPress={() => {
                          if (item.cardId === undefined) {
                            const matchingMember = cardData.memberData.find(member => member.userId === item.userId);

                            if (matchingMember) {
                              setSelectedMemberData(matchingMember);
                              setModalMemberVisible(true);
                            } else {
                              console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                            }
                          } else {
                            handleCardDetail(item); // 기존 카드 제출일 경우
                          }
                        }}
                      >
                        <ShareCard
                          backgroundColor={item.backgroundColor}
                          avatar={
                            <Image
                              source={{ uri: item.profile_image_url }}
                              style={styles.gridImage}
                            />
                          }
                          isHost={isHost}
                          card_name={item.team_name}
                          card_birth={item.card_birth || ''}
                          dot=' · '
                          card_template={item.card_template}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    Array.isArray(cardData.memberData) && Array.isArray(cardData.cardIdData) && (cardData.memberData.length > 0 || cardData.cardIdData.length > 0) ? (
                      [...cardData.memberData, ...cardData.cardIdData].map((item) => {
                        return (
                          <TouchableOpacity
                            key={item.cardId}
                            style={styles.btn1}
                            onPress={() => {
                              if (item.cardId === undefined) {
                                const matchingMember = cardData.memberData.find(member => member.userId === item.userId);

                                if (matchingMember) {
                                  setSelectedMemberData(matchingMember);
                                  setModalMemberVisible(true);
                                } else {
                                  console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                                }
                              } else {
                                handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                              }
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                if (item.cardId === undefined) {
                                  const matchingMember = cardData.memberData.find(member => member.userId === item.userId);

                                  if (matchingMember) {
                                    setSelectedMemberData(matchingMember);
                                    setModalMemberVisible(true);
                                  } else {
                                    console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                                  }
                                } else {
                                  handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                                }
                              }}
                            ></TouchableOpacity>
                            <ShareCard
                              backgroundColor={item.backgroundColor}
                              avatar={
                                <Image
                                  source={{ uri: item.profile_image_url ? item.profile_image_url : item.memberEssential?.profile_image_url }}
                                  style={styles.gridImage}
                                />
                              }
                              isHost={isHost}
                              card_name={item.team_name || item.memberEssential?.card_name || item.cardEssential?.card_name}
                              card_birth={item.card_birth || item.memberOptional?.card_birth || item.cardOptional?.card_birth || ''}
                              dot=' · '
                              card_template={item.card_template || item.memberEssential?.card_template || '기타'}
                            />
                          </TouchableOpacity>
                        );
                      })
                    ) : (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.noCardMarginTop}>선택한 조건에 해당하는 카드가 없습니다.</Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

            {viewOption === '리스트형' && (
              <View>
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <View key={item.cardId} style={styles.ListContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.cardId === undefined) {
                            const matchingMember = cardData.memberData.find(member => member.userId === item.userId);

                            if (matchingMember) {
                              setSelectedMemberData(matchingMember);
                              setModalMemberVisible(true);
                            } else {
                              console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                            }
                          } else {
                            handleCardDetail(item); // 기존 카드 제출일 경우
                          }
                        }}
                      >
                        <View style={styles.row2}>
                          <View style={[styles.gray, { backgroundColor: item.backgroundColor }]}>
                            <Image
                              source={{ uri: item.profile_image_url }}
                              style={styles.listImage}
                            />
                          </View>
                          <View style={styles.infoContainer}>
                            <View style={styles.rowName}>
                              {isHost && (
                                <View style={styles.host}>
                                  <Text style={styles.hostText}>호스트</Text>
                                </View>
                              )}
                              <Text style={styles.Text16gray10}>
                                {item.team_name}
                                {userId === item.userId && <Text> (나)</Text>}
                              </Text>
                              <Text style={styles.Text16gray50}>
                                {calculateAge(item.card_birth)}
                              </Text>
                            </View>
                            <Text style={styles.Text14gray30}>
                              {item.team_comment}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.menuContainer}>
                          {userId === item.userId && showMenu && (
                            <Menu>
                              <MenuTrigger>
                                <MoreGrayIcon style={{ marginRight: 8 }} />
                              </MenuTrigger>
                              <MenuOptions
                                optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                              >
                                <MenuOption style={{ marginBottom: 10.5 }} text='삭제하기' onSelect={onChangeGroupName} />
                                <MenuOption text='카드 수정하기' onSelect={onChangeGroupName} />
                              </MenuOptions>
                            </Menu>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  // filteredData가 없을 때 cardData를 무조건 보여줍니다.
                  (Array.isArray(cardData.memberData) && cardData.memberData.length > 0) ||
                    (Array.isArray(cardData.cardIdData) && cardData.cardIdData.length > 0) ? (
                    [...cardData.memberData, ...cardData.cardIdData].map((item) => (
                      <View key={item?.cardId || item.userId} style={styles.ListContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            if (item.cardId === undefined) {
                              const matchingMember = cardData.memberData.find(member => member.userId === item.userId);

                              if (matchingMember) {
                                setSelectedMemberData(matchingMember);
                                setModalMemberVisible(true);
                              } else {
                                console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                              }
                            } else {
                              handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                            }
                          }}
                        >
                          <View style={styles.row2}>
                            <View style={[styles.gray, { backgroundColor: item.backgroundColor }]}>
                              <Image
                                source={{ uri: item.profile_image_url || item.memberEssential?.profile_image_url }}
                                style={styles.listImage}
                              />
                            </View>
                            <View style={styles.infoContainer}>
                              <View style={styles.rowName}>
                                {isHost && (
                                  <View style={styles.host}>
                                    <Text style={styles.hostText}>호스트</Text>
                                  </View>
                                )}
                                <Text style={styles.Text16gray10}>
                                  {item.team_name || item.memberEssential?.card_name || item.cardEssential?.card_name}
                                  {userId === item.userId && <Text> (나)</Text>}
                                </Text>
                                <Text style={styles.Text16gray50}>
                                  {item.card_birth
                                    ? calculateAge(item.card_birth)
                                    : item.memberOptional?.card_birth
                                      ? calculateAge(item.memberOptional.card_birth)
                                      : item.cardOptional?.card_birth
                                        ? calculateAge(item.cardOptional.card_birth)
                                        : ' '}
                                </Text>
                              </View>
                              <Text style={styles.Text14gray30}>
                                {item.team_comment ||
                                  item.memberEssential?.card_introduction ||
                                  item.cardEssential?.card_introduction}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.menuContainer}>
                            {userId === item.userId && showMenu && (
                              <Menu>
                                <MenuTrigger>
                                  <MoreGrayIcon style={{ marginRight: 8 }} />
                                </MenuTrigger>
                                <MenuOptions
                                  optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                                >
                                  <MenuOption style={{ marginBottom: 10.5 }} text='삭제하기' onSelect={onChangeGroupName} />
                                  <MenuOption text='카드 수정하기' onSelect={onChangeGroupName} />
                                </MenuOptions>
                              </Menu>
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))
                  ) : (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.noCardMarginTop}>선택한 조건에 해당하는 카드가 없습니다.</Text>
                    </View>
                  )
                )}
              </View>
            )}
          </View>

          {/* 기존 카드 상세보기 모달 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalCardVisible}
            onRequestClose={() => {
              setModalCardVisible(!modalCardVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalCardVisible(false)}>

              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalCardVisible(false)}
                  >
                    <CloseIcon2 />
                  </TouchableOpacity>

                  <Card cardData={selectedCardData} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {selectedMemberData && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalMemberVisible}
              onRequestClose={() => {
                setModalMemberVisible(false);
                setSelectedMemberData(null); // 선택된 멤버 데이터 초기화
              }}
            >
              <TouchableWithoutFeedback onPress={() => setModalMemberVisible(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalMemberVisible(false)}
                    >
                      <CloseIcon2 />
                    </TouchableOpacity>
                    <CardMember cardData={selectedMemberData} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          )}

        </View>
        <View style={styles.innerView}></View>
      </View>
    </ScrollView>
  );
};

export default MySpaceDetailView;