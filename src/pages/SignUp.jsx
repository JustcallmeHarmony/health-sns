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
  Alert
} from 'react-native';
import {signUp } from "../lib/auth"; 

const signUpBackIcon = require('../assets/icons/signUpBack.png')
const {width, height} = Dimensions.get('window')

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

    const onSignUp = async () => {
        try {
            const { user } = await signUp({ email, password }); 
            Alert.alert('회원가입 성공');
        } catch (e) {
            Alert.alert('회원가입 실패');
        }
    };

    
  return (
    <SafeAreaView>
    <View style={styles.firstContainer}>

      <View style={{paddingLeft:16}}>
      <Image source={signUpBackIcon}/>
      </View>
      <View style={{padding:16, gap:8}}>
      <Text style={{fontSize:24, fontWeight:'bold', color:'#07ac7d'}}>쉐어비 시작하기</Text>
      <Text style={{fontSize:16, color:'#a5a5a5'}}>가입을 위해 기본 정보를 입력해 주세요</Text>
      </View>
      
      <Text style={{marginLeft:16, fontSize:16, fontWeight:'bold', color:'#07ac7d'}}>아이디</Text>
      <View style={{paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25}}>
        <View style={{justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7}}>
        <TextInput style={{fontSize:16}} value={email} onChangeText={setEmail}  placeholder='아이디를 입력해주세요'/>
        </View>
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'#fff', backgroundColor:'#07ac7d', width:width/3.5}}>
          <Text style={{fontSize:16, fontWeight:'bold', color:'#fff'}}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#07ac7d'}}>비밀번호</Text>
      <View style={{paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25}}>
        <View style={{justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7}}>
        <TextInput style={{fontSize:16}} value={password} onChangeText={setPass} placeholder='비밀번호를 입력해주세요'/>
        </View>
      </View>

      <Text style={{marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#07ac7d'}}>비밀번호 확인</Text>
      <View style={{paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25}}>
        <View style={{justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7}}>
        <TextInput style={{fontSize:16}} placeholder='비밀번호를 확인해주세요'/>
        </View>
      </View>

      <Text style={{marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#07ac7d'}}>닉네임</Text>
      <View style={{paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25}}>
        <View style={{justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7}}>
        <TextInput style={{fontSize:16}} placeholder='한글,영문 최대 30자까지 가능'/>
        </View>
      </View>

      <Text style={{marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#07ac7d'}}>이메일</Text>
      <View style={{paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25}}>
        <View style={{justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7}}>
        <TextInput style={{fontSize:16}} placeholder='이메일을 입력해주세요'/>
        </View>
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'#fff', backgroundColor:'#07ac7d', width:width/3.5}}>
          <Text style={{fontSize:16, fontWeight:'bold', color:'#fff'}}>인증요청</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginLeft:16, marginTop:16, fontSize:16, fontWeight:'bold', color:'#07ac7d'}}>전화번호</Text>
      <View style={{paddingHorizontal:25, marginTop:7, flexDirection:'row', gap:7, height:height/25}}>
        <View style={{justifyContent:'center',paddingLeft:10, borderWidth:1,borderRadius:4, backgroundColor:'#fff', width:width/1.7}}>
        <TextInput style={{fontSize:16}} placeholder='- 제외 휴대전화 번호'/>
        </View>
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'#fff', backgroundColor:'#07ac7d', width:width/3.5}}>
          <Text style={{fontSize:16, fontWeight:'bold', color:'#fff'}}>인증번호 발송</Text>
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
  signInButton: {
    borderRadius:4, alignItems:'center', justifyContent:'center', marginLeft:35, marginTop:16, backgroundColor:'#d7fff3', width:width/1.2, height:height/20
},
signInText: {
    color:'#07ac7d', fontWeight:'bold', fontSize:15
},
});

export default SignUp;
