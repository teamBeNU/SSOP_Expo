import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

function Space() {
    const navigation = useNavigation();

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1, gap: 30}}>
            <Text>Space</Text>
        </View>
      
    );
  }
  export default Space;