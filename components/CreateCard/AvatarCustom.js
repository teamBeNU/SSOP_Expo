import { View, ScrollView, Text, TouchableOpacity, Image, SafeAreaView, Platform } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";

import { styles } from "./AvatarCustomStyles";
import AutoAvatarIcon from "../../assets/icons/avatarCustom/fa-solid_dice-d6.svg";
import UndoIcon from "../../assets/icons/avatarCustom/ic_undo_small_line.svg";
import RedoIcon from "../../assets/icons/avatarCustom/ic_redo_small_line.svg";
import RestartIcon from "../../assets/icons/avatarCustom/ic_restart_small_line.svg";
import { eyesItems, eyebrowsItems, mouthItems, hairFrontItems, hairBackItems, clothesItems, accItems, bgItems, hairColors, bgColors } from "./avatarItems";

export default function AvatarCustom({setProfileImageUrl, avatar: externalAvatar, setAvatar: externalSetAvatar}) {
    const baseTmbUrl = "https://ssop-bucket.s3.ap-northeast-2.amazonaws.com/avatar/tmb";
    
    const ref = useRef();
    const [a, setA] = useState('');

    const [avaIndex, setAvaIndex] = useState(1);

    // undo, redo
    let undo = useRef([]);
    let redo = useRef([]);

    const [isInit, setIsInit] = useState(false);        // 처음 렌더링 되어 값 지정 되었는지 여부
    const [isSelect, setIsSelect] = useState(false);        // 아이템 선택 여부
    const [isRandom, setIsRandom] = useState(false);        // 랜덤 생성 선택 여부

    // 외부에서 avatar와 setAvatar가 주어지지 않으면, 내부적으로 상태 관리
    const [internalAvatar, SetinternalAvatar] = useState({
        eyes: null,
        eyebrows: null,
        mouth: null,
        hairFront: null,
        hairBack: null,
        hairFrontColor: null,
        hairBackColor: null,
        clothes: null,
        acc: null,
        bg: null,
        bgColor: null,
    });
    // 실제로 사용할 avatar와 setAvatar 결정
    const avatar = externalAvatar ?? internalAvatar;
    const setAvatar = externalSetAvatar ?? SetinternalAvatar;

    // 초기 값 저장
    const [initAvatar, setInitAvatar] = useState({
        eyes: avatar.eyes,
        eyebrows: avatar.eyebrows,
        mouth: avatar.mouth,
        hairFront: avatar.hairFront,
        hairBack: avatar.hairBack,
        hairFrontColor: avatar.hairFrontColor,
        hairBackColor: avatar.hairBackColor,
        clothes: avatar.clothes,
        acc: avatar.acc,
        bg: avatar.bg,
        bgColor: avatar.bgColor,
    });

    useEffect(() => {
        // 처음 렌더링 되었을 때 기본값(기존값)으로 지정
        if (initAvatar.eyes === null || initAvatar.eyes === 0) {     // 초기 eyes가 null이라는 것은 카드 생성에서 아바타커스터마이징에 처음 접근한 것을 의미
            setAvatar((prev => ({...prev, 
                eyes: 1,
                eyebrows: 1,
                mouth: 1,
                hairFront: null,
                hairBack: null,
                hairFrontColor: 1,
                hairBackColor: 1,
                clothes: 1,
                acc: null,
                bg: null,
                bgColor: 1,
            })));
            setIsInit(true);
        } else {      // 화면 이동했다가 다시 돌아왔을 경우 이전에 선택한 데이터를 유지하기 위해
            setAvatar((prev => ({...prev, 
                eyes: initAvatar.eyes,
                eyebrows: initAvatar.eyebrows,
                mouth: initAvatar.mouth,
                hairFront: initAvatar.hairFront,
                hairBack: initAvatar.hairBack,
                hairFrontColor: initAvatar.hairFrontColor,
                hairBackColor: initAvatar.hairBackColor,
                clothes: initAvatar.clothes,
                acc: initAvatar.acc,
                bg: initAvatar.bg,
                bgColor: initAvatar.bgColor,
            })));
            setIsInit(true);
        }
    }, []);

    useEffect(() => {
        if (isInit) {
            undo.current.push(avatar);
            setIsInit(false);
        }
    }, [avatar, isInit])

    // 카테고리 선택
    const handleCategory = (id) => {
        setAvaIndex(id);
    }

    // 초기화
    const handleReset = () => {
        setAvatar((prev => ({...prev, 
            eyes: 1,
            eyebrows: 1,
            mouth: 1,
            hairFront: null,
            hairBack: null,
            hairFrontColor: 1,
            hairBackColor: 1,
            clothes: 1,
            acc: null,
            bg: null,
            bgColor: 1,
        })));

        setIsInit(true);
        redo.current = [];  // redo 초기화
    }

    // 랜덤 생성
    const handleAuto = () => {
        let randEyes = Math.floor(Math.random( ) * eyesItems.length) + 1;
        let randEyebrows = Math.floor(Math.random( ) * eyebrowsItems.length) + 1;
        let randMouth = Math.floor(Math.random( ) * mouthItems.length) + 1;
        let randHairFront = Math.floor(Math.random( ) * hairFrontItems.length) + 1;
        let randHairBack = Math.floor(Math.random( ) * hairBackItems.length) + 1;
        let randHairColor = Math.floor(Math.random( ) * hairColors.length) + 1;
        let randClothes = Math.floor(Math.random( ) * clothesItems.length) + 1;
        // let randAcc = Math.floor(Math.random( ) * accItems.length) + 1;
        // let randBg = Math.floor(Math.random( ) * bgItem.length) + 1;
        let randBgColor = Math.floor(Math.random( ) * bgColors.length) + 1;

        setAvatar((prev => ({...prev, 
            eyes: randEyes,
            eyebrows: randEyebrows,
            mouth: randMouth,
            hairFront: randHairFront,
            hairBack: randHairBack,
            hairFrontColor: randHairColor,
            hairBackColor: randHairColor,
            clothes: randClothes,
            //acc: randAcc,
            //bg: randBg,
            bgColor: randBgColor,
        })));

        setIsRandom(true);
    }
    
    useEffect(() => {
        if (isRandom) {
            undo.current.push(avatar);
            setIsRandom(false);
        }
    }, [avatar, isRandom]);

    // Undo
    const handleUndo = () => {
        if (undo.current.length <= 1) return;   // undo가 비어 있으면 리턴

        redo.current.push(undo.current.pop());              // undo의 마지막 상태를 redo에 추가 (undo 마지막 상태 제거)
        const lastState = undo.current[undo.current.length - 1];  // 제거 후의 마지막 상태 가져오기
        setAvatar(prev => ({...prev, ...lastState}));       // 아바타 적용
    }

    // Redo
    const handleRedo = () => {
        if (redo.current.length === 0) return;  // redo가 비어 있으면 리턴

        let redoPop = redo.current.pop();               // redo의 마지막 상태 반환
        undo.current.push(redoPop);                     // undo에 추가
        setAvatar(prev => ({...prev, ...redoPop}));     // 아바타 적용
    }

    // 아이템 선택
    const handleSelect = () => {
        undo.current.push(avatar);
        redo.current = [];          // redo 초기화
    }

    useEffect(() => {
        if (isSelect) {
            handleSelect();
            setIsSelect(false);
        }
    }, [avatar, isSelect]);

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
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarDo}>
                    <TouchableOpacity onPress={() => handleUndo()}>
                        <UndoIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRedo()}>
                        <RedoIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarAuto}>
                    <TouchableOpacity 
                        style={styles.avatarAutoBtn}
                        onPress={() => handleAuto()}
                    >
                        <AutoAvatarIcon style={styles.autoAvatarIcon} />
                        <Text style={styles.avatarAutoText}>랜덤 생성</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarRestart}>
                    <TouchableOpacity onPress={() => handleReset()}>
                        <RestartIcon />
                    </TouchableOpacity>
                </View>
                <ViewShot 
                    ref={ref}
                    options={{ fileName: "card", format: "png", quality: 1 }}
                >
                    <View style={styles.avatarView}>
                        {/* {hairFrontItems.find(item => item.id === avatar.hairFront) && (
                            <Image source={hairFrontItems.find(item => item.id === avatar.hairFront).image} style={{width: "100%", height: "100%",  position: "absolute", zIndex: 6}} />
                        )}
                        {eyesItems.find(item => item.id === avatar.eyes) && (
                            <Image source={eyesItems.find(item => item.id === avatar.eyes).image} style={{width: "100%", height: "100%",  position: "absolute", zIndex: 5}} />
                        )}
                        {eyebrowsItems.find(item => item.id === avatar.eyebrows) && (
                            <Image source={eyebrowsItems.find(item => item.id === avatar.eyebrows).image} style={{width: "100%", height: "100%",  position: "absolute", zIndex: 4}} />
                        )}
                        <Image
                            source={require('../../assets/avatars/face/face/face-1.png')}
                            style={styles.avatarImg}
                        />
                        {clothesItems.find(item => item.id === avatar.clothes) && (
                            <Image source={clothesItems.find(item => item.id === avatar.clothes).image} style={{width: "100%", height: "100%",  position: "absolute", zIndex: 2}} />
                        )}
                        {hairBackItems.find(item => item.id === avatar.hairBack) && (
                            <Image source={hairBackItems.find(item => item.id === avatar.hairBack).image} style={{width: "100%", height: "100%",  position: "absolute", zIndex: 1}} />
                        )} */}
                        {/* <Image
                            source={{uri: 'https://.png'}} 
                            resizeMode="contain"
                            style={styles.avatarImg}
                        /> */}
                        {/* <Image
                            source={require("../../assets/avatars/sampleAva.png")} 
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
                    {avaIndex === 1 && (        // 이목구비
                        <View>
                            <Text style={styles.avatarItemText}>눈</Text>
                            <View style={styles.avatarItemList}>
                                {eyesItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar(prev => ({ ...prev, eyes: item.id }));
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/eyes/eyes0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.eyes === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>눈썹</Text>
                            <View style={styles.avatarItemList}>
                                {eyebrowsItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar(prev => ({...prev, eyebrows: item.id}));
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/eyebrows/eyebrows0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.eyebrows === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            /> 
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>입모양</Text>
                            <View style={styles.avatarItemList}>
                                {mouthItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar(prev => ({...prev, mouth: item.id}));
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/mouth/mouth0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.mouth === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.marginB100}></View>
                        </View>
                    )}
                    {avaIndex === 2 && (        // 헤어
                        <View>
                            <View style={styles.colorChipContainer}>
                                {hairColors.map(hc => (
                                    <TouchableOpacity 
                                        key={hc.id}
                                        style={[styles.colorChipOn, avatar.hairFrontColor === hc.id ? styles.colorChipOn : styles.colorChipOff]}
                                        onPress={() => {
                                            setAvatar(prev => ({...prev, hairFrontColor: hc.id, hairBackColor: hc.id}));
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={[styles.colorChip, {backgroundColor: hc.color}]}></View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>앞머리</Text>
                            <View style={styles.avatarItemList}>
                                {hairFrontItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar((prev => ({...prev, hairFront: item.id})))
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/hairfront/hairfront0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.hairFront === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>    
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>뒷머리</Text>
                            <View style={styles.avatarItemList}>
                                {hairBackItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar((prev => ({...prev, hairBack: item.id})))
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/hairback/hairback0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.hairBack === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.marginB100}></View>
                        </View>
                    )}
                    {avaIndex === 3 && (        // 옷
                        <View>
                            <View style={styles.avatarItemList}>
                                {clothesItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar((prev => ({...prev, clothes: item.id})))
                                            setIsSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/clothes/clothes0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.clothes === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.marginB100}></View>
                        </View>
                    )}
                    {avaIndex === 4 && (        // 악세사리
                        // 이미지 확인용
                        <>
                            <Image 
                                source={{ uri: a }} 
                                style={{ width: 200, height: 200 }} 
                                onError={(e) => console.log('Error loading image: ', e)}
                            />
                        </>
                        // <View>
                        //     <Text style={styles.avatarItemText}>귀걸이</Text>
                        //     <View style={styles.avatarItemList}>
                        //         {accItems.map(item => (
                        //             <TouchableOpacity
                        //                 key={item.id}
                        //                 onPress={(() => setAvatar((prev => ({...prev, acc: item.id}))))}
                        //                 style={[
                        //                     styles.avatarItems, 
                        //                     avatar.acc === item.id ? styles.itemSelectOn : styles.itemSelectOff,
                        //                 ]}
                        //             >
                        //                 <View style={styles.avatarItem}>
                        //                     <Image source={item.image} style={{width: "100%", height: "100%"}} />
                        //                 </View>    
                        //             </TouchableOpacity>
                        //         ))}
                        //     </View>
                        // </View>
                    )}
                    {avaIndex === 5 && (        // 배경
                        <View>
                            <Text style={styles.avatarItemText}>배경색</Text>
                            <View style={styles.colorChipContainer}>
                                {bgColors.map(bc => (
                                    <TouchableOpacity 
                                        key={bc.id}
                                        style={[styles.colorChipOn, avatar.bgColor === bc.id ? styles.colorChipOn : styles.colorChipOff]}
                                        onPress={() => {
                                            setAvatar((prev => ({...prev, bgColor: bc.id})));
                                            setIsSelect(true);
                                        }}
                                    ><View style={[styles.colorChip, {backgroundColor: bc.color}]}></View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>오브젝트</Text>
                            <View style={styles.avatarItemList}>
                                {/* {bgItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={(() => setAvatar((prev => ({...prev, bg: item.id}))))}
                                        style={[
                                            styles.avatarItems, 
                                            avatar.bg === item.id ? styles.itemSelectOn : styles.itemSelectOff,
                                        ]}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image source={item.image} style={{width: "100%", height: "100%"}} />
                                        </View>    
                                    </TouchableOpacity>
                                ))} */}
                            </View>
                            <View style={styles.marginB100}></View>
                        </View>
                    )}
                </ScrollView>
                {/* <TouchableOpacity onPress={handleNext}>
                    <Text 
                        style={[styles.btnNextText, {backgroundColor: "black"}, {padding: 10}, {width: 200}]}>임시 버튼: 다음으로 넘어가기
                    </Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
}