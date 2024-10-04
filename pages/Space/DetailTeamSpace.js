import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert, TouchableWithoutFeedback } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, RadioCard } from "../../components/Bluetooth/ShareCard.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import CardsView from '../../components/Bluetooth/CardsView.js';
import MySpaceDetailView from "../../components/Space/MySpaceDetailView.js";

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import SelectIcon from '../../assets/icons/ic_done_small_line_blue.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const cardData = [
  { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인', filter: '#기획' },
  { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생', filter: '#디자이너'},
  { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인', filter: '#프런트엔드' },
  { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬', filter: '#백엔드' },
  { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인', filter: '#디자이너' },
  { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인', filter: '#프런트엔드' },

];

// 상세 팀스페이스
function DetailTeamSpaceScreen({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [hasCards, setHasCards] = useState(true);

  const handleFilterNext = () => {
    navigation.navigate('필터');
  };

  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleDeleteGroup = (id) => {
    setGroupToDelete(id);
    setIsSpaceModalVisible(true);
};

  const handleConfirmDelete = () => {
    // groupToDelete에 해당하는 그룹 삭제
    setTeamData((prevData) => prevData.filter((group) => group.id !== groupToDelete));
    setGroupToDelete(null);  // 삭제할 그룹 ID 초기화
    setIsSpaceModalVisible(false);  // 모달 닫기
    showCustomToast('그룹이 성공적으로 삭제되었어요.');
  };

  const handleChangeGroupName = () => {
    setIsGroupNameChangeModalVisible(true);
  };

  const DetailcardData = [
    { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인', isHost: true, filter: '#기획' },
    { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생', isHost: false, filter: '#디자이너'},
    { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인', isHost: false, filter: '#프런트엔드' },
    { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬', isHost: false, filter: '#백엔드' },
    { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인', isHost: false, filter: '#디자이너' },
    { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 />, card_name: '홍길동', age: '23세', dot: '·', card_template: '직장인', isHost: false, filter: '#프런트엔드' },

  ];

  const inviteCode = '123456'; // 초대코드

  // 복사
  const copyinviteCode = async() => {
    const textToCopy = inviteCode;
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("클립보드에 복사되었습니다.");
  };    

  const shareLinkCode = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync('https://naver.com', {
        dialogTitle: 'SSOP Share TEST',
      });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };


  return (
    <View style={styles.backgroundColor}>
            {/* 공유 버튼을 눌렀을 때 표시되는 모달 */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={styles.shareModalContainer}>
                  <View style={styles.ShareModalView}>
                    <TouchableOpacity
                      onPress={() => {
                        copyinviteCode();
                        setIsModalVisible(false);
                      }}
                    >
                      <Text style={styles.ShareModalText}>초대 링크 및 코드 복사하기</Text>
                    </TouchableOpacity>
                    <Text style={styles.ShareModalsmallText}>초대 코드: {inviteCode}</Text>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => { shareLinkCode(); setIsModalVisible(false)}}>
                      <Text style={styles.ShareModalText}>초대 링크 및 코드 공유하기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          <MySpaceDetailView
            title="김슈니의 팀스페이스"
            members='8 / 150'
            sub={'IT 소학회 SWUT 스페이스입니다.'}
            showFilter={true}
            navigation={navigation}
            hasCards={hasCards}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            viewOption={viewOption}
            setViewOption={setViewOption}
            handleFilterNext={handleFilterNext}
            cardData={DetailcardData}
          />
          <SpaceModal
            isVisible={isSpaceModalVisible}
            onClose={() => setIsSpaceModalVisible(false)}
            title={'선택한 팀스페이스를 삭제하시겠습니까?'}
            sub={'모든 정보가 삭제되며 되돌릴 수 없습니다.'}
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
            <TouchableOpacity >
              <Text style={styles.bottomTextBlue} onPress={handleShareButtonPress}>공유</Text>
            </TouchableOpacity>
            <BottomLineIcon style={styles.bottomLine} />
            <TouchableOpacity onPress={() => navigation.navigate('연락처 저장')}>
              <Text style={styles.bottomText}>연락처 저장</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
}

// 필터
function Filter() {

  const navigation = useNavigation();

  const [filter, setFilter] = useState({
    promoter: false,
    designer: true,
    frontend: true,
    backend: false,
    dimi: false,
    math: false,
    info: false,
    software: false,
    student: false,
    woker: false,
  });

  const handleReset = () => {
    setFilter({
      promoter: false,
      designer: false,
      frontend: false,
      backend: false,
      dimi: false,
      math: false,
      info: false,
      software: false,
      student: false,
      woker: false,
    });
  };

  const handleSelect = (id) => {
    setFilter(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log(id);
  };

  return (
    <View style={styles.backgroundColor}>
        <Text style={styles.filterText}>역할</Text>
        <View style={styles.elementContainer} >
              <TouchableOpacity onPress={() => handleSelect('promoter')}
                style={filter.promoter ? styles.selectedElement : styles.element}>
                {filter.promoter && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SelectIcon />
                    <Text style={styles.selectedText}> 기획 </Text>
                  </View>
                )}
                {!filter.promoter && <Text> 기획 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('designer')}
                 style={filter.designer ? styles.selectedElement : styles.element}>
                 {filter.designer && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 디자이너 </Text>
                   </View>
               )}
                 {!filter.designer && <Text> 디자이너 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('frontend')}
                 style={filter.frontend ? styles.selectedElement : styles.element}>
                 {filter.frontend && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 프런트엔드 </Text>
                   </View>
               )}
                 {!filter.frontend && <Text> 프런트엔드 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('backend')}
                 style={filter.backend ? styles.selectedElement : styles.element}>
                 {filter.backend && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 백엔드 </Text>
                   </View>
               )}
                 {!filter.backend && <Text> 백엔드 </Text>}
              </TouchableOpacity>
        </View>
        <Text style={styles.filterText}>전공</Text>
        <View style={styles.elementContainer} >
              <TouchableOpacity onPress={() => handleSelect('dimi')}
                style={filter.dimi ? styles.selectedElement : styles.element}>
                {filter.dimi && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SelectIcon />
                    <Text style={styles.selectedText}> 디지털미디어학과 </Text>
                  </View>
                )}
                {!filter.dimi && <Text> 디지털미디어학과 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('math')}
                 style={filter.math ? styles.selectedElement : styles.element}>
                 {filter.math && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 수학과 </Text>
                   </View>
               )}
                 {!filter.math && <Text> 수학과 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('info')}
                 style={filter.info ? styles.selectedElement : styles.element}>
                 {filter.info && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 정보보호학과 </Text>
                   </View>
               )}
                 {!filter.info && <Text> 정보보호학과 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('software')}
                 style={filter.software ? styles.selectedElement : styles.element}>
                 {filter.software && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 소프트웨어융합학과 </Text>
                   </View>
               )}
                 {!filter.software && <Text> 소프트웨어융합학과 </Text>}
              </TouchableOpacity>
        </View>
        <Text style={styles.filterText}>신분</Text>
        <View style={styles.elementContainer} >
              <TouchableOpacity onPress={() => handleSelect('student')}
                style={filter.student ? styles.selectedElement : styles.element}>
                {filter.student && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SelectIcon />
                    <Text style={styles.selectedText}> 학생 </Text>
                  </View>
                )}
                {!filter.student && <Text> 학생 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('worker')}
                 style={filter.worker ? styles.selectedElement : styles.element}>
                 {filter.worker && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> 직장인 </Text>
                   </View>
               )}
                 {!filter.worker && <Text> 직장인 </Text>}
              </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>재설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewCardsButton} onPress={() => navigation.goBack()}>
            <Text style={styles.viewCardsButtonText}>해당되는 카드 보기</Text>
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
          setSelectedCards(cardData.map((card) => card.id)); // 모든 카드 선택
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
                {selectedCards.length === cardData.length ? (
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
          <TouchableOpacity onPress={handleSaveTel}>
            <Text style={styles.bottomText}>핸드폰에 연락처 저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


function DetailTeamSpace() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="DetailTeamSpace" component={DetailTeamSpaceScreen}
        options={{
          title: "상세 팀스페이스",
          tabBarStyle: { display: 'none' },
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
                  <MenuOption text='팀스페이스 나가기' />
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
          ),
        }}/>
      <Stack.Screen name="필터" component={Filter} 
        options={{
          title: "필터",
          tabBarStyle: { display: 'none' } ,
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
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
    </Stack.Navigator>
  );
  }
  export default DetailTeamSpace;