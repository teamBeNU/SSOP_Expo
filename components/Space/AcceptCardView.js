import React, { useState } from 'react';
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
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import CloseIcon from '../../assets/icons/close.svg';

// 스왑 모달
function ExchangeModal({ isVisible, onClose, onOption1Press, onOption2Press, title, option1Text, option1SubText, option1Icon: Option1Icon, option2Text, option2SubText, option2Icon: Option2Icon }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.modalText, { flex: 1, textAlign: 'center' }]}>{title}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btnShare} onPress={onOption1Press}>
                  <Text style={styles.Text18}>{option1Text}</Text>
                  <Text style={styles.ModalText14}>{option1SubText}</Text>
                  <Option1Icon style={styles.icon2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnShare} onPress={onOption2Press}>
                  <Text style={styles.Text18}>{option2Text}</Text>
                  <Text style={styles.ModalText14}>{option2SubText}</Text>
                  <Option2Icon style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

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
    onDeleteCard
  }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleBluetoothPress = () => {
      setIsModalVisible(false);
      navigation.navigate('내 카드 보내기');
    };
  
    const handleLinkSharePress = () => {
      setIsModalVisible(false);
      navigation.navigate('링크 복사');
    };

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
                      console.log(`렌더링되는 카드 ID: ${item.cardId}, 이미지 URL: ${item.profile_image_url}`);
                      return (
                        <TouchableOpacity key={item.cardId || index} style={styles.btn1} onPress={() => handleNext(item.cardId)}>
                          <ShareCard
                            avatar={item.avatar}
                            card_name={item.cardEssential.card_name}
                            card_birth={item.cardOptional.card_birth}
                            card_template={item.card_template}
                            card_cover={item.card_cover}
                            profile_image_url={item.profile_image_url}
                          />
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <View style={styles.emptyContainer2}>
                      <Text style={styles.noCard}>공유받은 카드가 없어요.</Text>
                      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <View style={styles.newContainer}>
                          <Text style={styles.newCard}>카드 교환하기</Text>
                          <RightIcon />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
  
            {viewOption === '리스트형' && (
            <View>
              {Array.isArray(cardData) && cardData.length > 0 ? (
                cardData.map((item, index) => {
                  const essential = item.cardEssential;  // cardEssential만 사용
                  const optional = item.cardOptional;    // cardOptional만 사용

                  return (
                    <View key={item.cardId || index} style={styles.ListContainer}>
                      <TouchableOpacity onPress={() => handleNext(item.cardId)}>
                        <View style={styles.row2}>
                          {item.card_cover === 'avatar' ? 
                            <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor)}]}></View>
                            :
                            <View style={[styles.gray]}>
                              <Image 
                                source={{ uri: item.profile_image_url }} 
                                resizeMode="cover"
                                style={{ width: 64, height: 64, borderRadius: 16 }}
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
                          {showMenu && (
                            <Menu>
                              <MenuTrigger>
                                <MoreGrayIcon style={{ marginRight: 8 }} />
                              </MenuTrigger>
                              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                                <MenuOption style={{ marginBottom: 10.5 }} text='삭제하기' onSelect={() => onDeleteCard(item.cardId)} />
                                <MenuOption text='그룹 이동하기' onSelect={() => onMoveGroup(item.cardId)} />
                              </MenuOptions>
                            </Menu>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <View style={styles.emptyContainer2}>
                  <Text style={styles.noCard}>공유받은 카드가 없어요.</Text>
                  <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <View style={styles.newContainer}>
                      <Text style={styles.newCard}>카드 교환하기</Text>
                      <RightIcon />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          </View>
          <View style={styles.innerView}></View>
        </View>

        <ExchangeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOption1Press={handleBluetoothPress}
        onOption2Press={handleLinkSharePress}
        title="카드 교환하기"
        option1Text="블루투스 송신"
        option1SubText="주변에 있다면 바로"
        option2Text="링크 복사"
        option2SubText="연락처가 있다면"
        option1Icon={BluetoothIcon}
        option2Icon={LinkIcon}
      />
      </ScrollView>
    );
  };
  
  export default AcceptCardView;
  