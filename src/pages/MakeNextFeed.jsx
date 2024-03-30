import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');
const locationIcon = require('../assets/icons/location.png')
const feedPersonIcon = require('../assets/icons/feedPerson.png')
const feedArrowIcon = require('../assets/icons/feedArrow.png')
const closeIcon = <AntDesignIcon name="close" size={20} />;
const photo = require('../assets/images/photo.png');

const MakeNextFeed = ({navigation}) => {
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
      
      <View style={styles.divider}/>

      <TouchableOpacity style={styles.locationContainer}>
      <View style={styles.locationIconContainer}>
        <Image style={styles.locationIcon}source={locationIcon}/>
        <Text>위치 추가</Text>
        </View>
        <Image style={styles.feedArrowIcon}source={feedArrowIcon}/>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.feedPersonContainer}>
        <View style={styles.feedPersonIconContainer}>
        <Image style={styles.feedPersonIcon}source={feedPersonIcon}/>
        <Text>사람 태그</Text>
        </View>
        <Image style={styles.feedArrowIcon}source={feedArrowIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.MusicContainer}>
        <View style={styles.MusicIconContainer}>
        <Image style={styles.feedPersonIcon}source={feedPersonIcon}/>
        <Text>노래 선택</Text>
        </View>
        <Image style={styles.feedArrowIcon}source={feedArrowIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>공유</Text>
      </TouchableOpacity>
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
    fontWeight:'bold'
  },
  headerText: {
    color: '#3a3a3a',
    fontWeight: 'bold',
    fontSize: 17,
  },
  text: {
    marginTop: 20,
    fontSize: 17,
    fontWeight:'bold',
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
    flexDirection:'row', alignItems:'center', justifyContent:'space-between', margin:16
  },
  locationIconContainer : {
    flexDirection:'row', alignItems:'center', gap:4
  },
  locationIcon: {
    width:30,height:30
  },
  feedArrowIcon: {
    width:24,height:24
  },
  feedPersonContainer: {
    flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:16
  },
  feedPersonIconContainer : {
    flexDirection:'row', alignItems:'center', gap:4
  },
  feedPersonIcon: {
    width:30,height:30
  },
  MusicContainer: {
    flexDirection:'row', alignItems:'center', justifyContent:'space-between', margin:16
  },
  MusicIconContainer : {
    flexDirection:'row', alignItems:'center', gap:4
  },
  buttonContainer : [
    {flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:6, borderWidth:1, borderColor:'#4aabff', margin:16, padding:12, backgroundColor:'#4aabff'}
  ],
  buttonText : {
    color:'#fff', fontWeight:'bold'
  }

  

});
export default MakeNextFeed;
