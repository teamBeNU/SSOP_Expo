import React from "react";
import { View, Image, FlatList } from "react-native";
import { styles } from "./SearchCardStyle";
import ListCardsView from '../../components/Bluetooth/ListCardsView.js'

function SearchMySpace({ MySpSearch }) {
    return (
        <View style={styles.spaceLayout}>
            <FlatList
                data={MySpSearch} // 팀스페이스에서 검색 결과 배열을 데이터로 설정
                keyExtractor={(item) => item.cardId.toString()} // 카드 ID를 키로 사용
                renderItem={({ item }) => (
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
                            template={item.card_template}
                        />
                    </View>
                )}
            />
        </View>
    )
}
export default SearchMySpace;