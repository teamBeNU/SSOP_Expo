import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostFanTrue({ fanOptional, onDataChange }) {

    const [isEmpty, setIsEmpty] = useState(false);

    const [card_genre, setGenre] = useState('');
    const [card_favorite, setFavorite] = useState('');
    const [card_second, setSecond] = useState('');
    const [card_reason, setReason] = useState('');

    const [showGenre, setShowGenre] = useState(1);
    const [showFavorite, setShowFavorite] = useState(1);
    const [showSecond, setShowSecond] = useState(1);
    const [showReason, setShowReason] = useState(1);

    const genreRef = useRef(null);
    const favoriteRef = useRef(null);
    const secondRef = useRef(null);
    const reasonRef = useRef(null);

    // 상위 컴포넌트(HostTemplate)로 데이터를 전달
    useEffect(() => {
        onDataChange({ card_genre, card_favorite, card_second, card_reason });
    }, [card_genre, card_favorite, card_second, card_reason]);

    useEffect(() => {
        if (fanOptional) {
            setShowGenre(fanOptional.showGenre);
            setShowFavorite(fanOptional.showFavorite);
            setShowSecond(fanOptional.showSecond);
            setShowReason(fanOptional.showReason);
        }
    }, [fanOptional]);

    return (
        <View>
            {/* 덕질 장르 */}
            {showGenre && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>덕질 장르<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="덕질 장르를 입력해 주세요. 예)아이돌, 야구 등"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_genre}
                        onChangeText={setGenre}
                        ref={genreRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 덕질 장르를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 최애 */}
            {showFavorite && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>최애<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="최애를 입력해 주세요. ex)차은우, 뉴진스 하니"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_favorite}
                        onChangeText={setFavorite}
                        ref={favoriteRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 최애를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 차애 */}
            {showSecond && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>차애<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="차애를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_second}
                        onChangeText={setSecond}
                        ref={secondRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 차애를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 입덕 계기 */}
            {showReason && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>입덕 계기<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && styles.inputEmpty]}
                        placeholder="입덕 계기를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_reason}
                        onChangeText={setReason}
                        ref={reasonRef}
                    />
                    {isEmpty && (
                        <Text style={styles.inputEmptyText}> 입덕 계기를 입력해 주세요.</Text>
                    )}
                </View>
            )}
        </View >
    )
}