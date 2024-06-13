import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { styles } from './HomeStyle';
import { TouchableOpacity } from "react-native-gesture-handler";

import CreateCardIcon from '../../assets/HomeIcon/CreateCardIcon.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/EnterTeamSPIcon.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/CreatTeamSPIcon.svg';

function Home({navigation}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#F5F8F8'}}>
            <View style={styles.mainlayout}>
                <View>
                    <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('카드 만들기')}>
                        <Text style={styles.Text20}>카드 만들기</Text>
                        <CreateCardIcon style={styles.icon1}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>우리끼리 카드 교환할까?</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('내 카드 보내기')}>
                            <Text style={styles.Text18}>블루투스 송신</Text>
                            <Text style={styles.Text14}>주변에 있다면 바로</Text>
                            <BluetoothIcon style={styles.icon2}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('링크 복사')}>
                            <Text style={styles.Text18}>링크 복사</Text>
                            <Text style={styles.Text14}>연락처가 있다면</Text>
                            <LinkIcon style={styles.icon2}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.title}>단체로 카드 교환할래?</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('팀스페이스 입장')}>
                            <Text style={styles.Text18}>팀스페이스 입장</Text>
                            <Text style={styles.Text14}>초대받았다면</Text>
                            <EnterTeamSPIcon style={styles.icon2}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('팀스페이스 생성')}>
                            <Text style={styles.Text18}>팀스페이스 생성</Text>
                            <Text style={styles.Text14}>초대하고 싶다면</Text>
                            <CreatTeamSPIcon style={styles.icon2}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.title}>누구더라?</Text>
                <View>
                    <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('카드 조회')}>
                        <Text style={styles.Text16}>내가 받은 카드 보기</Text>
                    </TouchableOpacity>
                </View>
                <View>
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
  