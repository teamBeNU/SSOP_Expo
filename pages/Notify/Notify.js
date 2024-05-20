import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from './NotifyStyle';

function Notify() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}> 
            <View>
                <View style={styles.btn1}>
                <Text style={styles.title}>홍길동 님이 카드를 보냈습니다. </Text>
                    <TouchableOpacity >
                        <Text style={styles.getCard}>받기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.refuseCard}>거절</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
            <View>
                <View style={styles.btn1}>
                <Text style={styles.title}>홍길동 님이 카드를 보냈습니다. </Text>
                    <TouchableOpacity >
                        <Text style={styles.getCard}>받기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.refuseCard}>거절</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
            <View>
                <View style={styles.btn1}>
                <Text style={styles.title}>홍길동 님이 카드를 보냈습니다. </Text>
                    <TouchableOpacity >
                        <Text style={styles.getCard}>받기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.refuseCard}>거절</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
            <View>
                <View style={styles.btn2}>
                <Text style={styles.title}>홍길동 님의 카드를 받았습니다. </Text>
                    <TouchableOpacity >
                        <Text style={styles.checkCard}>카드 확인하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
        </ScrollView>
      
    );
  }
export default Notify;