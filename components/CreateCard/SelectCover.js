import { View, Text, TextInput, TouchableOpacity, Platform, Dimensions, ScrollView, Image, Linking, Alert } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function SelectCover({step, setStep, card_cover, handleNext, setCardCover, setProfileImageUrl, setIsPictureComplete}) {

    const [imageWidth, setImageWidth] = useState(0);

    // 이미지 권한 요청을 위한 hooks
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    // 커버
    const handleScroll = (event) => {
        // const contentOffsetX = event.nativeEvent.contentOffset.x;
        // const currentIndex = Math.floor(contentOffsetX / (SCREEN_WIDTH));
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH));
        if (currentIndex == 0) {setCardCover('avatar');}
        else if (currentIndex == 1) {setCardCover('picture');}
    }

    // 갤러리 열기
    const handleImagePicker = async () => {
        // 권한 확인: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if(!status?.granted) {
            const permission = await requestPermission();   // 파일 및 미디어 액세스 권한 요청
            if(!permission.granted) {   // 권한 거부
                Alert.alert(
                    "필수 권한 허용 안내", // 제목
                    "이미지를 게시하려면 설정에서 사진 및 동영상 권한을 허용해 주세요.",   // 메시지
                    [
                      {
                        text: "닫기",
                        onPress: () => console.log("권한 취소"),
                        style: "cancel"
                      },
                      { text: "설정으로 가기", onPress: () => Linking.openSettings() }  // 설정으로 이동
                    ]
                  );
                return null
            }
        }

        // 이미지 업로드
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,    // 어떤 타입의 파일 업로드할지 (이미지만 받기 위해 Images로 설정)
            allowsEditing: true,    // 이미지 업로드 전에 자르기 등의 편집 가능 여부 설정
            quality: 1,     // 이미지 압축 여부(1: 가장 높은 품질)
            // aspect: [1, 1]    // 이미지 비율
        });

        if (!result.canceled) {     // 이미지 업로드
            // console.log(result);
            // console.log(result.assets[0].uri);
            setProfileImageUrl(result.assets[0].uri);
            setIsPictureComplete(true);
        } else {        // 이미지 업로드 취소
            setStep(step);
        }
    }

    return (
        <View style={{height: '100%', backgroundColor: theme.white}}>
            <Text style={styles.coverTitle}>카드 커버를 선택하세요.</Text>
            <Text style={styles.coverSubTitle}>카드 앞면에 커버가 보여요.</Text>   
            <View>
                <ScrollView
                    pagingEnabled
                    horizontal
                    decelerationRate={0}
                    snapToInterval={SCREEN_WIDTH}
                    snapToAlignment={"center"}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.coverScrollView}
                    onScroll={handleScroll}
                >
                    <TouchableOpacity  
                        onPress={() => {
                            handleNext(); 
                            setCardCover("avatar");}}    
                    >
                        <Image 
                            source={require("../../assets/images/cardCover-1.png")}
                            style={[styles.coverImg, {marginLeft: (SCREEN_WIDTH - imageWidth)/2, marginRight:16}]}
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width } = event.nativeEvent.layout;
                                setImageWidth(width);
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            //handleNext(); 
                            setCardCover("picture");
                            handleImagePicker();
                        }}  
                    >
                        <Image 
                            source={require("../../assets/images/cardCover-2.png")}
                            style={[styles.coverImg, {marginRight: (SCREEN_WIDTH - imageWidth)/2}]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.circles}>
                <View 
                    style={[
                        styles.circle,
                        (card_cover === "avatar" || card_cover === '') ? styles.activeCircle : styles.inactiveCircle,
                    ]}
                ></View>
                <View
                    style={[
                        styles.circle,
                        card_cover === "picture" ? styles.activeCircle : styles.inactiveCircle,
                    ]}
                ></View>
            </View>
        </View> 
    );
}