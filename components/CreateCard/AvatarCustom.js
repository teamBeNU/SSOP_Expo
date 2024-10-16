import { View, ScrollView, Text, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";

import { styles } from "./AvatarCustomStyles";
import AutoAvatarIcon from "../../assets/icons/avatarCustom/ic_auto.svg";
import UndoIcon from "../../assets/icons/avatarCustom/ic_undo_small_line.svg";
import RedoIcon from "../../assets/icons/avatarCustom/ic_redo_small_line.svg";
import RestartIcon from "../../assets/icons/avatarCustom/ic_restart_small_line.svg";
import { accItems, faceItems, hairItems, objectItems, hairColors, bgColors } from "./avatarItems";

export default function AvatarCustom({setProfileImageUrl, avatar: externalAvatar, setAvatar: externalSetAvatar}) {
    const ref = useRef();
    const [a, setA] = useState('');

    const [avaIndex, setAvaIndex] = useState(1);

    // 외부에서 avatar와 setAvatar가 주어지지 않으면, 내부적으로 상태 관리
    const [internalAvatar, internalSetAvatar] = useState({
        face: null,
        hair: null,
        hairColor: null,
        clothes: null,
        acc: null,
        bg: null,
        bgColor: null,
    });
    // 실제로 사용할 avatar와 setAvatar 결정
    const avatar = externalAvatar ?? internalAvatar;
    const setAvatar = externalSetAvatar ?? internalSetAvatar;

    useEffect(() => {
        // 컴포넌트가 열리자마자 avatar 값을 1로 변경
        setAvatar((prev => ({...prev, face: 1, hair: 1, hairColor: 1, clothes: 1, bg: 1, bgColor: 1})));
    }, []);
    
    // avatar의 속성에 접근하기 전에 null 체크
    const hairColor = avatar?.hairColor ?? 1; // 기본값 설정
    const bgColor = avatar?.bgColor ?? 1; // 기본값 설정

    const handleCategory = (id) => {
        setAvaIndex(id);
    }

    const handleHairColor = (id) => {
        setAvatar((prev => ({...prev, hairColor: id})));
    }

    const handleBgColor = (id) => {
        setAvatar((prev => ({...prev, bgColor: id})));
    }

    // 컴포넌트 -> 이미지
    useEffect(() => {
        // ref.current.capture().then(uri => {
        //     console.log("do something with ", uri);
        //     if(Platform.OS === 'ios') {
        //         uri = `file://${uri}`;
        //     }
        //     setProfileImageUrl(uri);
        //     });
        // }, [avatar]);

        // 이미지 확인용
        ref.current.capture().then(uri => {
            //     console.log("do something with ", uri);
            if(Platform.OS === 'ios') {
                uri = `file://${uri}`;
            }
            setProfileImageUrl(uri);
            setA(uri);
        });
    }, [avatar]);

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarDo}>
                    <TouchableOpacity>
                        <UndoIcon />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <RedoIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarAuto}>
                    <TouchableOpacity style={[styles.flexDirectionRow, {justifyContent: 'center', alignItems: 'center'}]}>
                        <AutoAvatarIcon style={styles.autoAvatarIcon} />
                        <Text style={styles.avatarAutoText}>자동생성</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarRestart}>
                    <TouchableOpacity>
                        <RestartIcon />
                    </TouchableOpacity>
                </View>
                <ViewShot 
                    ref={ref} 
                    options={{ fileName: "card", format: "png", quality: 0.9 }}
                >
                    <View style={styles.avatarView}>
                        {/* <Image
                            source={require("../../assets/images/sample-avatar-1.png")} 
                            resizeMode="contain"
                            style={styles.avatarImg}
                        /> */}
                        <View style={[styles.avatarBg, {backgroundColor: bgColors.find(color => color.id === (avatar.bgColor || 1)).color}]}></View>
                    </View>
                </ViewShot>
                
            </View>
            <View style={styles.avatarItemContainer}>
                <View style={styles.avatarItemCategory}>
                    <TouchableOpacity
                        onPress={() => handleCategory(1)}
                    >
                        <Text style={avaIndex === 1 ? styles.avatarItemCategoryTextOn : styles.avatarItemCategoryTextOff}>이목구비</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory(2)}
                    >
                        <Text style={avaIndex === 2 ? styles.avatarItemCategoryTextOn : styles.avatarItemCategoryTextOff}>헤어</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory(3)}
                    >
                        <Text style={avaIndex === 3 ? styles.avatarItemCategoryTextOn : styles.avatarItemCategoryTextOff}>옷</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory(4)}
                    >
                        <Text style={avaIndex === 4 ? styles.avatarItemCategoryTextOn : styles.avatarItemCategoryTextOff}>악세사리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory(5)}
                    >
                        <Text style={avaIndex === 5 ? styles.avatarItemCategoryTextOn : styles.avatarItemCategoryTextOff}>배경</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {avaIndex === 1 && (
                        <View style={styles.avatarItemList}>
                            {faceItems.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={(() => setAvatar((prev => ({...prev, face: item.id}))))}
                                    style={[
                                        styles.avatarItems, 
                                        avatar.face === item.id ? styles.itemSelectOn : styles.itemSelectOff,
                                    ]}
                                >
                                    <View style={styles.avatarItem}>
                                        {item.svg({ width: '100%', height: '100%', borderRadius: 8 })}
                                    </View>    
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    {avaIndex === 2 && (
                        <View>
                            <View style={styles.colorChipContainer}>
                                {hairColors.map(hc => (
                                    <TouchableOpacity 
                                        key={hc.id}
                                        onPress={(() => handleHairColor(hc.id))}
                                        style={[styles.colorChipOn, avatar.hairColor === hc.id ? styles.colorChipOn : styles.colorChipOff,]}
                                    ><View style={[styles.colorChip, {backgroundColor: hc.color}]}></View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.avatarItemList}>
                                {hairItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={(() => setAvatar((prev => ({...prev, hair: item.id}))))}
                                        style={[
                                            styles.avatarItems, 
                                            avatar.hair === item.id ? styles.itemSelectOn : styles.itemSelectOff,
                                        ]}
                                    >
                                        <View style={styles.avatarItem}>
                                            {item.svg({ width: '100%', height: '100%', borderRadius: 8 })}
                                        </View>    
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                    {avaIndex === 3 && (
                        // <Text>옷</Text>
                        // 이미지 확인용
                        <>
                            <Image 
                                source={{ uri: a }} 
                                style={{ width: 200, height: 200 }} 
                                onError={(e) => console.log('Error loading image: ', e)}
                            />
                        </>
                    )}
                    {avaIndex === 4 && (
                        <View>
                            <Text style={styles.avatarItemText}>귀걸이</Text>
                            <View style={styles.avatarItemList}>
                                {accItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={(() => setAvatar((prev => ({...prev, acc: item.id}))))}
                                        style={[
                                            styles.avatarItems, 
                                            avatar.acc === item.id ? styles.itemSelectOn : styles.itemSelectOff,
                                        ]}
                                    >
                                        <View style={styles.avatarItem}>
                                            {item.svg({ width: '100%', height: '100%', borderRadius: 8 })}
                                        </View>    
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                    {avaIndex === 5 && (
                        <View>
                        <Text style={styles.avatarItemText}>배경색</Text>
                        <View style={styles.colorChipContainer}>
                            {bgColors.map(bc => (
                                <TouchableOpacity 
                                    key={bc.id}
                                    onPress={(() => handleBgColor(bc.id))}
                                    style={[styles.colorChipOn, avatar.bgColor === bc.id ? styles.colorChipOn : styles.colorChipOff,]}
                                ><View style={[styles.colorChip, {backgroundColor: bc.color}]}></View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.avatarItemText}>오브젝트</Text>
                        <View style={styles.avatarItemList}>
                            {objectItems.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={(() => setAvatar((prev => ({...prev, bg: item.id}))))}
                                    style={[
                                        styles.avatarItems, 
                                        avatar.bg === item.id ? styles.itemSelectOn : styles.itemSelectOff,
                                    ]}
                                >
                                    <View style={styles.avatarItem}>
                                        {item.svg({ width: '100%', height: '100%', borderRadius: 8 })}
                                    </View>    
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    )}
                </ScrollView>
                {/* <TouchableOpacity onPress={handleNext}>
                    <Text 
                        style={[styles.btnNextText, {backgroundColor: "black"}, {padding: 10}, {width: 200}]}>임시 버튼: 다음으로 넘어가기
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}