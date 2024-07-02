import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  ImageBackground,
  TextInput,
  Platform,
  LayoutAnimation,
  Animated,
  FlatList,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import React, { useContext, useEffect, useState } from 'react';
import { hp, wp } from '../Components/Config';
import { MultiSelect, SelectCountry } from 'react-native-element-dropdown';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import { COLORS, IMAGE, font } from '../Constant/index';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API, ImageUrl } from '../API/Base_Api';
import {
  DragContainer,
  Draggable,
  DropZone,
} from 'react-native-drag-drop-and-swap';
import { ActivityIndicator } from 'react-native';
import PlanCard from '../Components/PlanCard';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import AppProvider from '../providers/AppProvider';

let alphaData = [];
let first = '1',
  last = '6';
for (var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
  alphaData.push({ data: eval('String.fromCharCode(' + i + ')'), id: i });
}

const DragImageComponent = ({ userDetail }) => {
  const [alphabets, setAlphabets] = useState(userDetail?.user_images);
  const [hoverData, setHoverData] = useState({});
  const [hoverDataIndex, setHoverDataIndex] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [response, setResponse] = useState('');
  const [IndexId, setIndexId] = useState('');
  const{selectImageubdated, setSelectImageubdated}=useContext(AppProvider)

  const newarray = userDetail?.user_image; // Accessing user_image with optional chaining

  const OpenFiles = async (props) => {
    const index = props.index
    const selectPosition = props.index

    // if (selectImageubdated.length + alphabets.length < 6) {
    try {
      const multiSelectedMode = true;
      const images = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        isPreview: true,
        doneTitle: 'Done',
        multiSelectedMode,
        isCrop: false,
        mediaType: 'image',
        isPreview: false,
        maxSelectedAssets: 1,
      });
      setSelectImageubdated([...selectImageubdated, { image: images, index }]);
    } catch (e) { }
    // }
  };
  const DraggyInner = props => {
    const handleRemove = () => {
      setSelectImageubdated(prevImages => {
        const updatedImages = prevImages.filter((image) =>
          image.index !== props.index
          // console.log('>>>>',image)
        );

        return updatedImages;
      });
    };
    if (props.dragOver && !props.ghost && !props.dragging) {
      LayoutAnimation.easeInEaseOut();
      return (
        <View>
          <View>
            <Image
              style={{
                width: 95,
                height: props.dragOver ? 110 : 95,
                marginTop: 10,
              }}
              resizeMode={'cover'}
              source={{ uri: ImageUrl + props.alphabet?.image }}
            />
          
          </View>
          {/* )} */}
        </View>
      );
    }

    let imageSource = IMAGE.newEmpty; // Default image source

    const matchingImage = selectImageubdated.find(item =>

      item.index == props.index

    );
    if (matchingImage && matchingImage.image && matchingImage.image[0]?.path) {
      setIndexId(matchingImage?.index)
      imageSource = { uri: matchingImage.image[0].path };
    } else if (props.alphabet?.image) {
      imageSource = { uri: ImageUrl + props.alphabet.image };
    }
const Close =()=>{
  return(
    <TouchableOpacity
    onPress={handleRemove}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      borderRadius: 50,
      position: 'absolute',
      top: 0,
      right: 0,
    }}>
    <Image
      style={{
        width: 12,
        height: 12,
      }}
      resizeMode={'contain'}
      source={IMAGE.closeicon}
    />
  </TouchableOpacity>
  )
}
    return (
      <View key={props.index}>
        <View>

          <Image
            style={{
              width: WIDTH / 4,
              height: HEIGHT / 5.5,
              marginTop: 10,
              borderRadius: 10,
            }}
            resizeMode={'cover'}
            source={imageSource}
          />
          {selectImageubdated[0]?.index == props.index ?
           <Close />
            :
            selectImageubdated[1]?.index == props.index ?
            <Close />
             :selectImageubdated[2]?.index == props.index ?
             <Close />
              :selectImageubdated[3]?.index == props.index ?
              <Close />
               :selectImageubdated[4]?.index == props.index ?
               <Close />
               :
               selectImageubdated[5]?.index == props.index ?
               <Close />
               :null
          }

        </View>
      </View>
    );
  };

  const Draggy = props => {
    return (
      <Draggable
      key={props.index}
        onPress={() => OpenFiles(props)}
        data={props.alphabet}
        style={{ margin: 7.5, borderRadius: 20 }}>
        <DropZone
          onDrop={e => props.onDrop(e, props.index)}
          onEnter={e => props.onHover(props.alphabet, props.index)}
          >
          <DraggyInner
            alphabet={props.alphabet}
            index={props.index}
            dragging={props.dragging}
            ghost={props.ghost}
            dragOver={props.dragOver}
            imageData={props.imageData}
          />
        </DropZone>
      </Draggable>
    );
  };

  const onDrop = (data, index) => {
    let updatedAlphabets = alphabets.map((item, i) => {
      if (item.id === data.id) {
        return hoverData;
      }
      if (item.id === hoverData.id) {
        return data;
      }
      return item;
    });
    setAlphabets(updatedAlphabets);
  };

  const onHover = (hoverData, hoverDataIndex) => {
    setHoverData(hoverData);
    setHoverDataIndex(hoverDataIndex);
  };
  const toggleSelect = (item, i) => {
    setSelectImageubdated(prevList => {
      const updatedList = [...prevList];
      const existingIndex = updatedList.findIndex(el => el.index === i);
      if (existingIndex !== -1) {
        updatedList.splice(existingIndex, 1);
      } else {
        updatedList.push({
          index: i,
          detail: item,
        });
      }

      return updatedList;
    });

    setSelectedCards(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected[i] = !updatedSelected[i];
      return updatedSelected;
    });
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 16,
          fontFamily: font.bold,
          color: '#000000',
          marginTop: 50,
          marginLeft: 30,
        }}>
        My Photos
      </Text>
      <Text
        style={{
          fontWeight: '400',
          fontSize: 14,
          fontFamily: font.normal,
          color: '#FFFFFF',
          marginTop: 5,
          left: 30,
        }}>
        Tap to edit, drag and reorder
      </Text>
      <DragContainer>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignSelf: 'center',
            width: WIDTH / 1.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {alphabets?.map((item, i) => (
              <Draggy
                key={i} // Assuming you have an ID for each alphabet object
                alphabet={item}
                index={i}
                onDrop={onDrop}
                onHover={onHover}
                onSelect={() => toggleSelect(item, i)}
                isSelected={selectedCards[i]}
                imageData={userDetail?.user_image}
                dragging={false}
                ghost={false}
                dragOver={false}
              />
            ))}
            {/* {selectImageubdated.map((item, index) => (
              <TouchableOpacity
              onPress={OpenFiles}
                style={{marginHorizontal: 5}}
               >
                <View>
                  <ImageBackground
                    source={{uri:item[0]?.path}  }
                    style={{
                      width: WIDTH / 3.8,
                      height: HEIGHT / 5.5,
                      marginTop: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    imageStyle={{borderRadius: 10}}
                    resizeMode={'cover'}></ImageBackground>
                </View>
              </TouchableOpacity>
            ))}
            */}
          </View>
        </View>
      </DragContainer>
    </View>
  );
};

export default DragImageComponent;
