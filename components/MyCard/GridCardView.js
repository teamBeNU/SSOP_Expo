import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { getColor } from '../../utils/bgColorMapping';
import { calculateAge } from '../../utils/calculateAge';
import { getTemplate } from '../../utils/templateMapping';
import { styles } from './CardViewStyle';
import NotSelectedIcon from '../../assets/icons/ic_radioBtn_notSelect.svg';
import SelectedIcon from '../../assets/icons/ic_radioBtn_select.svg';
import { theme } from '../../theme';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const GridCardView = ({cardData, deleteMode, selectedCards, setSelectedCards, selectedOption, refreshData}) => {
    const navigation = useNavigation(); 

    const handleNext = (cardId) => {
      navigation.navigate('카드 상세보기', { cardId, selectedOption });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {deleteMode ? (
          <View style={[styles.row, cardData.length === 1 ? {marginRight: WIDTH*0.45} : {} , {gap: 4}]}>
          {cardData.map((item) => (
            <TouchableOpacity key={item.cardId} style={[styles.btn1, {marginTop: 4}]} onPress={() => {
              setSelectedCards((prev) => {
                  if (prev.includes(item.cardId)) {
                      return prev.filter(id => id !== item.cardId);
                  }
                  return [...prev, item.cardId];
              });
            }}>
                {/* {item.card_cover === 'avatar' ? 
                  (<View style={{...styles.cardImgArea, backgroundColor: getColor(item.avatar.bgColor)}}>
                    {selectedCards.includes(item.cardId) ? (
                      <SelectedIcon style={styles.selectIcon}/>
                  ) : (
                      <NotSelectedIcon style={styles.selectIcon}/>
                  )}
                  </View>)
                  :
                  (
                    <View style={styles.cardImgAreaWrapper}>
                      <Image
                        source={{ uri: item.profile_image_url }}
                        resizeMode="cover"
                        style={styles.cardImgArea}
                      />
                      {selectedCards.includes(item.cardId) ? (
                        <SelectedIcon style={styles.selectIcon} />
                      ) : (
                        <NotSelectedIcon style={styles.selectIcon} />
                      )}
                    </View>
                  )
                }
                 */}
                  <View style={styles.cardImgAreaWrapper}>
                      <Image
                        source={{ uri: item.profile_image_url }}
                        resizeMode="cover"
                        style={styles.cardImgArea}
                      />
                      {selectedCards.includes(item.cardId) ? (
                        <SelectedIcon style={styles.selectIcon} />
                      ) : (
                        <NotSelectedIcon style={styles.selectIcon} />
                      )}
                    </View>
              <View style={styles.cardTextArea}>
                <View style={styles.Info}> 
                    <Text style={styles.name}>{item.cardEssential.card_name}</Text>
                    <Text style={styles.ageText}>·</Text>
                    <View style={styles.age}>
                        {item.cardOptional.card_birth ? 
                        <Text style={styles.ageText}>{calculateAge(item.cardOptional.card_birth)}</Text>
                          : null}
                          {item.cardOptional.card_birth ? 
                          <Text style={styles.ageText}>·</Text>
                          : null}
                        {item.card_template ? <Text style={styles.ageText}>{getTemplate(item.card_template)}</Text> : null}
                    </View>
                </View>

            </View>

            </TouchableOpacity>
          ))}
          </View>    
          ) : (
          <View style={[styles.row, cardData.length === 1 ? {marginRight: WIDTH*0.45} : {} , {gap: 4}]}>
          {cardData.map((item) => (
            <TouchableOpacity key={item.cardId} style={[styles.btn1, {marginTop: 4}]} onPress={() => handleNext(item.cardId)}>
                {/* {item.card_cover === 'avatar' ? 
                  (<View style={{...styles.cardImgArea, backgroundColor: getColor(item.avatar.bgColor)}}>
                  
                  </View>)
                  :
                  (<Image
                        source={{ uri: item.profile_image_url }}
                        resizeMode="cover"
                        style={styles.cardImgArea}
                    />)
                } */}
                <Image
                        source={{ uri: item.profile_image_url }}
                        resizeMode="cover"
                        style={styles.cardImgArea}
                    />
              <View style={styles.cardTextArea}>
                <View style={styles.Info}> 
                    <Text style={styles.name}>{item.cardEssential.card_name}</Text>
                    <Text style={[styles.ageText, {color: theme.gray80}]}>·</Text>
                    <View style={styles.age}>
                        {item.cardOptional.card_birth ? 
                        <Text style={styles.ageText}>{calculateAge(item.cardOptional.card_birth)}</Text>
                          : null}
                          {item.cardOptional.card_birth ? 
                          <Text style={[styles.ageText, {color: theme.gray80}]}>·</Text>
                          : null}
                        {item.card_template ? <Text style={styles.ageText}>{getTemplate(item.card_template)}</Text> : null}
                    </View>
                </View>

            </View>

            </TouchableOpacity>
          ))}
        </View>    
          )}
               
        </View>
        <View style={styles.innerView}></View>
      </ScrollView>
    );
};