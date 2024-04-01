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
import {dummy_feed} from '../data/dummy_ feed';
import HomeHeader from '../components/HomeHeader';
import StoryList from '../components/StoryList';

const more = require('../assets/icons/more.png');
const comment = require('../assets/icons/comment.png');
const feedHeart = require('../assets/icons/feedHeart.png');

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [isVisibleCommentsModal, setIsVisibleCommentsModal] = useState(false); // 콘텐츠 모달 상태
  const [isVisibleFeedModal, setIsVisibleFeedModal] = useState(false); // 피드 모달 상태
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

  const renderFeed = ({item, index}) => {
    return (
      <View style={styles.feedContainer}>
        <View style={styles.feedHeader}>
          <TouchableOpacity style={styles.feedUserInfo}>
            <Image source={{uri: item.profileImg}} style={styles.feedUserImg} />
            <Text style={styles.feedUserName}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisibleFeedModal(!isVisibleFeedModal)}>
            <Image source={more} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>

        {item.feedImg.length > 1 ? (
          <Swiper
            style={styles.swiperContainer}
            loop={false}
            showsPagination={true}>
            {item.feedImg.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={styles.feedImage}
                resizeMode="contain"
              />
            ))}
          </Swiper>
        ) : (
          <View style={styles.singleImageContainer}>
            <Image
              source={{uri: item.feedImg[0]}}
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
              onPress={() =>
                setIsVisibleCommentsModal(!isVisibleCommentsModal)
              }>
              <Image source={comment} style={styles.commentIcon} />
              <Text>1</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.likesText}>
            <Image
              source={{uri: 'https://avatar.iran.liara.run/public'}}
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
              <HomeHeader navigation={navigation} setIsVisibleCommentsModal />
              <StoryList data={StoryList} />
            </View>
          )}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.1}
        />
        <CommentsModal
          isVisible={isVisibleCommentsModal}
          setIsVisible={setIsVisibleCommentsModal}
        />
        <FeedModal
          navigation={navigation}
          isVisible={isVisibleFeedModal}
          setFeedModal={setIsVisibleFeedModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 30,
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
