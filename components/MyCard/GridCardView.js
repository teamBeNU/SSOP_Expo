import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardViewStyle';


export const GridCardView = () => {
    return (
        <View>

        </View>
    );
};

  //     <View style={styles.container}>
        //     <Text style={styles.cardPage}>{cardPage} / {cardData.length}</Text>
        //     <ScrollView 
        //        horizontal 
        //        pagingEnabled
        //        showsHorizontalScrollIndicator={false}
        //        decelerationRate={0} 
        //        snapToInterval={SCREEN_WIDTH * 0.89}
        //        snapToAlignment='center'
        //        contentContainerStyle={{ ...styles.cardScrollView, paddingHorizontal: SPACING_FOR_CARD_INSET, }}
        //        onScroll={handleScroll}
        //        scrollEventThrottle={16} 
        //     >
        //         {cardData.map((item, index) => (
        //         <View key={index} style={styles.cardWrapper}>
        //             <Card />
        //         </View>
        //         ))}
        //     </ScrollView>
            
        //     <View style={styles.btnContainer}>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.whiteBtn} onPress={() => setIsModalVisible(true)}>
        //                 <EditIcon />
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>수정하기</Text>
        //             <Modal
        //                 animationType="fade"
        //                 transparent={true}
        //                 visible={isModalVisible}
        //                 onRequestClose={() => {
        //                     setIsModalVisible(false); 
        //                 }}
        //             >
        //                 <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        //                     <View style={styles.modalContainer}>
        //                         <TouchableWithoutFeedback>
        //                             <View style={styles.modalView}>
        //                                 <View style={styles.modalTitle}>
        //                                     <Text style={styles.modalFont}>프로필 카드 수정하기</Text>
        //                                     <TouchableOpacity onPress={() => setIsModalVisible(false)}>
        //                                         <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
        //                                     </TouchableOpacity>
        //                                 </View>
        //                                 <View style={styles.modalContent}>
        //                                     <TouchableOpacity onPress={() => {
        //                                         setIsModalVisible(false);
        //                                         navigation.navigate('카드 정보 수정', {card: cardData});}}>
        //                                      <Text style={styles.modalTitle}>정보 수정할래요</Text>
        //                                     </TouchableOpacity>
        //                                     <View style={styles.line} />
        //                                     <TouchableOpacity onPress={() => {
        //                                         setIsModalVisible(false);
        //                                         navigation.navigate('카드 커버 수정', {card: cardData});}}>
        //                                     <Text style={styles.modalTitle}>표지 수정할래요</Text>
        //                                     </TouchableOpacity>
        //                                 </View>
        //                             </View>
        //                         </TouchableWithoutFeedback>
        //                     </View>
        //                 </TouchableWithoutFeedback>
        //             </Modal>
        //         </View>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.whiteBtn} onPress={onShare}>
        //                 <ShareIcon />
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>공유하기</Text>
        //         </View>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.whiteBtn}>
        //                 <DeleteIcon />
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>삭제하기</Text>
        //         </View>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.blackBtn}>
        //                 <AddIcon/>
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>새 카드 </Text>
        //         </View>
        //     </View>
        // </View> 