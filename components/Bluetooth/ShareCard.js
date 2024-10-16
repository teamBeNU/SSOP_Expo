import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { theme } from "../../theme";
import { styles } from './ShareCardStyle';
import { useNavigation } from '@react-navigation/native';
import PlusCardIcon from '../../assets/icons/ic_add_small_line_gray.svg';
import { getColor } from '../../utils/bgColorMapping';
import { calculateAge } from '../../utils/calculateAge';
import { getTemplate } from '../../utils/templateMapping';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 12) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12

export const ShareCard = ({ avatar, card_name, card_birth, card_template, card_cover, profile_image_url, isHost }) => {
    return (
      <View style={[styles.card, { backgroundColor: card_cover === 'avatar' ? getColor(avatar.bgColor) : getColor(card_cover), width: cardWidth }]}>
        <View style={styles.cardImgArea}>
          {card_cover === 'avatar' ? (
            <View style={{ backgroundColor: getColor(avatar.bgColor) }}> 
              {/* avatar 렌더링 로직 */}
            </View>
          ) : (
            // picture일 때 profile_image_url을 사용
            <Image
              source={{ uri: profile_image_url }}
              resizeMode="cover"
              style={styles.cardImgArea}
            />
          )}
        </View>
        {isHost && (
          <View style={styles.DetailcardHost}>
            <Text style={styles.DetailcardFilterText}>호스트</Text>
          </View>
        )}
        <View style={styles.cardTextArea}>
          <View style={styles.Info}>
            <Text style={styles.name}>{card_name}</Text>
            <View style={styles.age}>
              {card_birth && <Text style={styles.ageText}>{calculateAge(card_birth)}</Text>}
              {card_birth && card_template && <Text style={styles.ageText}>·</Text>}
              {card_template && <Text style={styles.ageText}>{getTemplate(card_template)}</Text>}
            </View>
          </View>
        </View>
      </View>
    );
  };


export const PlusCardButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity style={[styles.btn1, { width: cardWidth }]} onPress={() => navigation.navigate('카드 만들기')}>
        <PlusCardIcon/>
        <Text style={styles.Text14}>새 카드 만들기</Text>
      </TouchableOpacity>
    );
  };