import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';

import {dummy_searchList} from '../data/dummy_SearchList';

const searchIcon = require('../assets/icons/search.png');
const keywordDeleteIcon = require('../assets/icons/keywordDelete.png');

const {width} = Dimensions.get('window');

const SearchList = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState(dummy_searchList);

  const handleCancleButton = () => {
    setKeyword('');
    Keyboard.dismiss();
  };

  const handleSearch = () => {
    // 텍스트 입력란에 입력된 값을 검색어로 사용하여 검색 결과를 가져옴
    const filteredResults = dummy_searchList.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    // 검색 결과를 상태에 반영하여 화면에 출력
    setSearchResults(filteredResults);
  };

  const handleAllDelete = () => {
    // 전체 삭제 버튼을 눌렀을 때 dummy_search 배열 초기화
    setKeyword('');
    setSearchResults([]);
    Keyboard.dismiss();
  };

  const handleOneDelete = id => {
    const updatedResults = searchResults.filter(item => item.id !== id);
    setSearchResults(updatedResults);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.recentKeywordRow}>
        <TouchableOpacity style={styles.recentKeywordUser}>
          <Image
            source={{uri: item.profileImg}}
            style={styles.recentKeywordUserIcon}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOneDelete(item.id)}>
          <Image source={keywordDeleteIcon} style={styles.keywordDeleteIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.secondContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchSection}>
              <TouchableOpacity style={styles.searchIconStyle}>
                <Image source={searchIcon} style={styles.searchIcon} />
              </TouchableOpacity>
              <TextInput
                returnKeyType="search"
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize="none"
                value={keyword}
                onChangeText={text => setKeyword(text)}
                allowFontScaling={false}
                style={styles.inputStyle}
                autoFocus
                onSubmitEditing={handleSearch} // 검색어 입력 후 엔터를 누르면 handleSearch 함수 호출
              />
            </View>
            <TouchableOpacity onPress={handleCancleButton}>
              <Text style={styles.cancleText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.recentKeywordContainer}>
            <Text style={styles.recentKeywordLabel}>최근 검색</Text>
            <TouchableOpacity onPress={handleAllDelete}>
              <Text style={styles.allDeleteLabel}>전체삭제</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  secondContainer: {
    flex: 1,
  },
  searchContainer: {
    height: 68,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginBottom: 24,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
    backgroundColor: '#F8F8F8',
    gap: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent:'flex-start',
    alignItems: 'center',
  },
  searchIconStyle: {
    marginLeft: 16,
    marginRight: 2,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#828282',
    paddingRight: 12,
    backgroundColor: '#f8f8f8',
  },
  cancleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F80ED',
  },
  recentKeywordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  recentKeywordLabel: {
    fontSize: 16,
    color: '#333',
  },
  allDeleteLabel: {
    fontSize: 16,
    color: '#828282',
  },
  recentKeywordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  recentKeywordUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  recentKeywordUserIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  keywordDeleteIcon: {
    width: 40,
    height: 40,
  },
});
export default SearchList;
