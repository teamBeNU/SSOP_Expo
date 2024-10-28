import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./SearchCardStyle";
import ListCardsView from '../../components/Bluetooth/ListCardsView.js';
import { ShareCard } from '../../components/Bluetooth/ShareCard.js';

import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from '../../assets/icons/ic_border_all.svg';

function SearchTeamSp({ TeamSpSearch }) {
    const [viewOption, setViewOption] = useState('리스트형');

    return (
        <View style={styles.spaceLayout}>
            {TeamSpSearch && TeamSpSearch.length > 0 ? (
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
                        data={TeamSpSearch} // 팀스페이스에서 검색 결과 배열을 데이터로 설정
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
                                    <TouchableOpacity
                                        style={styles.gridCard}
                                    // onPress={() => {
                                    //     if (item.cardId === undefined) {
                                    //         const matchingMember = TeamSpSearch.find(member => member.userId === item.userId);
                                    //         if (matchingMember) {
                                    //             setModalMemberVisible(true);
                                    //         } else {
                                    //             console.log('해당 사용자의 카드를 조회할 수 없습니다.');
                                    //         }
                                    //     } else {
                                    //         handleCardDetail(item.cardId); // 기존 카드 제출일 경우
                                    //     }
                                    // }}
                                    >
                                        <ShareCard
                                            avatar={
                                                <Image
                                                    source={{ uri: item.profile_image_url }}
                                                    style={styles.gridImage}
                                                />
                                            }
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
            ) : (
                <Text style={styles.text16gray60}>일치하는 결과가 없습니다.</Text>
            )}
        </View>
    )
}

export default SearchTeamSp;
