import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
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
    contents: '같이 뛰러가자~',
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
    contents: '헬스 클럽 ㄱ?',
  },
  {
    id: 13,
    name: '축구인',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: ['https://picsum.photos/400/400', 'https://picsum.photos/400/400'],
    contents: '같이 축구 ㄱ?',
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
    contents: '나는 슈터..!',
  },
];

const Home = ({navigation}) => {
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

  const renderStory = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={index === 0 ? styles.storyContainerFirst : styles.storyContainer}>
        <Image
          source={{ uri: item.profileImg }}
          style={item.isOpen ? styles.storyProfileImgOpen : styles.storyProfileImg}
        />
        <Text numberOfLines={1} style={styles.storyName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFeed = ({ item, index }) => {
    return (
      <View style={styles.feedContainer}>
        <View style={styles.feedHeader}>
          <TouchableOpacity style={styles.feedUserInfo}>
            <Image
              source={{ uri: item.profileImg }}
              style={styles.feedUserImg}
            />
            <Text style={styles.feedUserName}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFeedModal(!feedModal)}>
            <Image source={more} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>

        {item.feedImg.length > 1 ? (
          <Swiper style={styles.swiperContainer} loop={false} showsPagination={true}>
            {item.feedImg.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.feedImage}
                resizeMode="contain"
              />
            ))}
          </Swiper>
        ) : (
          <View style={styles.singleImageContainer}>
            <Image
              source={{ uri: item.feedImg[0] }}
              style={styles.singleImage}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.feedFooter}>
          <View style={styles.feedFooterLeft}>
            <TouchableOpacity
              onPress={() => handleHeartClick(item.id)}
              style={styles.commentIconContainer}>
              <Image source={feedHeart} style={styles.heartIcon} />
              <Text>{item.likeCount || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commentIconContainer}
              onPress={() => setIsVisible(!isVisible)}>
              <Image source={comment} style={styles.commentIcon} />
              <Text>1</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.likesText}>
            <Image
              source={{ uri: 'https://avatar.iran.liara.run/public' }}
              style={styles.likesImage}
            />{' '}
            외 {item.likeCount || 0}이 좋아합니다.
          </Text>
        </View>
        <View style={styles.feedContent}>
          <Text>{item.name}</Text>
          <Text style={styles.feedText}>{item.contents}</Text>
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eef0ed' }}>
      <View style={{ flex: 1, marginBottom: 32 }}>
        <FlatList
          data={feeds}
          renderItem={renderFeed}
          keyExtractor={item => item.id.toString()}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.headerContainer}>
                <Image source={title} style={styles.titleImage} />
                <View style={styles.headerIconsContainer}>
                  <TouchableOpacity>
                    <Image source={heart} style={styles.headerIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('DmList')}>
                    <Image source={chat} style={styles.headerIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                data={dummy_story}
                renderItem={renderStory}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews
              />
              <View style={styles.storyDivider}/>
            </View>
          )}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.1}
        />
        <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
        <FeedModal isVisible={feedModal} setFeedModal={setFeedModal} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleImage: {
    width: 90,
    height: 30,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    width: 32,
    height: 32,
  },
  storyContainerFirst: {
    marginHorizontal: 16,
  },
  storyContainer: {
    marginRight: 16,
  },
  storyProfileImg: {
    width: 52,
    height: 52,
    marginBottom: 2,
  },
  storyProfileImgOpen: {
    width: 52,
    height: 52,
    marginBottom: 2,
    borderWidth: 2,
    borderColor: '#2a85ff',
    borderRadius: 26,
  },
  storyName: {
    maxWidth: 52,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.22,
    color: '#4f4f4f',
  },
  storyDivider: {
    borderWidth: 1,
    marginTop: 16,
  },
  feedContainer: {
    paddingVertical: 24,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  feedUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedUserImg: {
    width: 32,
    height: 32,
  },
  feedUserName: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.97,
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  swiperContainer: {
    height: width,
    marginHorizontal: 16,
  },
  feedImage: {
    width: width - 32,
    height: width,
    borderRadius: 38,
  },
  singleImageContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  singleImage: {
    width: width - 32,
    height: width,
    marginBottom: 8,
    borderRadius:30,
  },
  feedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  feedFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  heartIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  commentIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  likesText: {
    marginTop: 16,
  },
  likesImage: {
    width: 16,
    height: 16,
  },
  feedContent: {
    marginHorizontal: 16,
    gap: 4,
  },
  feedText: {
    fontWeight: '400',
    color: '#4f4f4f',
  },
  divider: {
    borderWidth: 1,
    marginTop: 60,
  },

});


export default Home;
