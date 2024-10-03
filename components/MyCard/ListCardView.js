import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { getColor } from '../../utils/bgColorMapping';
import { calculateAge } from '../../utils/calculateAge';
import { styles } from './CardViewStyle';
import NotSelectedIcon from '../../assets/icons/ic_radioBtn_notSelect.svg';
import SelectedIcon from '../../assets/icons/ic_radioBtn_select.svg';

export const ListCardView = ({cardData, deleteMode, selectedCards, setSelectedCards }) => {
    const navigation = useNavigation(); 

    const handleNext = (cardId) => {
        navigation.navigate('카드 상세보기', { cardId });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {deleteMode ? (
          <View>
          {cardData.map((item) => (
            <View style={styles.deleteContainer}>
              <TouchableOpacity
                  onPress={() => {
                      setSelectedCards((prev) => {
                          if (prev.includes(item.cardId)) {
                              return prev.filter(id => id !== item.cardId);
                          }
                          return [...prev, item.cardId];
                      });
                  }}
                  style={styles.selectIconContainer}
              >
                  {selectedCards.includes(item.cardId) ? (
                      <SelectedIcon />
                  ) : (
                      <NotSelectedIcon />
                  )}
              </TouchableOpacity>
            <View key={item.cardId} style={styles.ListContainer}>
              <TouchableOpacity onPress={() => handleNext(item.cardId)}>
                <View style={styles.row2}>

                  {item.card_cover === 'avatar' ? 
                    <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor)}]}>
                    
                    </View>
                    :
                    <View style={[styles.gray]}>
                      <Image 
                        source={{ uri: item.profile_image_url }} 
                        resizeMode="cover"
                        style={{ width: 64, height: 64, borderRadius: 16, }}
                      />
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
            </View>
          ))}
          </View>
          ) : (
          <View>
          {cardData.map((item) => (
            <View key={item.cardId} style={styles.ListContainer}>
              <TouchableOpacity onPress={() => handleNext(item.cardId)}>
                <View style={styles.row2}>
                  {item.card_cover === 'avatar' ? 
                    <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor)}]}>
                    
                    </View>
                    :
                    <View style={[styles.gray]}>
                      <Image 
                        source={{ uri: item.profile_image_url }} 
                        resizeMode="cover"
                        style={{ width: 64, height: 64, borderRadius: 16, }}
                      />
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
          )}
            
        </View>
        <View style={styles.innerView}></View>
      </ScrollView>
    );
};

