import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from 'expo-clipboard';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Modal } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import { Card } from "../MyCard/Card";
import "react-native-gesture-handler";
import * as Progress from 'react-native-progress';
import * as Sharing from 'expo-sharing';
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import Select from "../../assets/teamSp/select.svg";
import ShareImage from '../../assets/icons/LinkShareImage.svg'
import RightArrowBlueIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';
import StudentTemplate from "./StudentTemplate";
import WorkerTemplate from "./WorkerTemplate";
import FanTemplate from "./FanTemplate";

export default function TeamSpTemplate({ navigation, goToOriginal, teamName, teamComment, card_template,
    // 학생
    showSchool,
    showGrade,
    showStudNum,
    showMajor,
    showClub,
    //직장인
    showStatus,
    showCompany,
    showJob,
    showPosition,
    showPart,
    // 팬
    showGenre,
    showFavorite,
    showSecond,
    showReason
}) {
    const baseUrl = 'http://43.202.52.64:8080/api'
    const [token, setToken] = useState(null);

    const [step, setStep] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false); // 팀스페이스 확인 모달창
    // step1
    const [defaultText, setDefaultText] = useState({
        // 기본 정보
        showAge: false,
        showBirth: false,
        showMBTI: false,
    });
    const [connectText, setConnectText] = useState({
        // 연락처, SNS
        showTel: false,
        showEmail: false,
        showInsta: false,
        showX: false,
    });
    const [extraText, setExtraText] = useState({
        // 기타
        showHobby: false,
        showMusic: false,
        showMovie: false,
        showAddress: false
    });

    const [cardCover, setCardCover] = useState("free");

    const [visibility, setVisibility] = useState({});

    const [plus, setPlus] = useState("");
    const [plusList, setPlusList] = useState([]);
    const [plusLength, setPlusLength] = useState(0);

    // 학생 템플릿
    const [student, setStudent] = useState({
        showSchool: false,
        showGrade: false,
        showStudNum: false,
        showMajor: false,
        showClub: false,
        showRole: false,
        showStatus: false
    });
    const [selectedRoles, setSelectedRoles] = useState([]);

    // 직장인 템플릿
    const [worker, setWorker] = useState({
        showCompany: false,
        showJob: false,
        showPosition: false,
        showPart: false
    });

    // 팬 템플릿
    const [fan, setFan] = useState({
        showGenre: false,
        showFavorite: false,
        showSecond: false,
        showReason: false
    });

    const [inviteCode, setInviteCode] = useState(null); // step4

    // progressBar
    const maxSteps = 7;
    const initialProgress = 0.714;

    // AsyncStorage에서 토큰 가져오기
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                setToken(storedToken);
            } catch (error) {
                console.error('토큰 가져오기 실패:', error);
            }
        };

        fetchToken();
    }, []);

    // 학생템플릿 - 선택된 항목
    const handleVisibilityStud = (visibility) => {
        setStudent(visibility);
    };

    const handleVisibilityWorker = (visibility) => {
        setWorker(visibility);
    };

    const handleVisibilityFan = (visibility) => {
        setFan(visibility);
    };

    // 학생템플릿 - 역할 선택된 리스트
    const handleRoleUpdate = (roles) => {
        setSelectedRoles(roles);
    };

    const showCustomToast = (text) => {
        Toast.show({
            text1: text,
            type: 'selectedToast',
            position: 'bottom',
            visibilityTime: 2000,
        });
    };

    const handleNext = () => {
        if (step === 1) {
            const anyStudentVisible = Object.values(student).some(value => value === true);
            const anyWorkerVisible = Object.values(worker).some(value => value === true);
            const anyFanVisible = Object.values(fan).some(value => value === true);

            // 하나라도 선택되었는지 확인
            const anyRoleSelected = selectedRoles.some(role => role.selected);

            if (!anyStudentVisible && !anyWorkerVisible && !anyFanVisible && !anyRoleSelected) {
                showCustomToast('최소 하나의 질문은 선택해주세요.');
            } else {
                setStep(2);
            }
        } else if (step === 2) {
            // 지금까지 작성한 팀스페이스 정보로 생성
            const requestData = {
                team_name: teamName,
                team_comment: teamComment,
                isTemplate: true,
                template: card_template,
                showAge: defaultText.showAge,
                showBirth: defaultText.showBirth,
                showMBTI: defaultText.showMBTI,
                showTel: connectText.showTel,
                showEmail: connectText.showEmail,
                showInsta: connectText.showInsta,
                showX: connectText.showX,
                // 학생 템플릿
                studentOptional: {
                    showSchool: student.showSchool,
                    showGrade: student.showGrade,
                    showStudNum: student.showStudNum,
                    showMajor: student.showMajor,
                    showClub: student.showClub,
                    showRole: selectedRoles,
                    showStatus: student.showStatus
                },
                // 직장인 템플릿
                workerOptional: {
                    showCompany: worker.showCompany,
                    showJob: worker.showJob,
                    showPosition: worker.showPosition,
                    showPart: worker.showPart
                },
                // 팬 템플릿
                fanOptional: {
                    showGenre: fan.showGenre,
                    showFavorite: fan.showFavorite,
                    showSecond: fan.showSecond,
                    showReason: fan.showReason
                },
                showHobby: extraText.showHobby,
                showMusic: extraText.showMusic,
                showMovie: extraText.showMovie,
                showAddress: extraText.showAddress,
                plus: plusList.filter(item => item.selected).map(item => item.free),
                cardCover: cardCover
            };

            // 팀스페이스 생성 API 호출
            const apiUrl = `${baseUrl}/teamsp/create`;
            axios
                .post(apiUrl, requestData, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setInviteCode(response.data.inviteCode); // 초대코드 저장
                    console.log('생성된 초대코드:', response.data.inviteCode);
                    setStep(3); // 초대코드 생성
                    console.log(requestData)
                })
                .catch((error) => {
                    console.error('팀스페이스 생성 API 요청 에러:', error);
                    console.log(requestData)
                });
        }
        setIsModalVisible(false)
    }

    const handleCheck = () => {
        setIsModalVisible(true);
    };

    // step 단위로 뒤로가기
    useEffect(() => {
        navigation.setOptions({
            headerLeft: handleHeaderLeft
        });
    }, [navigation, step]);

    const handleHeaderLeft = (onPress) => {
        if (step < 5) {
            return (
                <TouchableOpacity onPress={handleBack}>
                    <LeftArrowIcon style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            );
        }
    };

    const handleBack = () => {
        switch (step) {
            case 1:
                goToOriginal(); // CreateTeamSp.js로 이동
                break;
            case 3: // 생성 완료하면 뒤로가기 불가
                break;
            default:
                setStep(step - 1);
                setIsModalVisible(false)
                break;
        }
    };

    // 보여줄 항목 선택
    const handleSelect = (key) => {
        if (key in defaultText) {
            setDefaultText((prevState) => {
                const newDefault = { ...prevState, [key]: !prevState[key] };
                return newDefault;
            });
        } else if (key in connectText) {
            setConnectText((prevState) => {
                const newConnect = { ...prevState, [key]: !prevState[key] };
                return newConnect;
            });
        } else if (key in extraText) {
            setExtraText((prevState) => {
                const newExtra = { ...prevState, [key]: !prevState[key] };
                return newExtra;
            });
        }
    };

    // 텍스트 길이 검사
    useEffect(() => {
        setPlusLength(plus.length);
    }, [plus]);

    const plusSelected = (index) => {
        setPlusList(prevList => {
            const updatedList = [...prevList];
            updatedList[index].selected = !updatedList[index].selected;
            return updatedList;
        });
    };

    // 태그 추가
    const addPlus = () => {
        if (plus.trim() !== '') {
            setPlusList(prevList => [...prevList, { free: plus, selected: false }]); // 새로운 포지션 추가
            setPlus('');
        }
    };

    // step7 - 초대 코드 복사
    const copyInviteCode = async () => {
        try {
            const stringInviteCode = String(inviteCode);
            await Clipboard.setStringAsync(stringInviteCode);
            Alert.alert("클립보드에 복사되었습니다.");
        } catch (error) {
            console.error("클립보드 복사 실패:", error);
            Alert.alert("클립보드 복사 중 오류가 발생했습니다.");
        }
    };

    const shareInviteCode = async () => {
        try {
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Sharing is not available on this device');
                return;
            }

            await Sharing.shareAsync('https://naver.com', {
                dialogTitle: 'SSOP Share TEST',
            });
        } catch (error) {
            Alert.alert('Error sharing', error.message);
        }
    };

    const handleShareButtonPress = () => {
        setIsModalVisible(true);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <Progress.Bar
                    progress={initialProgress + (step - 1) / maxSteps}
                    width={null}
                    height={2}
                    color={theme.green}
                    borderWidth={0}
                    marginTop={-16}
                />

                <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>

                    {/* 카드 정보 */}
                    {step === 1 && (
                        <View style={{ height: '100%' }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.title}>팀원들이 입력해줬으면 하는 항목을{'\n'}선택하세요. </Text>

                                <Text style={[styles.font16, { marginTop: 28 }]}>기본 정보</Text>
                                <Text style={styles.subtitle}> 이름과 한줄소개는 필수입니다. </Text>
                                <View style={styles.elementContainer}>

                                    {Object.keys(defaultText || {}).map((key, index) => {
                                        const localText = {
                                            // 기본 정보
                                            showAge: ' 나이 ',
                                            showBirth: ' 생년월일 ',
                                            showMBTI: ' MBTI '
                                        }[key];

                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => handleSelect(key)}
                                                style={defaultText[key] ? styles.selectedElement : styles.element}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {defaultText[key] && <Select />}
                                                    <Text style={defaultText[key] ? styles.selectedText : styles.defaultText}>
                                                        {localText}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                <Text style={[styles.font16, { marginTop: 28 }]}>연락처 · SNS</Text>
                                <View style={styles.elementContainer}>

                                    {Object.keys(connectText || {}).map((key, index) => {
                                        const localText2 = {
                                            // 연락처, SNS
                                            showTel: ' 연락처 ',
                                            showEmail: ' 이메일 ',
                                            showInsta: ' 인스타그램 ',
                                            showX: ' X(트위터) '
                                        }[key];

                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => handleSelect(key)}
                                                style={connectText[key] ? styles.selectedElement : styles.element}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {connectText[key] && <Select />}
                                                    <Text style={connectText[key] ? styles.selectedText : styles.defaultText}>
                                                        {localText2}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                <View style={styles.line} />

                                {(card_template === 'student' || card_template === 'free') && (
                                    <>
                                        <StudentTemplate
                                            showSchool={showSchool}
                                            showGrade={showGrade}
                                            showStudNum={showStudNum}
                                            showMajor={showMajor}
                                            showClub={showClub}
                                            showStatus={showStatus}
                                            onRoleUpdate={handleRoleUpdate}
                                            onVisibilityUpdate={handleVisibilityStud}
                                        />
                                        <View style={styles.line} />
                                    </>
                                )}

                                {(card_template === 'worker' || card_template === 'free') && (
                                    <>
                                        <WorkerTemplate
                                            showCompany={showCompany}
                                            showJob={showJob}
                                            showPosition={showPosition}
                                            showPart={showPart}
                                            onVisibilityUpdate={handleVisibilityWorker}
                                        />
                                        <View style={styles.line} />
                                    </>
                                )}

                                {(card_template === 'fan' || card_template === 'free') && (
                                    <>
                                        <FanTemplate
                                            showGenre={showGenre}
                                            showFavorite={showFavorite}
                                            showSecond={showSecond}
                                            showReason={showReason}
                                            onVisibilityUpdate={handleVisibilityFan}
                                        />
                                        <View style={styles.line} />
                                    </>
                                )}

                                <Text style={styles.font16}>기타</Text>
                                <View style={styles.elementContainer}>
                                    {Object.keys(extraText || {}).map((key, index) => {
                                        const localText3 = {
                                            // 기타
                                            showHobby: ' 취미 ',
                                            showMusic: ' 인생음악 ',
                                            showMovie: ' 인생영화 ',
                                            showAddress: ' 거주지 ',
                                        }[key];

                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => handleSelect(key)}
                                                style={extraText[key] ? styles.selectedElement : styles.element}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {extraText[key] && <Select />}
                                                    <Text style={extraText[key] ? styles.selectedText : styles.defaultText}>
                                                        {localText3}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                <Text style={[styles.font16, { marginTop: 28 }]}>자유 선택지</Text>
                                <View style={styles.plusContainer}>
                                    <TextInput
                                        style={[styles.nameInput, { flex: 1 }]}
                                        placeholder='직접 입력하여 추가'
                                        maxLength={5}
                                        value={plus}
                                        onChangeText={text => setPlus(text)}
                                        onSubmitEditing={addPlus}
                                    />
                                </View>
                                <Text style={[styles.nameLeng, { marginTop: -32, marginRight: 16, marginBottom: 16 }]}> {plusLength} / 5 </Text>

                                <View style={styles.elementContainer}>
                                    {plusList.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => plusSelected(index)}
                                            style={item.selected ? styles.selectedElement : styles.element}>
                                            {item.selected && (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Select />
                                                    <Text style={styles.selectedText}> {item.free} </Text>
                                                </View>
                                            )}
                                            {!item.selected && <Text> {item.free} </Text>}
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View style={styles.line} />

                                <Text style={styles.font16}> 카드 커버 설정 </Text>
                                <RadioButton.Group
                                    onValueChange={(value) => setCardCover(value)}
                                    value={cardCover}>
                                    <View style={styles.coverContainer}>

                                        <View style={styles.coverRadioBtn}>
                                            <RadioButton value="free" color={theme.skyblue} />
                                            <Text>자유</Text>
                                        </View>

                                        <View style={styles.coverRadioBtn}>
                                            <RadioButton value="avatar" color={theme.skyblue} />
                                            <Text>아바타만 허용</Text>
                                        </View>

                                        <View style={styles.coverRadioBtn}>
                                            <RadioButton value="picture" color={theme.skyblue} />
                                            <Text>사진만 허용</Text>
                                        </View>

                                    </View>
                                </RadioButton.Group>
                            </ScrollView>

                            <View style={[styles.btnContainer, { marginBottom: -28 }]}>
                                <TouchableOpacity style={styles.btnNext} onPress={handleNext} >
                                    <Text style={styles.btnText}> 다음으로 </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* 템플릿 예시 */}
                    {step === 2 && (
                        <View style={{ height: '100%' }} >
                            <Text style={styles.title}> 팀원들이 제출할 템플릿은 {'\n'} 이렇게 구성되겠네요. </Text>
                            <View style={styles.cardShadow}>
                                <Card />
                            </View>
                            <Text style={[styles.subtitle, { marginTop: 490, textAlign: 'center' }]}> 탭하여 뒷면을 확인하세요. </Text>

                            <View style={[styles.btnContainer, { marginBottom: -28 }]}>
                                <TouchableOpacity style={styles.btnNext} onPress={handleCheck} >
                                    <Text style={styles.btnText}> 팀스페이스 생성을 완료할래요 </Text>
                                </TouchableOpacity>

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={isModalVisible}
                                    onRequestClose={() => {
                                        setIsModalVisible(!isModalVisible);
                                    }}>
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalView}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={styles.font16}>템플릿을 확정하시겠어요?</Text>
                                                <Text style={[styles.subtitle, { marginTop: 12 }]}>템플릿은 다시 수정할 수 없습니다.</Text>
                                            </View>

                                            <View style={styles.modalCheckBtn}>
                                                <TouchableOpacity style={styles.modalBtnWhite} onPress={handleBack} >
                                                    <Text style={styles.modalBtnTextBlack}> 수정할래요 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.modalBtnNext} onPress={handleNext}>
                                                    <Text style={styles.modalBtnText}> 확정할래요 </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                    )}

                    {/* 초대 코드 */}
                    {step === 3 && (
                        <View style={{ height: '100%' }}>
                            <Text style={styles.title}> 팀스페이스 생성이 완료되었어요!
                                {'\n'} 바로 초대해 보세요. </Text>

                            <View style={styles.shareContainer}>
                                <ShareImage />
                                <View style={styles.shareBox}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }} onPress={handleShareButtonPress}>
                                        <Text style={styles.shareText}>초대코드 및 링크 공유하기</Text>
                                        <RightArrowBlueIcon />
                                    </TouchableOpacity>
                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={isModalVisible}
                                        onRequestClose={() => {
                                            setIsModalVisible(!isModalVisible);
                                        }}>
                                        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                                            <View style={styles.shareModalContainer}>
                                                <TouchableWithoutFeedback>
                                                    <View style={styles.ShareModalView}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                copyInviteCode();
                                                                setIsModalVisible(false);
                                                            }}
                                                        >
                                                            <Text style={[styles.ShareModalText, { lineHeight: 20 }]}>
                                                                초대 링크 및 초대코드 복사하기 {"\n"}
                                                                <Text style={styles.nameLeng}>초대코드 : {inviteCode}</Text>
                                                            </Text>
                                                        </TouchableOpacity>

                                                        <View style={{ borderBottomWidth: 1, borderBottomColor: theme.gray90 }} />

                                                        <TouchableOpacity onPress={shareInviteCode}>
                                                            <Text style={styles.ShareModalText}>초대 링크 및 초대코드 공유하기</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Modal>
                                </View>
                            </View>

                            <View style={[styles.btnContainer, { marginBottom: -16 }]}>
                                <TouchableOpacity style={[styles.btnNext, { marginBottom: 0 }]} onPress={() => navigation.navigate('스페이스')}>
                                    <Text style={styles.btnText}> 팀스페이스 확인 </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnWhite, { marginTop: 8 }]} onPress={() => navigation.navigate("홈")}>
                                    <Text style={styles.btnTextBlack}> 홈화면으로 </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </View>
            </View >
        </TouchableWithoutFeedback >
    )
}