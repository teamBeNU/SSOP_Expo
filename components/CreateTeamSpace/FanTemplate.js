
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import "react-native-gesture-handler";
import Select from "../../assets/teamSp/select.svg";

export default function FanTemplate({ onVisibilityUpdate }) {
  // 팬 정보
  const [visibility, setVisibility] = useState({
    showGenre: false,
    showFavorite: false,
    showSecond: false,
    showReason: false
  });

  // 보여줄 항목 선택
  const handleSelect = (key) => {
    setVisibility((prevState) => {
      const newVisibility = { ...prevState, [key]: !prevState[key] };

      // visibility 값 -> TeamSpTemplate으로 전달
      onVisibilityUpdate(newVisibility);
      return newVisibility;
    });
  };

  return (
    <View>
      <Text style={styles.font16}>팬 정보</Text>
      <View style={styles.elementContainer}>
        {Object.keys(visibility).map((key, index) => {
          const displayText = {
            showGenre: ' 덕질장르 ',
            showFavorite: ' 최애 ',
            showSecond: ' 차애 ',
            showReason: ' 입덕계기 '
          }[key];

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(key)}
              style={visibility[key] ? styles.selectedElement : styles.element}
            >
              {visibility[key] && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}>{displayText}</Text>
                </View>
              )}
              {!visibility[key] && <Text>{displayText}</Text>}
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  )
}