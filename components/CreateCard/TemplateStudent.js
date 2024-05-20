import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./TemplateStyles";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function TemplateStudent({navigation}) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [tel, setTel] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [job, setJob] = useState('');
    const [club, setClub] = useState('');
    const [status, setStatus] = useState('');
    const [sns, setSns] = useState(['', '']);
    const [email, setEmail] = useState('');
    const [mbti, setMbti] = useState('');
    const [music, setMusic] = useState('');
    const [movie, setMovie] = useState('');
    const [showJob, setShowJob] = useState(false);
    const [showClub, setShowClub] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showSns, setShowSns] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showMbti, setShowMbti] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [showMovie, setShowMovie] = useState(false);
    const [cover, setCover] = useState(1);
    const [avaIndex, setAvaIndex] = useState(1);

    const handleNext = () => {
        if (step === 1) {
            setStep(7);
        } else if (step === 2 ) {
            setStep(3);
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

    const handleAvata = (id) => {
        setAvaIndex(id);
    }

    return (
        <View style={styles.main}>
            {step === 1 && (
                <View>
                    <Text style={styles.title}>나에 대한 기본 정보를 알려주세요.</Text>
                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={{marginBottom: 8}}>이름*</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="이름"
                                keyboardType="default"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View>
                            <Text style={{marginBottom: 8}}>생년월일</Text>
                            <View style={styles.flexDirectionRow}>
                                <TextInput
                                    style={{...styles.inputBirth, width: 72}}
                                    placeholder="YYYY"
                                    keyboardType="numeric"
                                    value={year}
                                    onChangeText={setYear}
                                    maxLength={4}
                                />
                                <TextInput
                                    style={{...styles.inputBirth, width: 60}}
                                    placeholder="MM"
                                    keyboardType="numeric"
                                    value={month}
                                    onChangeText={setMonth}
                                    maxLength={2}
                                />
                                <TextInput
                                    style={{...styles.inputBirth, width: 60}}
                                    placeholder="DD"
                                    keyboardType="numeric"
                                    value={day}
                                    onChangeText={setDay}
                                    maxLength={2}
                                />
                            </View>
                            <View style={styles.birthSecret}>
                                {/* svg 들어갈 자리 */}
                                <Text>생년월일은 비밀로 할래요</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{marginBottom: 8}}>연락처</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="연락처"
                                keyboardType="phone-pad"
                                value={tel}
                                onChangeText={setTel}
                            />
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
                <View style={{backgroundColor: "white"}}>
                    <Text>학교와 관련된 정보를 알려주세요.</Text>
                    <View style={styles.inputContainer}>
                        <Text style={{marginBottom: 8}}>이름</Text>
                        <TextInput 
                            style={styles.customInput}
                            placeholder="학교명"
                            keyboardType="default"
                            value={school}
                            onChangeText={setSchool}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{marginBottom: 8}}>학년</Text>
                        <TextInput 
                            style={styles.customInput}
                            placeholder="숫자만 입력하세요."
                            keyboardType="numeric"
                            value={grade}
                            onChangeText={setGrade}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{marginBottom: 8}}>한줄소개</Text>
                        <TextInput 
                            style={styles.customInput}
                            placeholder="한줄소개"
                            keyboardType="default"
                            value={introduction}
                            onChangeText={setIntroduction}
                        />
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
                <View>
                    <Text>학교와 관련된 정보를 알려주세요.</Text>
                    <View style={styles.flexDirectionRow}>
                        <TouchableOpacity style={styles.btnMore} onPress={() => setShowJob(!showJob)}>
                            <Text>직무</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnMore} onPress={() => setShowClub(!showClub)}>
                            <Text>동아리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnMore} onPress={() => setShowStatus(!showStatus)}>
                            <Text>재학여부</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    {!showJob && !showClub && !showStatus && (
                        <Text>선택지를 추가하면 여기에 작성란이 생겨요</Text>
                    )}
                    {showJob && (
                        <View style={styles.inputContainer}>
                            <Text style={{marginBottom: 8}}>직무</Text>
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
                            <Text style={{marginBottom: 8}}>동아리</Text>
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
                            <Text style={{marginBottom: 8}}>재학여부</Text>
                            
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
                <View>
                <Text>추가적인 연락 수단을 알려주고 싶다면</Text>
                <View style={styles.flexDirectionRow}>
                    <TouchableOpacity style={styles.btnMore} onPress={() => setShowSns(!showSns)}>
                        <Text>SNS 계정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMore} onPress={() => setShowEmail(!showEmail)}>
                        <Text>이메일</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
                {!showSns && !showEmail && (
                    <Text>선택지를 추가하면 여기에 작성란이 생겨요</Text>
                )}
                {showSns && (
                    <View style={styles.inputContainer}>
                        <Text>SNS</Text>
                        <View>
                            <Text style={{marginBottom: 8}}>Instargram</Text>
                            <TextInput 
                                style={styles.customInput}
                                placeholder="Instargram"
                                keyboardType="default"
                                value={sns[0]}
                                onChangeText={text => setSns(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                            />
                        </View>
                        <View>
                            <Text style={{marginBottom: 8}}>X</Text>
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
                        <Text style={{marginBottom: 8}}>이메일</Text>
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
                <View>
                    <Text>사소한 것까지 더 알려주고 싶다면</Text>
                    <View style={styles.flexDirectionRow}>
                        <TouchableOpacity style={styles.btnMore} onPress={() => setShowMbti(!showMbti)}>
                            <Text>MBTI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnMore} onPress={() => setShowMusic(!showMusic)}>
                            <Text>인생 음악</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnMore} onPress={() => setShowMovie(!showMovie)}>
                            <Text>인생 영화</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    {!showMbti && !showMusic && !showMovie && (
                        <Text>선택지를 추가하면 여기에 작성란이 생겨요</Text>
                    )}
                    {showMbti && (
                        <View style={styles.inputContainer}>
                            <Text style={{marginBottom: 8}}>MBTI</Text>
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
                            <Text style={{marginBottom: 8}}>인생 음악</Text>
                            <View style={styles.flexDirectionRow}>
                                <TextInput 
                                    style={styles.customInput}
                                    placeholder="제목명"
                                    keyboardType="default"
                                    value={music[0]}
                                    onChangeText={text => setMusic(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                                />
                                <TextInput 
                                    style={styles.customInput}
                                    placeholder="가수명"
                                    keyboardType="default"
                                    value={music[1]}
                                    onChangeText={text => setMusic(prevState => [...prevState.slice(0, 2), text])}
                                />
                            </View>
                        </View>
                    )}
                    {showMovie && (
                        <View style={styles.inputContainer}>
                            <Text style={{marginBottom: 8}}>인생 영화</Text>
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
                    <Text>카드 커버를 선택하세요.</Text>
                    <Text>카드 앞면에 커버가 보여요.</Text>

                    <ScrollView
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.coverView}
                    >
                        <TouchableOpacity 
                            style={styles.firstCover}
                            onPress={handleNext}    
                        >
                            <Text>세상에 하나뿐!{'\n'}내 아바타로 커버 만들기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondCover}>
                            <Text>내 모습을 알려줄게!{'\n'}실물 사진 넣기</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View>
                        <Text>ddd</Text>
                        <View 
                            style={styles.circle}
                        ></View>
                        <View
                            style={[
                                styles.circle,
                                cover === 1 ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        ></View>
                    </View>
                </View>
            )}

            {step === 8 && (
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarView}>
                        <View style={styles.avatarDo}>
                            <TouchableOpacity></TouchableOpacity>
                            <TouchableOpacity></TouchableOpacity>
                        </View>
                        <View style={styles.avatarAuto}>
                            <TouchableOpacity>
                                <Text>자동생성</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatarRestart}>
                            <TouchableOpacity></TouchableOpacity>
                        </View>
                        <View style={styles.avatarBg}></View>
                    </View>
                    <View style={styles.avatarItemContainer}>
                        <View style={styles.avatarItemList}>
                            <TouchableOpacity
                                onPress={() => handleAvata(1)}
                            >
                                <Text>이목구비</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleAvata(2)}
                            >
                                <Text>헤어</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleAvata(3)}
                            >
                                <Text>옷</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleAvata(4)}
                            >
                                <Text>악세사리</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleAvata(5)}
                            >
                                <Text>배경</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {avaIndex === 1 && (
                                <View><Text>이목구비</Text></View>
                            )}
                            {avaIndex === 2 && (
                                <View><Text>헤어</Text></View>
                            )}
                            {avaIndex === 3 && (
                                <View><Text>옷</Text></View>
                            )}
                            {avaIndex === 4 && (
                                <View><Text>악세사리</Text></View>
                            )}
                            {avaIndex === 5 && (
                                <View><Text>배경</Text></View>
                            )}
                        </View>
                    </View>
                </View>
            )}  

            {step === 7 && (
                <View>
                    <Text>너무 멋진 카드가 완성되었어요!</Text>
                    <Text>바로 확인해 보세요.</Text>

                    <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                        <Text style={styles.btnNextText}>카드 확인하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={styles.btnHome}
                            onPress={() => navigation.navigate('Home')}
                        >
                        <Text style={styles.btnHomeText}>홈 화면으로</Text>
                    </TouchableOpacity>
                </View>
            )}      
        </View>
    );
}

