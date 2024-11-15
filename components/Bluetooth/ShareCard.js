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
const cardAspectRatio = 200 / 162; // 전체 카드 비율
const textAreaAspectRatio = 51 / 162; // cardTextArea 비율

export const ShareCard = ({ card_name, card_birth, card_template, card_cover, profile_image_url, isHost }) => {
  return (
    <View
      style={[
        styles.card,
        {
          width: cardWidth,
          height: cardWidth * cardAspectRatio,
        },
      ]}
    >
      <View style={styles.cardImgArea}>
        <Image
          source={{ uri: profile_image_url }}
          resizeMode="cover"
          style={styles.cardImgArea} // 이미지 스타일 적용
        />
      </View>
      {isHost && (
        <View style={styles.DetailcardHost}>
          <Text style={styles.DetailcardFilterText}>호스트</Text>
        </View>
      )}
      <View
        style={[
          styles.cardTextArea,
          {
            width: cardWidth,
            height: cardWidth * textAreaAspectRatio,
          },
        ]}
      >
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
    <TouchableOpacity style={[styles.btn1, { width: cardWidth, height: cardWidth * cardAspectRatio, }]} onPress={() => navigation.navigate('카드 만들기')}>
      <PlusCardIcon />
      <Text style={styles.Text14}>새 카드 만들기</Text>
    </TouchableOpacity>
  );
};