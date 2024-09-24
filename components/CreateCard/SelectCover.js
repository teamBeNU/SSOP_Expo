import { View, Text, TextInput, TouchableOpacity, Platform, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function SelectCover({card_cover, handleNext, setCardCover}) {
    
    const [imageWidth, setImageWidth] = useState(0);

    // 커버
    const handleScroll = (event) => {
        // const contentOffsetX = event.nativeEvent.contentOffset.x;
        // const currentIndex = Math.floor(contentOffsetX / (SCREEN_WIDTH));
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH));
        if (currentIndex == 0) {setCardCover('avatar');}
        else if (currentIndex == 1) {setCardCover('picture');}
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
                        onPress={() => {handleNext(); setCardCover("avatar");}}    
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
                            handleNext(); 
                            setCardCover("picture");
                            // handleImagePicker();
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