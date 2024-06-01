import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function TemplateStudent({navigation}) {
    return (
        <View></View>
    );
}