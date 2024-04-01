import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DmAlarmIcon = require('../assets/icons/DmAlarm.png');
const settingIcon = require('../assets/icons/setting.png');
const MyPageProfileImage = require('../assets/images/MyPageProfile.png');
const Tab = createMaterialTopTabNavigator();

const GoMakeFeed = ({navigation}) => {
  return (
    <View style={styles.addStoryContainer}>
      <Text style={styles.addStoryText}>
        친구들과의 소중한 순간을 남겨보세요
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('MakeFeed')}>
        <Text style={styles.addStoryText2}>첫 게시물을 만들어보세요</Text>
      </TouchableOpacity>
    </View>
  );
};

const Gallery = () => {
  return (
    <View style={styles.galleryContainer}>
      <Text style={styles.galleryText}>회원님이 나온 사진 및 동영상</Text>
      <Text style={styles.galleryText2}>
        사람들이 회원님을 사진 및 동영상에서 태그하면{'\n'}
        태그된 사진 및 동영상이 여기에 표시됩니다.
      </Text>
    </View>
  );
};

const MyPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eef0ed'}}>
      <View>
        <View style={styles.dmHeader}>
          <Text style={styles.dmHeaderText}>Joonyeab311</Text>
          <View style={styles.dmHeaderIconCantainer}>
            <TouchableOpacity>
              <Image style={styles.DmAlarmIcon} source={DmAlarmIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.settingIcon} source={settingIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.chooseImageContainer}>
        <TouchableOpacity onPress={handleChooseImage}>
          {selectedImage ? (
            <Image
              style={{width: 80, height: 80, borderRadius: 40}}
              source={{uri: selectedImage}}
            />
          ) : (
            <Image
              style={{width: 80, height: 80}}
              source={MyPageProfileImage}
            />
          )}
        </TouchableOpacity>
        <View style={styles.followerInfoContainer}>
          <TouchableOpacity>
            <View style={styles.textContinaer}>
              <Text>0</Text>
              <Text>게시물</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.textContinaer}>
              <Text>0</Text>
              <Text>팔로워</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.textContinaer}>
              <Text>0</Text>
              <Text>팔로잉</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userNameContainer}>
        <Text>김준엽</Text>
      </View>
      <View style={styles.makeProfile}>
        <TouchableOpacity style={styles.cutProfile}>
          <Text>프로필 편집</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareProfile}>
          <Text>프로필 공유</Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: '9%', // 원하는 높이로 조절
            backgroundColor: '#eef0ed',
          },
          tabBarLabelStyle: {fontSize: 16},
          tabBarIndicatorStyle: {backgroundColor: '#4f4f4f'},
        }}>
        <Tab.Screen
          name="GoMakeFeed"
          component={GoMakeFeed}
          options={{
            tabBarIcon: () => (
              <MaterialIcons
                name="post-add"
                size={30}
                style={{width: 30, height: 30}}
              />
            ),
            tabBarLabel: '',
          }}
        />

        <Tab.Screen
          name="Gallery"
          component={Gallery}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="image-frame"
                size={30}
                style={{width: 30, height: 30}}
              />
            ),
            tabBarLabel: '',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dmHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dmHeaderIconCantainer: {
    flexDirection: 'row',
    gap: 8,
  },
  DmAlarmIcon: {
    width: 40,
    height: 40,
  },
  settingIcon: {
    width: 40,
    height: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addStoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addStoryText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addStoryText2: {
    fontSize: 16,
    color: '#4aabff',
    fontWeight: '600',
  },
  galleryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryText: {
    fontSize: 25,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  galleryText2: {
    textAlign: 'center',
  },
  chooseImageContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followerInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  textContinaer: {
    alignItems: 'center',
  },
  userNameContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingTop: 8,
  },
  makeProfile: {
    flexDirection: 'row',
    gap: 6,
    padding: 16,
  },
  cutProfile: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 4,
  },
  shareProfile: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 4,
  },
});

export default MyPage;
