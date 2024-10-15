import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import CloseIcon from '../../assets/icons/ic_close_small_line.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ShareCard } from '../Bluetooth/ShareCard.js';

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
  handleNext,
  cardData,
  selectedFilters = {},
  handleFilterNext,
  showMenu = true,
  onChangeGroupName,
  onDeleteGroup,
  showFilterButton = true
}) => {
  
  // 생년월일 -> 나이 계산
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // 선택된 필터 값이 모두 null인지 확인
  const hasSelectedFilters = selectedFilters && Object.values(selectedFilters).some(filterArray => filterArray.length > 0);

  const templateTextMapping = {
    student: '학생',
    worker: '직장인',
    fan: '팬',
    free: '자유',
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.backgroundColor}>
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
          {viewOption === '격자형' && (
            <View>
              <View style={[styles.row, styles.container]}>
                {Array.isArray(cardData) && cardData.length > 0 ? (
                  cardData.map((item, index) => {
                    const essential = item.memberEssential || item.cardEssential; // memberEssential이 없으면 cardEssential 사용
                    const optional = item.memberOptional || item.cardOptional; // memberOptional이 없으면 cardOptional 사용

                    return (
                      <TouchableOpacity key={item.cardId || index} style={styles.btn1} onPress={handleNext}>
                        {/* <ShareCard
                          backgroundColor={item.backgroundColor}
                          avatar={
                            <Image
                              source={{ uri: item.profile_image_url ? item.profile_image_url : essential.profile_image_url }}
                              style={styles.gridImage}
                            />
                          }
                          isHost={isHost}
                          card_name={essential.card_name}
                          age={optional?.card_birth ? calculateAge(optional.card_birth) : '정보 없음'}
                          dot=' · '
                          card_template={
                            essential.card_template === 'student' ? '학생' :
                              essential.card_template === 'worker' ? '직장인' :
                                essential.card_template === 'fan' ? '팬' :
                                  essential.card_template === 'free' ? '자유' :
                                    '기타'
                          }
                        /> */}
                        <ShareCard
                          avatar={item.avatar}
                          card_name={item.cardEssential.card_name}
                          card_birth={item.cardOptional.card_birth}
                          card_template={item.card_template}
                          card_cover={item.card_cover}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.noCardMarginTop}>선택한 조건에 해당하는 카드가 없습니다.</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {viewOption === '리스트형' && (
            <View>
              {cardData.map((item, index) => {
                const essential = item.memberEssential || item.cardEssential; // memberEssential이 없으면 cardEssential 사용
                const optional = item.memberOptional || item.cardOptional; // memberOptional이 없으면 cardOptional 사용

                return (
                  <View key={item.id || index} style={styles.ListContainer}>
                    <TouchableOpacity onPress={handleNext}>
                      <View style={styles.row2}>
                        <View style={[styles.gray, { backgroundColor: item.backgroundColor }]}>
                          <Image
                            source={{ uri: item.profile_image_url ? item.profile_image_url : essential.profile_image_url }}
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
                              {essential.card_name}
                              {userId === item.userId && (<Text> (나)</Text>)}
                            </Text>
                            <Text style={styles.Text16gray50}>
                              {optional?.card_birth ? calculateAge(optional.card_birth) : '정보 없음'}
                            </Text>
                          </View>
                          <Text style={styles.Text14gray30}>
                            {essential.card_introduction}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.menuContainer}>
                        {userId === item.userId && showMenu && (
                          <Menu>
                            <MenuTrigger>
                              <MoreGrayIcon style={{ marginRight: 8 }} />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                              <MenuOption style={{ marginBottom: 10.5 }} text='삭제하기' onSelect={onChangeGroupName} />
                              <MenuOption text='그룹 이동하기' onSelect={() => onDeleteGroup(item.id)} />
                            </MenuOptions>
                          </Menu>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.innerView}></View>
      </View>
    </ScrollView>
  );
};

export default MySpaceDetailView;
