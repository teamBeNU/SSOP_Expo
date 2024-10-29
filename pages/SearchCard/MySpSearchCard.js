import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styles } from './SearchCardStyle.js';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import SearchIcon from '../../assets/icons/ic_search_small_line.svg';
import DeleteIcon from '../../assets/icons/ic_delete_all.svg';
import SearchMySpace from './SearchMySpace.js';

function MySpSearchCard() {
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
                    console.log("저장한 카드 검색 : ", response.data.savedCardSearchDto);
                })
                .catch((error) => {
                    // console.error('카드 검색 API 요청 오류', error.response.data);
                });
        }
    }, [searchWord, token]); // token 추가


    const handleSearchInputChange = (text) => {
        setSearchWord(text);
    };

    return (
        <View style={styles.mainLayout}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <LeftArrowIcon />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <TextInput style={styles.InputText}
                        placeholder="마이스페이스 폴더 내에서만 검색돼요."
                        value={searchWord}
                        onChangeText={handleSearchInputChange} />
                    {searchWord.length > 0 && ( // 검색어가 있을 때만 DeleteIcon을 보여줌
                        <TouchableOpacity onPress={() => handleSearchInputChange('')}>
                            <DeleteIcon style={styles.deleteIcon} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity><SearchIcon style={styles.searchIcon} /></TouchableOpacity>
                </View>
            </View>

            <SearchMySpace MySpSearch={mySpSearch} />

        </View>
    )
}
export default MySpSearchCard;