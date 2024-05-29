import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import "react-native-gesture-handler";

export default function HostTemplate({ navigation }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
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
  const [music, setMusic] = useState('');
  const [movie, setMovie] = useState('');

  const [showAge, setShowAge] = useState(true);
  const [showSchool, setShowSchool] = useState(true);
  const [showGrade, setShowGrade] = useState(true);
  const [showStudNum, setStudNum] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showClub, setShowClub] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showSns, setShowSns] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showMbti, setShowMbti] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [cover, setCover] = useState(1);


  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  return (
    <View>
      {/* 카드 앞면 - 기본 정보 */}
      {step === 1 && (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 나에 대한 기본 정보를 알려주세요 </Text>

            {/* 이름 */}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>이름</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="이름을 입력하세요."
                keyboardType="default"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* 생년월일 */}
            {showAge && (
              <View style={styles.inputBirthContainer}>
                <TextInput
                  style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                  placeholder="년"
                  keyboardType="numeric"
                  value={year}
                  onChangeText={setYear}
                  maxLength={4}
                />
                <TextInput
                  style={[styles.inputBirth, styles.inputBirthText, styles.marginR8]}
                  placeholder="월"
                  keyboardType="numeric"
                  value={month}
                  onChangeText={setMonth}
                  maxLength={2}
                />
                <TextInput
                  style={[styles.inputBirth, styles.inputBirthText]}
                  placeholder="일"
                  keyboardType="numeric"
                  value={day}
                  onChangeText={setDay}
                  maxLength={2}
                />
              </View>
            )
            }

            {/* 학교 */}
            {showSchool && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>학교명</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="학교명을 입력하세요."
                  keyboardType="default"
                  value={school}
                  onChangeText={setSchool}
                />
              </View>
            )
            }

            {/* 학년 */}
            {showGrade && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>학년</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="학년을 입력하세요."
                  keyboardType="numeric"
                  value={grade}
                  onChangeText={setGrade}
                />
              </View>
            )
            }

            {/* 한줄소개 */}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>이름*</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="한줄소개를 입력하세요."
                keyboardType="default"
                value={comment}
                onChangeText={setComment}
              />
            </View>

          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - 학번/직무/동아리/재학여부*/}
      {step === 2 && (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 나에 대해 더 알려주세요. </Text>

            {/* 학생번호 */}
            {showStudNum && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>학생번호</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="학생번호를 입력하세요"
                  keyboardType="numeric"
                  value={studNum}
                  onChangeText={setShowNum}
                />
              </View>
            )}

            {/* 직무 */}
            {showJob && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>직무</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="직무"
                  keyboardType="default"
                  value={job}
                  onChangeText={setJob}
                />
              </View>
            )}

            {/* 동아리 */}
            {showClub && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>동아리</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="소속 동아리"
                  keyboardType="default"
                  value={club}
                  onChangeText={setClub}
                />
              </View>
            )}

            {/* 재학여부 */}
            {showStatus && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>재학여부</Text>
                <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                  <View style={styles.radioBtnGruopContainer}>
                    <TouchableOpacity style={styles.radioBtnContainer} onPress={() => setStatus('휴학')}>
                      <RadioButton value="휴학" uncheckedColor={theme.gray30} color={theme.skyblue} />
                      <Text style={styles.font16}>휴학 중</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.radioBtnContainer} onPress={() => setStatus('재학')}>
                      <RadioButton value="재학" uncheckedColor={theme.gray30} color={theme.skyblue} />
                      <Text style={styles.font16}>재학 중</Text>
                    </TouchableOpacity>
                  </View>
                </RadioButton.Group>
              </View>
            )}


          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - sns/이메일 */}
      {step === 3 && (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 추가적인 연락수단을 알려주세요. </Text>

            {/* sns */}
            {showSns && (
              <View>
                <Text style={styles.font16}>SNS</Text>
                <View style={{ marginBottom: 16 }}>
                  <Text style={styles.name}>Instargram</Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="Instargram"
                    keyboardType="default"
                    value={sns[0]}
                    onChangeText={text => setSns(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                  />
                </View>
                <View style={{ marginBottom: 48 }}>
                  <Text style={styles.inputText}>X(트위터)</Text>
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

            {/* 이메일 */}
            {showEmail && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>이메일</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="이메일 주소"
                  keyboardType="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            )}

          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - MBTI/인생음악/인생영화 */}
      {step === 4 && (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 사소한 것까지 더 알려주세요. </Text>
            
            {/* MBTI */}
            {showMbti && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>MBTI</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="MBTI"
                  keyboardType="default"
                  value={mbti}
                  onChangeText={setMbti}
                />
              </View>
            )}

            {/* 인생 음악 */}
            {showMusic && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>인생 음악</Text>
                <View style={styles.flexDirectionRow}>
                  <TextInput
                    style={[styles.musicInput,{marginRight: 6}]}
                    placeholder="제목명"
                    keyboardType="default"
                    value={music[0]}
                    onChangeText={text => setMusic(prevState => [...prevState.slice(0, 1), text, ...prevState.slice(2)])}
                  />
                  <TextInput
                    style={styles.musicInput}
                    placeholder="가수명"
                    keyboardType="default"
                    value={music[1]}
                    onChangeText={text => setMusic(prevState => [...prevState.slice(0, 2), text])}
                  />
                </View>
              </View>
            )}

            {/* 인생 영화 */}
            {showMovie && (
              <View style={styles.nameContainer}>
                <Text style={styles.name}>인생 영화</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="영화명"
                  keyboardType="default"
                  value={movie}
                  onChangeText={setMovie}
                />
              </View>
            )}
          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 카드 생성 완료할래요. </Text>
            </View>
          </View>
        </View>
      )}

      {/* 팀스페이스 입장 완료 */}
      {step === 5 && (
        <View style={{ height: 720 }}>
          <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

          <View style={styles.flexSpacer} />

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={() => navigation.navigate("카드 조회")} style={styles.btnText}> 팀스페이스 확인 </Text>
            </View>
            <View style={styles.btnWhite}>
              <Text onPress={() => navigation.navigate(" ")} style={styles.btnTextBlack}> 홈 화면으로 </Text>
            </View>
          </View>
        </View>
      )}



    </View>
  )
}