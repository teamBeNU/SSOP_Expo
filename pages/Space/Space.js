import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import SpaceModal from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";
import Toast from 'react-native-toast-message';

import NotiIcon from '../../assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import People from '../../assets/icons/ic_person_small_fill.svg';
import Swap from '../../assets/icons/ic_swap_regular_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/EnterTeamSPIcon.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/CreatTeamSPIcon.svg';
import GroupIcon from '../../assets/icons/ic_group_regular.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import NewFolderIcon from '../../assets/icons/ic_newFolder_regular.svg';


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
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);

  const handleDeleteGroup = () => {
    setIsSpaceModalVisible(true);
  };

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

  const handleDelete = () => {
    //setNotiData(notiData.filter(card => card.id !== id));
    showCustomToast('카드가 성공적으로 삭제되었습니다.');
  };
  
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
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
                    <MenuOption text='그룹 삭제하기' onSelect={handleDeleteGroup}/>
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
      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'그룹을 삭제하시겠습니까?'}
        sub={'그룹 안에 있는 카드들도 삭제됩니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        toast={handleDelete} 
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
      </Stack.Navigator>
    );
  }

  export default Space;