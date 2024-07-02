import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, ImageBackground, View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { BASE_API, ImageUrl } from "../API/Base_Api";
import { IMAGE, font } from "../Constant";
import { useNavigation } from "@react-navigation/native";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export const IlikedComponents = () => {
    const [Iliked, setIliked] = useState('');
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation()
    const IlikedApi = async () => {
        setLoader(true)
        const Token = await AsyncStorage.getItem('token');
        const MatriId = await AsyncStorage.getItem('@MatriId');
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', `Bearer ${Token}`);

        var formdata = new FormData();
        formdata.append("user_id", MatriId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${BASE_API}matchILiked`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('i likes', result?.data?.data)
                setLoader(false)

                setIliked(result?.data?.data)
            })
            .catch(error => {
                console.log('error', error)
                setLoader(false)

            });
    }
    useEffect(() => {
        IlikedApi()
    }, [])
    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { navigation.navigate('UserProfileDetail', { item }) }}>
                <ImageBackground
                    source={IMAGE.blur_img}
                    style={{
                        width: WIDTH / 2.6,
                        height: HEIGHT / 3.8,
                        marginTop: 15,
                        overflow: 'hidden',
                        borderRadius: 25,
                        margin: 7.5
                    }}
                    imageStyle={{ resizeMode: 'cover' }}
                    resizeMode='cover'>
                    <View style={{ alignSelf: 'center', position: 'absolute', bottom: 0,  width: WIDTH / 2, height: HEIGHT / 20, opacity: 0.9 }}>

                        <Text
                            style={{
                                color: '#E9C4AE',
                                fontSize: 16,
                                fontWeight: '700',
                                fontFamily: font.bold,
                                alignSelf: 'center',
                                top: 5
                            }}>
                            {item.first_name}{' , '}{item?.age}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ height: HEIGHT / 1.6 }}>
            {loader ? <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', top: HEIGHT / 4 }} /> :
                <>
                    {Iliked.length == 0 ? (
                        <View
                            style={{
                                width: WIDTH / 1,
                                height: HEIGHT / 1.5,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 26,
                                    fontWeight: '700',
                                    fontFamily: font.bold,
                                    alignSelf: 'center',
                                }}>
                                No  users
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={Iliked}
                            contentContainerStyle={{ justifyContent: 'space-between', alignSelf: 'center' }}
                            renderItem={item => <RenderItem {...item} />}
                            numColumns={2}
                        />
                    )}
                </>}
        </View>
    )
}
export const IPassedComponets = () => {
    const [Iliked, setIliked] = useState('');
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation()
    const IlikedApi = async () => {
        setLoader(true)
        const Token = await AsyncStorage.getItem('token');
        const MatriId = await AsyncStorage.getItem('@MatriId');
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', `Bearer ${Token}`);

        var formdata = new FormData();
        formdata.append("user_id", MatriId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${BASE_API}matchIpassed`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('i likes', result?.data?.data)
                setLoader(false)

                setIliked(result?.data?.data)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        IlikedApi()
    }, [])
    const RenderItem = ({ item }) => {
        console.log

        return (
            <TouchableOpacity onPress={() => { navigation.navigate('UserProfileDetail') }}>
                <ImageBackground
                    // source={{ uri: ImageUrl + item?.selfie_image }}
                    source={IMAGE.blur_img}
                    style={{
                        width: WIDTH / 2.6,
                        height: HEIGHT / 3.8,
                        marginTop: 15,
                        overflow: 'hidden',
                        borderRadius: 25,
                        margin: 7.5
                    }}
                    imageStyle={{ resizeMode: 'cover' }}
                    resizeMode='cover'>
                    <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                        <Text
                            style={{
                                color: '#E9C4AE',
                                fontSize: 16,
                                fontWeight: '700',
                                fontFamily: font.bold,
                                // alignSelf:'flex-start',
                                paddingBottom: 10
                                // marginLeft:5
                            }}>
                            {item.first_name}{' , '}{item?.age}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: WIDTH / 3.3, alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image
                                    source={IMAGE.passedclose}
                                    style={{
                                        width: 18,
                                        height: 18,
                                        alignSelf: 'center',
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={{ marginLeft: 6 }}><View style={{ width: 2, height: HEIGHT / 20, backgroundColor: '#E9C4AE' }}></View></View>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image
                                    source={IMAGE.passedlike}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        alignSelf: 'center',
                                    }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ height: HEIGHT / 1.6 }}>
            {loader ? <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', top: HEIGHT / 4 }} /> :
                <>
                    {Iliked.length == 0 ? (
                        <View
                            style={{
                                width: WIDTH / 1,
                                height: HEIGHT / 1.5,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 26,
                                    fontWeight: '700',
                                    fontFamily: font.bold,
                                    alignSelf: 'center',
                                }}>
                                No  users
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={Iliked}
                            contentContainerStyle={{ justifyContent: 'space-between', alignSelf: 'center' }}
                            renderItem={item => <RenderItem {...item} />}
                            numColumns={2}
                        />
                    )}
                </>}
        </View>
    )
}
export const LikedMeComponets = () => {
    const [Iliked, setIliked] = useState('');
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation()
    const IlikedApi = async () => {
        setLoader(true)

        const Token = await AsyncStorage.getItem('token');
        const MatriId = await AsyncStorage.getItem('@MatriId');
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', `Bearer ${Token}`);

        var formdata = new FormData();
        formdata.append("user_id", MatriId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${BASE_API}matchLikedMe`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('i likes', result?.data?.data)
                setLoader(false)

                setIliked(result?.data?.data)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        IlikedApi()
    }, [])
    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { navigation.navigate('UserProfileDetail') }}>
                <ImageBackground
                    // source={{ uri: ImageUrl + item?.selfie_image }}
                    source={IMAGE.blur_img}
                    style={{
                        width: WIDTH / 2.6,
                        height: HEIGHT / 3.8,
                        marginTop: 15,
                        overflow: 'hidden',
                        borderRadius: 25,
                        margin: 7.5
                    }}
                    imageStyle={{ resizeMode: 'cover' }}
                    resizeMode='cover'>
                    <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                        <Text
                            style={{
                                color: '#E9C4AE',
                                fontSize: 16,
                                fontWeight: '700',
                                fontFamily: font.bold,
                                // alignSelf:'flex-start',
                                paddingBottom: 10
                                // marginLeft:5
                            }}>
                            {item.first_name}{' , '}{item?.age}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: WIDTH / 3.3, alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image
                                    source={IMAGE.passedclose}
                                    style={{
                                        width: 18,
                                        height: 18,
                                        alignSelf: 'center',
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={{ marginLeft: 6 }}><View style={{ width: 2, height: HEIGHT / 20, backgroundColor: '#E9C4AE' }}></View></View>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image
                                    source={IMAGE.passedlike}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        alignSelf: 'center',
                                    }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ height: HEIGHT / 1.6 }}>
            {loader ? <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', top: HEIGHT / 4 }} /> :
                <>
                    {Iliked.length == 0 ? (
                        <View
                            style={{
                                width: WIDTH / 1,
                                height: HEIGHT / 1.5,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 26,
                                    fontWeight: '700',
                                    fontFamily: font.bold,
                                    alignSelf: 'center',
                                }}>
                                No  users
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={Iliked}
                            contentContainerStyle={{ justifyContent: 'space-between', alignSelf: 'center' }}
                            renderItem={item => <RenderItem {...item} />}
                            numColumns={2}
                        />
                    )}
                </>
            }
        </View>
    )
}