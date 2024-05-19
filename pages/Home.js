import React from "react";
import { View, Text, Button } from "react-native";

function Home({navigation}) {
    return (
        <View>
            <Text>Home</Text>

            <Button 
            title="CreateCard"
            onPress={() => navigation.navigate('CreateCard')}
            />
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
            onPress={() => navigation.navigate('CreateTeamSpace')}
            />
            <Button 
            title="MyCard"
            onPress={() => navigation.navigate('MyCard')}
            />
        </View>
      
    );
  }
  export default Home;