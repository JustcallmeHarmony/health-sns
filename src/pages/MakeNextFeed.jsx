import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Modal, FlatList } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';

const { width } = Dimensions.get('window');
const locationIcon = require('../assets/icons/location.png');
const feedPersonIcon = require('../assets/icons/feedPerson.png');
const feedArrowIcon = require('../assets/icons/feedArrow.png');
const closeIcon = <AntDesignIcon name="close" size={20} />;
const photo = require('../assets/images/photo.png');



const dummy_tracks = [
  { id: 'track1', title: 'Track 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'track2', title: 'Track 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'track3', title: 'Track 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'track4', title: 'Track 4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 'track5', title: 'Track 5', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];



const MakeNextFeed = ({ navigation }) => {
  // modalVisible 상태를 관리하는 useState 훅
  const [modalVisible, setModalVisible] = useState(false);
  // 선택된 음악을 저장하는 useState 훅
  const [selectedItem, setSelectedItem] = useState(null);

  // 음악을 선택했을 때 호출되는 함수
  const handleMusicSelect = async (item) => {
    // 선택된 음악을 selectedItem 상태로 업데이트
    setSelectedItem(item);
    // 모달을 닫음
    setModalVisible(false);
    try {
      // 트랙 플레이어를 설정
      await TrackPlayer.setupPlayer();
      // 현재 재생 중인 음악을 중지
      await TrackPlayer.stop();
      // 선택된 음악을 트랙 플레이어에 추가
      await TrackPlayer.add({
        id: item.id,
        url: item.url,
        title: item.title,
        artist: 'Unknown Artist',
      });
      // 선택된 음악을 재생
      await TrackPlayer.play();
    } catch (error) {
      // 에러가 발생하면 콘솔에 에러 메시지 출력
      console.error('Error playing music:', error);
    }
  };

  // 취소 버튼을 눌렀을 때 호출되는 함수
  const handleCancel = async () => {
    // 모달을 닫음
    setModalVisible(false);
    // 트랙 플레이어를 멈춤
    await TrackPlayer.stop();
  };

  return (
    <SafeAreaView>
      <View style={styles.HeaderContainer}>
        <View style={styles.closeIconCantainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {closeIcon}
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>새 게시물</Text>
        </View>
      </View>

      <View style={styles.userContainer}>
        <Image
          source={photo}
          resizeMode="contain"
          style={{ width: width - 32, height: width * 0.6 }}
        />
        <TextInput
          style={styles.text}
          placeholder="문구를 작성해주세요"
          maxLength={300}
          multiline={true}
          autoCorrect={false}
        />
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <Image style={styles.locationIcon} source={locationIcon} />
          <Text>위치 추가</Text>
        </View>
        <Image style={styles.feedArrowIcon} source={feedArrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.feedPersonContainer}>
        <View style={styles.feedPersonIconContainer}>
          <Image style={styles.feedPersonIcon} source={feedPersonIcon} />
          <Text>사람 태그</Text>
        </View>
        <Image style={styles.feedArrowIcon} source={feedArrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.MusicContainer} onPress={() => setModalVisible(true)}>
        <View style={styles.MusicIconContainer}>
          <Image style={styles.feedPersonIcon} source={feedPersonIcon} />
          <Text>{selectedItem ? selectedItem.title : "노래 선택"}</Text>
        </View>
        <Image style={styles.feedArrowIcon} source={feedArrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>공유</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={dummy_tracks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.selectButton} onPress={() => handleMusicSelect(item)}>
                  <Text style={styles.buttonText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <Text style={styles.closeButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  closeIconCantainer: {
    flex: 0.5,
  },
  headerTextContainer: {
    paddingVertical: 16,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#3a3a3a',
    fontWeight: 'bold',
    fontSize: 17,
  },
  text: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    minHeight: 100,
    maxHeight: 250,
  },
  userContainer: {
    marginHorizontal: 16,
  },
  divider: {
    borderWidth: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  locationIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    width: 30,
    height: 30,
  },
  feedArrowIcon: {
    width: 24,
    height: 24,
  },
  feedPersonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  feedPersonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedPersonIcon: {
    width: 30,
    height: 30,
  },
  MusicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  MusicIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4aabff',
    margin: 16,
    padding: 12,
    backgroundColor: '#4aabff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: '#4aabff',
    padding: 16,
    borderRadius: 6,
    marginTop: 10,
  },
});

export default MakeNextFeed;
