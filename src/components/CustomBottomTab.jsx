import React, {useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

const homeOn = require('../assets/icons/bottomtab/home_on.png');
const homeOff = require('../assets/icons/bottomtab/home_off.png');
const searchOn = require('../assets/icons/bottomtab/search_on.png');
const searchOff = require('../assets/icons/bottomtab/search_off.png');
const addOn = require('../assets/icons/bottomtab/add_circle_off.png');
const playOn = require('../assets/icons/bottomtab/auto_read_play_on.png');
const playOff = require('../assets/icons/bottomtab/auto_read_play_off.png');
const personOn = require('../assets/icons/bottomtab/person_on.png');
const personOff = require('../assets/icons/bottomtab/person_off.png');

const CustomBottomTab = ({state, navigation, insets, descriptors}) => {
  const tab1iValue = useRef(new Animated.Value(0)).current;
  const tab2iValue = useRef(new Animated.Value(0)).current;
  const tab3iValue = useRef(new Animated.Value(0)).current;
  const tab4iValue = useRef(new Animated.Value(0)).current;
  const tab5iValue = useRef(new Animated.Value(0)).current;

  const scaleAnimated = (Value, animateValue) =>
    Animated.timing(animateValue, {
      useNativeDriver: true,
      toValue: Value,
      duration: 150,
    });
  const animatedValue = {
    0: tab1iValue,
    1: tab2iValue,
    2: tab3iValue,
    3: tab4iValue,
    4: tab5iValue,
  };

  return (
    <View style={[styles.bottomTabBarWrapper, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        const animatedOf = animatedValue[index];

        const iconFlag = bool => {
          switch (label) {
            case 'Home':
              return bool ? homeOn : homeOff;
            case 'SearchTab':
              return bool ? searchOn : searchOff;
            case 'FeedTab':
              return addOn;
            case 'Play':
              return bool ? playOn : playOff;
            default:
              return bool ? personOn : personOff;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPerventDefault: true,
          });

          if (!isFocused && !event.defalutPrevented) {
            navigation.navigate(route.name);
          }
          scaleAnimated(1, animatedOf).start(({finished}) => {
            if (finished) {
              scaleAnimated(0, animatedOf).start();
            }
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
            style={{flex: 1, alignItems: 'center', backgroundColor: '#eef0ed'}}>
            <Animated.Image
              source={iconFlag(isFocused)}
              style={{
                width: 24,
                height: 24,
                transform: [
                  {
                    scale: animatedOf.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.9],
                    }),
                  },
                ],
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#EEE',
    backgroundColor: '#eef0ed',
    paddingTop: 10,
    zIndex: 10,
  },
});

export default CustomBottomTab;
