import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const closeIcon = <AntDesignIcon name="close" size={20} />;

const NextFeed = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.HeaderContainer}>
        <View style={styles.closeIconCantainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {closeIcon}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>새 게시물</Text>
        </View>
      </View>
      <FlatList/>
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
  headerText: {
    color: '#3a3a3a',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
export default NextFeed;
