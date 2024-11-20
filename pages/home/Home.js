import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { styles } from './HomeStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';

import CreateCardIcon from '../../assets/HomeIcon/homeBanner.png';
import ArrowIconWhite from '../../assets/HomeIcon/ic_arrow_white.svg';
import ArrowIcon from '../../assets/HomeIcon/ic_arrow.svg';
import Folderback from '../../assets/HomeIcon/folderback.svg'
import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/ic_teamspin.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/ic_teamspnew.svg';
import FolderIcon from'../../assets/icons/ic_group_small.svg';
import { theme } from "../../theme";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 4) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12
const cardHeight = (cardWidth * 125) / 162;
const cardHeight2 = (cardWidth * 102) / 162;

function Home({navigation}) {
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

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
                            <Image
                                source={require('../../assets/HomeIcon/homeBanner.png')}
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
                        <ArrowIcon/>
                    </TouchableOpacity>
                </View>
                <View>
                    
                <Text style={styles.title}>
                    <Text style={styles.title}>프로필 카드 공유하기</Text>
                </Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('내 카드 보내기')}>
                            <View style={styles.btnIcon}>
                                <BluetoothIcon/>
                            </View>
                            <Text style={styles.Text18}>블루투스 공유</Text>
                            <Text style={styles.Text14}>주변에 있다면</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('링크 복사')}>
                        <View style={styles.btnIcon}>
                                <LinkIcon/>
                            </View>
                            <Text style={styles.Text18}>링크 공유</Text>
                            <Text style={styles.Text14}>연락처가 있다면</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.title}>사람이 많을 땐 팀스페이스로</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 입장')}>
                            <View style={styles.btnIcon}>
                                <EnterTeamSPIcon/>
                            </View>
                            <Text style={styles.Text18}>팀스페이스 입장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 생성')}>
                            <View style={styles.btnIcon}>
                                <CreatTeamSPIcon/>
                            </View>
                            <Text style={styles.Text18}>팀스페이스 생성</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 80}}></View>
                </View>  
            </View>
        </ScrollView>
    );
  }

  export default Home;
  