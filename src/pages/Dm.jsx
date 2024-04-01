import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const arrowleftIcon = <AntDesignIcon name="arrowleft" size={25} />;
const dummyProfile3 = require('../assets/images/dummyProfile3.png');
const dummyProfile4 = require('../assets/images/dummyProfile4.png');

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [firstMessageUser, setFirstMessageUser] = useState(null);

  useEffect(() => {
    const initialMessages = [
      {
        _id: 1,
        text: '안녕!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '홍길동',
          avatar: dummyProfile3, // 사용자 아바타 이미지 URL
        },
      },
      {
        _id: 2,
        text: '반가워!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: '김길동',
          avatar: dummyProfile4, // 사용자 아바타 이미지 URL
        },
      },
    ];

    setMessages(initialMessages);

    if (initialMessages.length > 0) {
      const firstMessage = initialMessages[0];
      setFirstMessageUser(firstMessage.user);
    }
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  const handleInputTextChange = text => {
    setInputText(text);
  };

  const handleSend = () => {
    if (inputText.trim().length === 0) {
      return;
    }

    const newMessage = {
      _id: Math.round(Math.random() * 1000000).toString(), // 임시 ID 생성
      text: inputText,
      createdAt: new Date(),
      user: {
        _id: 1, // 사용자 ID
        name: 'User', // 사용자 이름
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
    setInputText('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {arrowleftIcon}
          </TouchableOpacity>
          {firstMessageUser && (
            <View style={styles.userInfoContainer}>
              <Image source={firstMessageUser.avatar} style={styles.avatar} />
              <Text style={styles.username}>{firstMessageUser.name}</Text>
            </View>
          )}
        </View>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          placeholder="메시지를 입력하세요..."
          maxInputLength={300}
          text={inputText}
          onInputTextChanged={handleInputTextChange}
          multiline={true}
          alwaysShowSend={true}
          scrollToBottom={true}
          renderSend={props => (
            <TouchableOpacity
              onPress={() => props.onSend({text: inputText.trim()})}>
              <Text style={styles.sendButton}>보내기</Text>
            </TouchableOpacity>
          )}
          dateFormat="YYYY년 MM월 DD일" // 원하는 형식으로 변경
          timeFormat="A hh:mm" // 원하는 형식으로 변경
        />
        {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="height" />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.96,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    gap: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendButton: {
    color: 'blue',
    fontSize: 16,
    margin: 16,
  },
});

export default ChatScreen;
