import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

function Space() {
    const navigation = useNavigation();

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1, gap: 30}}>
            <Text>Space</Text>
            <TouchableOpacity onPress={() => navigation.navigate('로그인')}>
                <Text>로그인 테스트</Text>
             </TouchableOpacity>
        </View>
      
    );
  }
  export default Space;