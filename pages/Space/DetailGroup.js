import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet} from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './SpaceStyle';
import { ShareCard, RadioCard } from "../../components/Bluetooth/ShareCard.js";
import SpaceManage from "../../components/Space/SpaceManage.js";
import Toast from 'react-native-toast-message';
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import People from '../../assets/icons/ic_person_small_fill.svg';
import ContactIcon from '../../assets/icons/ic_contact_small_line.svg';
import EditIcon from '../../assets/icons/ic_edit_small_line.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import GroupIcon from '../../assets/icons/ic_group_regular.svg';

const Stack = createStackNavigator();

    const cardData = [
      { id: '1', Component: RadioCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '2', Component: RadioCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{ marginLeft: -10 }} />, card_name: '이사나', age: '23세', dot: '·', card_template: '학생' },
      { id: '3', Component: RadioCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
      { id: '4', Component: RadioCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{ marginLeft: -10 }} />, card_name: '임지니', age: '22세', dot: '·', card_template: '팬' },
      { id: '5', Component: RadioCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '6', Component: RadioCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    ];

// 그룹 상세
function DetailSpaceGroup({ navigation }) {
    const [selectedOption, setSelectedOption] = useState('최신순');
    const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
    const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);

    const handleDeleteGroup = () => {
      setIsSpaceModalVisible(true);
    };

    const handleChangeGroupName = () => {
      setIsGroupNameChangeModalVisible(true);
    };
  
    const DetailcardData = [
      { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생' },
      { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
      { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬' },
      { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
  
    ];
  
    return (
      <View style={styles.backgroundColor}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, {marginBottom: 32}]}>24학번 후배</Text>
          <View style={[styles.btnContainer, {marginBottom: 28}]}>
                  <View style={styles.btn}>
                      <TouchableOpacity style={styles.whiteBtn} onPress={() => navigation.navigate('연락처 저장')}>
                          <ContactIcon style={{color: 'white'}} />
                      </TouchableOpacity>
                      <Text style={styles.btnText}>연락처 저장 </Text>
                  </View>
                  <View style={styles.btn}>
                      <TouchableOpacity style={styles.whiteBtn} onPress={() => navigation.navigate('카드 관리')}>
                          <EditIcon />
                      </TouchableOpacity>
                      <Text style={styles.btnText}>카드 관리</Text>
                  </View>
          </View>
          <View style={styles.line} />      
          <View style={styles.personContainer}>
            <View style={styles.personRow}>
              <View style={styles.leftContainer}>
                <Text style={styles.personText}>구성원</Text>
                <Text style={styles.detailPeople}>
                  <People />  8명
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.range2}>{selectedOption}</Text>
                    <Menu style={styles.DownArrowIcon2}>
                    <MenuTrigger><DownArrowIcon/></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                        <MenuOption style={{ marginBottom: 10.5}} onSelect={() => setSelectedOption('최신순')} text='최신순'/>
                        <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순'/>
                    </MenuOptions>
                    </Menu>
                </View>
          </View>
          <View style={styles.cardLayout}>
          
              <View style={styles.container}>
                <View style={styles.row}>
                    {DetailcardData.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('카드 조회')}>
                        <item.Component 
                            backgroundColor={item.backgroundColor} 
                            avatar={item.avatar} 
                            card_name={item.card_name} 
                            age={item.age} 
                            dot={item.dot}
                            card_template={item.card_template} 
                            host={item.host}
                            filter={item.filter}
                        />
                        </TouchableOpacity>
                    ))}
                </View>
              </View>
              <View style={styles.innerView}></View>
          </View>
          <SpaceModal
            isVisible={isSpaceModalVisible}
            onClose={() => setIsSpaceModalVisible(false)}
            title={'그룹을 삭제하시겠습니까?'}
            sub={'그룹 안에 있는 카드들도 삭제됩니다.'}
            btn1={'취소할래요'}
            btn2={'네, 삭제할래요'}
          />
          <SpaceNameChangeModal
            isVisible={isGroupNameChangeModalVisible}
            onClose={() => setIsGroupNameChangeModalVisible(false)}
            groupName={'그룹 이름을 작성하세요.'}
            btn1={'취소하기'}
            btn2={'수정하기'}
          />
          </ScrollView>
        </View>
    );
  }


  // 연락처 저장
  function SaveTellScreen({navigation}) {
    const showCustomToast = (text) => {
      Toast.show({
        text1: text,
        type: 'selectedToast',
        position: 'bottom',
        visibilityTime: 2000,
      });
    };
    
    const handleSaveTel = () => {
      showCustomToast('연락처가 저장되었습니다.');
    };

    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedOption, setSelectedOption] = useState('최신순');
  
    const handlePress = (cardId) => {
      setSelectedCards(prevSelectedCards => 
        prevSelectedCards.includes(cardId)
          ? prevSelectedCards.filter(id => id !== cardId)
          : [...prevSelectedCards, cardId]
      );
    };
  
    const handleSelectAll = () => {
      if (selectedCards.length === cardData.length) {
        setSelectedCards([]);
      } else {
        setSelectedCards(cardData.map(card => card.id));
      }
    };

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: `${selectedCards.length}개 선택됨`,
      });
    }, [selectedCards]);
  
    return (
      <View style={styles.backgroundColor}>
        <SpaceManage
          selectedCards={selectedCards}
          handleSelectAll={handleSelectAll}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          cardDataLength={cardData.length}
        />
        <View style={styles.cardLayout}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.row}>
                {cardData.map((item) => (
                  <View key={item.id} style={styles.card}>
                    <item.Component
                      backgroundColor={item.backgroundColor}
                      avatar={item.avatar}
                      card_name={item.card_name}
                      age={item.age}
                      dot={item.dot}
                      card_template={item.card_template}
                      host={item.host}
                      filter={item.filter}
                      selected={selectedCards.includes(item.id)} 
                      onPress={() => handlePress(item.id)}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.innerView}></View>
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleSaveTel}>
            <Text style={styles.bottomText}>연락처 저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

    // 카드 관리
    function ManageCardScreen({navigation}) {
      const showCustomToast = (text) => {
        Toast.show({
          text1: text,
          type: 'selectedToast',
          position: 'bottom',
          visibilityTime: 2000,
        });
      };
      
      const handleDeleteCard = () => {
        showCustomToast('카드가 성공적으로 삭제되었습니다.');
      };
  
      const [selectedCards, setSelectedCards] = useState([]);
      const [selectedOption, setSelectedOption] = useState('최신순');
    
      const handlePress = (cardId) => {
        setSelectedCards(prevSelectedCards => 
          prevSelectedCards.includes(cardId)
            ? prevSelectedCards.filter(id => id !== cardId)
            : [...prevSelectedCards, cardId]
        );
      };
    
      const handleSelectAll = () => {
        if (selectedCards.length === cardData.length) {
          setSelectedCards([]);
        } else {
          setSelectedCards(cardData.map(card => card.id));
        }
      };

      useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: `${selectedCards.length}개 선택됨`,
        });
      }, [selectedCards]);
  
      return (
        <View style={styles.backgroundColor}>
          <SpaceManage
            selectedCards={selectedCards}
            handleSelectAll={handleSelectAll}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            cardDataLength={cardData.length}
          />
          <View style={styles.cardLayout}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.row}>
                  {cardData.map((item) => (
                    <View key={item.id} style={styles.card}>
                      <item.Component
                        backgroundColor={item.backgroundColor}
                        avatar={item.avatar}
                        card_name={item.card_name}
                        age={item.age}
                        dot={item.dot}
                        card_template={item.card_template}
                        host={item.host}
                        filter={item.filter}
                        selected={selectedCards.includes(item.id)} 
                        onPress={() => handlePress(item.id)}
                      />
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.innerView}></View>
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={handleDeleteCard}>
              <Text style={styles.bottomTextRed}>삭제</Text>
            </TouchableOpacity>
            <BottomLineIcon style={styles.bottomLine}/>
            <TouchableOpacity onPress={() => navigation.navigate('그룹 이동')}>
              <Text style={styles.bottomText}>그룹 이동</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // 그룹 이동
    function MoveGroupScreen() {
      const showCustomToast = (text) => {
        Toast.show({
          text1: text,
          type: 'selectedToast',
          position: 'bottom',
          visibilityTime: 2000,
        });
      };
      
      const handleMoveCard = () => {
        showCustomToast('성공적으로 이동되었습니다.');
      };

      const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
    
      const handleCreateGroup = () => {
        setIsCreateGroupModalVisible(true);
      };

      const [selectedOption, setSelectedOption] = useState('최신순');

      const teamData = [
        { id: 1, name: '마이스페이스', members: 6 },
        { id: 2, name: '24학번 동기', members: 8 },
        { id: 3, name: '24-1학기 영어 교양 팀원', members: 4 },
      ];

      const MySpaceGroup = ({ name, members }) => (
        <TouchableOpacity style={styles.groupContent} onPress={handleMoveCard} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GroupIcon/>
                <Text style={styles.fontGroup}>{name}</Text>
                <Text style={styles.peopleGroup}>
                    <People /> {members}명
                </Text>
            </View>
        </TouchableOpacity>
      );
    
      return (
        <View style={styles.backgroundColor}>
          <View style={{marginLeft: 24, marginTop: 16}}>
          <View style={styles.row2}>
            <Text style={styles.range}>{selectedOption}</Text>
            <Menu style={styles.DownArrowIcon}>
              <MenuTrigger><DownArrowIcon/></MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                <MenuOption style={{ marginBottom: 10.5}} onSelect={() => setSelectedOption('최신순')} text='최신순'/>
                <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순'/>
              </MenuOptions>
            </Menu>
          </View>
        </View>
          <View style={styles.cardLayout}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
                {teamData.map((team) => (
                    <MySpaceGroup
                    key={team.id}
                    name={team.name}
                    description={team.description}
                    members={team.members}
                    isHost={team.isHost}
                    />
                ))}
            </View>
              <View style={styles.innerView}></View>
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={handleCreateGroup}>
              <Text style={styles.bottomText}>그룹 만들기</Text>
            </TouchableOpacity>
          </View>
          <SpaceNameChangeModal
          isVisible={isCreateGroupModalVisible}
          onClose={() => setIsCreateGroupModalVisible(false)}
          groupName={'그룹 이름을 작성하세요.'}
          btn1={'취소하기'}
          btn2={'추가하기'}
        />
        </View>
      );
    }

function DetailGroup() {
    return (
      <Stack.Navigator>
          <Stack.Screen name="Group" component={DetailSpaceGroup} 
          options={{
            title: "그룹",
            tabBarStyle: { display: 'none' } ,
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
            headerRight: () => (
                <Menu>
                  <MenuTrigger><MoreIcon style={{ marginRight: 8  }}/></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                    <MenuOption style={{ marginBottom: 10.5}} text='그룹명 변경하기'/>
                    <MenuOption text='그룹 삭제하기'/>
                  </MenuOptions>
                </Menu>
              ),            
          }}/>
          <Stack.Screen name="연락처 저장" component={SaveTellScreen}
          options={{
            headerTitle: " ",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 23 }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="카드 관리" component={ManageCardScreen}
          options={{
            headerTitle: " ",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 23 }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="그룹 이동" component={MoveGroupScreen}
          options={{
            headerTitle: "그룹 이동",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 23 }}/>
              </TouchableOpacity>
            ),
          }}/>
      </Stack.Navigator>
    );
  }
  export default DetailGroup;