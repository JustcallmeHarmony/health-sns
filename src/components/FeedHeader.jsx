import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const closeIcon = <AntDesignIcon name="close" size={20} />;

const FeedHeader = ({navigation}) => {
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {closeIcon}
      </TouchableOpacity>
      <Text style={styles.headerText}>새 게시물</Text>
      <TouchableOpacity onPress={() => navigation.navigate('MakeNextFeed')}>
        <Text style={styles.nextPage}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16,
  },
  headerText: {
    paddingHorizontal: 60,
    color: '#3a3a3a',
    fontWeight: 'bold',
    fontSize: 17,
  },
  nextPage: {
    color: '#4aabff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default FeedHeader;
