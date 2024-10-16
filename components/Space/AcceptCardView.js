import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ShareCard } from '../Bluetooth/ShareCard.js';
import { getColor } from '../../utils/bgColorMapping';

const AcceptCardView = ({
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
    onChangeGroupName,
    onDeleteGroup
  }) => {
    
    // 생년월일 -> 나이 계산
    const calculateAge = (birthDate) => {
      const today = new Date();
      const [year, month, day] = birthDate.split('/').map(Number);
  
      let age = today.getFullYear() - year;
      const monthDiff = today.getMonth() + 1 - month;
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
          age--;
      }
  
      return age;
    };
  
    const templateTextMapping = {
        "student": "학생",
        "studentSchool": '학생', 
        "studentUniv": "학생",
        "worker": '직장인',
        "fan" : '팬',
        "free" : '자유'
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
            <View style={styles.rowRange3}>
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
          <View>
            {viewOption === '격자형' && (
              <View>
                <View style={[styles.row, styles.container]}>
                  {Array.isArray(cardData) && cardData.length > 0 ? (
                    cardData.map((item, index) => {
  
                      return (
                        <TouchableOpacity key={item.cardId || index} style={styles.btn1} onPress={() => handleNext(item.cardId)}>
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
                const essential = item.cardEssential;  // cardEssential만 사용
                const optional = item.cardOptional;    // cardOptional만 사용

                return (
                    <View key={item.id || index} style={styles.ListContainer}>
                    <TouchableOpacity onPress={() => handleNext(item.cardId)}>
                        <View style={styles.row2}>
                        {item.card_cover === 'avatar' ? 
                            <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor)}]}>
                            
                            </View>
                            :
                            <View style={[styles.gray]}>
                            <Image 
                                source={{ uri: item.profile_image_url }} 
                                resizeMode="cover"
                                style={{ width: 64, height: 64, borderRadius: 16, }}
                            />
                            </View>                 
                        }

                        <View style={styles.infoContainer}>
                            <View style={styles.rowName}>
                            <Text style={styles.Text16gray10}>
                                {essential.card_name}
                            </Text>
                            <Text style={styles.Text16gray50}>
                                {optional?.card_birth ? calculateAge(optional.card_birth) : ''}
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
  
  export default AcceptCardView;
  