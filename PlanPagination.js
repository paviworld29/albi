import {View, Text, Animated, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const PlanPaginations = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 9, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.1, 1, 0.1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['grey', '#000', 'grey'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, {width: dotWidth, backgroundColor}]}
          />
        );
      })}
    </View>
  );
};
export default PlanPaginations;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    left: WIDTH/2.3,
    // marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: 'grey',
  },
  dotActive: {
    backgroundColor: '#000',
  },
});
