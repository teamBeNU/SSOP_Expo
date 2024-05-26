import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './NotifyStyle';

function Notify({ id, title, onDelete, navigation }) {
    const [isRejected, setIsRejected] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const handleReject = () => {
        setIsRejected(true);
        onDelete(id);
    };

    if (isRejected) {
        return null;
    }

    return (
        <View>
            <View style={[styles.btn1, styles.background]}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={() => console.log("받기 버튼 클릭")}>
                    <Text style={styles.getCard}>받기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReject}>
                    <Text style={styles.refuseCard}>거절</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
        </View>
    );
}

function NotifyItem() {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([
        { id: '1', title: "홍길동 님이 카드를 보냈습니다." },
        { id: '2', title: "홍길동 님이 카드를 보냈습니다." },
        { id: '3', title: "홍길동 님이 카드를 보냈습니다." }
    ]);

    const handleDelete = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const handleTest = () => {
        // notifications 배열을 빈 배열로 설정하여 빈 화면을 보여줌
        setNotifications([]);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {notifications.length === 0 ? (
                <View style={styles.mainlayout}>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.noCard}>주변에 공유할 사람이 없어요.</Text>
                    </View>
                </View>
            ) : (
                notifications.map(notification => (
                <Notify
                key={notification.id}
                id={notification.id}
                title={notification.title}
                onDelete={handleDelete}
                />
                ))
            )}
            <View>
                <View style={styles.btn2}>
                    <Text style={styles.title}>홍길동 님의 카드를 받았습니다. </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('카드 조회')}>
                        <Text style={styles.checkCard}>카드 확인하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
        </ScrollView>
    );
}

export default NotifyItem;
