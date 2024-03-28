import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CommentsModal from '../components/CommentsModal';
import FeedModal from '../components/FeedModal';

const title = require('../assets/images/title.png');
const chat = require('../assets/icons/chat.png');
const heart = require('../assets/icons/heart.png');
const more = require('../assets/icons/more.png');
const comment = require('../assets/icons/comment.png');
const feedHeart = require('../assets/icons/feedHeart.png');

const {width} = Dimensions.get('window');

const dummy_story = [
  {
    id: 1,
    name: 'BONG',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: false,
  },
  {
    id: 2,
    name: 'Jeon',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: false,
  },
  {
    id: 3,
    name: 'Park_cha',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 4,
    name: 'pig0321',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 5,
    name: 'pig0321',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 6,
    name: 'pig0321',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
];

const dummy_feed = [
  {
    id: 11,
    name: '투게더런',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: ['https://picsum.photos/200/200'],
    contents: '내 마음...받아줘',
  },
  {
    id: 12,
    name: '헬스인',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: [
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
    ],
    contents: '같이 달려봐요',
  },
  {
    id: 13,
    name: '축구인',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: ['https://picsum.photos/400/400', 'https://picsum.photos/400/400'],
    contents: '내 마음...받아줘',
  },
  {
    id: 14,
    name: '농구인',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: [
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
    ],
    contents: '내 마음...받아줘',
  },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false); // 콘텐츠 모달 상태
  const [feedModal, setFeedModal] = useState(false); // 피드 모달 상태
  const [feeds, setFeeds] = useState(dummy_feed);
  const [page, setPage] = useState(1); // 현재 페이지 번호

  // 하트 클릭 처리 함수
  const handleHeartClick = feedId => {
    setFeeds(prevFeeds =>
      prevFeeds.map(feed =>
        feed.id === feedId
          ? {...feed, likeCount: (feed.likeCount || 0) + 1}
          : feed,
      ),
    );
  };

  // 새로운 데이터를 불러오는 함수
  const fetchMoreData = () => {
    // 여기에서 실제로 서버에서 데이터를 불러오는 API 호출을 수행합니다.
    // 더미 데이터를 예시로 사용하므로, 실제로는 데이터를 가져오는 로직을 여기에 구현해야 합니다.
    const newData = [
      {
        id: 15,
        name: '새로운 사용자',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: ['https://picsum.photos/200/200'],
        contents: '새로운 피드입니다.',
      },
      // 추가적인 더미 데이터를 여기에 추가할 수 있습니다.
    ];

    // 새로운 데이터를 기존 데이터에 추가합니다.
    setFeeds(prevFeeds => [...prevFeeds, ...newData]);

    // 페이지 번호를 증가시킵니다.
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    // 초기화 및 페이지 로드 시에 데이터를 가져오는 함수 호출
    fetchMoreData();
  }, []);

  const renderStory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={index === 0 ? {marginHorizontal: 16} : {marginRight: 16}}>
        <Image
          source={{uri: item.profileImg}}
          style={
            item.isOpen
              ? {width: 52, height: 52, marginBottom: 2}
              : {
                  width: 52,
                  height: 52,
                  marginBottom: 2,
                  borderWidth: 2,
                  borderColor: '#2a85ff',
                  borderRadius: 26,
                }
          }
        />
        <Text
          numberOfLines={1}
          style={{
            maxWidth: 52,
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 16.22,
            color: '#4f4f4f',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFeed = ({item, index}) => {
    return (
      <View style={{paddingVertical: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16,
            marginBottom: 8,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Image
              source={{uri: item.profileImg}}
              style={{width: 32, height: 32}}
            />
            <Text style={{fontSize: 16, fontWeight: '400', lineHeight: 19.97}}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFeedModal(!feedModal)}>
            <Image source={more} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>

        {/* 사진이 2장 이상인 경우에만 스와이프 기능 적용 */}
        {item.feedImg.length > 1 ? (
          <Swiper
            style={{height: width, marginHorizontal: 16}}
            loop={false}
            showsPagination={true}>
            {item.feedImg.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={{width: width - 32, height: width, borderRadius: 38}}
                resizeMode="contain"
              />
            ))}
          </Swiper>
        ) : (
          // 사진이 1장인 경우에는 스와이프 기능 적용하지 않음
          <View style={{marginLeft: 16, marginRight: 16}}>
            <Image
              source={{uri: item.feedImg[0]}}
              style={{
                width: width - 32,
                height: width,
                marginBottom: 8,
                borderRadius: 38,
              }}
              resizeMode="contain"
            />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginBottom: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
            }}>
            <TouchableOpacity
              onPress={() => handleHeartClick(item.id)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={feedHeart}
                style={{width: 24, height: 24, marginRight: 4}}
              />
              <Text>{item.likeCount || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setIsVisible(!isVisible)}>
              <Image
                source={comment}
                style={{width: 24, height: 24, marginRight: 4}}
              />
              <Text>1</Text>
            </TouchableOpacity>
          </View>
          <Text style={{marginTop: 16}}>
            <Image
              source={{uri: 'https://avatar.iran.liara.run/public'}}
              style={{width: 16, height: 16}}
            />{' '}
            외 {item.likeCount || 0}이 좋아합니다.
          </Text>
        </View>
        <View style={{marginHorizontal: 16, gap: 4}}>
          <Text>{item.name}</Text>
          <Text style={{fontWeight: '400', color: '#4f4f4f'}}>
            {item.contents}
          </Text>
        </View>
        <View style={{borderWidth: 1, marginTop: 60}}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eef0ed'}}>
      <View style={{flex: 1, marginBottom: 32}}>
        <FlatList
          data={feeds}
          renderItem={renderFeed}
          keyExtractor={item => item.id.toString()}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image source={title} style={{width: 90, height: 30}} />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <TouchableOpacity>
                    <Image source={heart} style={{width: 32, height: 32}} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={chat} style={{width: 32, height: 32}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <FlatList
                  data={dummy_story}
                  renderItem={renderStory}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubviews
                />
              </View>
              <View style={{borderWidth: 1, marginTop: 16}}></View>
            </View>
          )}
          // 스크롤이 끝에 도달하면 새로운 데이터를 불러오는 함수 호출
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.1} // 끝에 도달하기 전에 얼마나 멀리 미리 호출할지 설정
        />
        <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
        <FeedModal isVisible={feedModal} setFeedModal={setFeedModal} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
