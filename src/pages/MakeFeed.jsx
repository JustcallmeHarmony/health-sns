import React, {useState} from 'react';
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
import FeedHeader from '../components/FeedHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {dummy_FeedImage} from '../data/dummy_FeedImage';

const greaterIcon = <MaterialCommunityIcons name="greater-than" size={20} />;
const photo = require('../assets/images/photo.png');
const {width} = Dimensions.get('window');

const MakeFeed = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);

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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() => setSelectedItem(item.img)}>
        <Image
          source={{uri: item.img}}
          style={{width: width / 4, height: width / 4}}
        />
      </TouchableOpacity>
    );
  };

  console.log('selectedItem:', selectedItem);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <FeedHeader navigation={navigation} />
      <View style={styles.photoContainer}>
        {selectedItem ? (
          <Image
            source={{uri: selectedItem}}
            style={{width: width, height: width}}
          />
        ) : (
          <Image source={photo} style={{width: width, height: width}} />
        )}
      </View>
      <TouchableOpacity onPress={pickImageFromGallery} style={styles.resent}>
        <Text style={styles.resentText}>최근</Text>
        <View style={styles.resentIcon}>{greaterIcon}</View>
      </TouchableOpacity>
      <FlatList
        data={dummy_FeedImage}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        numColumns={4}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('NextFeed', {selectedItem: selectedItem})
        }>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    transform: [{rotate: `90deg`}],
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

export default MakeFeed;
