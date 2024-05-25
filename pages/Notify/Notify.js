import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from './NotifyStyle';

function Notify({title}) {
    
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleButtonClick = () => {
        setIsButtonClicked(true);
        // 추가 동작 수행
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}> 
            <View>
                <View style={[styles.btn1, !isButtonClicked && styles.background]}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={handleButtonClick}>
                        <Text style={styles.getCard}>받기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleButtonClick}>
                        <Text style={styles.refuseCard}>거절</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
            
        </ScrollView>
      
    );
  }

  function NotifyItem() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Notify title="홍길동 님이 카드를 보냈습니다." />
            <Notify title="홍길동 님이 카드를 보냈습니다." />
            <Notify title="홍길동 님이 카드를 보냈습니다." />
            <View>
                <View style={styles.btn2}>
                <Text style={styles.title}>홍길동 님의 카드를 받았습니다. </Text>
                    <TouchableOpacity>
                        <Text style={styles.checkCard}>카드 확인하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
        </ScrollView>
    );
}

export default NotifyItem;