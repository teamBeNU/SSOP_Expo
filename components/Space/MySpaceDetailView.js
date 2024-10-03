import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../components/Bluetooth/CardViewsStyle.js';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import PlusCardIcon from '../../assets/icons/ic_add_medium_line.svg';
import People from '../../assets/icons/ic_person_small_fill.svg';
import ListIcon from '../../assets/icons/ic_lists.svg';
import AllListIcon from'../../assets/icons/ic_border_all.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const MySpaceDetailView = ({ title, sub, members, navigation, selectedOption, setSelectedOption, viewOption, setViewOption, handleNext, cardData, showPlusCardButton }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.backgroundColor}>
          <View style={styles.backgroundColor2}>
            <Text style={[styles.detailtitle, {marginBottom: 8}]}>{title}</Text>
            <Text style={[styles.detailtitle, {marginBottom: 8}]}>{sub}</Text>
            <View style={styles.leftContainer}>
                  <Text style={styles.detailPeople}>
                    <People /> {members}
                  </Text>
            </View>

            <View>
              <View style={styles.rowRange}>
                {/* 격자형, 리스트형 */}
                <TouchableOpacity
                  onPress={() => setViewOption(viewOption === '격자형' ? '리스트형' : '격자형')}
                  style={styles.iconContainer}>
                  {viewOption === '격자형' ? (
                    <AllListIcon/>
                  ) : (
                    <ListIcon/>
                  )}
                </TouchableOpacity>

                {/* 최신순, 오래된순 */}
                <Menu>
                  <MenuTrigger>
                    <View style={styles.optionButton}>
                      <Text style={styles.range}>{selectedOption}</Text>
                      <DownArrowIcon style={styles.DownArrowIcon} />
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                    <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
                    <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
                  </MenuOptions>
                </Menu>

              </View>
            </View>
          </View>   

            
      <View style={styles.mainlayout}>
        <View>
          {viewOption === '격자형' && (
            <View style={[styles.row, styles.container]}>
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
          )}

          {viewOption === '리스트형' && (
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
          )}
        </View>
        <View style={styles.innerView}></View>
      </View>
    </ScrollView>
  );
};

export default MySpaceDetailView;

