import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";

import { styles } from "./ServiceStyles";
// import { theme } from "../../theme";
// import AvatarCustom from "./AvatarCustom";
// import DoneIcon from "../../assets/icons/ic_done_small_line.svg";
// import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
// import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import DownArrow from "./DownArrow";
import { questionsCollection } from "./QuestionsCollection";

export default function FAQ () {
    const [questions, setQuestions] = useState(questionsCollection);

    const toggleClick = (id) => {
        setQuestions(questions.map(qc => 
            qc.id === id ? { ...qc, isClick: !qc.isClick } : qc
        ));
    };

    return(
        <ScrollView 
            style={styles.main}
            showsVerticalScrollIndicator={false}
        >
            {questions.map(qc => (
                <>
                <View key={qc.id} style={styles.FAQContainer}>
                    <TouchableOpacity 
                        style={styles.questionContainer}
                        onPress={() => toggleClick(qc.id)}
                    >
                        <View style={styles.questionTextContainer}>
                            <Text style={styles.questionText}>Q. </Text>
                            <Text style={styles.questionText}>{qc.question}</Text>
                        </View>
                        {qc.isClick ? 
                            <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                        }
                    </TouchableOpacity>
                    {qc.isClick &&
                        <View style={styles.answerContainer}>
                            <Text style={styles.answerText}>{qc.answer}</Text>
                        </View>
                    }
                </View>
                {questionsCollection.length !== qc.id &&
                    <View style={styles.line}></View>
                }
                </>
            ))}
        </ScrollView>
    );
}