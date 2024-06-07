import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import NotiIcon from '../../assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import People from '../../assets/icons/ic_person_small_fill.svg';
import Swap from '../../assets/icons/ic_swap_regular_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import SaveIcon from '../../assets/icons/ic_save_small_line.svg';
import ContactIcon from '../../assets/icons/ic_contact_small_line.svg';
import SelectIcon from '../../assets/icons/ic_done_small_line.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/EnterTeamSPIcon.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/CreatTeamSPIcon.svg';
import GroupIcon from '../../assets/icons/ic_group_regular.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import NewFolderIcon from '../../assets/icons/ic_newFolder_regular.svg';
import EditIcon from '../../assets/icons/ic_edit_small_line.svg';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// 모달
function ExchangeModal({ isVisible, onClose, onOption1Press, onOption2Press, title, option1Text, option1SubText, option1Icon: Option1Icon, option2Text, option2SubText, option2Icon: Option2Icon }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
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
      </View>
    </Modal>
  );
}


// 마이스페이스
function MySpaceScreen({navigation}) {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasCards, setHasCards] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNext = () => {
    navigation.navigate('그룹');
  };

  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleBluetoothPress = () => {
    setIsModalVisible(false);
    navigation.navigate('내 카드 보내기');
  };
  
  const handleLinkCopyPress = () => {
    setIsModalVisible(false);
    navigation.navigate('링크 복사'); 
  };

  const MySpaceGroup = ({ name, members }) => (
    <TouchableOpacity style={styles.groupContent} onPress={handleNext} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GroupIcon/>
            <Text style={styles.fontGroup}>{name}</Text>
            <Text style={styles.peopleGroup}>
                <People /> {members}명
            </Text>
            <View style={{ marginLeft: 'auto' }}>
                 <Menu>
                  <MenuTrigger><MoreGrayIcon style={{ marginRight: 8  }}/></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                    <MenuOption style={{ marginBottom: 10.5}} text='그룹명 변경하기'/>
                    <MenuOption text='그룹 삭제하기'/>
                  </MenuOptions>
                </Menu>
            </View>
        </View>
    </TouchableOpacity>

  );

  const teamData = [
    { id: 1, name: '24학번 후배', members: 8 },
    { id: 2, name: '24-1학기 영어 교양 팀원', members: 4 },
  ];

  const cardData = [
    { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생' },
    { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
    { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬' },
    { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },

];

  return hasCards ? (
    <View style={styles.mainlayout}>
        <View style={styles.container2}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
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
                {cardData.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('카드 조회')}>
                    <item.Component 
                        backgroundColor={item.backgroundColor} 
                        avatar={item.avatar} 
                        card_name={item.card_name} 
                        age={item.age} 
                        dot={item.dot} 
                        card_template={item.card_template} 
                    />
                    </TouchableOpacity>
                ))}
            </View>
          </View>
          <View style={styles.innerView}></View>
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
          <View style={styles.floatingButtonContent}>
            <Swap style={styles.floatingButtonIcon} />
            <Text style={styles.floatingButtonText}>교환하기</Text>
          </View>
        </TouchableOpacity>

        <ExchangeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOption1Press={handleBluetoothPress}
        onOption2Press={handleLinkCopyPress}
        title="카드 교환하기"
        option1Text="블루투스 송신"
        option1SubText="주변에 있다면 바로"
        option1Icon={BluetoothIcon}
        option2Text="링크 복사"
        option2SubText="연락처가 있다면"
        option2Icon={LinkIcon}
      />
      </View>
  ) : (
    <View style={styles.mainlayout}>
      <View style={styles.emptyContainer}>
        <Text style={styles.noCard}>공유받은 카드가 없어요.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('카드 만들기')}>
          <View style={styles.newContainer}>
            <Text style={styles.newCard}>카드 교환하기</Text>
            <RightIcon />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
          <View style={styles.floatingButtonContent}>
            <Swap style={styles.floatingButtonIcon} />
            <Text style={styles.floatingButtonText}>교환하기</Text>
          </View>
        </TouchableOpacity>

        <ExchangeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOption1Press={handleBluetoothPress}
        onOption2Press={handleLinkCopyPress}
        title="카드 교환하기"
        option1Text="블루투스 송신"
        option1SubText="주변에 있다면 바로"
        option1Icon={BluetoothIcon}
        option2Text="링크 복사"
        option2SubText="연락처가 있다면"
        option2Icon={LinkIcon}
      />
    </View>
  );
}


// 팀스페이스 
function TeamSpaceScreen({ navigation}) {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasTeamSP, setHasTeamSP] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNext = () => {
    navigation.navigate('상세 팀스페이스');
  };
  
  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleEnterTeamSpPress = () => {
    setIsModalVisible(false);
    navigation.navigate('팀스페이스 입장');
  };
  
  const handleCreateTeamSpPress = () => {
    setIsModalVisible(false);
    navigation.navigate('팀스페이스 생성'); 
  };

  const TeamSPContent = ({ name, description, members, isHost }) => (
    <TouchableOpacity style={styles.TeamSPContent}  onPress={handleNext}>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        <Text style={styles.font18}>{name}</Text>
        {isHost && (
          <View style={styles.host}>
            <Text style={styles.hostText}>호스트</Text>
          </View>
        )}
      </View>
      <Text style={styles.font16}>{description}</Text>
      <Text style={styles.people}>
        <People /> {members} / 150명
      </Text>
    </TouchableOpacity>
  );

  const teamData = [
    { id: 1, name: '김슈니의 팀스페이스', description: 'IT 소학회 SWUT 스페이스입니다.', members: 48, isHost: true },
    { id: 2, name: '영어 교양 스페이스', description: '24-1학기 영어 교양 스페이스입니다.', members: 50, isHost: false },
    { id: 3, name: '여대 교류회', description: '여대 교류를 위한 스페이스입니다.', members: 80, isHost: false },
  ];

  const TeamSPContents = teamData.map((team) => (
    <TeamSPContent
      key={team.id}
      name={team.name}
      description={team.description}
      members={team.members}
      isHost={team.isHost}
    />
  ));
  
  return hasTeamSP ? (
    <View style={styles.mainlayout}>
        <View style={styles.container2}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {TeamSPContents}
          <View style={styles.innerView}></View>
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
          <View style={styles.floatingButtonContent}>
            <Swap style={styles.floatingButtonIcon} />
            <Text style={styles.floatingButtonText}>교환하기</Text>
          </View>
        </TouchableOpacity>
        <ExchangeModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onOption1Press={handleEnterTeamSpPress}
          onOption2Press={handleCreateTeamSpPress}
          title="팀스페이스 교환하기"
          option1Text="팀스페이스 입장"
          option1SubText="초대받았다면"
          option1Icon={EnterTeamSPIcon}
          option2Text="팀스페이스 생성"
          option2SubText="초대하고 싶다면"
          option2Icon={CreatTeamSPIcon}
        />

      </View>
    ) : (
      <View style={styles.mainlayout}>
        <View style={styles.emptyContainer}>
          <Text style={styles.noCard}>입장한 팀스페이스가 없어요.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('팀스페이스 입장')}>
            <View style={styles.newContainer}>
              <Text style={styles.newCard}>팀스페이스 입장하기</Text>
              <RightIcon />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
          <View style={styles.floatingButtonContent}>
            <Swap style={styles.floatingButtonIcon} />
            <Text style={styles.floatingButtonText}>교환하기</Text>
          </View>
        </TouchableOpacity>
        <ExchangeModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onOption1Press={handleEnterTeamSpPress}
          onOption2Press={handleCreateTeamSpPress}
          title="팀스페이스 교환하기"
          option1Text="팀스페이스 입장"
          option1SubText="초대받았다면"
          option1Icon={EnterTeamSPIcon}
          option2Text="팀스페이스 생성"
          option2SubText="초대하고 싶다면"
          option2Icon={CreatTeamSPIcon}
        />
      </View>
    );
}

// 상세 팀스페이스
function DetailTeamSpaceScreen({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleNext = () => {
    navigation.navigate('필터');
  };

  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

  const DetailcardData = [
    { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생' },
    { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
    { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬' },
    { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },

  ];

  const inviteCode = '123456'; // 초대코드

  // 복사
  const copyinviteCode = () => {
    const textToCopy = inviteCode;
    Clipboard.setString(textToCopy);
    Alert.alert("클립보드에 복사되었습니다.");
  };    

  return (
    <View style={styles.backgroundColor}>
        <Text style={styles.title}>김슈니의 팀스페이스</Text>
        <Text style={styles.sub}>IT 소학회 SWUT 스페이스입니다.</Text>
        <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn} onPress={handleShareButtonPress}>
                        <ShareIcon />
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={isModalVisible}
                          onRequestClose={() => {
                            setIsModalVisible(!isModalVisible);
                          }}>
                          <View style={styles.shareModalContainer}>
                            <View style={styles.ShareModalView}>
                              <TouchableOpacity onPress={() => { copyinviteCode(); setIsModalVisible(false); }}>
                                <Text style={styles.ShareModalText}>초대 링크 및 코드 복사하기</Text>                   
                              </TouchableOpacity>
                              <Text style={styles.ShareModalsmallText}>초대 코드: {inviteCode}</Text>
                              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.ShareModalText}>초대 링크 및 코드 공유하기</Text>                   
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                    </TouchableOpacity>
                    <Text style={styles.btnText}>공유하기</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <SaveIcon />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>마이스페이스로{'\n'}카드 저장</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <ContactIcon style={{color: 'white'}} />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>연락처 저장 </Text>
                </View>
        </View>
    
      
        <View style={styles.line} />
        
        <View style={styles.personContainer}>
          <View style={styles.personRow}>
            <View style={styles.leftContainer}>
              <Text style={styles.personText}>구성원</Text>
              <Text style={styles.detailPeople}>
                <People />  8 / 150명
              </Text>
            </View>
            <TouchableOpacity style={styles.positionFilter} onPress={handleNext}>
              <Text style={styles.positionFilterText}>필터</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardLayout}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
          </ScrollView>
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
                    <Text style={styles.selectedText}> #기획자 </Text>
                  </View>
                )}
                {!filter.promoter && <Text> #기획자 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('designer')}
                 style={filter.designer ? styles.selectedElement : styles.element}>
                 {filter.designer && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> #디자이너 </Text>
                   </View>
               )}
                 {!filter.designer && <Text> #디자이너 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('frontend')}
                 style={filter.frontend ? styles.selectedElement : styles.element}>
                 {filter.frontend && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> #프런트엔드 </Text>
                   </View>
               )}
                 {!filter.frontend && <Text> #프런트엔드 </Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelect('backend')}
                 style={filter.backend ? styles.selectedElement : styles.element}>
                 {filter.backend && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <SelectIcon />
                     <Text style={styles.selectedText}> #백엔드 </Text>
                   </View>
               )}
                 {!filter.backend && <Text> #백엔드 </Text>}
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

// 그룹 상세
function DetailGroup({ navigation }) {
    const [selectedOption, setSelectedOption] = useState('최신순');
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleShareButtonPress = () => {
      setIsModalVisible(true);
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
          <Text style={[styles.title, {marginBottom: 32}]}>24학번 후배</Text>
          <View style={[styles.btnContainer, {marginBottom: 28}]}>
                  <View style={styles.btn}>
                      <TouchableOpacity style={styles.whiteBtn}>
                          <ContactIcon style={{color: 'white'}} />
                      </TouchableOpacity>
                      <Text style={styles.btnText}>연락처 저장 </Text>
                  </View>
                  <View style={styles.btn}>
                      <TouchableOpacity style={styles.whiteBtn} onPress={handleShareButtonPress}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
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
            </ScrollView>
          </View>
            
        </View>
    );
  }

function SpaceTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarIndicatorContainerStyle: styles.tabBarItemStyle,
      })}
    >
      <Tab.Screen name="마이스페이스" component={MySpaceScreen}/>
      <Tab.Screen name="팀스페이스" component={TeamSpaceScreen}/>
    </Tab.Navigator>
  );
}

function Space() {
    const navigation = useNavigation();
    return (
      <Stack.Navigator>
        <Stack.Screen name="SpaceTabs" component={SpaceTabs} 
        options={{
          title: " ",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('알림')}>
              <NotiIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity><SearchIcon /></TouchableOpacity>
              <TouchableOpacity><NewFolderIcon /></TouchableOpacity>
              <TouchableOpacity >
                <Menu>
                  <MenuTrigger><MoreIcon style={{ marginRight: 8  }}/></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                    <MenuOption style={{ marginBottom: 10.5}} text='그룹 관리하기'/>
                    <MenuOption style={{ marginBottom: 10.5}} text='카드 관리하기'/>
                    <MenuOption text='연락처 관리하기'/>
                  </MenuOptions>
                </Menu>
              </TouchableOpacity>
            </View>
          ),
        }}/>
        {/* <Stack.Screen name="마이스페이스" component={MySpaceScreen}/>
        <Stack.Screen name="팀스페이스" component={TeamSpaceScreen}/>  */}
        <Stack.Screen name="상세 팀스페이스" component={DetailTeamSpaceScreen}
          options={{
            title: "상세 팀스페이스",
            tabBarStyle: { display: 'none' },
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Menu>
                <MenuTrigger><MoreIcon style={{ marginRight: 8  }}/></MenuTrigger>
                <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                  <MenuOption style={{ marginBottom: 10.5}} text='팀스페이스 수정'/>
                  <MenuOption text='팀스페이스 삭제'/>
                </MenuOptions>
              </Menu>
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
          <Stack.Screen name="그룹" component={DetailGroup} 
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
      </Stack.Navigator>
    );
  }

  export default Space;