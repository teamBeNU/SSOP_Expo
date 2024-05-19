import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./CheckCardStyle";

function Memo({ navigation }) {
    return (
        <View style={styles.memoContainer}>
            <Text style={styles.memoTitle}>
            기억해야 할 점이나 특별한 점이 있었다면{"\n"}메모해서 나중에 꺼내 보세요.
            </Text>
            <TextInput
             style={styles.memoInput}
             multiline
             placeholder="잊으면 안 되거나 특별했던 부분, 첫인상 등"/>
             <Text style={styles.memoLeng}> 0 / 500 </Text>

             <TouchableOpacity style={styles.memoBtn} onPress={() => navigation.navigate('CheckCard')}>
                <Text style={styles.memoBtnText}>메모 완료하기</Text>
             </TouchableOpacity>
        </View>
    );
}

export default Memo;