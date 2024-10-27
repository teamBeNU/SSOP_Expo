import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Modal, StyleSheet} from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './SpaceStyle';
import { MySpaceGroup } from "../../components/Space/SpaceList.js";
import Toast from 'react-native-toast-message';
import { SpaceModal, SpaceNameChangeModal, NewGroupModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import CardsView from '../../components/Bluetooth/CardsView.js';
import MySpaceDetailView from "../../components/Space/AcceptCardView.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import Contact from '../../assets/icons/ic_contact_black.svg';
import Edit from '../../assets/icons/ic_edit.svg';
import Swap from '../../assets/icons/ic_swap.svg';
import Add from '../../assets/icons/ic_folder-add.svg';
import FolderMove from '../../assets/icons/ic_folder-move.svg';
import Trash from '../../assets/icons/ic_trash.svg';


import { theme } from "../../theme.js";

const Stack = createStackNavigator();

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
                <TouchableOpacity style={styles.btn2} onPress={onOption1Press}>
                  <Text style={styles.Text18}>{option1Text}</Text>
                  <Text style={styles.Text14}>{option1SubText}</Text>
                  <Option1Icon style={styles.icon2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={onOption2Press}>
                  <Text style={styles.Text18}>{option2Text}</Text>
                  <Text style={styles.Text14}>{option2SubText}</Text>
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

// 그룹 상세 정보를 가져오는 공통 함수
const fetchGroupDetails = async (groupId, token) => {
  try {
    const response = await fetch(`http://43.202.52.64:8080/api/mysp?groupId=${groupId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (response.ok) {
      return result.members; // 카드 목록 반환
    } else {
      console.error('그룹 카드 정보를 가져오는데 실패했습니다:', result?.error || '알 수 없는 오류');
      return [];
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return [];
  }
};

// 그룹 상세 페이지
function DetailSpaceGroup({ route, navigation }) {
  const { groupId } = route.params || {};

  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [groupName, setGroupName] = useState(''); // 그룹 이름 상태
  const [members, setMembers] = useState(0); // 그룹 멤버 수 상태
  const [cardData, setCardData] = useState([]); // 카드 목록 상태
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const API_URL = 'http://43.202.52.64:8080/api/mysp'; // 그룹 정보 API 경로

// 그룹 상세 정보를 가져오는 함수
const fetchGroupDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // 인증 토큰 가져오기
    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }

    const response = await fetch(`${API_URL}?groupId=${groupId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // 인증 토큰 추가
      },
    });

    const result = await response.json();

    if (response.ok) {
      setGroupName(result.group_name); // 그룹 이름 상태 업데이트
      setMembers(result.memberCount); // 멤버 수 상태 업데이트
      setCardData(result.members); // 카드 목록 상태 업데이트 (members를 cardData로 설정)
    } else {
      console.error('그룹 상세 정보를 가져오는데 실패했습니다:', result?.error || '알 수 없는 오류');
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};


  // 컴포넌트가 마운트될 때 그룹 상세 정보 가져옴
  useEffect(() => {
    fetchGroupDetails();
  }, [groupId]);

  const handleBluetoothPress = () => {
    setIsModalVisible(false);
    navigation.navigate('내 카드 보내기');
  };

  const handleLinkSharePress = () => {
    setIsModalVisible(false);
    navigation.navigate('링크 복사');
  };

  const handleDeleteGroup = () => {
    setIsSpaceModalVisible(true);
  };

  const handleChangeGroupName = () => {
    setIsGroupNameChangeModalVisible(true);
  };

  const handleNext = (cardId) => {
    console.log('cardid: ', cardId);
    navigation.navigate('상대카드 상세보기', { cardId });
  };

  return (
    <View style={styles.backgroundColor}>
      <MySpaceDetailView
        title={groupName} // 그룹 이름을 타이틀로 표시
        members={members} // 그룹 멤버 수
        navigation={navigation}
        hasCards={cardData.length > 0}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        viewOption={viewOption}
        setViewOption={setViewOption}
        handleNext={handleNext}
        cardData={cardData}
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
        groupName={groupName} // 현재 그룹 이름 전달
        btn1={'취소하기'}
        btn2={'수정하기'}
      />
      {/* 하단 버튼 영역 */}
      <View style={styles.bottomDetailContainer}>
        <Edit style={{ marginRight: 6 }} />
        <TouchableOpacity onPress={() => navigation.navigate('카드 관리')}>
          <Text style={styles.bottomTextBlue}>카드 관리</Text>
        </TouchableOpacity>
        <BottomLineIcon style={styles.bottomLine2} />
        <Contact style={{ marginRight: 6 }} />
        <TouchableOpacity onPress={() => navigation.navigate('연락처 저장')}>
          <Text style={styles.bottomText}>연락처 저장</Text>
        </TouchableOpacity>
        <BottomLineIcon style={styles.bottomLine2} />
        <Swap style={{ marginRight: 6 }} />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Text style={styles.bottomTextBlue}>카드 교환</Text>
        </TouchableOpacity>
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
    </View>
  );
}


  // 연락처 저장
  function SaveTellScreen({route, navigation}) {
    const { groupId } = route.params || {};
    const [cardData, setCardData] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedOption, setSelectedOption] = useState('최신순');
    const [viewOption, setViewOption] = useState('리스트형');

    useEffect(() => {
      const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token && groupId) {
          const data = await fetchGroupDetails(groupId, token);
          setCardData(data);
        }
      };
      getData();
    }, [groupId]);

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
  
    const handlePress = (cardId) => {
      setSelectedCards(prevSelectedCards => 
        prevSelectedCards.includes(cardId)
          ? prevSelectedCards.filter(id => id !== cardId)
          : [...prevSelectedCards, cardId]
      );
    };

    const handleNext = (cardId) => {
      console.log('cardid: ', cardId);
      navigation.navigate('상대카드 상세보기', { cardId });
    };
  
      // 카드 선택/해제 처리 함수
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
          setSelectedCards(cardData.map((card) => card.cardId)); // 모든 카드 선택
        }
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
                {selectedCards.length > 0 && selectedCards.length === cardData.length ? (
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
                  selectedCards={selectedCards} // 선택된 카드 목록 전달
                  handleRadioSelect={handleRadioSelect} // 선택 처리 함수 전달
              />
              </View>
            </View>
            <View style={styles.innerView}></View>
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <Contact style={{marginRight: 6}}/>
          <TouchableOpacity onPress={handleSaveTel}>
            <Text style={styles.bottomText}>연락처 저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

    // 카드 관리
    function ManageCardScreen({route, navigation}) {
      const { groupId } = route.params || {};
      const [cardData, setCardData] = useState([]);
      const [selectedCards, setSelectedCards] = useState([]);
      const [selectedOption, setSelectedOption] = useState('최신순');
      const [viewOption, setViewOption] = useState('리스트형');

      useEffect(() => {
        const getData = async () => {
          const token = await AsyncStorage.getItem('token');
          if (token && groupId) {
            const data = await fetchGroupDetails(groupId, token);
            setCardData(data);
          }
        };
        getData();
      }, [groupId]);

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
  
      // 카드 선택/해제 처리 함수
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
          setSelectedCards(cardData.map((card) => card.cardId)); // 모든 카드 선택
        }
      };

      const handleNext = (cardId) => {
        console.log('cardid: ', cardId);
        navigation.navigate('상대카드 상세보기', { cardId });
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
                {selectedCards.length > 0 && selectedCards.length === cardData.length ? (
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
                    selectedCards={selectedCards} // 선택된 카드 목록 전달
                    handleRadioSelect={handleRadioSelect} // 선택 처리 함수 전달
                />
                </View>
              </View>
              <View style={styles.innerView}></View>
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <FolderMove style={{marginRight: 6}}/>
            <TouchableOpacity onPress={() => navigation.navigate('그룹 이동')}>
              <Text style={styles.bottomText}>그룹 이동</Text>
            </TouchableOpacity>
            <BottomLineIcon style={styles.bottomLine}/>
            <Trash style={{marginRight: 6}}/>
            <TouchableOpacity onPress={handleDeleteCard}>
              <Text style={styles.bottomText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }


    // 그룹 이동
    function MoveGroupScreen({route, navigation}) {

      const API_URL = 'http://43.202.52.64:8080/api/mysp';

      const [teamData, setTeamData] = useState([]);  // 팀 데이터 상태로 관리
      const [selectedGroups, setSelectedGroups] = useState([]);  // 선택된 그룹 ID 배열 상태
      const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false); // 삭제 모달 상태
      const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);

      const showCustomToast = (text) => {
        Toast.show({
          text1: text,
          type: 'selectedToast',
          position: 'bottom',
          visibilityTime: 2000,
        });
      };

      useEffect(() => {
        fetchGroups();
      }, []);
    
      // 그룹 목록을 가져오는 함수
      const fetchGroups = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            console.error('토큰이 없습니다.');
            return;
          }
    
          // 그룹 목록 API 호출
          const groupResponse = await fetch(`${API_URL}/view`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const groupResult = await groupResponse.json();
    
          if (Array.isArray(groupResult)) {  // 그룹 데이터가 배열인지 확인
            setTeamData(groupResult);  // 그룹 데이터를 teamData 상태에 저장
          } else {
            //console.error('그룹 데이터를 받지 못했습니다.');
          }
        } catch (error) {
          console.error('그룹 목록을 불러오는 중 오류가 발생했습니다:', error);
        }
      };

        // 그룹 추가 API 호출
  const handleAddGroup = async (groupName) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_name: groupName }),
      });

      const result = await response.json();
      if (response.ok) {
        fetchGroups();  // 그룹 목록 새로고침
        showCustomToast('새 그룹이 성공적으로 추가되었습니다.');
        setIsGroupNameChangeModalVisible(false);  // 모달 닫기
      } else {
        console.error('그룹 추가에 실패했습니다:', result.message);
      }
    } catch (error) {
      console.error('그룹 추가 중 오류가 발생했습니다:', error);
    }
  };

    // 특정 그룹이 선택되었는지 확인하는 함수
    const isGroupSelected = (id) => selectedGroups.includes(id);
      
      const handleMoveCard = () => {
        showCustomToast('이동 완료되었어요.');
      };

      const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
    
      const handleCreateGroup = () => {
        setIsCreateGroupModalVisible(true);
      };

      const [selectedOption, setSelectedOption] = useState('최신순');
    
      return (
        <View style={styles.backgroundColor}>
          <View style={styles.cardLayout}>
            <ScrollView showsVerticalScrollIndicator={false}>
          {/* 그룹 리스트 */}
          <View style={styles.row}>
            {teamData.map((team) => (
              <MySpaceGroup
                key={team.groupId}
                id={team.groupId}
                name={team.group_name}
                members={team.memberCount}
                showMenu={false}  // 메뉴 비활성화
                // selected={isGroupSelected(team.groupId)}  // 선택 상태 전달 (배열 내 포함 여부 확인)
                // onPress={() => handleGroupSelect(team.groupId)}  // 라디오 버튼 및 카드 클릭 핸들러
              />
            ))}
          </View>
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <Add style={{marginRight: 6}}/>
            <TouchableOpacity onPress={() => setIsGroupNameChangeModalVisible(true)}>
              <Text style={styles.bottomText}>새 그룹 추가</Text>
            </TouchableOpacity>
          </View>
          <NewGroupModal
            isVisible={isGroupNameChangeModalVisible}
            onClose={() => setIsGroupNameChangeModalVisible(false)}
            groupName={'그룹 이름을 작성하세요.'}
            btn1={'취소하기'}
            btn2={'추가하기'}
            onConfirm={handleAddGroup}
          />
        </View>
      );
    }

    
  function DetailGroup({ route, navigation }) {
      const { groupId } = route.params || {};  // route에서 groupId 가져오기
    
      // groupId가 없을 경우 에러 처리
      if (!groupId) {
        console.error('groupId가 전달되지 않았습니다.');
        return <Text>잘못된 접근입니다.</Text>;
      }

    return (
      <Stack.Navigator>
          <Stack.Screen name="Group" component={DetailSpaceGroup} 
          initialParams={{ groupId }}
          options={{
            title: "",
            tabBarStyle: { display: 'none' } ,
            headerStyle: {
              backgroundColor: theme.gray95, 
            },
            headerShadowVisible: false, 
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
          initialParams={{ groupId }}
          options={{
            headerTitle: " ",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 23 }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="카드 관리" component={ManageCardScreen}
          initialParams={{ groupId }}
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