import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { SpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

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

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// 마이스페이스
function MySpaceScreen() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasCards, setHasCards] = useState(true);

  const cardData = [
    { id: '1', Component: SpaceCard, backgroundColor: '#B6E96C', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "김사라", age: '23', position: '직장인' },
    { id: '2', Component: SpaceCard, backgroundColor: '#83936D', avatar: <AvatarSample2 style={{marginLeft: -10}} />, name: "이리나", age: '20', position: '학생' },
    { id: '3', Component: SpaceCard, backgroundColor: '#6ED5EC', avatar: <AvatarSample2 style={{marginLeft: -10}} />, name: "이호영", age: '21', position: '학생' },
    { id: '4', Component: SpaceCard, backgroundColor: '#FCA5D7', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "임지니", age: '22', position: '팬' },
    { id: '5', Component: SpaceCard, backgroundColor: '#4E77E0', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "홍길동", age: '24', position: '학생' },
    { id: '6', Component: SpaceCard, backgroundColor: '#FBD13D', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "홍길동", age: '25', position: '학생' },
    
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
                {cardData.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('카드 조회')}>
                    <item.Component 
                        backgroundColor={item.backgroundColor} 
                        avatar={item.avatar} 
                        name={item.name} 
                        age={item.age} 
                        position={item.position} 
                    />
                    </TouchableOpacity>
                ))}
            </View>
          </View>
          <View style={styles.innerView}></View>
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton} onPress={() => console.log('Button Pressed')}>
          <View style={styles.floatingButtonContent}>
            <Swap style={styles.floatingButtonIcon} />
            <Text style={styles.floatingButtonText}>교환하기</Text>
          </View>
        </TouchableOpacity>
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
    </View>
  );
}


// 팀스페이스 
function TeamSpaceScreen({ navigation}) {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasTeamSP, setHasTeamSP] = useState(true);

  const handleNext = () => {
    navigation.navigate('상세 팀스페이스');
  };

  const TeamSPContent = ({ name, description, members, isHost }) => (
    <TouchableOpacity style={styles.TeamSPContent}  onPress={handleNext}>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        {isHost && (
          <View style={styles.host}>
            <Text style={styles.hostText}>호스트</Text>
          </View>
        )}
        <Text style={styles.font18}>{name}의 팀스페이스</Text>
      </View>
      <Text style={styles.font16}>{description}</Text>
      <Text style={styles.people}>
        <People /> {members} / 150명
      </Text>
    </TouchableOpacity>
  );

  const teamData = [
    { id: 1, name: '홍길동', description: '부가설명', members: 8, isHost: true },
    { id: 2, name: '홍길동', description: '부가설명', members: 8, isHost: false },
    { id: 3, name: '홍길동', description: '부가설명', members: 8, isHost: false },
    { id: 4, name: '홍길동', description: '부가설명', members: 8, isHost: false },
    { id: 5, name: '홍길동', description: '부가설명', members: 8, isHost: false },
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
        <TouchableOpacity style={styles.floatingButton} onPress={() => console.log('Button Pressed')}>
          <View style={styles.floatingButtonContent}>
            <Swap style={styles.floatingButtonIcon} />
            <Text style={styles.floatingButtonText}>교환하기</Text>
          </View>
        </TouchableOpacity>
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
      </View>
    );
}

// 상세 팀스페이스
function DetailTeamSpaceScreen({ navigation }) {

  const handleNext = () => {
    navigation.navigate('필터');
  };

  const DetailcardData = [
    { id: '1', Component: SpaceCard, backgroundColor: '#B6E96C', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "김사라", age: '23', position: '직장인' },
    { id: '2', Component: SpaceCard, backgroundColor: '#83936D', avatar: <AvatarSample2 style={{marginLeft: -10}} />, name: "이리나", age: '20', position: '학생' },
    { id: '3', Component: SpaceCard, backgroundColor: '#6ED5EC', avatar: <AvatarSample2 style={{marginLeft: -10}} />, name: "이호영", age: '21', position: '학생' },
    { id: '4', Component: SpaceCard, backgroundColor: '#FCA5D7', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "임지니", age: '22', position: '팬' },
    { id: '5', Component: SpaceCard, backgroundColor: '#4E77E0', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "홍길동", age: '24', position: '학생' },
    { id: '6', Component: SpaceCard, backgroundColor: '#FBD13D', avatar: <AvatarSample1 style={{marginLeft: -10}} />, name: "홍길동", age: '25', position: '학생' },
    
  ];

  return (
    <View style={styles.backgroundColor}>
        <Text style={styles.title}>홍길동의 팀스페이스</Text>
        <Text style={styles.sub}>홍길동의 팀스페이스입니다. 안녕하세요.</Text>
        <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <ShareIcon />
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
              <Text style={styles.people}>
                <People />  8 / 150명
              </Text>
            </View>
            <TouchableOpacity style={styles.positionFilter} onPress={handleNext}>
              <Text style={styles.positionFilterText}>포지션 필터</Text>
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
                          name={item.name} 
                          age={item.age} 
                          position={item.position} 
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
    designer: false,
    frontend: false,
    backend: false,
  });

  const handleSelect = (id) => {
    setFilter(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log(id);
  };

  return (
    <View style={styles.backgroundColor}>
        <Text style={styles.filterText}>포지션</Text>

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>재설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewCardsButton}>
            <Text style={styles.viewCardsButtonText}>해당되는 카드 보기</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

function SpaceTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarItemStyle: ({ focused }) => focused ? styles.tabBarSelectedItemStyle : styles.tabBarItemStyle,
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
        <Stack.Screen name="SpaceTabs" component={SpaceTabs} />
        <Stack.Screen name="마이스페이스" component={MySpaceScreen} 
          options={{
            title: " ",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <NotiIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate(' ')}>
                <MoreIcon style={{ marginRight: 8 }} />
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="Step2" component={TeamSpaceScreen} 
          options={{
            title: "카드 보내기",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <NotiIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate(' ')}>
                <MoreIcon style={{ marginRight: 8 }} />
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="상세 팀스페이스" component={DetailTeamSpaceScreen}
          options={{
            title: "상세 팀스페이스",
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
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
      </Stack.Navigator>
    );
  }

  export default Space;