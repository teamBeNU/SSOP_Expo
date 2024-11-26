import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostFanTrue({ fanOptional, onData, onDataChange, isNextClick, setIsNextClick, setStep }) {

    const [isEmpty, setIsEmpty] = useState({
        genre: true,
        favorite: true,
        second: true,
        reason: true,
    });
    const [isOk, setIsOk] = useState({
        genre: true,
        favorite: true,
        second: true,
        reason: true,
    });

    const [card_genre, setGenre] = useState(onData?.card_genre || '');
    const [card_favorite, setFavorite] = useState(onData?.card_favorite || '');
    const [card_second, setSecond] = useState(onData?.card_second || '');
    const [card_reason, setReason] = useState(onData?.card_reason || '');

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

    // 질문 입력했는지 여부
    useEffect(() => {
        setIsNextClick(false);
        setIsEmpty({
            genre: card_genre === '' ? true : false,
            favorite: card_favorite === '' ? true : false,
            second: card_second === '' ? true : false,
            reason: card_reason === '' ? true : false,
        });
    }, []);
    
    const handleEmpty = (key, value) => {
        setIsEmpty((prev) => ({ ...prev, [key]: value === '' }));
    };
    
    // 다음으로 버튼
    useEffect(() => {
        if (isNextClick) {
            let genreOk = !showGenre || !isEmpty.genre;
            let favoriteOk = !showFavorite || !isEmpty.favorite;
            let secondOk = !showSecond || !isEmpty.second;
            let reasonOk = !showReason || !isEmpty.reason;
    
            setIsOk({
                genre: genreOk,
                favorite: favoriteOk,
                second: secondOk,
                reason: reasonOk,
            })

            if (genreOk && favoriteOk && secondOk && reasonOk) {
                setStep(4);
            }
    
            setIsNextClick(false);
        }
    }, [isNextClick, showGenre, showFavorite, showSecond, showReason, isEmpty]);
    
    return (
        <View>
            {/* 덕질 장르 */}
            {showGenre && (
                <View style={styles.nameContainer}>
                    <Text>{isNextClick ? 'true' : 'false'}</Text>
                    <Text>{isEmpty.genre ? 'true' : 'false'}</Text>
                    <Text>{isOk.genre ? 'true' : 'false'}</Text>
                    <Text style={styles.nameBold}>덕질 장르<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.genre && styles.inputEmpty]}
                        placeholder="덕질 장르를 입력해 주세요. 예)아이돌, 야구 등"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_genre}
                        onChangeText={(text) => {setGenre(text); handleEmpty('genre', text);}}
                        ref={genreRef}
                    />
                    {!isOk.genre && (
                        <Text style={styles.inputEmptyText}> 덕질 장르를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 최애 */}
            {showFavorite && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>최애<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.favorite && styles.inputEmpty]}
                        placeholder="최애를 입력해 주세요. ex)차은우, 뉴진스 하니"
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_favorite}
                        onChangeText={(text) => {setFavorite(text); handleEmpty('favorite', text);}}
                        ref={favoriteRef}
                    />
                    {!isOk.favorite && (
                        <Text style={styles.inputEmptyText}> 최애를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 차애 */}
            {showSecond && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>차애<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.second && styles.inputEmpty]}
                        placeholder="차애를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_second}
                        onChangeText={(text) => {setSecond(text); handleEmpty('second', text);}}
                        ref={secondRef}
                    />
                    {!isOk.second && (
                        <Text style={styles.inputEmptyText}> 차애를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 입덕 계기 */}
            {showReason && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>입덕 계기<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.reason && styles.inputEmpty]}
                        placeholder="입덕 계기를 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_reason}
                        onChangeText={(text) => {setReason(text); handleEmpty('reason', text);}}
                        ref={reasonRef}
                    />
                    {!isOk.reason && (
                        <Text style={styles.inputEmptyText}> 입덕 계기를 입력해 주세요.</Text>
                    )}
                </View>
            )}
        </View >
    )
}