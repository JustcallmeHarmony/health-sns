import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  
} from 'react-native';
import {signUp } from "../lib/auth"; 
import { createUser } from '../lib/user';
import firestore from '@react-native-firebase/firestore';

const signUpBackIcon = require('../assets/icons/signUpBack.png')
const {width, height} = Dimensions.get('window')

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

    const onSignUp = async () => {
        try {
            const { user } = await signUp({ email, password }); 
            await createUser({
              id: user.uid,
              nickName ,
              phoneNumber 
            })
            navigation.goBack()
            Alert.alert('회원가입 성공');
        } catch (e) {
          console.error('회원가입 실패:', e);
            Alert.alert('회원가입 실패');
        }
    };

    const checkDuplicate = async () => {
      try {
          // 파이어베이스에서 아이디 중복 확인
          const userDoc = await firestore().collection('users').doc(email).get();
          if (userDoc.exists) {
              Alert.alert('중복된 아이디', '이미 사용 중인 아이디입니다.');
          } else {
              Alert.alert('사용 가능한 아이디', '사용할 수 있는 아이디입니다.');
          }
      } catch (error) {
          console.error('아이디 중복 확인 오류:', error);
          Alert.alert('아이디 중복 확인 실패', '아이디 중복 확인 중 오류가 발생했습니다.');
      }
  };
  
  

  return (
    <SafeAreaView>
    <View style={styles.firstContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
      <Image source={signUpBackIcon}/>
      </TouchableOpacity>
      <View style={styles.titleTextContainer}>
      <Text style={styles.firstTItle}>Are You Ready? 시작하기</Text>
      <Text style={styles.secondTitle}>가입을 위해 기본 정보를 입력해 주세요</Text>
      </View>
      
      <Text style={styles.idText}>아이디</Text>
      <View style={styles.idCantainer}>
        <View style={styles.idInputConainer}>
        <TextInput style={{fontSize:16}} value={email} onChangeText={setEmail}  placeholder='이메일 형식으로 입력해주세요'/>
        </View>
        <TouchableOpacity onPress={checkDuplicate} style={styles.idCheckButton}>
          <Text style={styles.checkButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.passwordText}>비밀번호</Text>
      <View style={styles.passwordContainer}>
        <View style={styles.passInputContainer}>
        <TextInput style={{fontSize:16}} value={password} onChangeText={setPassWord} placeholder='비밀번호를 입력해주세요'/>
        </View>
      </View>

      <Text style={styles.passwordCheckText}>비밀번호 확인</Text>
      <View style={styles.passwordCheckContainer}>
        <View style={styles.passwordCheckInputContainer}>
        <TextInput style={{fontSize:16}} placeholder='비밀번호를 확인해주세요'/>
        </View>
      </View>

      <Text style={styles.nickNameText}>닉네임</Text>
      <View style={styles.nickNameContainer}>
        <View style={styles.nickNameInputContainer}>
        <TextInput style={{fontSize:16}} value={nickName} onChangeText={setNickName} placeholder='한글,영문 최대 30자까지 가능'/>
        </View>
      </View>

      <Text style={styles.phoneNumberText}>전화번호</Text>
      <View style={styles.phoneNumberContainer}>
        <View style={styles.phoneNumberInputContainer}>
        <TextInput style={{fontSize:16}} value={phoneNumber} onChangeText={setPhoneNumber} placeholder='- 제외 휴대전화 번호'/>
        </View>
        <TouchableOpacity style={styles.numberButton}>
          <Text style={styles.numberButtonText}>인증번호 발송</Text>
        </TouchableOpacity>
      </View>

 
      <TouchableOpacity onPress={onSignUp}style={styles.signInButton}>
                <Text style={styles.signInText}>완료</Text>
      </TouchableOpacity>

      
      
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleTextContainer: {
    padding:16, gap:8
  },
  firstTItle: {
    fontSize:24, fontWeight:'bold', color:'#333'
  },
  secondTitle: {
    fontSize:16, color:'#a5a5a5'
  },
  signInButton: {
    borderRadius:4, alignItems:'center', justifyContent:'center', marginLeft:35, marginTop:16, backgroundColor:'#333', width:width/1.2, height:height/20
},
signInText: {
    color:'#fff', fontWeight:'bold', fontSize:15
},
idText: {
  marginLeft:16, fontSize:16, fontWeight:'bold', color:'#333'
},
idCantainer: {
  paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25
},
idInputConainer: {
  justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7
},
idCheckButton: {
  justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'#fff', backgroundColor:'#333', width:width/3.5
},
checkButtonText: {
  fontSize:16, fontWeight:'bold', color:'#fff'
},
passwordText: {
  marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#333'
},
passwordContainer: {
  paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25
},
passInputContainer: {
  justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7
},
passwordCheckText: {
  marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#333'
},
passwordCheckContainer: {
  paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25
},
passwordCheckInputContainer: {
  justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7
},
nickNameText: {
  marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#333'
},
nickNameContainer: {
  paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25
},
nickNameInputContainer: {
  justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7
},
phoneNumberText: {
  marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#333'
},
phoneNumberContainer: {
  paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25
},
phoneNumberInputContainer: {
  justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7
},
numberButton: {
  justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'#fff', backgroundColor:'#333', width:width/3.5
},
numberButtonText: {
  fontSize:16, fontWeight:'bold', color:'#fff'
}

});

export default SignUp;
