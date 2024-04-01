import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const {width, height}= Dimensions.get('window');

const FeedModal = ({isVisible, setFeedModal,navigation }) => {

const handleDm = () => {
  setFeedModal(false);
  navigation.navigate('Dm');
} 
  return (
    <Modal
      isVisible={isVisible}
      backdropColor="rgba(0, 0, 0, 0.5)"
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}
      onBackdropPress={() => setFeedModal(false)} // 바깥 부분 터치 시 모달 닫기
      >
      <View style={styles.modalContent}>
        <View style={styles.separator}></View>
        <TouchableOpacity>
          <Text style={styles.optionText}>즐겨찾기에 추가</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.optionText}>팔로우 취소</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDm}>
          <Text style={styles.optionText}>DM 보내기</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.optionText}>신고하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height / 2, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  separator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FeedModal;
