import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./SearchCardStyle";
import ListCardsView from '../../components/Bluetooth/ListCardsView.js';
import { ShareCard } from '../../components/Bluetooth/ShareCard.js';

import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';

function SearchMySpace({ MySpSearch, searchWord }) {
    const [viewOption, setViewOption] = useState('리스트형');

    useEffect(() => {
    }, [searchWord, MySpSearch]);

    return (
        <View style={styles.spaceLayout}>
            {/* 검색 결과 */}
            {searchWord.length > 0 ? (
                MySpSearch?.length === 0 ? (
                    <Text style={styles.text16gray60}>일치하는 결과가 없습니다.</Text>
                ) : (
                    <>
                        <View style={styles.rightButtonGroup}>
                            {/* 격자형, 리스트형 버튼 */}
                            <TouchableOpacity
                                onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
                                style={styles.iconContainer}
                            >
                                {viewOption === '격자형' ? (
                                    <AllListIcon />
                                ) : (
                                    <ListIcon />
                                )}
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={MySpSearch}
                            keyExtractor={(item) => item.cardId ? item.cardId.toString() : Math.random().toString()} // 카드 ID를 키로 사용
                            numColumns={viewOption === '격자형' ? 2 : 1}
                            key={viewOption}
                            renderItem={({ item }) => (
                                viewOption === '리스트형' ? (
                                    <View style={styles.ListContainer}>
                                        <ListCardsView
                                            avatar={
                                                <Image
                                                    source={{ uri: item.profile_image_url }}
                                                    style={styles.listImage}
                                                />
                                            }
                                            card_name={item.card_name}
                                            card_introduction={item.card_introduction}
                                            card_birth={item.card_birth}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.gridContainer}>
                                        <TouchableOpacity style={styles.gridCard}>
                                            <ShareCard
                                                avatar={item.avatar}
                                                profile_image_url={item.profile_image_url}
                                                card_name={item.card_name}
                                                dot=' · '
                                                card_birth={item.card_birth}
                                                card_template={item.card_template}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            )}
                        />
                    </>
                )
            ) : null}
        </View>
    );
}

export default SearchMySpace;