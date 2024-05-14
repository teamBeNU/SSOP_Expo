import React from "react";
import { View, Text, Button } from "react-native";

function Home({navigation}) {
    return (
        <View>
            <Text>Home</Text>

            <Button 
            title="Bluetooth"
            onPress={() => navigation.navigate('Bluetooth')}
            />
            <Button 
            title="CheckCard"
            onPress={() => navigation.navigate('CheckCard')}
            />
            <Button 
            title="CreateTeamSpace"
            onPress={() => navigation.navigate('CreateTeamSp')}
            />
            <Button 
            title="MyCard"
            onPress={() => navigation.navigate('MyCard')}
            />
        </View>
      
    );
  }
  export default Home;