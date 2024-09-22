import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardViewStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';


export const ListCardView = ({viewOption, cardData, showPlusCardButton}) => {
    const navigation = useNavigation(); 

    const handleNext = () => {
        navigation.navigate('');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <View>
              {cardData.map((item) => (
                <View key={item.id} style={styles.ListContainer}>
                  <TouchableOpacity onPress={handleNext}>
                    <View style={styles.row2}>
                      <View style={[styles.gray, { backgroundColor: item.backgroundColor }]}>
                        <Text> {'\n'}   아바타{'\n'}   이미지</Text>
                      </View>
                      <View style={styles.infoContainer}>
                        <View style={styles.rowName}>
                          <Text style={styles.Text16gray10}>{item.card_name}</Text>
                          <Text style={styles.Text16gray50}>{item.age}</Text>
                        </View>
                        <Text style={styles.Text14gray30}>{item.card_introduce}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
        </View>
        <View style={styles.innerView}></View>
      </ScrollView>
    );
};

