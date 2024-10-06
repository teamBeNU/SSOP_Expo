import { Text, ScrollView } from "react-native";
import React, { useEffect } from 'react';
import "react-native-gesture-handler";

import { styles } from "./ServiceStyles.js";
import { serviceAgreeText, infoAgreeText } from "../../Login/AgreeContent.js"

export default function ServiceAgree ({navigation, route}) {

    useEffect(() => {   
        let title = '';
        switch(route.params.id) {
            case 'privacyPolicy':
                title = '개인정보 처리방침';
                break;
            case 'termsOfService':
                title = '서비스 이용약관';
                break;
            default:
                break;
        }
        navigation.setOptions({
            headerTitle: title,
        });
    }, []);

    return(
        <ScrollView 
            style={styles.AgreeMainContainer}
            showsVerticalScrollIndicator={false}
        >            
            {route.params.id === 'privacyPolicy' &&     // 개인정보 처리방침
                <Text style={styles.agreeContent}>{serviceAgreeText}</Text>
            }            
            {route.params.id === 'termsOfService' &&    // 서비스 이용약관
                <Text style={styles.agreeContent}>{infoAgreeText}</Text>
            }
        </ScrollView>
    );
}