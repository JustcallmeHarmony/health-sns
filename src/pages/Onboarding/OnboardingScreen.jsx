import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Onboarding
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onBoard.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: '자신의 운동 일상을 공유하는 앱입니다.',
            subtitle: '운동 메이트도 구할 수 있어요!',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onBoard.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: '자신의 운동 사진과 글을 올려보세요',
            subtitle: '사진 공유',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onBoard2.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: '운동할 때 듣는 음악을 소개해주세요.',
            subtitle: '음악 공유',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onBoard3.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: '자신의 운동 영상을 올려보세요',
            subtitle: '영상 공유',
          },
          {
            backgroundColor: '#fff',
            image: (
              <TouchableOpacity style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onBoard.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            ),
            title: 'Are You Ready?',
            subtitle: '오운완을 향해!!',
          },
        ]}
        skipLabel={<Text style={styles.skip}>넘어가기</Text>} // 스킵 버튼 변경
        NextButtonComponent={CustomNextButton}
        DoneButtonComponent={(...props) => (
          <CustomDoneButton navigation={navigation} {...props} />
        )}
        skipToPage={4} // 이전 버튼을 클릭할 때 이동할 페이지를 설정합니다.
      />
    </View>
  );
};

const CustomNextButton = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.next}>다음</Text>
  </TouchableOpacity>
);

const CustomDoneButton = ({navigation, ...props}) => (
  <TouchableOpacity onPress={() => navigation.navigate('LoginTab')} {...props}>
    <Text style={styles.done}>시작하기</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: width,
    height: width,
  },
  skip: {
    color: '#999',
    fontSize: 16,
    marginHorizontal: 20,
  },
  next: {
    color: '#007AFF',
    fontSize: 16,
    marginHorizontal: 20,
  },
  done: {
    color: '#007AFF',
    fontSize: 16,
    marginHorizontal: 20,
  },
});

export default OnboardingScreen;
