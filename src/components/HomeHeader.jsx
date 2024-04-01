// Header.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';


const title = require('../assets/images/title.png');
const chat = require('../assets/icons/chat.png');
const heart = require('../assets/icons/heart.png');

const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={title} style={styles.titleImage} />
      <View style={styles.headerIconsContainer}>
        <TouchableOpacity>
          <Image source={heart} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DmList')}>
          <Image source={chat} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleImage: {
    width: 90,
    height: 30,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    width: 32,
    height: 32,
  },
});

export default HomeHeader;
