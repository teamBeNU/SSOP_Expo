import React from "react";
import { View, Text, Button } from "react-native";

function Home({navigation}) {
    return (
        <View>
            <Text>Home</Text>

            <Button 
            title="Bluetooth"
            onPress={() => navigation.navigate('내 카드 보내기')}
            />
            <Button 
            title="CheckCard"
            onPress={() => navigation.navigate('카드 조회')}
            />
            <Button 
            title="CreateTeamSpace"
            onPress={() => navigation.navigate('팀스페이스 생성')}
            />
            <Button 
            title="MyCard"
            onPress={() => navigation.navigate('내 카드')}
            />
        </View>
      
    );
  }
  export default Home;