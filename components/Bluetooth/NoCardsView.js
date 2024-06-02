import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './CardViewsStyle';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';

const NoCardsView = ({ navigation, title, sub }) => {
  return (
    <View style={styles.mainlayout}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.emptyContainer}>
        <Text style={styles.noCard}>{sub}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('카드 만들기')}>
          <View style={styles.newContainer}>
            <Text style={styles.newCard}>새 카드 만들기</Text>
            <RightIcon />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoCardsView;