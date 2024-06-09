import { View, ScrollView, Text, KeyboardAvoidingView, TextInput, Dimensions } from "react-native";
import React, { useState, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";
const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function TestPage({}) {
    const [name, setName] = useState('d');
    const [name8, setName8] = useState('88');
    const [name9, setName9] = useState('99');
    const [name17, setName17] = useState('1717');
    const [name18, setName18] = useState('1818');

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    const ref_input7 = useRef();
    const ref_input8 = useRef();
    const ref_input9 = useRef();
    const ref_input10 = useRef();
    const ref_input11 = useRef();
    const ref_input12 = useRef();
    const ref_input13 = useRef();
    const ref_input14 = useRef();
    const ref_input15 = useRef();
    const ref_input16 = useRef();
    const ref_input17 = useRef();
    const ref_input18 = useRef();

    return (
        <KeyboardAvoidingView behavior={'position'}>
        <ScrollView 
                
        >
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input2.current.focus()}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input3.current.focus()}
                ref={ref_input2}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input4.current.focus()}
                ref={ref_input3}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input5.current.focus()}
                ref={ref_input4}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input6.current.focus()}
                ref={ref_input5}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input7.current.focus()}
                ref={ref_input6}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name8}
                onChangeText={setName8}
                returnKeyType="next"
                onSubmitEditing={() => ref_input8.current.focus()}
                ref={ref_input7}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name9}
                onChangeText={setName9}
                returnKeyType="next"
                onSubmitEditing={() => ref_input9.current.focus()}
                ref={ref_input8}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input10.current.focus()}
                ref={ref_input9}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input11.current.focus()}
                ref={ref_input10}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input12.current.focus()}
                ref={ref_input11}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input13.current.focus()}
                ref={ref_input12}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input14.current.focus()}
                ref={ref_input13}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input15.current.focus()}
                ref={ref_input14}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input16.current.focus()}
                ref={ref_input15}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name17}
                onChangeText={setName17}
                returnKeyType="next"
                onSubmitEditing={() => ref_input17.current.focus()}
                ref={ref_input16}
                blurOnSubmit={false}
            />
            <TextInput 
                style={styles.customInput}
                placeholder="이름을 입력하세요."
                placeholderTextColor={theme.gray60}
                keyboardType="default"
                value={name18}
                onChangeText={setName18}
                returnKeyType="next"
                onSubmitEditing={() => ref_input18.current.focus()}
                ref={ref_input17}
                blurOnSubmit={false}
            />
        </ScrollView>
        </KeyboardAvoidingView>
    );
}