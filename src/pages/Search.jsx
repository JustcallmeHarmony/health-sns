import React,{useState} from 'react';
import {FlatList ,SafeAreaView, TouchableOpacity, View, TextInput, Image,useWindowDimensions, StyleSheet} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const search = require('../assets/icons/search.png')

const searchIcon = require('../assets/icons/search.png')
const multiPhoto = require('../assets/icons/multiPhoto.png')

const dummy_search = [
    {
        id:1,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id:2,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id:3,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id:4,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id:5,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id:6,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id:7,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id:8,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id:9,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id:10,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },

]

const arrowleftIcon = <AntDesignIcon name="arrowleft" size={25} />;

const Search = ({navigation}) => {


    const {width} = useWindowDimensions();

    const [keyword,setKeyword] = useState('');

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.renderContainer}>
                {item.isMulti && <Image source={multiPhoto} style={styles.isMultiImage}/>}
                <Image source={{uri : item.img}} style={{width:(width/3)-2, height:(width/3)-2}}/>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                {arrowleftIcon}
            </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('SearchList')} style={styles.headerGoSearchList}>
            <View style={styles.searchContainer}>
            <Image style={styles.searchIcon} source={search}/>
          <TextInput
            style={styles.searchText}
            placeholder="검색"
          />
          
          </View>
        </TouchableOpacity>
        </View>

        
        <FlatList
                data={dummy_search}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews
                numColumns={3}
                />
            

        </SafeAreaView>
      );
    };

const styles = StyleSheet.create({
    renderContainer : {
        borderWidth:1, borderColor:'#fff'
    },
    isMultiImage : {
        position:'absolute', right:8, top:8, width:16, height:16, zIndex:4
    },
    headerContainer : {
        flexDirection:'row', alignItems:'center', paddingHorizontal:16
    },
    headerGoSearchList : {
        flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderWidth:1, backgroundColor:'#d9d9d9', borderRadius:30, margin:16, paddingVertical:5
    },
    searchContainer : {
        flex:1, flexDirection:'row'
    },
    searchIcon : {
        marginLeft:16, width:30, height:30
    },
    searchText : {

    }

})

export default Search;
