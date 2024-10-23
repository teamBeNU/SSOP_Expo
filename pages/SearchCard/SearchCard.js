import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styles } from './SearchCardStyle.js';
import { theme } from "../../theme.js";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import SearchIcon from '../../assets/icons/ic_search_small_line.svg';
import DeleteIcon from '../../assets/icons/ic_delete_all.svg';
import SearchMySpace from './SearchMySpace.js';
import SearchTeamSp from './SearchTeamSp.js';

const Tab = createMaterialTopTabNavigator();

function SearchCard() {
  const navigation = useNavigation();
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [mySpSearch, setMySpSearch] = useState([]);
  const [teamSpSearch, setTeamSpSearch] = useState([]);
  const [searchWord, setSearchWord] = useState('');

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
    if (searchWord && token) {
      const apiUrl = `${baseUrl}/card/search`;
      axios
        .post(apiUrl, { keyword: searchWord }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setMySpSearch(response.data.savedCardSearchDto);
          setTeamSpSearch(response.data.teamSpSearchDto);
          console.log("저장한 카드 검색 : ", response.data.savedCardSearchDto);
          console.log("팀스페이스 검색 : ", response.data.teamSpSearchDto);
        })
        .catch((error) => {
          // console.error('카드 검색 API 요청 오류', error.response.data);
        });
    }
  }, [searchWord, token]); // token 추가


  const handleSearchInputChange = (text) => {
    setSearchWord(text);
  };

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.containerTabBar}>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;
  
            const isFocused = state.index === index;
  
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
  
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
  
            return (
              <React.Fragment key={index}>
                <TouchableOpacity
                  onPress={onPress}
                  style={[
                    styles.tab,
                    isFocused ? styles.activeTab : styles.inactiveTab
                  ]}
                >
                  <View style={{ gap: 6, flexDirection: 'row', alignItems: 'center' }}>
                    {label === "마이스페이스"}
                    {label === "팀스페이스"}
                    <Text
                      style={[
                        {
                          color: isFocused && (label === "마이스페이스" || label === "팀스페이스") ? theme.gray30 : theme.gray70,
                          fontFamily: 'PretendardRegular',
                          fontSize: 16,
                          letterSpacing: -1,
                        },
                      ]} >
                      {label}
                    </Text>
                  </View>
                </TouchableOpacity>
                {index === 0 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
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

      <Tab.Navigator
                tabBarPosition="bottom"
                tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen name="마이스페이스"
                children={() => <SearchMySpace MySpSearch={mySpSearch} />} />
                <Tab.Screen name="팀스페이스"
                children={() => <SearchTeamSp TeamSpSearch={teamSpSearch} />} />
            </Tab.Navigator>

    </View>
  )
}
export default SearchCard;