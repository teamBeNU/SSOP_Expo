import React from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { styles } from './HomeStyle';
import { TouchableOpacity } from "react-native-gesture-handler";

import CreateCardIcon from '../../assets/HomeIcon/CreateCardIcon.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/EnterTeamSPIcon.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/CreatTeamSPIcon.svg';
import FolderIcon from'../../assets/icons/ic_group_small.svg';
import { theme } from "../../theme";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 12) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12
const cardHeight = (cardWidth * 184) / 154; // 184x154 비율에 맞춘 카드 높이

function Home({navigation}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: theme.white}}>
            <View style={styles.mainlayout}>
                <View>
                    <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('카드 만들기')}>
                        <Text style={styles.Text20}>프로필 카드 만들기</Text>
                        <CreateCardIcon style={styles.icon1}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>누구더라?</Text>
                <View>
                    <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('카드 조회')}>
                        <FolderIcon style={{marginRight: 6}}/>
                        <Text style={styles.Text16}>내가 받은 카드 보러가기</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    
                <Text style={styles.title}>
                    <Text style={[styles.title, { color: theme.skyblue }]}>프로필 카드 교환</Text>
                    <Text style={styles.title}>할까?</Text>
                </Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('내 카드 보내기')}>
                            <Text style={styles.Text18}>블루투스 송신</Text>
                            <Text style={styles.Text14}>주변에 있다면 바로</Text>
                            <BluetoothIcon style={styles.icon2}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('링크 복사')}>
                            <Text style={styles.Text18}>링크 공유</Text>
                            <Text style={styles.Text14}>연락처가 있다면</Text>
                            <LinkIcon style={styles.icon2}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.title}>교환할 사람이 많다면?</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('팀스페이스 입장')}>
                            <Text style={styles.Text18}>팀스페이스 입장</Text>
                            <Text style={styles.Text14}>초대받았다면</Text>
                            <EnterTeamSPIcon style={styles.icon2}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('팀스페이스 생성')}>
                            <Text style={styles.Text18}>팀스페이스 생성</Text>
                            <Text style={styles.Text14}>초대하고 싶다면</Text>
                            <CreatTeamSPIcon style={styles.icon2}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity 
                onPress={() => navigation.navigate('로그인')}
                style={{
                    marginVertical: 16,
                    marginHorizontal: 16,
                    padding: 16,
                    backgroundColor: 'white'
                }}
                >
                <Text>로그인 테스트</Text>
                </TouchableOpacity>  
                </View>  
            </View>
        </ScrollView>
    );
  }

  export default Home;
  