import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";

import { styles } from "./ServiceStyles";
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
            style={styles.FAQMainContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={{marginBottom:100}}>
                {questions.map(qc => (
                    <View key={qc.id} >
                    <View style={styles.FAQContainer}>
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
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}