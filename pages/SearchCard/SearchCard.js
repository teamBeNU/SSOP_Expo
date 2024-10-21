import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styles } from './SearchCardStyle.js';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import SearchIcon from '../../assets/icons/ic_search_small_line.svg';
import DeleteIcon from '../../assets/icons/ic_delete_all.svg';
import SearchMySpace from './SearchMySpace.js';
import SearchTeamSp from './SearchTeamSp.js';
import ListCardsView from '../../components/Bluetooth/ListCardsView.js'

// const Tab = createMaterialTopTabNavigator();

function SearchCard() {
  const navigation = useNavigation();
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [cardSearch, setCardSearch] = useState([]);
  const [memberSearch, setMemberSearch] = useState([]);
  const [searchWord, setSearchWord] = useState(null);

  // AsyncStorage에서 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const apiUrl = `${baseUrl}/card/search`;
    axios
      .post(apiUrl, { keyword: searchWord }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCardSearch(response.data.cardSearchDto);
        setMemberSearch(response.data.memberSearchDto);
        console.log("마이스페이스 검색 : ", response.data.cardSearchDto);
        console.log("팀스페이스 검색 : ", response.data.memberSearchDto);
      })
      .catch((error) => {
        console.error('카드 검색 API 요청 오류', error.response.data);
      });
  }, [searchWord]);

  const handleSearchInputChange = (text) => {
    setSearchWord(text);
  };

  return (
    <View style={styles.mainLayout}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput style={styles.InputText}
            placeholder="이름을 입력하세요"
            value={searchWord}
            onChangeText={handleSearchInputChange} />
          <TouchableOpacity><DeleteIcon style={styles.deleteIcon} /></TouchableOpacity>
          <TouchableOpacity><SearchIcon style={styles.searchIcon} /></TouchableOpacity>
        </View>
      </View>

      <ListCardsView
        cardData={memberSearch}
        handleNext={handleNext}
        showPlusCardButton={true}
      />

      {/* <Tab.Navigator
                tabBarPosition="bottom"
                tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen name="마이스페이스" component={SearchMySpace} />
                <Tab.Screen name="팀스페이스" component={SearchTeamSp}/>
            </Tab.Navigator> */}

    </View>
  )
}
export default SearchCard;