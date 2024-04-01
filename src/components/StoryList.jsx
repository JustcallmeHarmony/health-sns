// StoryList.js
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import {dummy_story} from '../data/dummy_storty';

const StoryList = () => {
  const renderStory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          index === 0 ? styles.storyContainerFirst : styles.storyContainer
        }>
        <Image
          source={{uri: item.profileImg}}
          style={
            item.isOpen ? styles.storyProfileImgOpen : styles.storyProfileImg
          }
        />
        <Text numberOfLines={1} style={styles.storyName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={dummy_story}
        renderItem={renderStory}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
      />
      <View style={styles.storyDivider} />
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainerFirst: {
    marginHorizontal: 16,
  },
  storyContainer: {
    marginRight: 16,
  },
  storyProfileImg: {
    width: 52,
    height: 52,
    marginBottom: 2,
  },
  storyProfileImgOpen: {
    width: 52,
    height: 52,
    marginBottom: 2,
    borderWidth: 2,
    borderColor: '#2a85ff',
    borderRadius: 26,
  },
  storyName: {
    maxWidth: 52,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.22,
    color: '#4f4f4f',
    alignSelf:'center'
  },
  storyDivider: {
    borderWidth: 1,
    marginTop: 16,
  },
});

export default StoryList;
