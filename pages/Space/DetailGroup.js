import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet} from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './SpaceStyle';
import { ShareCard, RadioCard } from "../../components/Bluetooth/ShareCard.js";
import { MySpaceGroup } from "../../components/Space/SpaceList.js";
import SpaceManage from "../../components/Space/SpaceManage.js";
import Toast from 'react-native-toast-message';
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import MySpaceDetailView from "../../components/Space/MySpaceDetailView.js";

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
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';
import { theme } from "../../theme.js";

const Stack = createStackNavigator();

    const cardData = [
      { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 />, card_name: '이사나', age: '23세', dot: '·', card_template: '학생' },
      { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
      { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 />, card_name: '임지니', age: '22세', dot: '·', card_template: '팬' },
      { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    ];

// 그룹 상세
function DetailSpaceGroup({ navigation }) {
    const [selectedOption, setSelectedOption] = useState('최신순');
    const [viewOption, setViewOption] = useState('격자형');
    const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
    const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
    const [hasCards, setHasCards] = useState(true);
    
    const handleDeleteGroup = () => {
      setIsSpaceModalVisible(true);
    };

    const handleChangeGroupName = () => {
      setIsGroupNameChangeModalVisible(true);
    };

    const handleNext = () => {
      navigation.navigate('카드 조회');
    };
  
    const DetailcardData = [
      { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생' },
      { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
      { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬' },
      { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
  
    ];
  
    return (
      <View style={styles.backgroundColor}>
          <MySpaceDetailView
            title="24학번 후배"
            members='8'
            navigation={navigation}
            hasCards={hasCards}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            viewOption={viewOption}
            setViewOption={setViewOption}
            handleNext={handleNext}
            cardData={DetailcardData}
          />
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
          {/* 하단 버튼 영역 */}
          <View style={styles.bottomDetailContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('카드 관리')}>
              <Text style={styles.bottomText}>카드 관리</Text>
            </TouchableOpacity>
            <BottomLineIcon style={styles.bottomLine} />
            <TouchableOpacity onPress={() => navigation.navigate('연락처 저장')}>
              <Text style={styles.bottomTextBlue}>연락처 저장</Text>
            </TouchableOpacity>
            <BottomLineIcon style={styles.bottomLine} />
            <TouchableOpacity>
              <Text style={styles.bottomText}>카드 교환</Text>
            </TouchableOpacity>
          </View>
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
    const [viewOption, setViewOption] = useState('격자형');
  
    const handlePress = (cardId) => {
      setSelectedCards(prevSelectedCards => 
        prevSelectedCards.includes(cardId)
          ? prevSelectedCards.filter(id => id !== cardId)
          : [...prevSelectedCards, cardId]
      );
    };

    const handleNext = () => {
      navigation.navigate('카드 조회');
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
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.row}>
              <CardsView
                  navigation={navigation}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  viewOption={viewOption}
                  setViewOption={setViewOption}
                  handleNext={handleNext}
                  cardData={cardData}
                  showRadio={true}
              />
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
      const [viewOption, setViewOption] = useState('격자형');
    
      const handlePress = (cardId) => {
        setSelectedCards(prevSelectedCards => 
          prevSelectedCards.includes(cardId)
            ? prevSelectedCards.filter(id => id !== cardId)
            : [...prevSelectedCards, cardId]
        );
      };
        // 라디오 버튼 선택 처리 함수
      const handleRadioSelect = (cardId) => {
        setSelectedCards((prevSelectedCards) =>
          prevSelectedCards.includes(cardId)
            ? prevSelectedCards.filter((id) => id !== cardId) // 이미 선택된 카드 해제
            : [...prevSelectedCards, cardId] // 새 카드 선택
        );
      };

      // 모든 카드를 선택하거나 선택 해제하는 함수
      const handleSelectAll = () => {
        if (selectedCards.length === cardData.length) {
          setSelectedCards([]); // 모든 선택 해제
        } else {
          setSelectedCards(cardData.map((card) => card.id)); // 모든 카드 선택
        }
      };

      const handleNext = () => {
        navigation.navigate('카드 조회');
      };

          // 헤더 설정 (X 아이콘, 선택 개수, 전체 선택 라디오 버튼)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseIcon style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Text style={{ fontSize: 16, fontWeight: '500' }}>
            {selectedCards.length}개 선택됨
          </Text>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSelectAll}>
            {/* 전체 선택 상태에 따라 라디오 버튼 아이콘 변경 */}
            {selectedCards.length === cardData.length + 1 ? (
              <RadioGrayIcon style={{ marginRight: 16 }} />  // 전체 선택된 상태일 때
            ) : (
              <RadioWhiteIcon style={{ marginRight: 16 }} />  // 선택 해제 상태일 때
            )}
          </TouchableOpacity>
        ),
      });
    }, [navigation, selectedCards]);  // 선택된 그룹 상태가 변경될 때마다 헤더 업데이트
  
      return (
        <View style={styles.backgroundColor}>
          <View >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.row}>
                  <CardsView
                    navigation={navigation}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    viewOption={viewOption}
                    setViewOption={setViewOption}
                    handleNext={handleNext}
                    cardData={cardData}
                    showRadio={true}
                />
                </View>
              </View>
              <View style={styles.innerView}></View>
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('그룹 이동')}>
              <Text style={styles.bottomText}>그룹 이동</Text>
            </TouchableOpacity>
            <BottomLineIcon style={styles.bottomLine}/>
            <TouchableOpacity onPress={handleDeleteCard}>
              <Text style={styles.bottomText}>삭제</Text>
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
        showCustomToast('이동 완료되었어요.');
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
                    <People /> {members}
                </Text>
            </View>
        </TouchableOpacity>
      );
    
      return (
        <View style={styles.backgroundColor}>
          <View style={styles.cardLayout}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View>
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
              <Text style={styles.bottomText}>새 그룹 추가</Text>
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
            title: "",
            tabBarStyle: { display: 'none' } ,
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 , borderRadius: 16 }}>
                      <MenuOption style={{ marginBottom: 10.5 }} text='그룹 이름 바꾸기' />
                      <MenuOption text='그룹 삭제하기'/>
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>
              </View>
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