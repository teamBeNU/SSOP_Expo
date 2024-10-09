import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import CardsView from '../../components/Bluetooth/CardsView.js';
import DetailTeamSpaceScreen from "./DetailTeamSpaceScreen.js";

import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import SelectIcon from '../../assets/icons/ic_done_small_line_blue.svg';
import CloseIcon from '../../assets/icons/close.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';
import { theme } from "../../theme.js";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function DetailTeamSpace() {
  const navigation = useNavigation();
  const route = useRoute();
  const { teamId } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen name="DetailTeamSpace"
        component={DetailTeamSpaceScreen}
        initialParams={{ teamId }}
        options={{
          title: "",
          tabBarStyle: { display: 'none' },
          headerStyle: {
            backgroundColor: theme.gray95,  // 헤더 배경 색상 설정
          },
          headerShadowVisible: false,
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity><SearchIcon /></TouchableOpacity>
              <TouchableOpacity>
                <Menu>
                  <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                    <MenuOption text='팀스페이스 나가기' />
                  </MenuOptions>
                </Menu>
              </TouchableOpacity>
            </View>
          ),
        }} />
      <Stack.Screen name="필터" component={Filter}
        initialParams={{ teamId }}
        options={{
          title: "필터",
          tabBarStyle: { display: 'none' },
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ),
        }} />
      <Stack.Screen name="연락처 저장" component={SaveTellScreen}
        options={{
          headerTitle: " ",
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 23 }} />
            </TouchableOpacity>
          ),
        }} />
    </Stack.Navigator>
  );
}

// 필터
function Filter() {

  const baseUrl = 'http://43.202.52.64:8080/api'
  const navigation = useNavigation();
  const route = useRoute();
  const { teamId } = route.params;

  const [filter, setFilter] = useState({
    card_role: [],
    card_major: [],
    card_mbti: [],
    card_template: [],
  });

  useEffect(() => {
    if (!teamId) {
      console.error("팀 ID가 전달되지 않았습니다.");
      return null;
    }

    // 팀스페이스 참여 정보 API 호출
    const apiUrl = `${baseUrl}/teamsp/member?teamId=${teamId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const receivedFilter = response.data.filter || {};
        setFilter(receivedFilter);
        initializeSelection(receivedFilter);
      })
      .catch((error) => {
        console.error('참여 멤버 목록 - 필터 API 요청 에러:', error);
      });
  }, [teamId]);

  const cardTemplates = {
    student: '학생',
    worker: '직장인',
    fan: '팬',
    free: '자유',
  };

  const [selected, setSelected] = useState({
    card_role: {},
    card_major: {},
    card_mbti: {},
    card_template: {},
  });

  // 필터 목록을 받아올 때 selected 상태 초기화
  const initializeSelection = (receivedFilter) => {
    const initialSelection = {
      card_role: {},
      card_major: {},
      card_mbti: {},
      card_template: {},
    };

    // 역할 필터 초기화
    if (receivedFilter.card_role) {
      receivedFilter.card_role.forEach((item) => {
        initialSelection.card_role[item] = false;
      });
    }

    // 전공 필터 초기화
    if (receivedFilter.card_major) {
      receivedFilter.card_major.forEach((item) => {
        initialSelection.card_major[item] = false;
      });
    }

    // MBTI 필터 초기화
    if (receivedFilter.card_mbti) {
      receivedFilter.card_mbti.forEach((item) => {
        initialSelection.card_mbti[item] = false;
      });
    }

    // 신분 필터 초기화
    if (receivedFilter.card_template) {
      receivedFilter.card_template.forEach((item) => {
        initialSelection.card_template[item] = false;
      });
    }
    setSelected(initialSelection);
  };

  // 선택 핸들러
  const handleSelect = (key, value) => {
    setSelected((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [value]: !prev[key][value],
      },
    }));
  };

  // 모든 항목 리셋 핸들러
  const handleReset = () => {
    setSelected({
      card_role: {},
      card_major: {},
      card_mbti: {},
      card_template: {},
    });
  };

  const handleFilterNext = () => {
    // 선택된 필터값 가져오기
    const selectedFilters = {
      card_role: Object.keys(selected.card_role).filter((key) => selected.card_role[key]),
      card_major: Object.keys(selected.card_major).filter((key) => selected.card_major[key]),
      card_mbti: Object.keys(selected.card_mbti).filter((key) => selected.card_mbti[key]),
      card_template: Object.keys(selected.card_template).filter((key) => selected.card_template[key]),
    };

    // 이전 화면으로 돌아가면서 필터값 전달
    navigation.goBack({ filter: selectedFilters });
  };

  return (
    <View style={styles.backgroundColor}>
      {/* 역할 필터 */}
      {filter.card_role && filter.card_role.length > 0 && (
        <>
          <Text style={styles.filterText}>역할</Text>
          <View style={styles.elementContainer}>
            {filter.card_role && filter.card_role.map((role, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect('card_role', role)}
                style={selected.card_role[role] ? styles.selectedElement : styles.element}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {selected.card_role[role] && <SelectIcon />}
                  <Text style={selected.card_role[role] ? styles.selectedText : styles.defaultText}>
                    {role}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* 전공 필터 */}
      {filter.card_major && filter.card_major.length > 0 && (
        <>
          <Text style={styles.filterText}>전공</Text>
          <View style={styles.elementContainer}>
            {filter.card_major && filter.card_major.map((major, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect('card_major', major)}
                style={selected.card_major[major] ? styles.selectedElement : styles.element}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {selected.card_major[major] && <SelectIcon />}
                  <Text style={selected.card_major[major] ? styles.selectedText : styles.defaultText}>
                    {major}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* MBTI 필터 */}
      {filter.card_mbti && filter.card_mbti.length > 0 && (
        <>
          <Text style={styles.filterText}>MBTI</Text>
          <View style={styles.elementContainer}>
            {filter.card_mbti && filter.card_mbti.map((mbti, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect('card_mbti', mbti)}
                style={selected.card_mbti[mbti] ? styles.selectedElement : styles.element}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {selected.card_mbti[mbti] && <SelectIcon />}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={selected.card_mbti[mbti] ? styles.selectedText : styles.defaultText}>
                      {mbti}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* 신분 필터 */}
      {filter.card_template && filter.card_template.length > 0 && (
        <>
          <Text style={styles.filterText}>신분</Text>
          <View style={styles.elementContainer}>
            {filter.card_template.map((template, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect('card_template', template)}
                style={selected.card_template[template] ? styles.selectedElement : styles.element}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {selected.card_template[template] && <SelectIcon />}
                  <Text style={selected.card_template[template] ? styles.selectedText : styles.defaultText}>
                    {cardTemplates[template]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>재설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewCardsButton} onPress={handleFilterNext}>
          <Text style={styles.viewCardsButtonText}>해당되는 카드 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// 연락처 저장
function SaveTellScreen({ navigation }) {
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