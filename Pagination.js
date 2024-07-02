import {View, Text, Animated, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((item, ind) => {
      return(
        <View style={{
            width:8,
            height:8,
            borderRadius:4,
            margin:5,
            backgroundColor: index ==ind?'#000':'grey'
        }}>

            </View>
      )
      })}
    </View>
  );
};
export default Pagination;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf:'center',
    marginBottom:10
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
