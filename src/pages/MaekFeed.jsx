import React, {useState} from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeedHeader from "../components/FeedHeader";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';


const greaterIcon = <MaterialCommunityIcons name="greater-than" size={20} />;
const photo = require('../assets/images/photo.png');
const { width } = Dimensions.get('window');

const dummy_FeedImage = [
    {
        id:30,
        img: 'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fCVFQyU5QSVCNCVFQiU4RiU5OXxlbnwwfHwwfHx8Mg%3D%3D',
        
    },
    {
        id:31,
        img: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fCVFQyU5QSVCNCVFQiU4RiU5OXxlbnwwfHwwfHx8Mg%3D%3D',
        
    },
    {
        id:32,
        img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fCVFQyU5QSVCNCVFQiU4RiU5OXxlbnwwfHwwfHx8Mg%3D%3D',
        
    },
    {
        id:33,
        img: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fCVFQyU5QSVCNCVFQiU4RiU5OXxlbnwwfHwwfHx8Mg%3D%3D',
        
    },
    {
        id:34,
        img: 'https://picsum.photos/100/100',
        
    },
    {
        id:35,
        img: 'https://picsum.photos/100/100',
        
    },
    {
        id:36,
        img: 'https://picsum.photos/100/100',
       
    },
    {
        id:37,
        img: 'https://picsum.photos/100/100',
        
    },
    {
        id:38,
        img: 'https://picsum.photos/100/100',
        
    },
    {
        id:39,
        img: 'https://picsum.photos/100/100',
        
    },

]


const Feed = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = useState(null);
  
    const pickImageFromGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true
      }).then(images => {
        images.forEach(image => {
          console.log('Selected Image:', image.path);
          setSelectedItem(image.path); // 선택한 이미지 경로를 상태에 설정
        });
      });
    };
  
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity  style={styles.renderContainer} onPress={() => setSelectedItem(item.img)}>
          <Image source={{ uri: item.img }} style={{ width: width / 4, height: width / 4 }} />
        </TouchableOpacity>
      );
    };

    console.log('selectedItem:', selectedItem); 


    
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <FeedHeader navigation={navigation} />
        <View style={styles.photoContainer}>
          {selectedItem ? <Image source={{ uri: selectedItem }} style={{ width: width, height: width }} />
            : <Image source={photo} style={{ width: width, height: width }} />}
        </View>
        <TouchableOpacity onPress={pickImageFromGallery} style={styles.resent}>
          <Text style={styles.resentText}>최근</Text>
          <View style={styles.resentIcon}>
            {greaterIcon}
          </View>
        </TouchableOpacity>
        <FlatList
          data={dummy_FeedImage}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          numColumns={4} />
        <TouchableOpacity
         style={styles.nextButton}
         onPress={() => navigation.navigate('NextFeed', { selectedItem: selectedItem })}>
         <Text style={styles.nextButtonText}>다음</Text>
</TouchableOpacity>

      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    safeAreaContainer: {},
    photoContainer: {
      marginTop: 20,
      width: width
    },
    resent: {
      flexDirection: 'row', alignItems: 'center', gap: 4, padding: 16
    },
    resentText: {
      fontSize: 17, fontWeight: 'bold'
    },
    resentIcon: {
      transform: [{ rotate: `90deg` }]
    },
    nextButton: {
      backgroundColor: 'blue',
      padding: 16,
      alignItems: 'center'
    },
    nextButtonText: {
      color: 'white',
      fontWeight: 'bold'
    }
  });
  
  export default Feed;