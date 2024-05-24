import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { styles } from './HomeStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

function Home({navigation}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={styles.mainlayout}>
                <View>
                    <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('카드 만들기')}>
                        <Text style={styles.Text20}>카드 만들기</Text>
                        <Image source={require('../../assets/HomeIcon/CardIcon.png')} style={styles.icon1}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>카드 교환할까?</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('내 카드 보내기')}>
                            <Text style={styles.Text18}>블루투스 송신</Text>
                            <Text style={styles.Text14}>주변에 있다면 바로</Text>
                            <Image source={require('../../assets/HomeIcon/graphic01.png')} style={styles.icon2}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('링크 복사')}>
                            <Text style={styles.Text18}>링크 복사</Text>
                            <Text style={styles.Text14}>연락처가 있다면</Text>
                            <Image source={require('../../assets/HomeIcon/graphic02.png')} style={styles.icon2}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.title}>교환할 사람이 10명보다 많은가요?</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('팀스페이스 입장')}>
                            <Text style={styles.Text18}>팀스페이스 입장</Text>
                            <Text style={styles.Text14}>초대받았다면</Text>
                            <Image source={require('../../assets/HomeIcon/graphic03.png')} style={styles.icon2}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('팀스페이스 생성')}>
                            <Text style={styles.Text18}>팀스페이스 생성</Text>
                            <Text style={styles.Text14}>초대하고 싶다면</Text>
                            <Image source={require('../../assets/HomeIcon/graphic04.png')} style={styles.icon2}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.title}>누구더라?</Text>
                <View>
                    <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('카드 조회')}>
                        <Text style={styles.Text16}>내가 받은 카드 보기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
  }

  // AppBar

//   const Stack = createStackNavigator();

//   function Home() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen 
//                     name="Home" 
//                     component={HomeScreen} 
//                     options={{
//                         headerLeft: () => (
//                             <TouchableOpacity onPress={() => {/* 왼쪽 아이콘에 대한 액션 */}}>
//                                 <Image source={require('../../assets/AppBar/ic_noti_regular_line.png')}/>
//                             </TouchableOpacity>
//                         ),
//                         headerRight: () => (
//                             <TouchableOpacity onPress={() => {/* 오른쪽 아이콘에 대한 액션 */}}>
//                                 <Image source={require('../../assets/AppBar/ic_search_regular_line.png)}/>
//                             </TouchableOpacity>
//                         ),
//                     }}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

  export default Home;
  