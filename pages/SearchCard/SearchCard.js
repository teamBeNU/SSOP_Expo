import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './SearchCardStyle.js';
import { theme } from "../../theme.js";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import SearchIcon from '../../assets/icons/ic_search_small_line.svg';
import DeleteIcon from '../../assets/icons/ic_delete_all.svg';
import SearchMySpace from "./SearchMySpace.js";
import SearchTeamSp from "./SearchTeamSp.js";

const Tab = createMaterialTopTabNavigator();

function SearchCard() {
    const baseUrl = 'http://43.202.52.64:8080/api'
    const [data, setData] = useState([]);

    const CustomTabBar = ({ state, descriptors, navigation }) => {
        return (
          <View style={styles.containerTabBar}>
            <View style={styles.tabContainer}>
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                      ? options.title
                      : route.name;
      
                const isFocused = state.index === index;
      
                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
      
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };
      
                return (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      onPress={onPress}
                      style={[
                        styles.tab,
                        isFocused ? styles.activeTab : styles.inactiveTab
                      ]}
                    >
                      <View style={{ gap: 6, flexDirection: 'row', alignItems: 'center' }}>
                        {label === "마이스페이스"}
                        {label === "팀스페이스"}
                        <Text
                          style={[
                            {
                              color: isFocused && (label === "마이스페이스" || label === "팀스페이스") ? theme.gray30 : theme.gray70,
                              fontFamily: 'PretendardRegular',
                              fontSize: 16,
                              letterSpacing: -1,
                            },
                          ]} >
                          {label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {index === 0 && <View style={styles.divider} />}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        );
      };

    return (
        <View style={styles.mainLayout}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity>
                    <LeftArrowIcon />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <TextInput style={styles.InputText} placeholder="이름을 입력하세요" />
                    <TouchableOpacity><DeleteIcon style={styles.deleteIcon} /></TouchableOpacity>
                    <TouchableOpacity><SearchIcon style={styles.searchIcon} /></TouchableOpacity>
                </View>
            </View>
            
            <Tab.Navigator
                tabBarPosition="bottom"
                tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen name="마이스페이스" component={SearchMySpace} />
                <Tab.Screen name="팀스페이스" component={SearchTeamSp}/>
            </Tab.Navigator>

        </View>
    )
}
export default SearchCard;