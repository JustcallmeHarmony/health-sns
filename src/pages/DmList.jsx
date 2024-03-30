import React, {useState} from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView, Dimensions } from 'react-native';
import Swiper from "react-native-swiper";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const arrowleftIcon = <AntDesignIcon name="arrowleft" size={25} />;
const DmAlarmIcon = require('../assets/icons/DmAlarm.png');
const settingIcon = require('../assets/icons/setting.png');
const searchIcon = require('../assets/icons/search.png')

const dummy_dm = [
    {
        id:40,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '홍길동',
        contents : '이두 ㄱ?',
        time : '1시간 전'
    },
    {
        id:41,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '엄길동',
        contents : '삼두 ㄱ?',
        time : '2시간 전'
    },
    {
        id:42,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '이길동',
        contents : '하체 ㄱ??',
        time : '3시간 전'
    },
    {
        id:43,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '김길동',
        contents : ' 어깨 ㄱ?',
        time : '4시간 전'
    },
    {
        id:44,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '삼길동',
        contents : '상체 ㄱ?',
        time : '5시간 전'
    },
    {
        id:45,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '우길동',
        contents : '운동 ㄱ?',
        time : '6시간 전'
    },
    {
        id:46,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '홍길동',
        contents : '전완근 ㄱ?',
        time : '7시간 전'
    },
    {
        id:47,
        profileImg: 'https://avatar.iran.liara.run/public',
        name : '홍길동',
        contents : '이두 ㄱ?',
        time : '8시간 전'
    },
]

const DmList = ({navigation}) => {
    const {height} = Dimensions.get('window');
    const [searchText, setSearchText] = useState('');
    const [filteredDm, setFilteredDm] = useState(dummy_dm);

    const renderItem = ({item}) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{uri: item.profileImg}} style={styles.profileImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.contentsTimeContainer}>
                        <Text style={styles.contents}>{item.contents}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const handleSearch = () => {
        const filteredData = dummy_dm.filter(item => item.name.includes(searchText));
        setFilteredDm(filteredData);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{backgroundColor:'#eef0ed', flex: 1}}>
                <View style={styles.dmHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>{arrowleftIcon}</View>
                    </TouchableOpacity>
                    <Text style={styles.dmHeaderText}>Joonyeab</Text>
                    <View style={styles.dmHeaderIconCantainer}>
                        <TouchableOpacity >
                            <Image style={styles.DmAlarmIcon}source={DmAlarmIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.settingIcon}source={settingIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerGoSearchList}>
                    <View style={styles.searchContainer}>
                        <Image style={styles.searchIcon} source={searchIcon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="검색"
                            onChangeText={setSearchText}
                            value={searchText}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                </TouchableOpacity>
                <FlatList
                    ListHeaderComponent={
                        <Swiper style={{ height: height * 0.2}}>
                            <View style={styles.banner}>
                                <Text>광고 배너</Text>
                            </View>
                            <View style={styles.banner}>
                                <Text>광고 배너2</Text>
                            </View>
                            <View style={styles.banner}>
                                <Text>광고 배너3</Text>
                            </View>
                        </Swiper>
                    }
                    data={filteredDm}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    removeClippedSubviews
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dmHeader : {
        flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:10
    },
    dmHeaderText : {
        fontSize:18,
        fontWeight:'bold'
    },
    dmHeaderIconCantainer : {
        flexDirection:'row',
        paddingLeft:60,
    },
    DmAlarmIcon : {
        width:30, height:30
    },
    settingIcon: {
        width:30, height:30
    },
    headerContainer : {
        flexDirection:'row', alignItems:'center', paddingHorizontal:16
    },
    headerGoSearchList : {
        flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderWidth:1, backgroundColor:'#d9d9d9', borderRadius:8, margin:16, paddingVertical:4
    },
    searchContainer : {
        flex:1, flexDirection:'row'
    },
    searchIcon : {
        marginLeft:16, width:30, height:30
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentsTimeContainer: {
        flexDirection:'row',
        alignItems:'center',
        marginTop:6,
        gap:8
    },
    contents: {
        fontSize: 14,
    },
    time: {
        fontSize: 12,
        color: '#666666',
    },
    banner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DmList;