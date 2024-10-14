import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostFanFalse({ fanOptional }) {

    const [card_genre, setGenre] = useState('');
    const [card_favorite, setFavorite] = useState('');
    const [card_second, setSecond] = useState('');
    const [card_reason, setReason] = useState('');

    const [showGenre, setShowGenre] = useState(0);
    const [showFavorite, setShowFavorite] = useState(0);
    const [showSecond, setShowSecond] = useState(0);
    const [showReason, setShowReason] = useState(0);

    const genreRef = useRef(null);
    const favoriteRef = useRef(null);
    const secondRef = useRef(null);
    const reasonRef = useRef(null);

    useEffect(() => {
        if (fanOptional) {
            setShowGenre(fanOptional.showGenre);
            setShowFavorite(fanOptional.showFavorite);
            setShowSecond(fanOptional.showSecond);
            setShowReason(fanOptional.showReason);
        }
    }, [fanOptional]);

    return (
        <View style={{ paddingHorizontal: 16 }}>

            {/* 덕질 장르 */}
            {!showGenre && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>덕질 장르</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="덕질 장르를 입력해 주세요. 예)아이돌, 야구 등"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_genre}
                        onChangeText={setGenre}
                        ref={genreRef}
                    />
                </View>
            )}

            {/* 최애 */}
            {!showFavorite && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>최애</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="최애를 입력해 주세요. ex)차은우, 뉴진스 하니"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_favorite}
                        onChangeText={setFavorite}
                        ref={favoriteRef}
                    />
                </View>
            )}

            {/* 차애 */}
            {!showSecond && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>차애</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="차애를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_second}
                        onChangeText={setSecond}
                        ref={secondRef}
                    />
                </View>
            )}

            {/* 입덕 계기 */}
            {!showReason && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>입덕 계기</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="입덕 계기를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_reason}
                        onChangeText={setReason}
                        ref={reasonRef}
                    />
                </View>
            )}
        </View>
    )
}