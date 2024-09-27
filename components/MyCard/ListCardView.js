import { View, Text, ScrollView, Image } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardViewStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { calculateAge } from '../../utils/calculateAge';
import { colorMapping, getColor } from '../../utils/bgColorMapping';

export const ListCardView = ({cardData}) => {
    const navigation = useNavigation(); 

    const handleNext = () => {
        navigation.navigate('카드 상세보기');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <View>
              {cardData.map((item) => (
                <View key={item.cardId} style={styles.ListContainer}>
                  <TouchableOpacity onPress={handleNext}>
                    <View style={styles.row2}>
                      {item.card_cover === 'avatar' ? 
                        <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor)}]}>
                        {/* <Text> {'\n'}   아바타{'\n'}   이미지</Text> */}
                        {/* <Image 
                          source={{ uri: item.profile_image_url }} 
                          resizeMode="cover"
                        /> */}
                        </View>
                        :
                        <View style={[styles.gray]}>

                        </View>                 
                      }
                      
                      <View style={styles.infoContainer}>
                        <View style={styles.rowName}>
                          <Text style={styles.Text16gray10}>{item.cardEssential.card_name}</Text>
                          {item.cardOptional.card_birth ? (
                          <Text style={styles.Text16gray50}>{calculateAge(item.cardOptional.card_birth)}</Text>
                           ) : null}                        
                        </View>
                        <Text style={styles.Text14gray30}>{item.cardEssential.card_introduction}</Text>
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

