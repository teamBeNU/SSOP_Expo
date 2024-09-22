import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardViewStyle';
import { useNavigation } from '@react-navigation/native';

export const GridCardView = ({viewOption, cardData, showPlusCardButton}) => {
    const navigation = useNavigation(); 

    const handleNext = () => {
        navigation.navigate('');
    };
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <View style={[styles.row, styles.container]}>
              {showPlusCardButton && <PlusCardButton navigation={navigation} />}
              {cardData.map((item) => (
                <TouchableOpacity key={item.id} style={styles.btn1} onPress={handleNext}>
                  <item.Component
                    backgroundColor={item.backgroundColor}
                    avatar={item.avatar}
                    card_name={item.card_name}
                    age={item.age}
                    dot={item.dot}
                    card_template={item.card_template} />
                </TouchableOpacity>
              ))}
            </View>       
        </View>
        <View style={styles.innerView}></View>
      </ScrollView>
    );
};