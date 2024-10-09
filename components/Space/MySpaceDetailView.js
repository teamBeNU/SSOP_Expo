import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ShareCard } from '../Bluetooth/ShareCard.js';

const MySpaceDetailView = ({ title, sub, members, selectedOption, setSelectedOption, viewOption, setViewOption, handleNext, cardData, showPlusCardButton, showFilter = false, handleFilterNext, showMenu = true, onChangeGroupName, onDeleteGroup, }) => {

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
            {/* "필터" 버튼 표시 (showFilterButton이 true일 때만) */}
            {showFilter && (
              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleFilterNext}
              >
                <Text style={styles.filterButtonText}>필터</Text>
              </TouchableOpacity>
            )}

            {/* 필터 버튼이 없을 때도 공간을 차지할 빈 뷰 */}
            {!showFilter && <View style={{ flex: 1 }} />}

            <View style={styles.rightButtonGroup}>
              {/* 격자형, 리스트형 버튼 */}
              {/* <TouchableOpacity
                onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
                style={styles.iconContainer}
              >
                {viewOption === '격자형' ? (
                  <AllListIcon />
                ) : (
                  <ListIcon />
                )}
              </TouchableOpacity> */}

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
        <View>
          {/* {viewOption === '격자형' && ( */}
            <View style={[styles.row, styles.container]}>
              {cardData.map((item) => (
                <TouchableOpacity key={item.id} style={styles.btn1} onPress={handleNext}>
                  <ShareCard
                    backgroundColor={item.backgroundColor}
                    avatar={item.avatar}
                    card_name={item.memberEssential.card_name} // 카F드 이름
                    age={item.memberOptional.card_birth ? calculateAge(item.memberOptional.card_birth) : '정보 없음'} // 나이
                    dot=' · '
                    card_template={
                      item.memberEssential.card_template === 'student' ? '학생' :
                      item.memberEssential.card_template === 'worker' ? '직장인' :
                      item.memberEssential.card_template === 'fan' ? '팬' :
                      item.memberEssential.card_template === 'free' ? '자유' :
                      '기타' // 기본값
                    }/>
                </TouchableOpacity>
              ))}
            </View>
          {/* )} */}

          {viewOption === '리스트형' && (
            <View>
              {cardData.map((item) => (
                <View key={item.id} style={styles.ListContainer}>
                  <TouchableOpacity onPress={handleNext}>
                    <View style={styles.row2}>
                      <View style={[styles.gray, { backgroundColor: item.backgroundColor }]}>
                        <Text> {'\n'}   아바타{'\n'}   이미지</Text>
                      </View>
                      <View style={styles.infoContainer}>
                        <View style={styles.rowName}>
                          {item.isHost && (
                            <View style={styles.host}>
                              <Text style={styles.hostText}>호스트</Text>
                            </View>
                          )}
                          <Text style={styles.Text16gray10}>{item.card_name}</Text>
                          <Text style={styles.Text16gray50}>{item.age}</Text>
                        </View>
                        <Text style={styles.Text14gray30}>{item.card_introduce}</Text>
                      </View>
                    </View>
                    <View style={styles.menuContainer}>
                      {showMenu && (
                        <Menu>
                          <MenuTrigger>
                            <MoreGrayIcon style={{ marginRight: 8 }} />
                          </MenuTrigger>
                          <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                            <MenuOption style={{ marginBottom: 10.5 }} text='삭제하기' onSelect={onChangeGroupName} />
                            <MenuOption text='그룹 이동하기' onSelect={() => onDeleteGroup(id)} />
                          </MenuOptions>
                        </Menu>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.innerView}></View>
      </View>
    </ScrollView>
  );
};

export default MySpaceDetailView;

