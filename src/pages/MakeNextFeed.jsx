import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import {dummy_tracks} from '../data/dummy_tracks';

const {width} = Dimensions.get('window');
const locationIcon = require('../assets/icons/location.png');
const feedPersonIcon = require('../assets/icons/feedPerson.png');
const feedArrowIcon = require('../assets/icons/feedArrow.png');
const closeIcon = <AntDesignIcon name="close" size={20} />;
const musicIcon = <MaterialCommunityIcons name="music" size={25} />;
const photo = require('../assets/images/photo.png');

const MakeNextFeed = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추가


  useEffect(() => {
    const initializeTrackPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
      } catch (error) {
        console.error('Error initializing TrackPlayer:', error);
      }
    };

    initializeTrackPlayer();

    return () => {
      // Clean up code if needed
    };
  }, []);

  const handleMusicSelect = async item => {
    setSelectedMusic(item);
    setModalVisible(false);
    try {
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: item.id,
        url: item.url,
        title: item.title,
        artist: 'Unknown Artist',
      });
      await TrackPlayer.play();
      setIsPlaying(true); // 재생 상태 설정
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };

  const handleCancel = async () => {
    setSelectedMusic(null);
    setModalVisible(false);
    await TrackPlayer.stop();
    setIsPlaying(false); // 재생 상태 초기화
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
          style={{width: width - 32, height: width * 0.6}}
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
      <TouchableOpacity
        style={styles.musicContainer}
        onPress={() => setModalVisible(true)}>
        <View style={styles.musicIconContainer}>
          <View style={styles.musicIcon}>{musicIcon}</View>
          <Text>{selectedMusic ? selectedMusic.title : '노래 선택'}</Text>
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
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleMusicSelect(item)}>
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
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  musicIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  musicIcon: {
    width: 30,
    height: 30,
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
    marginTop: 10,
  },
  selectButton: {
    backgroundColor: '#4aabff',
    padding: 16,
    borderRadius: 6,
    marginTop: 10,
  },
});

export default MakeNextFeed;
