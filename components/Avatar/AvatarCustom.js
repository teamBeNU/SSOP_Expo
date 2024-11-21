import { View, ScrollView, Text, TouchableOpacity, Image, SafeAreaView, Platform, Dimensions } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AWS_S3_AVATAR_URI, AWS_S3_AVATAR_THUMBNAIL_URI } from '@env';
import "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";

import { styles } from "./AvatarCustomStyles";
import AutoAvatarIcon from "../../assets/icons/avatarCustom/fa-solid_dice-d6.svg";
import UndoIcon from "../../assets/icons/avatarCustom/ic_undo_small_line.svg";
import RedoIcon from "../../assets/icons/avatarCustom/ic_redo_small_line.svg";
import RestartIcon from "../../assets/icons/avatarCustom/ic_restart_small_line.svg";
import { eyesItems, eyebrowsItems, mouthItems, moleItems, hairFrontItems, hairBackItems, clothesItems, accEarItems, accNoseItems, accGlassesItems, accPinItems, accEtcItems, bgItems, bgColors } from "./avatarItems";

const screenWidth = Dimensions.get('window').width; // 화면의 전체 너비

export default function AvatarCustom({avatar: externalAvatar, setAvatar: externalSetAvatar, viewShotRef}) {
    const [avaIndex, setAvaIndex] = useState(1);

    // undo, redo
    let undo = useRef([]);
    let redo = useRef([]);

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
        accEar: null,
        accNose: null,
        accGlasses: null,
        accPin: null,
        accEtc: null,
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
        accEar: avatar.accEar,
        accNose: avatar.accNose,
        accGlasses: avatar.accGlasses,
        accPin: avatar.accPin,
        accEtc: avatar.accEtc,
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
                accEar: null,
                accNose: null,
                accGlasses: null,
                accPin: null,
                accEtc: null,
                bg: null,
                bgColor: 1,
            })));
            setEyesSave(1);
            setEyebrowsSave(1);
            setMouthSave(1);
            setMoleSave(null);
            setClothesSave(1);
            setHairFrontSave(1);
            sethHairBackSave(1);
            setAccEarSave(null);
            setAccNoseSave(null);
            setAccGlassesSave(null);
            setAccPinSave(null);
            setAccEtcSave(null);
            setBgSave(null);
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
                accEar: initAvatar.accEar,
                accNose: initAvatar.accNose,
                accGlasses: initAvatar.accGlasses,
                accPin: initAvatar.accPin,
                accEtc: initAvatar.accEtc,
                bg: initAvatar.bg,
                bgColor: initAvatar.bgColor,
            })));
            setEyesSave(initAvatar.eyes);
            setEyebrowsSave(initAvatar.eyebrows);
            setMouthSave(initAvatar.mouth);
            setMoleSave(initAvatar.mole);
            setClothesSave(initAvatar.clothes);
            setHairFrontSave(initAvatar.hairFront);
            sethHairBackSave(initAvatar.hairBack);
            setAccEarSave(initAvatar.accEar);
            setAccNoseSave(initAvatar.accNose);
            setAccGlassesSave(initAvatar.accGlasses);
            setAccPinSave(initAvatar.accPin);
            setAccEtcSave(initAvatar.accEtc);
            setBgSave(initAvatar.bg);
        }

        setIsUndo(true);

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
        setIsAccEarSelect(true);
        setIsAccNoseSelect(true);
        setIsAccGlassesSelect(true);
        setIsAccPinSelect(true);
        setIsAccEtcSelect(true);
        setIsBgSelect(true);
    }, []);

    // 카테고리 선택
    const handleCategory = (id) => {
        this.scrollView.scrollTo({ y: 0, animated: false });        // 스크롤 최상단으로 이동
        setAvaIndex(id);
    }

    // 초기화 버튼
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
            accEar: null,
            accNose: null,
            accGlasses: null,
            accPin: null,
            accEtc: null,
            bg: null,
            bgColor: 1,
        })));

        setIsUndo(true);

        setEyesSave(1);
        setEyebrowsSave(1);
        setMouthSave(1);
        setMoleSave(null);
        setClothesSave(1);
        setHairFrontSave(1);
        sethHairBackSave(1);
        setAccEarSave(null);
        setAccNoseSave(null);
        setAccGlassesSave(null);
        setAccPinSave(null);
        setAccEtcSave(null);
        setBgSave(null);
        
        setIsMoleCancel(true);
        setIsAccEarCancel(true);
        setIsAccNoseCancel(true);
        setIsAccGlassesCancel(true);
        setIsAccPinCancel(true);
        setIsAccEtcCancel(true);
        setIsBgCancel(true);

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
        setIsAccEarSelect(true);
        setIsAccNoseSelect(true);
        setIsAccGlassesSelect(true);
        setIsAccPinSelect(true);
        setIsAccEtcSelect(true);
        setIsBgSelect(true);
    }

    // 랜덤 생성
    const handleAuto = () => {
        let randEyes = Math.floor(Math.random( ) * eyesItems.length) + 1;
        let randEyebrows = Math.floor(Math.random( ) * eyebrowsItems.length) + 1;
        let randMouth = Math.floor(Math.random( ) * mouthItems.length) + 1;
        let randMole = Math.floor(Math.random( ) * moleItems.length) + 1;
        let randHairFront = Math.floor(Math.random( ) * hairFrontItems.length) + 1;
        let randHairBack = Math.floor(Math.random( ) * hairBackItems.length) + 1;
        // let randHairColor = Math.floor(Math.random( ) * hairColors.length) + 1;
        let randClothes = Math.floor(Math.random( ) * clothesItems.length) + 1;
        let randAccEar = Math.floor(Math.random( ) * accEarItems.length) + 1;
        let randAccNose = Math.floor(Math.random( ) * accNoseItems.length) + 1;
        let randAccGlasses = Math.floor(Math.random( ) * accGlassesItems.length) + 1;
        let randAccPin = Math.floor(Math.random( ) * accPinItems.length) + 1;
        let randAccEtc = Math.floor(Math.random( ) * accEtcItems.length) + 1;
        let randBg = Math.floor(Math.random( ) * bgItems.length) + 1;
        let randBgColor = Math.floor(Math.random( ) * bgColors.length) + 1;

        if (randHairBack === 9) {       // 삭발 여부(삭발이면 앞머리 null)
            randHairFront = null;
        }

        setAvatar((prev => ({...prev, 
            eyes: randEyes,
            eyebrows: randEyebrows,
            mouth: randMouth,
            mole: randMole,
            hairFront: randHairFront,
            hairBack: randHairBack,
            // hairFrontColor: randHairColor,
            // hairBackColor: randHairColor,
            clothes: randClothes,
            accEar: randAccEar,
            accNose: randAccNose,
            accGlasses: randAccGlasses,
            accPin: randAccPin,
            accEtc: randAccEtc,
            bg: randBg,
            bgColor: randBgColor,
        })));
        setEyesSave(randEyes);
        setEyebrowsSave(randEyebrows);
        setMouthSave(randMouth);
        setMoleSave(randMole);
        setClothesSave(randClothes);
        setHairFrontSave(randHairFront);
        sethHairBackSave(randHairBack);
        setAccEarSave(randAccEar);
        setAccNoseSave(randAccNose);
        setAccGlassesSave(randAccGlasses);
        setAccPinSave(randAccPin);
        setAccEtcSave(randAccEtc);
        setBgSave(randBg);

        setIsRandom(true);
        setIsUndo(true);

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
        setIsAccEarSelect(true);
        setIsAccNoseSelect(true);
        setIsAccGlassesSelect(true);
        setIsAccPinSelect(true);
        setIsAccEtcSelect(true);
        setIsBgSelect(true);
    }
    
    // Undo 추가
    useEffect(() => {
        if (isUndo) {
            undo.current.push(avatar);
            redo.current = [];          // redo 초기화
            setIsUndo(false);
        }
    }, [isUndo]);

    // Undo 버튼 클릭
    const handleUndo = () => {
        if (undo.current.length <= 1) return;   // undo가 비어 있으면 리턴

        let popItem = undo.current.pop();
        redo.current.push(popItem);              // undo의 마지막 상태를 redo에 추가 (undo 마지막 상태 제거)
        const lastState = undo.current[undo.current.length - 1];  // 제거 후의 마지막 상태 가져오기
        setAvatar(prev => ({...prev, ...lastState}));       // 아바타 적용

        setEyesSave(lastState.eyes);
        setEyebrowsSave(lastState.eyebrows);
        setMouthSave(lastState.mouth);
        setMoleSave(lastState.mole);
        setClothesSave(lastState.clothes);
        setHairFrontSave(lastState.hairFront);
        sethHairBackSave(lastState.hairBack);
        setAccEarSave(lastState.accEar);
        setAccNoseSave(lastState.accNose);
        setAccGlassesSave(lastState.accGlasses);
        setAccPinSave(lastState.accPin);
        setAccEtcSave(lastState.accEtc);
        setBgSave(lastState.bg);

        setIsFaceSelect(true);
        setIsMoleSelect(true);
        setIsClothesSelect(true);
        setIsHairBackSelect(true);
        setIsAccEarSelect(true);
        setIsAccNoseSelect(true);
        setIsAccGlassesSelect(true);
        setIsAccPinSelect(true);
        setIsAccEtcSelect(true);
        setIsBgSelect(true);
    }

    // Redo 버튼 클릭
    const handleRedo = () => {
        if (redo.current.length > 0) {
            let redoPop = redo.current.pop();               // redo의 마지막 상태 반환
            undo.current.push(redoPop);                     // undo에 추가
            setAvatar(prev => ({...prev, ...redoPop}));     // 아바타 적용

            setIsRedo(true);
            
            setIsFaceSelect(true);
            setIsMoleSelect(true);
            setIsClothesSelect(true);
            setIsHairBackSelect(true);
            setIsAccEarSelect(true);
            setIsAccNoseSelect(true);
            setIsAccGlassesSelect(true);
            setIsAccPinSelect(true);
            setIsAccEtcSelect(true);
            setIsBgSelect(true);
        }
    }

    // 현재 이미지 uri
    const [currentFaceUri, setCurrentFaceUri] = useState(`${AWS_S3_AVATAR_URI}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_${avatar.hairFront}.PNG`);
    const [currentMoleUri, setCurrentMoleUri] = useState(`${AWS_S3_AVATAR_URI}/mole/mole${avatar.mole}.png`);
    const [currentClothesUri, setCurrentClothesUri] = useState(`${AWS_S3_AVATAR_URI}/clothes/clothes${avatar.clothes}${avatar.accEtc === 1 ? '_cat' : avatar.accEtc === 2 ? '_headphon' : ''}.png`);
    const [currentHairBackUri, setCurrentHairBackUri] = useState(`${AWS_S3_AVATAR_URI}/hairback/hairback0${avatar.hairBack}.PNG`);
    const [currentAccEarUri, setCurrentAccEarUri] = useState(`${AWS_S3_AVATAR_URI}/acc/accEar${avatar.accEar}.png`);
    const [currentAccNoseUri, setCurrentAccNoseUri] = useState(`${AWS_S3_AVATAR_URI}/acc/accNose${avatar.accNose}.png`);
    const [currentAccGlassesUri, setCurrentAccGlassesUri] = useState(`${AWS_S3_AVATAR_URI}/acc/accGlasses${avatar.accGlasses}.png`);
    const [currentAccPinUri, setCurrentAccPinUri] = useState(`${AWS_S3_AVATAR_URI}/acc/accPin${avatar.accPin}.png`);
    const [currentBgUri, setCurrentBgUri] = useState(`${AWS_S3_AVATAR_URI}/bgobj/bgobj${avatar.bg}.png`);

    // 다음 이미지 uri
    const [nextFaceUri, setNextFaceUri] = useState(null);
    const [nextMoleUri, setNextMoleUri] = useState(null);
    const [nextClothesUri, setNextClothesUri] = useState(null);
    const [nextHairBackUri, setNextHairBackUri] = useState(null);
    const [nextAccEarUri, setNextAccEarUri] = useState(null);
    const [nextAccNoseUri, setNextAccNoseUri] = useState(null);
    const [nextAccGlassesUri, setNextAccGlassesUri] = useState(null);
    const [nextAccPinUri, setNextAccPinUri] = useState(null);
    const [nextBgUri, setNextBgUri] = useState(null);
    
    // 아이템 선택 여부
    const [isFaceSelect, setIsFaceSelect] = useState(false);            // 얼굴(눈, 눈썹, 입), 앞머리
    const [isMoleSelect, setIsMoleSelect] = useState(false);            // 점
    const [isClothesSelect, setIsClothesSelect] = useState(false);      // 옷
    const [isHairBackSelect, setIsHairBackSelect] = useState(false);    // 뒷머리
    const [isAccEarSelect, setIsAccEarSelect] = useState(false);        // 악세사리 - 귀걸이
    const [isAccNoseSelect, setIsAccNoseSelect] = useState(false);        // 악세사리 - 코 피어싱
    const [isAccGlassesSelect, setIsAccGlassesSelect] = useState(false);        // 악세사리 - 안경
    const [isAccPinSelect, setIsAccPinSelect] = useState(false);        // 악세사리 - 머리핀
    const [isAccEtcSelect, setIsAccEtcSelect] = useState(false);        // 악세사리 - 기타
    const [isBgSelect, setIsBgSelect] = useState(false);    // 배경 오브젝트

    // 이목구비(눈, 눈썹, 입), 앞머리 변화
    const [eyesSave, setEyesSave] = useState(); // 눈 저장
    const [eyebrowsSave, setEyebrowsSave] = useState(); // 눈썹 저장
    const [mouthSave, setMouthSave] = useState(); // 입 저장
    const [hairFrontSave, setHairFrontSave] = useState(); // 앞머리 저장

    const handleEye = (id) => {
        if (eyesSave === id) {  // 중복 선택 X
            return;
        } else {    // 눈 추가
            setAvatar(prev => ({...prev, eyes: id}));
            setEyesSave(id);
            setIsUndo(true);
            setIsFaceSelect(true);
        }
    }

    const handleEyebrows = (id) => {
        if (eyebrowsSave === id) {  // 중복 선택 X
            return;
        } else {    // 눈썹 추가
            setAvatar(prev => ({...prev, eyebrows: id}));
            setEyebrowsSave(id);
            setIsUndo(true);
            setIsFaceSelect(true);
        }
    }

    const handleMouth = (id) => {
        if (mouthSave === id) {  // 중복 선택 X
            return;
        } else {    // 입 추가
            setAvatar(prev => ({...prev, mouth: id}));
            setMouthSave(id);
            setIsUndo(true);
            setIsFaceSelect(true);
        }
    }

    const handleHairFront = (id) => {
        if (hairFrontSave === id) {  // 중복 선택 X
            return;
        } else {    // 앞머리 추가
            if (avatar.hairBack === 9) {
                setAvatar(prev => ({...prev, hairFront: null}));
                setHairFrontSave(null);
            } else {
                setAvatar(prev => ({...prev, hairFront: id}));
                setHairFrontSave(id);
                setIsUndo(true);
                setIsFaceSelect(true);
            }
        }
    }

    useEffect(() => {
        if (isFaceSelect) {
            if ((isRandom || isRedo) && avatar.hairBack === 9) {        // 랜덤 or redo -> 삭발일때
                setNextFaceUri(`${AWS_S3_AVATAR_URI}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_bald.PNG`); 
                setIsRandom(false);
                setIsRedo(false);
            } else {
                if (avatar.hairBack === 9) {
                    setNextFaceUri(`${AWS_S3_AVATAR_URI}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_bald.PNG`);
                } else {
                    setNextFaceUri(`${AWS_S3_AVATAR_URI}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_front0${avatar.hairFront}.PNG`);
                }
            }
            setIsFaceSelect(false);
        }
    }, [isFaceSelect, avatar]);

    const handleCurrentFaceLoad = () => {
        setNextFaceUri(null); // 임시 URI 초기화
    };

    const handleNextFaceLoad = () => {
        setCurrentFaceUri(nextFaceUri); // 새로운 이미지가 완전히 로드된 후 교체
        // setNextFaceUri(null); // 임시 URI 초기화
    };

    // 점 변화
    const [moleSave, setMoleSave] = useState(); // 점 저장
    const [isMoleCancel, setIsMoleCancel] = useState(false); // 점 취소

    const handleMole = (id) => {
        if (moleSave === id) {  // 점 삭제
            setAvatar(prev => ({...prev, mole: null}));
            setIsMoleCancel(true);
            setMoleSave(null);
        } else {    // 점 추가
            setAvatar(prev => ({...prev, mole: id}));
            setIsMoleCancel(false);
            setMoleSave(id);
        }
        setIsUndo(true);
        setIsMoleSelect(true);
    }

    useEffect(() => {
        if (isMoleSelect) {
            if(isMoleCancel || avatar.mole === null) {    // 점 취소
                setNextMoleUri('');
                setCurrentMoleUri('');
                setIsMoleCancel(false);
            } else {
                setNextMoleUri(`${AWS_S3_AVATAR_URI}/mole/mole${avatar.mole}.png`);
            }
            setIsMoleSelect(false);
        }
    }, [isMoleSelect, avatar]);

    const handleNextMoleLoad = () => {
        setCurrentMoleUri(nextMoleUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextMoleUri(null); // 임시 URI 초기화
    };

    // 옷 변화 (+ 악세사리 기타)
    const [clothesSave, setClothesSave] = useState(); // 옷 저장
    const [accEtcSave, setAccEtcSave] = useState(); // 악세사리 저장
    const [isAccEtcCancel, setIsAccEtcCancel] = useState(false); // 악세사리 취소

    const handleClothes = (id) => {
        if (clothesSave === id) {  // 중복 선택 X
            return;
        } else {    // 옷 추가
            setAvatar(prev => ({...prev, clothes: id}));
            setClothesSave(id);
            setIsClothesSelect(true);
            setIsUndo(true);
        }
    }

    const handleAccEtc = (id) => {
        if (accEtcSave === id) {  // 악세사리 삭제
            setAvatar(prev => ({...prev, accEtc: null}));
            setIsAccEtcCancel(true);
            setAccEtcSave(null);
        } else {    // 악세사리 추가
            setAvatar(prev => ({...prev, accEtc: id}));
            setIsAccEtcCancel(false);
            setAccEtcSave(id);
        }
        setIsUndo(true);
        setIsAccEtcSelect(true);
    }

    useEffect(() => {
        let type = "";
        switch(accEtcSave) {
            case 1:     // 고양이
                type = "_cat";
                break;
            case 2:     // 헤드폰
                type = "_headphon";
                break;
            default:
                type = "";
                break;
        }

        if (isClothesSelect || isAccEtcSelect) {
            setNextClothesUri(`${AWS_S3_AVATAR_URI}/clothes/clothes${avatar.clothes}${type}.png`);
            setIsClothesSelect(false);
            setIsAccEtcSelect(false);
        }
    }, [isClothesSelect, isAccEtcSelect, avatar]);

    const handleNextClothesLoad = () => {
        setCurrentClothesUri(nextClothesUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextClothesUri(null); // 임시 URI 초기화
    };

    // 뒷머리 변화
    const [hairBackSave, sethHairBackSave] = useState(); // 뒷머리 저장

    const handleHairBack = (id) => {
        if (hairBackSave === id) {  // 중복 선택 X
            return;
        } else {    // 뒷머리 추가
            if (id === 9) {     // 삭발
                setAvatar(prev => ({ ...prev, hairFront: null }));
                setHairFrontSave(null);
                setNextFaceUri(`${AWS_S3_AVATAR_URI}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_bald.PNG`); 
            } else {        // 삭발 X
                if (hairBackSave === 9) {     // 이전 뒷머리가 삭발일 경우(앞머리 1번으로)
                    setAvatar(prev => ({ ...prev, hairFront: 1 }));
                    setHairFrontSave(1);
                    setNextFaceUri(`${AWS_S3_AVATAR_URI}/face/eye0${avatar.eyes}_brow0${avatar.eyebrows}_mouth0${avatar.mouth}_front01.PNG`);
                }
            }
            setAvatar(prev => ({...prev, hairBack: id}));
            sethHairBackSave(id);
            setIsUndo(true);
            setIsHairBackSelect(true);
        }
    }

    useEffect(() => {
        if (isHairBackSelect) {
            setNextHairBackUri(`${AWS_S3_AVATAR_URI}/hairback/hairback0${avatar.hairBack}.PNG`);
            setIsHairBackSelect(false);
        }
    }, [isHairBackSelect, avatar]);

    const handleNextHairBackLoad = () => {
        setCurrentHairBackUri(nextHairBackUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextHairBackUri(null); // 임시 URI 초기화
    };

    // 배경 오브젝트 변화
    const [bgSave, setBgSave] = useState(); // 배경 오브젝트 저장
    const [isBgCancel, setIsBgCancel] = useState(false); // 배경 오브젝트 취소

    const handleBg = (id) => {
        if (bgSave === id) {  // 배경 오브젝트 삭제
            setAvatar(prev => ({...prev, bg: null}));
            setIsBgCancel(true);
            setBgSave(null);
        } else {    // 배경 오브젝트 추가
            setAvatar(prev => ({...prev, bg: id}));
            setIsBgCancel(false);
            setBgSave(id);
        }
        setIsUndo(true);
        setIsBgSelect(true);
    }

    useEffect(() => {
        if (isBgSelect) {
            if(isBgCancel) {    // 배경 오브젝트 취소
                setNextBgUri('');
                setCurrentBgUri('');
                setIsBgCancel(false);
            } else {
                setNextBgUri(`${AWS_S3_AVATAR_URI}/bgobj/bgobj${avatar.bg}.png`);
            }
            setIsBgSelect(false);
        }
    }, [isBgSelect, avatar]);

    const handleNextBgLoad = () => {
        setCurrentBgUri(nextBgUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextBgUri(null); // 임시 URI 초기화
    };

    // 악세사리(귀걸이) 변화
    const [accEarSave, setAccEarSave] = useState(); // 악세사리 저장
    const [isAccEarCancel, setIsAccEarCancel] = useState(false); // 악세사리 취소

    const handleAccEar = (id) => {
        if (accEarSave === id) {  // 악세사리 삭제
            setAvatar(prev => ({...prev, accEar: null}));
            setIsAccEarCancel(true);
            setAccEarSave(null);
        } else {    // 악세사리 추가
            setAvatar(prev => ({...prev, accEar: id}));
            setIsAccEarCancel(false);
            setAccEarSave(id);
        }
        setIsUndo(true);
        setIsAccEarSelect(true);
    }

    useEffect(() => {
        if (isAccEarSelect) {
            if(isAccEarCancel) {    // 악세사리 취소
                setNextAccEarUri('');
                setCurrentAccEarUri('');
                setIsAccEarCancel(false);
            } else {
                setNextAccEarUri(`${AWS_S3_AVATAR_URI}/acc/accEar${avatar.accEar}.png`);
            }
            setIsAccEarSelect(false);
        }
    }, [isAccEarSelect, avatar]);

    const handleNextAccEarLoad = () => {
        setCurrentAccEarUri(nextAccEarUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextAccEarUri(null); // 임시 URI 초기화
    };

    // 악세사리(코 피어싱) 변화
    const [accNoseSave, setAccNoseSave] = useState(); // 악세사리 저장
    const [isAccNoseCancel, setIsAccNoseCancel] = useState(false); // 악세사리 취소

    const handleAccNose = (id) => {
        if (accNoseSave === id) {  // 악세사리 삭제
            setAvatar(prev => ({...prev, accNose: null}));
            setIsAccNoseCancel(true);
            setAccNoseSave(null);
        } else {    // 악세사리 추가
            setAvatar(prev => ({...prev, accNose: id}));
            setIsAccNoseCancel(false);
            setAccNoseSave(id);
        }
        setIsUndo(true);
        setIsAccNoseSelect(true);
    }

    useEffect(() => {
        if (isAccNoseSelect) {
            if(isAccNoseCancel) {    // 악세사리 취소
                setNextAccNoseUri('');
                setCurrentAccNoseUri('');
                setIsAccNoseCancel(false);
            } else {
                setNextAccNoseUri(`${AWS_S3_AVATAR_URI}/acc/accNose${avatar.accNose}.png`);
            }
            setIsAccNoseSelect(false);
        }
    }, [isAccNoseSelect, avatar]);

    const handleNextAccNoseLoad = () => {
        setCurrentAccNoseUri(nextAccNoseUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextAccNoseUri(null); // 임시 URI 초기화
    };

    // 악세사리(안경) 변화
    const [accGlassesSave, setAccGlassesSave] = useState(); // 악세사리 저장
    const [isAccGlassesCancel, setIsAccGlassesCancel] = useState(false); // 악세사리 취소

    const handleAccGlasses = (id) => {
        if (accGlassesSave === id) {  // 악세사리 삭제
            setAvatar(prev => ({...prev, accGlasses: null}));
            setIsAccGlassesCancel(true);
            setAccGlassesSave(null);
        } else {    // 악세사리 추가
            setAvatar(prev => ({...prev, accGlasses: id}));
            setIsAccGlassesCancel(false);
            setAccGlassesSave(id);
        }
        setIsUndo(true);
        setIsAccGlassesSelect(true);
    }

    useEffect(() => {
        if (isAccGlassesSelect) {
            if(isAccGlassesCancel) {    // 악세사리 취소
                setNextAccGlassesUri('');
                setCurrentAccGlassesUri('');
                setIsAccGlassesCancel(false);
            } else {
                setNextAccGlassesUri(`${AWS_S3_AVATAR_URI}/acc/accGlasses${avatar.accGlasses}.png`);
            }
            setIsAccGlassesSelect(false);
        }
    }, [isAccGlassesSelect, avatar]);

    const handleNextAccGlassesLoad = () => {
        setCurrentAccGlassesUri(nextAccGlassesUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextAccGlassesUri(null); // 임시 URI 초기화
    };

    // 악세사리(머리핀) 변화
    const [accPinSave, setAccPinSave] = useState(); // 악세사리 저장
    const [isAccPinCancel, setIsAccPinCancel] = useState(false); // 악세사리 취소

    const handleAccPin = (id) => {
        if (accPinSave === id) {  // 악세사리 삭제
            setAvatar(prev => ({...prev, accPin: null}));
            setIsAccPinCancel(true);
            setAccPinSave(null);
        } else {    // 악세사리 추가
            setAvatar(prev => ({...prev, accPin: id}));
            setIsAccPinCancel(false);
            setAccPinSave(id);
        }
        setIsUndo(true);
        setIsAccPinSelect(true);
    }

    useEffect(() => {
        if (isAccPinSelect) {
            if(isAccPinCancel) {    // 악세사리 취소
                setNextAccPinUri('');
                setCurrentAccPinUri('');
                setIsAccPinCancel(false);
            } else {
                setNextAccPinUri(`${AWS_S3_AVATAR_URI}/acc/accPin${avatar.accPin}.png`);
            }
            setIsAccPinSelect(false);
        }
    }, [isAccPinSelect, avatar]);

    const handleNextAccPinLoad = () => {
        setCurrentAccPinUri(nextAccPinUri); // 새로운 이미지가 완전히 로드된 후 교체
        setNextAccPinUri(null); // 임시 URI 초기화
    };

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
                    ref={viewShotRef}
                    options={{ fileName: "card", format: "png", quality: 1 }}
                    style={{ zIndex: -1 , backgroundColor:'red', height: screenWidth*0.94}}
                >
                    <View style={styles.avatarView}>
                        
                        {/* 악세사리 - 귀걸이 */}
                        {(avatar.accEar !== null && avatar.accEar !== 0) && (
                            <>
                                <Image                  // 현재 이미지
                                    source={currentAccEarUri ? { uri: currentAccEarUri } : null}
                                    style={[styles.avatarImg, styles.avatarPosition, { zIndex: 67 }]}
                                    fadeDuration={0}
                                />
                                {nextAccEarUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        source={nextAccEarUri ? { uri: nextAccEarUri } : null}
                                        style={[styles.avatarImg, styles.avatarPosition, { zIndex: 66 }]}
                                        onLoad={handleNextAccEarLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}
                        {/* 악세사리 - 코 피어싱 */}
                        {(avatar.accNose !== null && avatar.accNose !== 0) && (
                            <>
                                <Image                  // 현재 이미지
                                    source={currentAccNoseUri ? { uri: currentAccNoseUri } : null}
                                    style={[styles.avatarImg, styles.avatarPosition, { zIndex: 65 }]}
                                    fadeDuration={0}
                                />
                                {nextAccNoseUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        source={nextAccNoseUri ? { uri: nextAccNoseUri } : null}
                                        style={[styles.avatarImg, styles.avatarPosition, { zIndex: 64 }]}
                                        onLoad={handleNextAccNoseLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}
                        {/* 악세사리 - 안경 */}
                        {(avatar.accGlasses !== null && avatar.accGlasses !== 0) && (
                            <>
                                <Image                  // 현재 이미지
                                    source={currentAccGlassesUri ? { uri: currentAccGlassesUri } : null}
                                    style={[styles.avatarImg, styles.avatarPosition, { zIndex: 63 }]}
                                    fadeDuration={0}
                                />
                                {nextAccGlassesUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        source={nextAccGlassesUri ? { uri: nextAccGlassesUri } : null}
                                        style={[styles.avatarImg, styles.avatarPosition, { zIndex: 62 }]}
                                        onLoad={handleNextAccGlassesLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}
                        {/* 악세사리 - 머리핀 */}
                        {(avatar.accPin !== null && avatar.accPin !== 0) && (
                            <>
                                <Image                  // 현재 이미지
                                    source={currentAccPinUri ? { uri: currentAccPinUri } : null}
                                    style={[styles.avatarImg, styles.avatarPosition, { zIndex: 61 }]}
                                    fadeDuration={0}
                                />
                                {nextAccPinUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        source={nextAccPinUri ? { uri: nextAccPinUri } : null}
                                        style={[styles.avatarImg, styles.avatarPosition, { zIndex: 60 }]}
                                        onLoad={handleNextAccPinLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}
                        
                        {/* 점 */}
                        {(avatar.mole !== null && avatar.mole !== 0) && (
                            <>
                                <Image                  // 현재 이미지
                                // source={{ uri: currentMoleUri }}
                                source={currentMoleUri ? { uri: currentMoleUri } : null}
                                style={[styles.avatarImg, styles.molePosition, { zIndex: 51 }]}
                                fadeDuration={0}
                                />
                                {nextMoleUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        // source={{ uri: nextMoleUri }}
                                        source={nextMoleUri ? { uri: nextMoleUri } : null}
                                        style={[styles.avatarImg, styles.molePosition, { zIndex: 50 }]}
                                        onLoad={handleNextMoleLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}

                        {/* 얼굴 */}
                        <Image                  // 현재 이미지
                            source={{ uri: currentFaceUri }}
                            style={[styles.avatarImg, styles.avatarPosition, { zIndex: 41 }]}
                            onLoad={handleCurrentFaceLoad}
                            fadeDuration={0}
                        />
                        {nextFaceUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                            <Image
                                source={{ uri: nextFaceUri }}
                                style={[styles.avatarImg, styles.avatarPosition, { zIndex: 40 }]}
                                onLoad={handleNextFaceLoad}
                                fadeDuration={0}
                            />
                        )}

                        {/* 옷 */}
                        <Image                  // 현재 이미지
                            source={{ uri: currentClothesUri }}
                            style={[styles.avatarClothes, { zIndex: 31 }]}
                            fadeDuration={0}
                        />
                        {nextClothesUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                            <Image
                                source={{ uri: nextClothesUri }}
                                style={[styles.avatarClothes, { zIndex: 30 }]}
                                onLoad={handleNextClothesLoad}
                                fadeDuration={0}
                            />
                        )}

                        {/* 뒷머리 */}
                        {avatar.hairBack !== 9 && (
                            <>
                                <Image                  // 현재 이미지 
                                    source={{ uri: currentHairBackUri }}
                                    style={[styles.avatarImg, styles.avatarPosition, { zIndex: 21 }]}
                                    fadeDuration={0}
                                />
                                {nextHairBackUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        source={{ uri: nextHairBackUri }}
                                        style={[styles.avatarImg, styles.avatarPosition, { zIndex: 20 }]}
                                        onLoad={handleNextHairBackLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}

                        {/* 배경 오브젝트 */}
                        {(avatar.bg !== null && avatar.bg !== 0) && (
                            <>
                                <Image                  // 현재 이미지
                                    source={currentBgUri ? { uri: currentBgUri } : null}
                                    style={[styles.avatarBgObj, { zIndex: 11 }]}
                                    fadeDuration={0}
                                />
                                {nextBgUri && (       // 다음 이미지가 로드될 때까지 숨김 상태
                                    <Image
                                        // source={{ uri: nextMoleUri }}
                                        source={nextBgUri ? { uri: nextBgUri } : null}
                                        style={[styles.avatarBgObj, { zIndex: 10 }]}
                                        onLoad={handleNextBgLoad}
                                        fadeDuration={0}
                                    />
                                )}
                            </>
                        )}

                        <View       // 배경색
                            style={[styles.avatarBg, {backgroundColor: bgColors.find(color => color.id === (avatar.bgColor || 1)).color}]}
                        ></View>
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
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    ref={ref => (this.scrollView = ref)}
                >
                    {avaIndex === 1 && (        // 이목구비
                        <View>
                            <Text style={styles.avatarItemText}>눈</Text>
                            <View style={styles.avatarItemList}>
                                {eyesItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleEye(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/eyes/eyes0${item.id}.png`}}
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
                                            handleEyebrows(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/eyebrows/eyebrows0${item.id}.png`}}
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
                                            handleMouth(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/mouth/mouth0${item.id}.png`}}
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
                                            handleMole(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/mole/mole0${item.id}.png`}}
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
                            {/* <View style={styles.colorChipContainer}>
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
                            </View> */}
                            <Text style={styles.avatarItemText}>앞머리</Text>
                            <View style={styles.avatarItemList}>
                                {hairFrontItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleHairFront(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/hairfront/hairfront0${item.id}.png`}}
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
                                            handleHairBack(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/hairback/hairback0${item.id}.png`}}
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
                                            handleClothes(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/clothes/tmb_clothes${item.id}.png`}}
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
                        <View>
                            <Text style={styles.avatarItemText}>귀걸이</Text>
                            <View style={styles.avatarItemList}>
                                {accEarItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleAccEar(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/acc/tmb_accEar${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.accEar === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>코 피어싱</Text>
                            <View style={styles.avatarItemList}>
                                {accNoseItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleAccNose(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/acc/tmb_accNose${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.accNose === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>안경</Text>
                            <View style={styles.avatarItemList}>
                                {accGlassesItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleAccGlasses(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/acc/tmb_accGlasses${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.accGlasses === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>머리핀</Text>
                            <View style={styles.avatarItemList}>
                                {accPinItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleAccPin(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/acc/tmb_accPin${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.accPin === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>기타</Text>
                            <View style={styles.avatarItemList}>
                                {accEtcItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleAccEtc(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/acc/tmb_accEtc${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.accEtc === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.marginB100}></View>
                        </View>
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
                                            setIsUndo(true);
                                        }}
                                    ><View style={[styles.colorChip, {backgroundColor: bc.color}]}></View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.avatarItemText}>배경 오브젝트</Text>
                            <View style={styles.avatarItemList}>
                                {bgItems.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.avatarItems}
                                        onPress={() => {
                                            handleBg(item.id);
                                        }}
                                    >
                                        <View style={styles.avatarItem}>
                                            <Image
                                                source={{uri: `${AWS_S3_AVATAR_THUMBNAIL_URI}/bgobj/tmb_bgobj${item.id}.png`}}
                                                style={[styles.avatarItemImg, avatar.bg === item.id ? styles.itemSelectOn : styles.itemSelectOff]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.marginB100}></View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}