import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {dummy_search} from '../data/dummy_Search';

const search = require('../assets/icons/search.png');

const searchIcon = require('../assets/icons/search.png');
const multiPhoto = require('../assets/icons/multiPhoto.png');

const arrowleftIcon = <AntDesignIcon name="arrowleft" size={25} />;

const {width} = Dimensions.get('window');

const Search = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.renderContainer}>
        {item.isMulti && (
          <Image source={multiPhoto} style={styles.isMultiImage} />
        )}
        <Image
          source={{uri: item.img}}
          style={{width: width / 3 - 2, height: width / 3 - 2}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {arrowleftIcon}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchList')}
          style={styles.headerGoSearchList}>
          <View style={styles.searchContainer}>
            <Image style={styles.searchIcon} source={search} />
            <TextInput style={styles.searchText} placeholder="검색" />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummy_search}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        numColumns={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  isMultiImage: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 16,
    height: 16,
    zIndex: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerGoSearchList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 30,
    margin: 16,
    paddingVertical: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchIcon: {
    marginLeft: 16,
    width: 30,
    height: 30,
  },
  searchText: {},
});

export default Search;
