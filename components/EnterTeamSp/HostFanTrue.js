import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostFanTrue() {

    const [isEmpty, setIsEmpty] = useState(false);

    const [card_genre, setGenre] = useState('');
    const [card_favorite, setFavorite] = useState('');
    const [card_second, setSecond] = useState('');
    const [card_reason, setReason] = useState('');

    const [showGenre, setShowGenre] = useState(1);
    const [showFavorite, setShowFavorite] = useState(1);
    const [showSecond, setShowSecond] = useState(1);
    const [showReason, setShowReason] = useState(1);

    const emptyGenre = card_genre.trim() === '';
    const emptyFavorite = card_favorite.trim() === '';
    const emptySecond = card_second.trim() === '';
    const emptyReason = card_reason.trim() === '';

    const genreRef = useRef(null);
    const favoriteRef = useRef(null);
    const secondRef = useRef(null);
    const reasonRef = useRef(null);
    return (
        <View>
            <Text style={styles.title}> 팬으로서의 나에 대해 더 알려주세요. </Text>
            <Text style={styles.subtitle}> 호스트가 지정한 필수 정보예요. </Text>

            {/* 덕질 장르 */}
            {showGenre && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>덕질 장르</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyGenre && styles.inputEmpty]}
                        placeholder="덕질 장르를 입력해 주세요. 예)아이돌, 야구 등"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_genre}
                        onChangeText={setGenre}
                        ref={genreRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyGenre && (
                        <Text style={styles.inputEmptyText}> 덕질 장르를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 최애 */}
            {showFavorite && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>최애</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyFavorite && styles.inputEmpty]}
                        placeholder="최애를 입력해 주세요. ex)차은우, 뉴진스 하니"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_favorite}
                        onChangeText={setFavorite}
                        ref={favoriteRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyFavorite && (
                        <Text style={styles.inputEmptyText}> 최애를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 차애 */}
            {showSecond && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>차애</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptySecond && styles.inputEmpty]}
                        placeholder="차애를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_second}
                        onChangeText={setSecond}
                        ref={secondRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptySecond && (
                        <Text style={styles.inputEmptyText}> 차애를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 입덕 계기 */}
            {showReason && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>입덕 계기</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyReason && styles.inputEmpty]}
                        placeholder="입덕 계기를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_reason}
                        onChangeText={setReason}
                        ref={reasonRef}
                    // onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptyReason && (
                        <Text style={styles.inputEmptyText}> 입덕 계기를 입력해 주세요.</Text>
                    )}
                </View>
            )}
        </View>
    )
}