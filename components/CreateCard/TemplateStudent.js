import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";
import { theme } from "../../theme";
import AvatarCustom from "./AvatarCustom";
import DoneIcon from "../../assets/icons/ic_done_small_line.svg";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function TemplateStudent({navigation}) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState({
        year: '',
        month: '',
        day: '',
    });
    // const [year, setYear] = useState('');
    // const [month, setMonth] = useState('');
    // const [day, setDay] = useState('');
    const [bSecret, setBSecret] = useState(false);
    const [tel, setTel] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [job, setJob] = useState('');
    const [club, setClub] = useState('');
    const [status, setStatus] = useState('휴학');
    const [sns, setSns] = useState(['', '']);
    const [email, setEmail] = useState('');
    const [mbti, setMbti] = useState('');
    // const [music, setMusic] = useState('');
    const [music, setMusic] = useState({
        title: '',
        musician: '',
    });
    const [movie, setMovie] = useState('');
    const [showJob, setShowJob] = useState(false);
    const [showClub, setShowClub] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showSns, setShowSns] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showMbti, setShowMbti] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [showMovie, setShowMovie] = useState(false);
    const [cover, setCover] = useState('avatar');
    const [isFull, setIsFull] = useState({
        name: true,
        birth: true,
        tel: true,
        school: true,
        grade: true,
        introduction: true,
    })

    const handleNext = () => {
        if (step === 1) {
            const isNameFull = name !== '';
            const isBirthFull = birth.year !== '' && birth.month !== '' && birth.day !== '';
            const isTelFull = tel !== '';
            setIsFull((prev => ({...prev, name: isNameFull, birth: isBirthFull, tel: isTelFull})));
            
            if (isNameFull && isBirthFull && isTelFull) {
                setStep(2);
            }
        } else if (step === 2 ) {
            const isSchoolFull = school !== '';
            const isGradeFull = grade !== '';
            const isIntroductionFull = introduction !== '';
            setIsFull((prev => ({...prev, school: isSchoolFull, grade: isGradeFull, introduction: isIntroductionFull})));
            
            if (isSchoolFull && isGradeFull && isIntroductionFull) {
                setStep(3);
            }
        } else if (step === 3 ) {
            setStep(4);
        } else if (step === 4 ) {
            setStep(5);
        } else if (step === 5 ) {
            setStep(6);
        } else if (step === 6 ) {
            setStep(7);
        } else if (step === 7 ) {
            setStep(8);
        }
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH));
        if (currentIndex == 0) {setCover('avatar');}
        else if (currentIndex == 1) {setCover('picture');}
    }

    useEffect(() => {   // 상단바 타이틀 변경
        if (step === 1 || step === 2 || step === 3 || step === 4 || step === 5) {
            navigation.setOptions({headerTitle: '카드 정보 작성'});
        } else if (step === 6 || step === 8) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerRight: null,
            });
        } else if (step === 7) {
            navigation.setOptions({
                headerTitle: '아바타 커스터마이징',
                headerRight: () => (
                    <TouchableOpacity
                        style={{marginRight: 20}}
                        onPress={handleNext}
                    >
                        <Text style={styles.avatarNext}>다음</Text>
                    </TouchableOpacity>
                ),
            });
        }
    }, [step]);

    return (
        <View style={styles.main}>
            {step === 1 && (
                <View style={styles.container}>
                    <Text style={styles.title}>나에 대한 기본 정보를 알려주세요.</Text>
                    <View style={styles.informContainer}>
                        <View style={[styles.inputContainer, !isFull.name && {marginBottom: 15}]}>
                            <Text style={styles.inputText}>이름*</Text>
                            <TextInput 
                                style={[styles.customInput, !isFull.name && styles.inputError]}
                                placeholder="이름을 입력하세요."
                                keyboardType="default"
                                value={name}
                                onChangeText={setName}
                            />
                            {!isFull.name && (
                                <Text style={styles.inputErrorText}>이름을 입력해 주세요.</Text>
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>생년월일*</Text>
                            <View style={styles.inputBirthContainer}>
                                <TextInput
                                    style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                                    placeholder="년"
                                    keyboardType="numeric"
                                    value={birth.year}
                                    onChangeText={(newYear) => {setBirth((prevBirth => ({...prevBirth, year: newYear})));}}
                                    // onChangeText={setYear}
                                    maxLength={4}
                                />
                                <TextInput
                                    style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                                    placeholder="월"
                                    keyboardType="numeric"
                                    value={birth.month}
                                    onChangeText={(newMonth) => {setBirth((prevBirth => ({...prevBirth, month: newMonth})));}}
                                    // onChangeText={setMonth}
                                    maxLength={2}
                                />
                                <TextInput
                                    style={[styles.inputBirth, styles.inputBirthText]}
                                    placeholder="일"
                                    keyboardType="numeric"
                                    value={birth.day}
                                    onChangeText={(newDay) => {setBirth((prevBirth => ({...prevBirth, day: newDay})));}}
                                    // onChangeText={setDay}
                                    maxLength={2}
                                />
                            </View>
                            <View style={[styles.flexDirectionRow, {justifyContent: "space-between", alignItems: 'center' }]}>
                                {!isFull.birth ? (
                                    <Text style={[styles.inputErrorText, {marginTop: 12}]}>생년월일을 입력해 주세요.</Text>
                                ) : (
                                    <View></View>
                                )}
                                <TouchableOpacity 
                                    style={styles.birthSecret} 
                                    onPress={() => setBSecret(!bSecret)}>
                                    <DoneIcon style={[styles.doneIcon, {color: bSecret ? theme.skyblue : theme.gray60}]} />
                                    <Text style={bSecret ? styles.birthSecretOn : styles.birthSecretOff}>생년월일은 비밀로 할래요</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.inputContainer, !isFull.tel && {marginBottom: 15}]}>
                            <Text style={styles.inputText}>연락처*</Text>
                            <TextInput 
                                style={[styles.customInput, !isFull.tel && styles.inputError]}
                                placeholder="연락처를 입력하세요."
                                keyboardType="phone-pad"
                                value={tel}
                                onChangeText={setTel}
                            />
                            {!isFull.tel && (
                                <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                        <Text style={styles.btnNextText}>다음으로</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 2 && (
                <View style={styles.container}>
                    <Text style={styles.title}>학교와 관련된 정보를 알려주세요.</Text>
                    <View style={styles.informContainer}>
                        <View style={[styles.inputContainer, !isFull.school && {marginBottom: 15}]}>
                            <Text style={styles.inputText}>학교명*</Text>
                            <TextInput 
                                style={[styles.customInput, !isFull.school && styles.inputError]}
                                placeholder="학교명을 입력하세요."
                                keyboardType="default"
                                value={school}
                                onChangeText={setSchool}
                            />
                            {!isFull.school && (
                                <Text style={styles.inputErrorText}>학교명을 입력해 주세요.</Text>
                            )}
                        </View>
                        <View style={[styles.inputContainer, !isFull.grade && {marginBottom: 15}]}>
                            <Text style={styles.inputText}>학년*</Text>
                            <TextInput 
                                style={[styles.customInput, !isFull.grade && styles.inputError]}
                                placeholder="학년을 입력하세요."
                                keyboardType="numeric"
                                value={grade}
                                onChangeText={setGrade}
                            />
                            {!isFull.grade && (
                                <Text style={styles.inputErrorText}>학년을 입력해 주세요.</Text>
                            )}
                        </View>
                        <View style={[styles.inputContainer, !isFull.introduction && {marginBottom: 15}]}>
                            <Text style={styles.inputText}>한줄소개*</Text>
                            <TextInput 
                                style={[styles.customInput, !isFull.introduction && styles.inputError]}
                                placeholder="간단하게 자신을 소개해 보세요."
                                keyboardType="default"
                                value={introduction}
                                onChangeText={setIntroduction}
                            />
                            {!isFull.introduction && (
                                <Text style={styles.inputErrorText}>한줄소개를 입력해 주세요.</Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                        <Text style={styles.btnNextText}>다음으로</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 3 && (
                <View style={styles.container}>
                    <Text style={styles.title}>학교 속 나에 대해 더 알려주고 싶다면</Text>
                    <View style={[styles.flexDirectionRow, styles.btnMores]}>
                        <TouchableOpacity 
                            style={[styles.flexDirectionRow, styles.btnMore, showJob ? styles.btnOn : styles.btnOff]}  
                            onPress={() => setShowJob(!showJob)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showJob ? theme.skyblue : theme.gray60}]} />
                            <Text style={showJob ? styles.btnTextOn : styles.btnTextOff}>직무</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.flexDirectionRow, styles.btnMore, showClub ? styles.btnOn : styles.btnOff]} 
                            onPress={() => setShowClub(!showClub)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showClub ? theme.skyblue : theme.gray60}]} />
                            <Text style={showClub ? styles.btnTextOn : styles.btnTextOff}>동아리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.flexDirectionRow, styles.btnMore, showStatus ? styles.btnOn : styles.btnOff]} 
                            onPress={() => setShowStatus(!showStatus)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showStatus ? theme.skyblue : theme.gray60}]} />
                            <Text style={showStatus ? styles.btnTextOn : styles.btnTextOff}>재학여부</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    {!showJob && !showClub && !showStatus && (
                        <Text style={styles.addText}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                    )}
                    {showJob && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>직무</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="직무"
                                keyboardType="default"
                                value={job}
                                onChangeText={setJob}
                            />
                        </View>
                    )}
                    {showClub && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>동아리</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="소속 동아리"
                                keyboardType="default"
                                value={club}
                                onChangeText={setClub}
                            />
                        </View>
                    )}
                    {showStatus && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>재학여부</Text>
                                <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                                    <View style={styles.radioBtnGruopContainer}>
                                        <TouchableOpacity  style={styles.radioBtnContainer} onPress={() => setStatus('휴학')}>
                                            <RadioButton value="휴학" uncheckedColor={theme.grey30} color={theme.skyblue} />
                                            <Text style={styles.font16}>휴학 중</Text>
                                        </TouchableOpacity >
                                        <TouchableOpacity style={styles.radioBtnContainer} onPress={() => setStatus('재학')}>
                                            <RadioButton value="재학" uncheckedColor={theme.grey30} color={theme.skyblue} />
                                            <Text style={styles.font16}>재학 중</Text>
                                        </TouchableOpacity>
                                    </View>
                                </RadioButton.Group>
                        </View>
                    )}
                    <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                        <Text style={styles.btnNextText}>다음으로</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 4 && (
                <View style={styles.container}>
                    <Text style={styles.title}>추가적인 연락 수단을 알려주고 싶다면</Text>
                    <View style={[styles.flexDirectionRow, styles.btnMores]}>
                        <TouchableOpacity 
                            style={[styles.flexDirectionRow, styles.btnMore, showSns ? styles.btnOn : styles.btnOff]}
                            onPress={() => setShowSns(!showSns)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showSns ? theme.skyblue : theme.gray60}]} />
                            <Text style={showSns ? styles.btnTextOn : styles.btnTextOff}>SNS 계정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.flexDirectionRow, styles.btnMore, showEmail ? styles.btnOn : styles.btnOff]}
                            onPress={() => setShowEmail(!showEmail)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showEmail ? theme.skyblue : theme.gray60}]} />
                            <Text style={showEmail ? styles.btnTextOn : styles.btnTextOff}>이메일</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    {!showSns && !showEmail && (
                        <Text style={styles.addText}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                    )}
                    {showSns && (
                        <View>
                            <Text style={styles.snsText}>SNS</Text>
                            <View style={styles.margintB16}>
                                <Text style={styles.inputText}>Instargram</Text>
                                <TextInput 
                                    style={styles.customInput}
                                    placeholder="Instargram"
                                    keyboardType="default"
                                    value={sns[0]}
                                    onChangeText={text => setSns(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                                />
                            </View>
                            <View style={styles.margintB48}>
                                <Text style={styles.inputText}>X</Text>
                                <TextInput 
                                    style={styles.customInput}
                                    placeholder="X"
                                    keyboardType="default"
                                    value={sns[1]}
                                    onChangeText={text => setSns(prevState => [...prevState.slice(0, 2), text])}
                                />
                            </View>
                        </View>
                    )}
                    {showEmail && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>이메일</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="이메일 주소"
                                keyboardType="email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    )}
                    <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                        <Text style={styles.btnNextText}>다음으로</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 5 && (
                <View style={styles.container}>
                    <Text style={styles.title}>사소한 것까지 더 알려주고 싶다면</Text>
                    <View style={[styles.flexDirectionRow, styles.btnMores]}>
                        <TouchableOpacity
                            style={[styles.flexDirectionRow, styles.btnMore, showMbti ? styles.btnOn : styles.btnOff]}
                            onPress={() => setShowMbti(!showMbti)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showMbti ? theme.skyblue : theme.gray60}]} />
                            <Text style={showMbti ? styles.btnTextOn : styles.btnTextOff}>MBTI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.flexDirectionRow, styles.btnMore, showMusic ? styles.btnOn : styles.btnOff]}
                            onPress={() => setShowMusic(!showMusic)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showMusic ? theme.skyblue : theme.gray60}]} />
                            <Text style={showMusic ? styles.btnTextOn : styles.btnTextOff}>인생 음악</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.flexDirectionRow, styles.btnMore, showMovie ? styles.btnOn : styles.btnOff]}
                            onPress={() => setShowMovie(!showMovie)}
                        >
                            <DoneIcon style={[styles.doneIcon, {color: showMovie ? theme.skyblue : theme.gray60}]} />
                            <Text style={showMovie ? styles.btnTextOn : styles.btnTextOff}>인생 영화</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    {!showMbti && !showMusic && !showMovie && (
                        <Text style={styles.addText}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                    )}
                    {showMbti && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>MBTI</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="MBTI"
                                keyboardType="default"
                                value={mbti}
                                onChangeText={setMbti}
                            />
                        </View>
                    )}
                    {showMusic && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>인생 음악</Text>
                            <View style={styles.flexDirectionRow}>
                                <TextInput 
                                    style={[styles.musicInput, styles.marginR6]}
                                    placeholder="제목명"
                                    keyboardType="default"
                                    value={music.title}
                                    // onChangeText={text => setMusic(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                                    onChangeText={(newTitle) => {setMusic((prevMusic => ({...prevMusic, title: newTitle})));}}
                                />
                                <TextInput 
                                    style={styles.musicInput}
                                    placeholder="가수명"
                                    keyboardType="default"
                                    value={music.musician}
                                    // onChangeText={text => setMusic(prevState => [...prevState.slice(0, 2), text])}
                                    onChangeText={(newMusician) => {setMusic((prevMusic => ({...prevMusic, musician: newMusician})));}}
                                />
                            </View>
                        </View>
                    )}
                    {showMovie && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>인생 영화</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="영화명"
                                keyboardType="default"
                                value={movie}
                                onChangeText={setMovie}
                            />
                        </View>
                    )}
                    <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                        <Text style={styles.btnNextText}>다음으로</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 6 && (
                <View>
                    <Text style={styles.coverTitle}>카드 커버를 선택하세요.</Text>
                    <Text style={styles.coverSubTitle}>카드 앞면에 커버가 보여요.</Text>
                    <View style={styles.coverContainer}>
                        <ScrollView
                            pagingEnabled
                            horizontal
                            decelerationRate={0}
                            snapToInterval={SCREEN_WIDTH}
                            snapToAlignment={"center"}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.coverScrollView}
                            onScroll={handleScroll}
                        >
                            <TouchableOpacity  
                                onPress={() => {handleNext(); setCover("avatar");}}    
                            >
                                <Image 
                                    source={require("../../assets/images/cardCover-1.png")}
                                    style={styles.coverImg1}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {handleNext(); setCover("picture");}}  
                            >
                                <Image 
                                    source={require("../../assets/images/cardCover-2.png")}
                                    style={styles.coverImg2}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.circles}>
                        <View 
                            style={[
                                styles.circle,
                                cover === "avatar" ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                        <View
                            style={[
                                styles.circle,
                                cover === "picture" ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                    </View>
                </View> 

            )}

            {step === 7 && (
                <View>
                    {cover === "avatar" && (
                        <AvatarCustom step={7} onStepChange={(newStep) => setStep(newStep)} />
                    )}
                    {cover === "picture" && (
                        <></>
                        // <AvatarCustom step={7} onStepChange={(newStep) => setStep(newStep)} />
                    )}
                </View>
            )}  

            {step === 8 && (
                <View style={styles.container}>
                    <Text style={styles.title}>너무 멋진 카드가 완성되었어요!{"\n"}바로 확인해 보세요.</Text>
                    <TouchableOpacity 
                            style={styles.btnCheckCard}
                            onPress={() => navigation.navigate('MyCard')}
                        >
                        <Text style={styles.btnNextText}>카드 확인하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={styles.btnHome}
                            onPress={() => navigation.navigate('홈')}
                        >
                        <Text style={styles.btnHomeText}>홈 화면으로</Text>
                    </TouchableOpacity>
                </View>
            )}      
        </View>
    );
}
