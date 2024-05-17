import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import { styles } from './CreateTmSpStyle';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import student from '../../assets/profile/student.png';
import worker from '../../assets/profile/worker.png';
import fan from '../../assets/profile/fan.png';
import free from '../../assets/profile/free.png';

function CreateTeamSp({navigation}) {
    const [step, setStep] = useState(1);
    const [teamName, setTeamName] = useState('');
    const [teamComment, setTeamComment] = useState('');
    const [istemplete, setIsTemplete] = useState('yes'); // step3 - 라디오버튼 선택
    const [templete, setTemplete] = useState(null);
    const [front, setFront] = useState([]);
    const [back, setBack] = useState([]);
    const [showTmp, setShowTmp] = useState([]);
    const [inviteCode, setInviteCode] = useState('');


    //step4 - 템플릿 선택
    const handleTemplClick = (id) => {
      setTemplete(id);
      // 여기에서 선택된 ID를 사용하여 원하는 작업 수행
      console.log('Selected ID:', id);
    };

    const items = [
      { id: 'student', label: '학생', description: '학교에 다닌다면', image: require('../../assets/profile/student.png') },
      { id: 'worker', label: '직장인', description: '직장에 다닌다면', image: require('../../assets/profile/worker.png')  },
      { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', image: require('../../assets/profile/fan.png')  },
      { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', image: require('../../assets/profile/free.png')  },
    ];

    // const handleNext = () => {
    //     if (step === 1 && teamName) {
    //       setStep(2);
    //     } else if (step === 2 && teamComment) {
    //       setStep(3);
    //     } else if (step === 3 && istemplete) {
    //         setStep(4);
    //     } else if (step === 4 && templete) {
    //         setStep(5);
    //     } else if (step === 5 && front) {
    //         setStep(6);
    //     } else if (step === 6 && back) {
    //         setStep(7);
    //     } else if (step === 7 && showTmp) {
    //         setStep(8);
    //     } else if (step === 8 && inviteCode) {
    //     } 
    //   };
    
    const handleNext = () => {
      if (step === 1) {
        setStep(2);
      } else if (step === 2 ) {
        setStep(3);
      } else if (step === 3 ) {
          setStep(4);
      } else if (step === 4 ) {
          setStep(5);
      } else if (step === 5 ) {
          setStep(6);
      } else if (step === 6) {
          setStep(7);
      } else if (step === 7 ) {
          setStep(8);
      } else if (step === 8 ) {
      } 
    };

    return (
        <View style={styles.mainlayout}>

            {step === 1 && (
            <View>
                <Text style={styles.title}> 팀스페이스의 이름을 지어주세요.ㅎ </Text>

                <View style={styles.nameContainer}>
                    <Text style={styles.name}>이름</Text>
                    <TextInput style={styles.nameInput} placeholder='이름' 
                     value={teamName}
                     onChangeText={text => setTeamName(text)}
                     />
                     <Text style={styles.nameLeng}> 0 / 15 </Text>
                </View>

                <View style={styles.btnNext}>
                  <Button title="다음으로" onPress={handleNext} color="white" />
                </View>
            </View>
            )}

            {step === 2 && (
            <View>
                <Text style={styles.title}> 팀스페이스를 설명하는 문장을 적어주세요 </Text>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}> 상세 설명 </Text>
                    <TextInput style={styles.nameInput} placeholder='상세설명'
                    value={teamComment}
                    onChangeText={text => setTeamComment(text)}/>
                    <Text style={styles.nameLeng}> 0 / 20 </Text>
                </View>

                <View style={styles.btnNext}>
                  <Button title="다음으로" onPress={handleNext} color="white" />
                </View>
            </View>
            )}
            
            {step === 3 && (
            <View>
                <Text style={styles.title}> 팀스페이스에 제출될 카드 템플릿을 {"\n"} 따로 지정하시겠어요? </Text>

                <RadioButtonGroup
                containerStyle={{ marginTop: 30 }}
                selected={istemplete}
                onSelected={(value) => setIsTemplete(value)}
                radioBackground="gray"
                >
                  <TouchableOpacity onPress={() => setIsTemplete("yes")} style={[styles.RadioBtn, istemplete === 'yes' && styles.selectedItem]}>
                    <RadioButtonItem value="yes"
                    label={<Text style={styles.font18}> 템플릿을 지정할래요 {"\n"}
                           <Text style={styles.name}> 제출 받아야 할 필수정보가 있다면 추천해요.</Text> </Text> 
                        } />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setIsTemplete("no")} style={[styles.RadioBtn,, istemplete === 'no' && styles.selectedItem]}>
                    <RadioButtonItem value="no"
                    label={<Text style={styles.font18}>자유롭게 제출하게 할래요 {"\n"}
                           <Text style={styles.name}>구성원들이 자유롭게 카드를 작성하여 제출해요.</Text> </Text>
                          } />
                  </TouchableOpacity>

                </RadioButtonGroup>
                
                <View style={styles.btnNext}>
                  <Button title="다음으로" onPress={handleNext} color="white" />
                </View>
            </View>
            )}
            
            {step === 4 && (
            <View>
                <Text style={styles.largetitle}> 팀스페이스를  성격에 제일 가까운 {'\n'} 템플릿을 선택하세요. </Text>

                <View style={styles.container}>
                  <View style={styles.row}>

                  {items.map(item => (                  
                  <TouchableOpacity
                  key={item.id}
                  style={[styles.item, templete === item.id && styles.selectedItem]}
                  onPress={() => handleTemplClick(item.id)}
                  >
                    <Image source={item.image} />
                    <Text style={[styles.font18, { marginTop: 11 }]}>{item.label}</Text>
                    <Text style={[styles.name, styles.text]}>{item.description}</Text>
                  </TouchableOpacity>
                ))}

                  </View>
                </View>

                <View style={styles.btnNext}>
                  <Button title="다음으로" onPress={handleNext} color="white" />
                </View>
            </View>
            )}
            
            {step === 5 && (
            <View>
                <Text style={styles.title}> 카드 앞면에 보여질 정보를 선택하세요. </Text>
                <Text style={styles.subtitle}> 팀원들이 입력해줬으면 하는 항목을 선택하세요. </Text>
                
                <View style={styles.btnNext}>
                  <Button title="다음으로" onPress={handleNext} color="white" />
                </View>
            </View>
            )}
            
            {step === 6 && (
            <View>
                <Text style={styles.title}> 카드 뒷면에 보여질 정보를 선택하세요. </Text>
                <Text style={styles.subtitle}> 최대 8개까지 정보를 표시할 수 있어요. </Text>
                
                <View style={styles.btnNext}>
                  <Button title="다음으로" onPress={handleNext} color="white" />
                </View>
            </View>
            )}
            
            {step === 7 && (
            <View>
                <Text style={styles.title}> 팀원들이 제출할 템플릿은 {'\n'} 이렇게 구성되겠네요. </Text>
                
                <Text style={styles.subtitle}> 탭하여 뒷면을 확인하세요. </Text>
                
                <View style={styles.btnNext}>
                  <Button title="팀스페이스 생성 완료할래요" onPress={handleNext} color="white" />
                </View>
            </View>
            )}

            {step === 8 && (
                <View>
                    <Text style={styles.title}> 팀스페이스 생성이 완료되었어요!
                    {'\n'} 바로 초대해 보세요. </Text>

                    <Text> 초대코드 </Text>

                    <Button title="홈화면으로"
                    onPress={() => navigation.navigate('Home')} />

                    <Button title="팀스페이스 확인"
                    onPress={() => navigation.navigate('CheckCard')} />
                </View>
                )}          
        </View>      
    );
  }


  export default CreateTeamSp;