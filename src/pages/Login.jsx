import React, { useState } from "react";
import { View, TextInput, Button, Alert } from 'react-native';
import { signIn, signUp } from "../lib/auth"; 
import firestore from "@react-native-firebase/firestore"; 
import { creatUser } from "../lib/user";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [displayName, setName] = useState('');
    //회원가입
    const onSignUp = async () => {
        try {
            const { user } = await signUp({ email, password }); 
            await creatUser ({
                id: user.uid,
                displayName,
                photoURL : null
            })
            Alert.alert('회원가입 성공');
        } catch (e) {
            Alert.alert('회원가입 실패');
        }
    };

    //로그인
    const onSignIn = async () => {
        try {
            const { user } = await signIn({ email, password }); 
            // 로그인 정보 가져오기
            const userCollection = firestore().collection('users');
            console.log((await userCollection.doc(user.uid).get()).data());
            await userCollection.doc(uesr.uid).update({displayName})
            console.log((await userCollection.doc(user.uid).get()).data());
            Alert.alert('로그인 성공');
        } catch (e) {
            Alert.alert('로그인 실패');
        }
    };

    
    const onDelete = async () => {
        // 로그인 데이터 삭제
        // try {
        //     const {user} = await signIn({email, password});
        //     const userCollection = firestore().collection('users');
        //     await userCollection.doc(user.uid).delete();
        //     Alert.alert("데이터 삭제 성공")
        // } catch (e) {}
        
        //회원 가입 데이터 삭제
        const {user} = await signIn({email,password});
        user.delete().catch(e => {
            console.log(e)
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
            />
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                value={password}
                placeholder="Password"
                onChangeText={setPass}
            />
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                value={displayName}
                placeholder="Display Name"
                onChangeText={setName}
            />
            
            <Button title="Submit" onPress={onSignIn} />
        </View>
    );
};

export default Login;
