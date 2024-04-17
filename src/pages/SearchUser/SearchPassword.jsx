import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
const signUpBackIcon = require('../../assets/icons/signUpBack.png');
const {width, height} = Dimensions.get('window');

const SearchPassword = ({navigation}) => {
  const [email, setEmail] = useState(''); // 유저 이메일

  return (
    <SafeAreaView>
      <View style={styles.firstContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Image source={signUpBackIcon} />
        </TouchableOpacity>
        <View style={styles.titleTextContainer}>
          <Text style={styles.firstTItle}>비밀번호 찾기</Text>
          <Text style={styles.secondTitle}>
            비밀번호를 찾기 위해 정보를 입력해 주세요
          </Text>
        </View>
      </View>
      <Text style={styles.idText}>아이디</Text>
      <View style={styles.idCantainer}>
        <View style={styles.idInputConainer}>
          <TextInput
            style={{fontSize: 16}}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="이메일 형식으로 입력해주세요"
          />
        </View>
      </View>
      <Text style={styles.idText}>닉네임</Text>
      <View style={styles.idCantainer}>
        <View style={styles.idInputConainer}>
          <TextInput
            style={{fontSize: 16}}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="이메일 형식으로 입력해주세요"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleTextContainer: {
    padding: 16,
    gap: 8,
  },
  firstTItle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  secondTitle: {
    fontSize: 16,
    color: '#a5a5a5',
  },

  idText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  idCantainer: {
    paddingHorizontal: 25,
    marginTop: 7,
    flexDirection: 'row',
    gap: 7,
    height: height / 25,
  },
  idInputConainer: {
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    width: width / 1.7,
  },
  signInButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 35,
    marginTop: 16,
    backgroundColor: '#333',
    width: width / 1.2,
    height: height / 20,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default SearchPassword;
