import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { theme } from './theme';

// import {} from './CardInform';

export default function BtnTemplate({id, imgPath, title, description, handleNext}) {
    const temNum = () => {
        switch(id) {
            case 1:
                // 학생
                // navigation.navigate('StudnetCard');
                break;
            case 2:
                // 직장인
                // navigation.navigate('');
                break;
            case 3:
                // 팬
                // navigation.navigate('');
                break;        
            case 4:
                // 자유 생성
                // navigation.navigate('');
                break;
            /* <Button 
                title="go to main" 
                onPress={() => navigation.navigate('CardInform')}
            /> */
            default:
                console.log("ss");    
        }
    }

    return (
        <TouchableOpacity
            style={styles.cell}
            onPress={() => handleNext(id)}
        >
            <Image source={imgPath}/>
            <Text>{title}</Text>
            <Text style={styles.describe}>{description}</Text>
        </TouchableOpacity>
    );
}

// export default function BtnTemplate({navigation}) {
//     return (
//         <View style={styles.container}>
//             <View style={styles.row}>
//                 <TouchableOpacity
//                     style={styles.cell}
//                     onPress={() => navigation.navigate('CardInform')}
//                 >
//                     <Image source={require('./templateIcon/img_student.png')}/>
//                     <Text>학생</Text>
//                     <Text>학교에 다닌다면</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.cell}
//                     onPress={() => alert('직장인')}
//                 >
//                     <Image source={require('./templateIcon/img_worker.png')}/>
//                     <Text>직장인</Text>
//                     <Text>직장에 다닌다면</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.row}>
//                 <TouchableOpacity
//                     style={styles.cell}
//                     onPress={() => alert('팬')}
//                 >
//                     <Image source={require('./templateIcon/img_fan.png')}/>
//                     <Text>팬</Text>
//                     <Text style={styles.description}>아이돌, 배우, 스포츠 등{'\n'}누군가의 팬이라면</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.cell}
//                     onPress={() => alert('자유 생성')}
//                 >
//                     <Image source={require('./templateIcon/img_free.png')}/>
//                     <Text>자유 생성</Text>
//                     <Text style={styles.description}>내 마음대로 카드를{'\n'}만들고 싶다면</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        flex: 1,
        justifyContent: "center", // 수직으로 가운데 정렬
        alignItems: "center", // 수평으로 가운데 정렬
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey95,
        backgroundColor: "white",
        elevation: 5
    },
    title: {

    },
    describe: {
        textAlign: "center"
    }
})