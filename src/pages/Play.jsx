import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { dummy_video_list } from '../data/dummy_video_list';

const heartIcon = require('../assets/icons/white_heart.png');
const commentsIcon = require('../assets/icons/white_comments.png');

const Play = () => {
  const { width, height } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState(Array(dummy_video_list.length).fill(0)); // 각 동영상의 하트 갯수를 추적하는 배열

  //비디오 일시 정지
  const togglePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  const onHeartPress = index => {
    const newHearts = [...hearts];
    newHearts[index] += 1; // 누른 동영상의 하트 갯수를 1 증가
    setHearts(newHearts);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={togglePlayPause}>
        <View>
          <Video
            source={{ uri: item.url }}
            resizeMode="cover"
            playInBackground={false}
            playWhenInactive={false}
            repeat={true}
            paused={!isPlaying}
            rate={1}
            onLoad={() => setIsPlaying(true)}
            style={{ width, height: height - 120 }}
          />
          <View style={styles.backgroundContainer} />
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfo}>
              <TouchableOpacity style={styles.userInfoTouch}>
                <Image
                  source={{ uri: 'https://picsum.photos/130/130' }}
                  style={styles.userProfile}
                />
                <Text style={styles.userName}>{item.user}</Text>
                <TouchableOpacity style={styles.followContainer}>
                  <Text style={styles.followText}>팔로우</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemContents}>{item.contents}</Text>
          </View>
          <View style={styles.heartCommentsContainer}>
            <TouchableOpacity
              style={styles.heartTouch}
              onPress={() => onHeartPress(index)} // 하트를 누르면 해당 인덱스의 동영상 하트 갯수 증가
            >
              <Image source={heartIcon} style={styles.heartIcon} />
              <Text style={styles.hearts}>{hearts[index]}</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentsTouch}>
              <Image source={commentsIcon} style={styles.commentsIcon} />
              <Text style={styles.comments}>
                {item.comments.toLocaleString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={dummy_video_list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          snapToInterval={height - 120}
          snapToAlignment="start"
          decelerationRate={'fast'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 140,
    backgroundColor: '#000',
    opacity: 0.1,
  },
  userInfoContainer: {
    position: 'absolute',
    bottom: 52,
  },
  userInfo: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  userInfoTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  followContainer: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  followText: {
    fontSize: 16,
    color: '#fff',
  },
  itemContents: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16,
  },
  heartCommentsContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
  heartTouch: {
    alignItems: 'center',
  },
  heartIcon: {
    width: 40,
    height: 40,
  },
  hearts: {
    fontSize: 13,
    color: '#fff',
  },
  commentsTouch: {
    alignItems: 'center',
  },
  commentsIcon: {
    width: 40,
    height: 40,
  },
  comments: {
    fontSize: 13,
    color: '#fff',
  },
});

export default Play;
