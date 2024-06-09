import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import People from '../../assets/icons/ic_person_small_fill.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import SaveIcon from '../../assets/icons/ic_save_small_line.svg';
import ContactIcon from '../../assets/icons/ic_contact_small_line.svg';
import SelectIcon from '../../assets/icons/ic_done_small_line.svg';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

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
    { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인', host: true, filter: '#디자이너' },
    { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생', filter: '#프런트엔드'},
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
                <People />  48 / 150명
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
    </Stack.Navigator>
  );
  }
  export default DetailTeamSpace;