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
  Keyboard
} from 'react-native';

const searchIcon = require('../assets/icons/search.png');
const keywordDeleteIcon = require('../assets/icons/keywordDelete.png');

const {width} = Dimensions.get('window');

const SearchList = () => {
  const [keyword, setKeyword] = useState('');

  const handleCancleButton = () => {
    setKeyword('');
    Keyboard.dismiss();
  }

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
                returnKeyType='search'
                // placeholder='검색어를 입력하세요'
                // placeholderTextColor='#828282'
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize="none"
                value={keyword}
                onChange={text => setKeyword(text)}
                allowFontScaling={false}
                style={styles.inputStyle}
                autoFocus
                onSubmitEditing={() => console.log('검색 API 호출')}
              />
            </View>
            <TouchableOpacity onPress={()=> handleCancleButton()}>
              <Text style={styles.cancleText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.recentKeywordContainer}>
            <Text style={styles.recentKeywordLabel}>최근 검색</Text>
            <TouchableOpacity>
              <Text style={styles.allDeleteLabel}>전체삭제</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.recentKeywordRow}>
              <TouchableOpacity style={styles.recentKeywordUser}>
                <Image source={{uri: 'https://picsum.photos/130/130'}} style={styles.recentKeywordUserIcon}/>
                <Text>Lucymartin_3</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={keywordDeleteIcon} style={styles.keywordDeleteIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, backgroundColor: '#fff'
  },
  secondContainer: {
    flex: 1
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
    backgroundColor:'#F8F8F8',
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
  searchIcon : {
    width: 24, height: 24
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
    marginBottom:24
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
    alignItems:'center',
    paddingHorizontal:16,
    marginBottom:20
  },
  recentKeywordUser: {
    flexDirection: 'row',
    alignItems:'center',
    gap:11
  },
  recentKeywordUserIcon: {
    width:40, height:40, borderRadius:20
  },
  keywordDeleteIcon : {
    width:40, height:40
  }

});
export default SearchList;
