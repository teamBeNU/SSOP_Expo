import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Dimensions, Platform, PermissionsAndroid } from "react-native";
import { styles } from './HomeStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';

import { parseHTMLData } from '../../utils/parseHTMLData';
import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as RNFS from 'react-native-fs';

import CreateCardIcon from '../../assets/HomeIcon/img_banner.svg';
import ArrowIconWhite from '../../assets/HomeIcon/ic_arrow_white.svg';
import ArrowIcon from '../../assets/HomeIcon/ic_arrow.svg';
import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/ic_teamspin.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/ic_teamspnew.svg';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 4) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12
const cardHeight = (cardWidth * 125) / 162;
const cardHeight2 = (cardWidth * 102) / 162;

const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: '파일 접근 권한 요청',
                    message: '이 앱이 파일을 읽을 수 있도록 권한을 부여해 주세요.',
                    buttonNegative: '거부',
                    buttonPositive: '허용',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('파일 읽기 권한이 허용되었습니다.');
                return true;
            } else {
                console.log('파일 읽기 권한이 거부되었습니다.');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return false;
};

const getFile = async () => {
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {
        console.log('파일 권한이 거부되었습니다.');
        return;
    }

    // const filePath = `${RNFS.ExternalStorageDirectoryPath}/Download/bluetooth_content_share.html`;
    const filePath = `/storage/emulated/0/Download/bluetooth_content_share.html`;

    try {
        const fileExists = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        if (fileExists) {
            const fileContent = await FileSystem.readAsStringAsync(filePath);
            console.log('파일 내용:', fileContent);
        } else {
            console.log('파일이 존재하지 않습니다.');
        }
    } catch (error) {
        console.error('파일 읽기 오류:', error);

        //   const fileExists = await RNFS.exists(filePath);
        //   if (fileExists) {
        //     const content = await RNFS.readFile(filePath, 'utf8');
        //     setFileContent(content);  // 상태 업데이트
        //     } else {
        //       console.log('파일이 존재하지 않습니다.');
        //     }
        //   } catch (error) {
        //     console.error('파일 읽기 오류:', error);
    }


}

function Home({ navigation }) {
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        getFile();
    }, [])


    // API 요청 함수
    // const sendApiRequest = async (cardId) => {
    //     try {
    //         const response = await axios.post(`${baseUrl}/card/save?cardId=${cardId}`, {}, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //         });
    //         if (response.status === 200) {
    //             console.log("카드 ID 저장 성공:", response.data.message);
    //         } else {
    //             console.log("카드 ID 저장 실패:", response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('API 요청 오류:', error);
    //     }
    // };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
            <View style={styles.mainlayout}>
                <View>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onLayout={(event) => {
                            const { width, height } = event.nativeEvent.layout;
                            setParentSize({ width, height });
                        }}
                        onPress={() => navigation.navigate('카드 만들기')}
                    >
                        <LinearGradient
                            colors={['#C8FF79', '#AEFC3D']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.btn1}
                        >
                            <Text style={styles.Text23}>자신을 보여주는</Text>
                            <Text style={styles.Text23}>가장 쉬운 방법</Text>
                            <View style={styles.btnCard}>
                                <Text style={styles.TextWhite}>카드 만들기</Text>
                                <ArrowIconWhite style={{ marginLeft: 4 }} />
                            </View>
                            <CreateCardIcon
                                width={Math.max(parentSize.width * 0.7, 160)}
                                height={Math.max(parentSize.height * 0.7, 155)}
                                style={styles.icon1}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerProfileCard}>
                    <View style={styles.folderback2}></View>
                    <View style={styles.folderback}></View>
                    <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('받은 프로필 카드')}>
                        <Text style={styles.Text16}>내가 받은 프로필 카드 확인</Text>
                        <ArrowIcon />
                    </TouchableOpacity>
                </View>
                <View>

                    <Text style={styles.title}>
                        <Text style={styles.title}>프로필 카드 교환하기</Text>
                    </Text>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('내 카드 보내기')}>
                                <View style={styles.btnIcon}>
                                    <BluetoothIcon />
                                </View>
                                <Text style={styles.Text18}>블루투스 공유</Text>
                                <Text style={styles.Text14}>주변에 있다면</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('링크 복사')}>
                                <View style={styles.btnIcon}>
                                    <LinkIcon />
                                </View>
                                <Text style={styles.Text18}>링크 공유</Text>
                                <Text style={styles.Text14}>연락처가 있다면</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.title}>교환할 사람이 많을 땐</Text>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 입장')}>
                                <View style={styles.btnIcon}>
                                    <EnterTeamSPIcon />
                                </View>
                                <Text style={styles.Text18}>팀스페이스 입장</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 생성')}>
                                <View style={styles.btnIcon}>
                                    <CreatTeamSPIcon />
                                </View>
                                <Text style={styles.Text18}>팀스페이스 생성</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 80 }}></View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Home;
