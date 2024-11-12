import { View, ScrollView, Text, TouchableOpacity, Image, SafeAreaView, Platform } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";

import { styles } from "./AvatarCustomStyles";
import AutoAvatarIcon from "../../assets/icons/avatarCustom/fa-solid_dice-d6.svg";
import UndoIcon from "../../assets/icons/avatarCustom/ic_undo_small_line.svg";
import RedoIcon from "../../assets/icons/avatarCustom/ic_redo_small_line.svg";
import RestartIcon from "../../assets/icons/avatarCustom/ic_restart_small_line.svg";
import { eyesItems, eyebrowsItems, mouthItems, moleItems, hairFrontItems, hairBackItems, clothesItems, accItems, bgItems, hairColors, bgColors } from "./avatarItems";

export default function AvatarCustom({setProfileImageUrl, avatar: externalAvatar, setAvatar: externalSetAvatar, viewShotRef, profileimageurl}) {
    const baseAvtUrl = "https://ssop-bucket.s3.ap-northeast-2.amazonaws.com/avatar/avt";
    const baseTmbUrl = "https://ssop-bucket.s3.ap-northeast-2.amazonaws.com/avatar/tmb";
    const [hairFrontImg, setHairFrontImg] = useState('front01');
    const [isBald, setIsBald] = useState(false);    // 삭발인지 아닌지
    const [isBgColor, setIsBgColor] = useState(false);      // 배경색 변했는지 여부

    const ref = useRef();
    const [a, setA] = useState('');
    const [isCapture, setIsCapture] = useState(false);
    const [isMoleLoad, setIsMoleLoad] = useState(false);
    const [isFaceLoad, setIsFaceLoad] = useState(false);
    const [isClothesLoad, setIsClothesLoad] = useState(false);
    const [isHairBackLoad, setIsHairBackLoad] = useState(false);

    const [avaIndex, setAvaIndex] = useState(1);

    // undo, redo
    let undo = useRef([]);
    let redo = useRef([]);

    const [isInit, setIsInit] = useState(false);        // 처음 렌더링 되어 값 지정 되었는지 여부
    const [isSelect, setIsSelect] = useState(false);        // 아이템 선택 여부
    const [isRandom, setIsRandom] = useState(false);        // 랜덤 생성 선택 여부
    const [isUndo, setIsUndo] = useState(false);            // undo 여부
    const [isRedo, setIsRedo] = useState(false);            // redo 여부

    // 외부에서 avatar와 setAvatar가 주어지지 않으면, 내부적으로 상태 관리
    const [internalAvatar, SetinternalAvatar] = useState({
        eyes: null,
        eyebrows: null,
        mouth: null,
        mole: null,
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
        mole: avatar.mole,
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
                mole: null,
                hairFront: 1,
                hairBack: 1,
                hairFrontColor: 1,
                hairBackColor: 1,
                clothes: 1,
                acc: null,
                bg: null,
                bgColor: 1,
            })));
            // setIsInit(true);
        } else {      // 화면 이동했다가 다시 돌아왔을 경우 이전에 선택한 데이터를 유지하기 위해
            setAvatar((prev => ({...prev, 
                eyes: initAvatar.eyes,
                eyebrows: initAvatar.eyebrows,
                mouth: initAvatar.mouth,
                mole: initAvatar.mole,
                hairFront: initAvatar.hairFront,
                hairBack: initAvatar.hairBack,
                hairFrontColor: initAvatar.hairFrontColor,
                hairBackColor: initAvatar.hairBackColor,
                clothes: initAvatar.clothes,
                acc: initAvatar.acc,
                bg: initAvatar.bg,
                bgColor: initAvatar.bgColor,
            })));
            // setIsInit(true);
        }
        setIsInit(true);

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
    }, []);

    useEffect(() => {
        if (isInit) {
            console.log("초기화!")
            //undo.current.push(avatar);
            setIsInit(false);
        }
    }, [isInit])

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
            mole: null,
            hairFront: 1,
            hairBack: 1,
            hairFrontColor: 1,
            hairBackColor: 1,
            clothes: 1,
            acc: null,
            bg: null,
            bgColor: 1,
        })));

        setIsInit(true);
        redo.current = [];  // redo 초기화

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
    }

    // 랜덤 생성
    const handleAuto = () => {
        let randEyes = Math.floor(Math.random( ) * eyesItems.length) + 1;
        let randEyebrows = Math.floor(Math.random( ) * eyebrowsItems.length) + 1;
        let randMouth = Math.floor(Math.random( ) * mouthItems.length) + 1;
        let randMole = Math.floor(Math.random( ) * moleItems.length) + 1;
        let randHairFront = Math.floor(Math.random( ) * hairFrontItems.length) + 1;
        let randHairBack = Math.floor(Math.random( ) * hairBackItems.length) + 1;
        let randHairColor = Math.floor(Math.random( ) * hairColors.length) + 1;
        let randClothes = Math.floor(Math.random( ) * clothesItems.length) + 1;
        // let randAcc = Math.floor(Math.random( ) * accItems.length) + 1;
        // let randBg = Math.floor(Math.random( ) * bgItem.length) + 1;
        let randBgColor = Math.floor(Math.random( ) * bgColors.length) + 1;

        // 삭발 여부(삭발이면 앞머리 null)
        if (randHairBack === 9) {
            randHairFront = null;
        }

        setAvatar((prev => ({...prev, 
            eyes: randEyes,
            eyebrows: randEyebrows,
            mouth: randMouth,
            mole: randMole,
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
        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
    }
    
    useEffect(() => {
        if (isRandom) {
            undo.current.push(avatar);
            redo.current = [];          // redo 초기화
            setIsRandom(false);
        }
    }, [isRandom]);

    // useEffect(() => {
    //     console.log("11=============================");
    //     console.log("아바타타타타타타: ", avatar)
    //     console.log("Undo11: ", undo);
    //     console.log("Redo11: ", redo);
    //     console.log("=============================");
    // }, [avatar])

    // Undo
    const handleUndo = () => {
        // console.log("=============================");
        // console.log("아바타: ", avatar);
        // console.log("Undo11: ", undo);
        // console.log("Redo11: ", redo);
        if (undo.current.length <= 1) return;   // undo가 비어 있으면 리턴

        let popItem = undo.current.pop();
        console.log("pop: ", popItem);
        redo.current.push(popItem);              // undo의 마지막 상태를 redo에 추가 (undo 마지막 상태 제거)
        const lastState = undo.current[undo.current.length - 1];  // 제거 후의 마지막 상태 가져오기
        setAvatar(prev => ({...prev, ...lastState}));       // 아바타 적용

        setIsUndo(true);

        // console.log("리두-------------------------------");
        // // console.log("아바타: ", avatar)
        // console.log("Undo11: ", undo);
        // console.log("Redo11: ", redo);
        // console.log("-------------------------------");

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
        
        // console.log("Undo22: ", undo);
        // console.log("Redo22: ", redo);
        
        // console.log("=============================");
    }

    // Redo
    const handleRedo = () => {
        // console.log("언두****************************");
        // // console.log("아바타: ", avatar)
        // console.log("Undo11: ", undo);
        // console.log("Redo11: ", redo);
        // console.log("******************************");
        if (redo.current.length > 0) {
            let redoPop = redo.current.pop();               // redo의 마지막 상태 반환
            undo.current.push(redoPop);                     // undo에 추가
            setAvatar(prev => ({...prev, ...redoPop}));     // 아바타 적용

            setIsRedo(true);
            
            setIsFaceSelect(true);
            setIsMoleSelect(true);
            setIsClothesSelect(true);
            setIsHairBackSelect(true);
        }
    }

    // 아이템 선택
    // const handleSelect = () => {
    //     console.log("뭐야ㅑ야야야야야야야ㅑ")
    //     console.log("handleSelect: ", avatar)
    //     undo.current.push(avatar);
    //     redo.current = [];          // redo 초기화
    // }

    useEffect(() => {
        if (isSelect) {
            undo.current.push(avatar);
            
            if (isUndo || isRedo) {       // Undo 또는 Redo 버튼 누를 경우 redo 초기화 하면 안됨
                setIsUndo(false);
                setIsRedo(false);
            } else {
                redo.current = [];          // redo 초기화
            }
            // // handleSelect();
            // undo.current.push(avatar);
            // redo.current = [];          // redo 초기화

            itemDuplication();      // 아이템 중복 선택 확인
            //console.log("isSelect1111111111111")
            setIsSelect(false);
            //console.log("isSelect2222222222 -> 실행안되야함")
        }
    }, [isSelect]);

    // useEffect(() => {
    //     //console.log("이즈 셀렉트: ", isSelect);
    //     if (!isSelect) {  // isSelect 값이 false로 변경된 후 실행
    //         console.log("isSelect 값이 false로 변경됨: ", isSelect);
    //     } else {
    //         console.log("이즈 셀렉트: ", isSelect);
    //     }
    // }, [isSelect]);

    // 이전 아이템 중복 선택 (또는 삭발 시 앞머리 선택) -> undo에 저장X
    const itemDuplication = () => {
        // console.log("중복 삭제 전: ", undo);
        // console.log("undo.current[undo.current.length - 1]: ", undo.current[undo.current.length - 1]);
        // console.log("undo.current[undo.current.length - 2]: ", undo.current[undo.current.length - 2]);

        // JSON.stringify 사용하여 객체를 문자열로 변환하여 비교
        if (JSON.stringify(undo.current[undo.current.length - 1]) === JSON.stringify(undo.current[undo.current.length - 2])) {
            console.log("중복 제거!!!!!")
            undo.current.pop();
        }
        // console.log("중복 삭제 후: ", undo);
    }

    // 컴포넌트 -> 이미지
    // useEffect(() => {
    //     // // 03.초마다 실행 타이머
    //     // const intervalId = setInterval(() => {
    //     //     // ref.current.capture().then(uri => {
    //     //     //     if(Platform.OS === 'ios') {
    //     //     //         uri = `file://${uri}`;
    //     //     //     }
    //     //     //     setProfileImageUrl(uri);
    //     //     //     });
    //     //     // }, [avatar]);
    //     //     ref.current.capture().then(uri => {
    //     //         if (Platform.OS === 'ios') {
    //     //             uri = `file://${uri}`;
    //     //         }
    //     //         setProfileImageUrl(uri);
    //     //         setA(uri);
    //     //     });
    //     // }, 300000); // 300ms = 0.3초
    
    //     // // 클린업 함수: 컴포넌트가 unmount될 때 타이머 정리
    //     // return () => {
    //     //     clearInterval(intervalId);
    //     // };
        

    //     // if (isCapture) {
    //     // // ref.current.capture().then(uri => {
    //     // //     if(Platform.OS === 'ios') {
    //     // //         uri = `file://${uri}`;
    //     // //     }
    //     // //     setProfileImageUrl(uri);
    //     // //     setIsCapture(false);
    //     // //     });
    //     // // }, [avatar]);
    //     //     ref.current.capture().then(uri => {
    //     //         if (Platform.OS === 'ios') {
    //     //             uri = `file://${uri}`;
    //     //         }
    //     //         setProfileImageUrl(uri);
    //     //         setA(uri);
    //     //         setIsCapture(false);
    //     //         console.log('캐캐캐')
    //     //     }).catch(error => {
    //     //         console.error('Capture error:', error);
    //     //         setIsCapture(false);
    //     //     });
    //     // }
        
    //     if (isCapture) {
    //     // ref.current.capture().then(uri => {
    //     //     if(Platform.OS === 'ios') {
    //     //         uri = `file://${uri}`;
    //     //     }
    //     //     setProfileImageUrl(uri);
    //     //     setIsCapture(false);
    //     //     });
    //     // }, [avatar]);
    //         ref.current.capture().then(uri => {
    //             if (Platform.OS === 'ios') {
    //                 uri = `file://${uri}`;
    //             }
    //             setProfileImageUrl(uri);
    //             setA(uri);
    //             // console.log('undo: ', undo)
    //             // console.log('redo: ', redo)
    //             setIsCapture(false);
    //         });
    //     }
    // }, [isCapture]); // avatar와 관계없이 한 번만 실행되도록 빈 배열

    // useEffect(() => {
    //     const avatarCapture = () => {
    //         ref.current.capture().then(uri => {
    //             if (Platform.OS === 'ios') {
    //                 uri = `file://${uri}`;
    //             }
    //             setProfileImageUrl(uri);
    //             setA(uri);
    //             // console.log('undo: ', undo)
    //             // console.log('redo: ', redo)
    //             // setIsCapture(false);
    //             console.log("ㅋㅋ")
    //             // setIsMoleLoad(false);
    //             // setIsFaceLoad(false);
    //             // setIsClothesLoad(false);
    //             // setIsHairBackLoad(false);
    //         }).catch(error => {
    //             console.error("Error capturing view: ", error);
    //         });
    //     }

        
    //     console.log("1==============================");
    //     console.log("isRandom", isRandom);
    //     console.log("isMole", isMoleLoad);
    //     console.log("isFace", isFaceLoad);
    //     console.log("isClothes", isClothesLoad);
    //     console.log("isHairBack", isHairBackLoad);
    //     console.log("==============================");

    //     if (isRandom) {
    //         if (isMoleLoad && isFaceLoad && isClothesLoad && isHairBackLoad) {
    //             avatarCapture();
    //         }
    //     } else if (isSelect) {
    //         if (isMoleLoad || isFaceLoad || isClothesLoad || isHairBackLoad) {
    //             avatarCapture();
    //         }
    //     } else if (isUndo) {
    //         // 다 바뀔 수도 있고 아닐 수도 있는데.. 사실 랜덤도 마찬가지.. 모르겠다. 어어어어
    //         // setIsUndo(false);
    //     } else if (isRedo) {
    //         // setIsRedo(false);
    //     }
    // }, [isMoleLoad, isFaceLoad, isClothesLoad, isHairBackLoad]);

    // 뒷머리 삭발일 경우, 앞머리 아이템 없애기
    // useEffect(() => {
    //     if (avatar.hairFront) {
    //         console.log('뒷머리 삭발')
    //         if (avatar.hairBack === 9) {
    //             setAvatar(prev => ({ ...prev, hairFront: null }));
    //             setIsSelect(true);
    //             setIsBald(true);
    //             setHairFrontImg('bald');
    //             setIsFaceSelect(true);
    //         } else {
    //             if (isBald) {
    //                 setAvatar(prev => ({ ...prev, hairFront: 1 }));
    //                 setIsBald(false);
    //                 setIsFaceSelect(true);
    //             } else {
    //                 setHairFrontImg(`front0${avatar.hairFront}`);
    //                 setIsSelect(true);
    //                 setIsFaceSelect(true);
    //             }
    //         }
    //     }
    // }, [avatar.hairFront, avatar.hairBack, isBald])

    // const handleCapture = useCallback(() => {
    //     ref.current.capture().then(uri => {
    //       console.log("do something with ", uri);
    //       setA(uri);
    //     })
    // }, []);

    // 현재 이미지 uri
    const [currentFaceUri, setCurrentFaceUri] = useState(`${baseAvtUrl}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_${hairFrontImg}.PNG`);
    const [currentMoleUri, setCurrentMoleUri] = useState(`${baseAvtUrl}/mole/mole0${avatar.mole}.png`);
    const [currentClothesUri, setCurrentClothesUri] = useState(`${baseAvtUrl}/clothes/clothes0${avatar.clothes}.png`);
    const [currentHairBackUri, setCurrentHairBackUri] = useState(`${baseAvtUrl}/hairback/hairback0${avatar.hairBack}.PNG`);

    // 다음 이미지 uri
    const [nextFaceUri, setNextFaceUri] = useState(null);
    const [nextMoleUri, setNextMoleUri] = useState(null);
    const [nextClothesUri, setNextClothesUri] = useState(null);
    const [nextHairBackUri, setNextHairBackUri] = useState(null);

    // 다음 이미지 로드 여부
    const [isNextFaceLoaded, setIsNextFaceLoaded] = useState(false);
    const [isNextMoleLoaded, setIsNextMoleLoaded] = useState(false);
    const [isNextClothesLoaded, setIsNextClothesLoaded] = useState(false);
    const [isNextHairBackLoaded, setIsNextHairBackLoaded] = useState(false);
    
    // 아이템 선택 여부
    const [isFaceSelect, setIsFaceSelect] = useState(false);            // 얼굴(눈, 눈썹, 입), 앞머리
    const [isMoleSelect, setIsMoleSelect] = useState(false);            // 점
    const [isClothesSelect, setIsClothesSelect] = useState(false);      // 옷
    const [isHairBackSelect, setIsHairBackSelect] = useState(false);    // 뒷머리

    // 이목구비(눈, 눈썹, 입), 앞머리 변화
    useEffect(() => {
        if (isFaceSelect) {
            //console.log("avatar.hairBack: ", avatar.hairBack)
            const getHairFront = (avatar, isBald) => {
                if (avatar.hairBack === 9) {
                    console.log('1')
                    setAvatar(prev => ({ ...prev, hairFront: null }));
                    setIsBald(true);
                    return 'bald';
                } else {
                    if (isBald) {
                        console.log('2')
                        setAvatar(prev => ({ ...prev, hairFront: 1 }));
                        setIsBald(false);
                        return 'front01';
                    } else {
                        console.log('3')
                        return `front0${avatar.hairFront}`;
                    }
                }
            };
    
            let hairFront = getHairFront(avatar, isBald);
            let faceUri = `${baseAvtUrl}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}`;
    
            if (hairFront === 'bald') {
                faceUri += '_bald.PNG';
            } else {
                faceUri += `_${hairFront}.PNG`;
            }
    
            setHairFrontImg(hairFront);
            setNextFaceUri(faceUri);
            // setIsNextFaceLoaded(false); // 새로운 이미지가 로드될 때까지 로드 상태 초기화
            //console.log("안녕 isSelect: ", isSelect);
            setIsSelect(true);
            setIsFaceSelect(false);
        }
    }, [isFaceSelect, avatar]);

    const handleNextFaceLoad = () => {
        // setIsNextFaceLoaded(true);
        setCurrentFaceUri(nextFaceUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextFaceUri(null); // 임시 URI 초기화
        //console.log('handleNextFaceLoad')
    };

    // 점 변화
    useEffect(() => {
        if (isMoleSelect) {
            //console.log("점!")
            setNextMoleUri(`${baseAvtUrl}/mole/mole0${avatar.mole}.png`);
            setIsSelect(true);
            // setIsNextMoleLoaded(false); // 새로운 이미지가 로드될 때까지 로드 상태 초기화
            setIsMoleSelect(false);
        }
    }, [isMoleSelect, avatar]);

    const handleNextMoleLoad = () => {
        // setIsNextMoleLoaded(true);
        setCurrentMoleUri(nextMoleUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextMoleUri(null); // 임시 URI 초기화
        //console.log('handleNextMoleLoad')
    };

    // 옷 변화
    useEffect(() => {
        if (isClothesSelect) {
            //console.log("옷!")
            setNextClothesUri(`${baseAvtUrl}/clothes/clothes${avatar.clothes}.png`);
            setIsSelect(true);
            // setIsNextClothesLoaded(false); // 새로운 이미지가 로드될 때까지 로드 상태 초기화
            setIsClothesSelect(false);
        }
    }, [isClothesSelect, avatar]);

    const handleNextClothesLoad = () => {
        // setIsNextClothesLoaded(true);
        setCurrentClothesUri(nextClothesUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextClothesUri(null); // 임시 URI 초기화
        //console.log('handleNextClothesLoad')
    };

    // 뒷머리 변화
    useEffect(() => {
        if (isHairBackSelect) {
            if (avatar.hairBack !== 9) {
                //console.log("뒷머리1")
                setNextHairBackUri(`${baseAvtUrl}/hairback/hairback0${avatar.hairBack}.PNG`);
                
            } else if (avatar.hairBack === 9) {
                //console.log("뒷머리2")
                setAvatar(prev => ({ ...prev, hairFront: null }));
                
            }
            setIsFaceSelect(true);
            // setIsSelect(true);
            // setIsNextHairBackLoaded(false); // 새로운 이미지가 로드될 때까지 로드 상태 초기화
            //console.log("뒷머리3")
            setIsHairBackSelect(false);
        }
    }, [isHairBackSelect, avatar]);

    const handleNextHairBackLoad = () => {
        // setIsNextHairBackLoaded(true);
        setCurrentHairBackUri(nextHairBackUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextHairBackUri(null); // 임시 URI 초기화
        //console.log('handleNextHairBackLoad')
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <TouchableOpacity
                    style={{position: "absolute", zIndex: 10, right: 12, marginTop:20, backgroundColor:"red", padding: 10}}
                    onPress={() => {
                        console.log("55=======================================")
                        console.log("아바타: ", avatar);
                        console.log("undo: ", undo);
                        console.log("redo: ", redo);
                        console.log("=======================================")
                    }}
                >
                    <Text>테스트 버튼</Text>
                </TouchableOpacity>
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
                {profileimageurl && (
                    <Image 
                        source={{ uri: profileimageurl }} 
                        style={{ width: 200, height: 200, position: "absolute", zIndex: 100 }} 
                        onError={(e) => console.log('Error loading image: ', e)}
                    />
                )}
                <ViewShot 
                    ref={viewShotRef}
                    options={{ fileName: "card", format: "png", quality: 1 }}
                >
                    <View style={styles.avatarView}>
                        {/* 점 */}
                        <Image                  // 현재 이미지
                            source={{ uri: currentMoleUri }}
                            style={[styles.avatarImg, { zIndex: 8 }]}
                            fadeDuration={0}
                            // onLoad={() => setIsMoleLoad(true)}
                            onLoad={() => {
                                //handleCapture();
                                //setIsRandomLoad(true);
                            }}
                        />
                        {nextMoleUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                            <Image
                                source={{ uri: nextMoleUri }}
                                style={[styles.avatarImg, { zIndex: 7 }]}
                                onLoad={handleNextMoleLoad}
                                fadeDuration={0}
                            />
                        )}

                        {/* 얼굴 */}
                        <Image                  // 현재 이미지
                            source={{ uri: currentFaceUri }}
                            style={[styles.avatarImg, { zIndex: 6 }]}
                            fadeDuration={0}
                            // onLoad={() => {setIsFaceLoad(true);}}
                            onLoad={() => {
                                //handleCapture();
                                //setIsRandomLoad(true);
                            }}
                        />
                        {nextFaceUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                            <Image
                                source={{ uri: nextFaceUri }}
                                style={[styles.avatarImg, { zIndex: 5 }]}
                                onLoad={handleNextFaceLoad}
                                fadeDuration={0}
                            />
                        )}

                        {/* 옷 */}
                        <Image                  // 현재 이미지
                            source={{ uri: currentClothesUri }}
                            style={[styles.avatarImg, { zIndex: 4 }]}
                            fadeDuration={0}
                            // onLoadEnd={() =>{setIsClothesLoad(true);}}
                            onLoad={() => {
                                //handleCapture();
                                //setIsRandomLoad(true);
                            }}
                        />
                        {nextClothesUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                            <Image
                                source={{ uri: nextClothesUri }}
                                style={[styles.avatarImg, { zIndex: 3 }]}
                                onLoad={handleNextClothesLoad}
                                fadeDuration={0}
                            />
                        )}

                        {/* 뒷머리 */}
                        {avatar.hairBack !== 9 && (
                            <>
                                <Image                  // 현재 이미지 
                                    source={{ uri: currentHairBackUri }}
                                    style={[styles.avatarImg, { zIndex: 2 }]}
                                    fadeDuration={0}
                                    // onLoad={() => setIsHairBackLoad(true)}
                                    onLoad={() => {
                                        //handleCapture();
                                        //setIsRandomLoad(true);
                                    }}
                                />
                                {nextHairBackUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        source={{ uri: nextHairBackUri }}
                                        style={[styles.avatarImg, { zIndex: 1 }]}
                                        onLoad={handleNextHairBackLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}

                        <View       // 배경색
                            style={[styles.avatarBg, {backgroundColor: bgColors.find(color => color.id === (avatar.bgColor || 1)).color}]}
                        ></View>

                        {/* <Image      // 점
                            source={{uri: `${baseAvtUrl}/mole/mole0${avatar.mole}.png`}}
                            style={[styles.avatarImg, {zIndex: 5}]}
                            fadeDuration={0}
                        />
                        <Image      // 얼굴
                            source={{uri: `${baseAvtUrl}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_${hairFrontImg}.PNG`}}
                            style={[styles.avatarImg, {zIndex: 4}]}
                            fadeDuration={0}
                            onLoad={handleImageLoad}
                        />
                        <Image      // 기본 얼굴
                            source={{uri: `${baseAvtUrl}/facedefault.PNG`}}
                            style={[styles.avatarImg, {zIndex: 3}]}
                            fadeDuration={0}
                        />
                        <Image      // 옷
                            source={{uri: `${baseAvtUrl}/clothes/clothes0${avatar.clothes}.png`}}
                            style={[styles.avatarImg, {zIndex: 2}]}
                            fadeDuration={0}
                        />
                        <Image      // 뒷머리
                            source={{uri: `${baseAvtUrl}/hairback/hairback0${avatar.hairBack}.PNG`}}
                            style={[styles.avatarImg, {zIndex: 1}]}
                            fadeDuration={0}
                        /> */}
                        
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
                                            // setIsSelect(true);
                                            setIsFaceSelect(true);
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
                                            //setIsSelect(true);
                                            setIsFaceSelect(true);
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
                                            //setIsSelect(true);
                                            setIsFaceSelect(true);
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
                            <Text style={styles.avatarItemText}>점</Text>
                            <View style={styles.avatarItemList}>
                                {moleItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            setAvatar(prev => ({...prev, mole: item.id}));
                                            //setIsSelect(true);
                                            setIsMoleSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/mole/mole0${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.mole === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
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
                                            //setIsSelect(true);
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
                                            // setIsSelect(true);
                                            setIsFaceSelect(true);
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
                                            // setIsSelect(true);
                                            setIsHairBackSelect(true);
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
                                            //setIsSelect(true);
                                            setIsClothesSelect(true);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${baseTmbUrl}/clothes/tmb_clothes${item.id}.png`}}
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
                            {/* <Image 
                                source={{ uri: a }} 
                                style={{ width: 200, height: 200 }} 
                                onError={(e) => console.log('Error loading image: ', e)}
                            /> */}
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
                                            //handleCapture();
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
            </View>
        </SafeAreaView>
    );
}