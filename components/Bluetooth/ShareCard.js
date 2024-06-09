import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './ShareCardStyle';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import PlusCardIcon from '../../assets/icons/ic_add_small_line_gray.svg';

export const ShareCard = ({ backgroundColor, avatar, host, card_name, age, dot, card_template, filter, selected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor }]}>
            <View style={styles.cardImgArea}>
                {avatar}
            </View>
            {host && (
                <View style={styles.DetailcardHost}>
                    <Text style={styles.DetailcardFilterText}>호스트</Text>
                </View>
            )}
            <View style={styles.cardTextArea}>
                <View style={styles.Info}> 
                    <Text style={styles.name}>{card_name}</Text>
                    <View style={styles.age}>
                        {age ? <Text style={styles.ageText}>{age}</Text> : null}
                        {dot ? <Text style={styles.ageText}>{dot}</Text> : null}
                        {card_template ? <Text style={styles.ageText}>{card_template}</Text> : null}
                    </View>
                </View>
                {filter && (
                    <View style={styles.DetailcardFilter}>
                        <Text style={styles.DetailcardFilterText}>{filter}</Text>
                    </View>
                )}
            </View>

        </TouchableOpacity>
    )
}

const CustomRadioButton = ({ selected, onPress }) => {
    return (
        <View style={[styles.radioContainer, selected && styles.radioContainerSelected]}>
            <TouchableOpacity  onPress={onPress} style={selected ? styles.radioInnerSelected : styles.radioInnerUnselected} />
        </View>
        
    );
};

export const RadioCard = ({ backgroundColor, avatar, host, card_name, age, dot, card_template, filter, selected, onPress }) => {
    const handlePress = () => {
        onPress(); // 라디오 버튼을 눌렀을 때 부모 컴포넌트로부터 전달받은 onPress 핸들러를 호출하여 선택 상태 변경
    };

    return (
        <View style={[styles.card, { backgroundColor }]}>
            <View style={styles.radioButtonContainer}>
                <CustomRadioButton selected={selected} onPress={handlePress} />
            </View>
            <View style={styles.cardImgArea}>
                {avatar}
            </View>
            {host && (
                <View style={styles.DetailcardHost}>
                    <Text style={styles.DetailcardFilterText}>호스트</Text>
                </View>
            )}
            <View style={styles.cardTextArea}>
                <View style={styles.Info}>
                    <Text style={styles.name}>{card_name}</Text>
                    <View style={styles.age}>
                        {age ? <Text style={styles.ageText}>{age}</Text> : null}
                        {dot ? <Text style={styles.ageText}>{dot}</Text> : null}
                        {card_template ? <Text style={styles.ageText}>{card_template}</Text> : null}
                    </View>
                </View>
                {filter && (
                    <View style={styles.DetailcardFilter}>
                        <Text style={styles.DetailcardFilterText}>{filter}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};




export const PlusCardButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('카드 만들기')}>
        <PlusCardIcon/>
        <Text style={styles.Text14}>새 카드 만들기</Text>
      </TouchableOpacity>
    );
  };