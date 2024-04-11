import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeedHeader from '../components/FeedHeader'; // 피드 헤더 컴포넌트 가져오기
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // 아이콘 컴포넌트 가져오기
import ImagePicker from 'react-native-image-crop-picker'; // 이미지 피커 라이브러리 가져오기
import { dummy_FeedImage } from '../data/dummy_FeedImage'; // 더미 피드 이미지 데이터 가져오기

const greaterIcon = <MaterialCommunityIcons name="greater-than" size={20} />;
const photo = require('../assets/images/photo.png');
// 디바이스의 너비 가져오기
const { width } = Dimensions.get('window');

// 피드 만들기 컴포넌트 정의
const MakeFeed = ({ navigation }) => {
  // 선택된 아이템을 상태로 관리
  const [selectedItem, setSelectedItem] = useState(null);

  // 갤러리에서 이미지 선택하는 함수
  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    }).then(images => {
      images.forEach(image => {
        console.log('Selected Image:', image.path);
        setSelectedItem(image.path); // 선택한 이미지 경로를 상태에 설정
      });
    });
  };

  // 피드 이미지 항목을 렌더링하는 함수
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() => setSelectedItem(item.img)}>
        <Image
          source={{ uri: item.img }}
          style={{ width: width / 4, height: width / 4 }}
        />
      </TouchableOpacity>
    );
  };

  console.log('selectedItem:', selectedItem);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* 피드 헤더 컴포넌트 렌더링 */}
      <FeedHeader navigation={navigation} />
      {/* 선택된 이미지 또는 기본 사진을 표시하는 컨테이너 */}
      <View style={styles.photoContainer}>
        {selectedItem ? (
          <Image
            source={{ uri: selectedItem }}
            style={{ width: width, height: width }}
          />
        ) : (
          <Image source={photo} style={{ width: width, height: width }} />
        )}
      </View>
      {/* 갤러리에서 최근 선택한 이미지 보여주는 영역 */}
      <TouchableOpacity onPress={pickImageFromGallery} style={styles.resent}>
        <Text style={styles.resentText}>최근</Text>
        <View style={styles.resentIcon}>{greaterIcon}</View>
      </TouchableOpacity>
      {/* 피드 이미지 목록을 보여주는 FlatList */}
      <FlatList
        data={dummy_FeedImage}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        numColumns={4}
      />
      {/* 다음 화면으로 이동하는 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('NextFeed', { selectedItem: selectedItem })
        }>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  safeAreaContainer: {},
  photoContainer: {
    marginTop: 20,
    width: width,
  },
  resent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 16,
  },
  resentText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  resentIcon: {
    transform: [{ rotate: `90deg` }],
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MakeFeed; // 피드 만들기 컴포넌트 내보내기
