
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import "react-native-gesture-handler";
import Select from "../../assets/teamSp/select.svg";

export default function FanTemplate() {
  // 팬 정보
  const [showGenre, setShowGenre] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showReason, setShowReason] = useState(false);

  const handleSelect = (id) => {
    switch (id) {
      case 'showGenre':
        setShowGenre((prevState) => !prevState);
        break;
      case 'showFavorite':
        setShowFavorite((prevState) => !prevState);
        break;
      case 'showSecond':
        setShowSecond((prevState) => !prevState);
        break;
      case 'showReason':
        setShowReason((prevState) => !prevState);
        break;
      default:
        break;
    }
    console.log(id);
  };


  return (
    <View>
      <Text style={styles.font16}>팬 정보</Text>
      <View style={styles.elementContainer}>
        {/* 덕질장르 */}
        <TouchableOpacity onPress={() => handleSelect('showGenre')}
          style={showGenre ? styles.selectedElement : styles.element}>
          {showGenre && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 덕질장르 </Text>
            </View>
          )}
          {!showGenre && <Text> 덕질장르 </Text>}
        </TouchableOpacity>

        {/* 최애 */}
        <TouchableOpacity onPress={() => handleSelect('showFavorite')}
          style={showFavorite ? styles.selectedElement : styles.element}>
          {showFavorite && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 최애 </Text>
            </View>
          )}
          {!showFavorite && <Text> 최애 </Text>}
        </TouchableOpacity>

        {/* 차애 */}
        <TouchableOpacity onPress={() => handleSelect('showSecond')}
          style={showSecond ? styles.selectedElement : styles.element}>
          {showSecond && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 차애 </Text>
            </View>
          )}
          {!showSecond && <Text> 차애 </Text>}
        </TouchableOpacity>

        {/* 입덕계기 */}
        <TouchableOpacity onPress={() => handleSelect('showReason')}
          style={showReason ? styles.selectedElement : styles.element}>
          {showReason && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 입덕계기 </Text>
            </View>
          )}
          {!showReason && <Text> 입덕계기 </Text>}
        </TouchableOpacity>

      </View>

    </View>
  )
}