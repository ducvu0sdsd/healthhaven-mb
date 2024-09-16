import React, { useContext, useEffect, useState } from 'react'
import { Animated, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { menuContext } from '../../contexts/MenuContext';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { payloadContext } from '../../contexts/PayloadContext';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { userContext } from '../../contexts/UserContext';
import { api, TypeHTTP } from '../../utils/api';

const DetailQuestion = () => {
    const { menuData, menuHandler } = useContext(menuContext);
    const { userData, userHandler } = useContext(userContext)
    const { payloadData, payloadHandler } = useContext(payloadContext)
    const [comments, setComments] = useState([]);
    const { width } = Dimensions.get('window');
    const [translateX] = useState(new Animated.Value(menuData.displayDetailQuestion === true ? 0 : width));

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: menuData.displayDetailQuestion === true ? 0 : width,
            duration: 300, // Thời gian animation (ms)
            useNativeDriver: true, // Sử dụng Native Driver cho hiệu suất tốt hơn
        }).start();
    }, [menuData.displayDetailQuestion]);

    useEffect(() => {
        if (payloadData.qa) {
            api({
                path: `/qas/update-view/${payloadData.qa._id}`,
                sendToken: false,
                type: TypeHTTP.POST,
            });
            api({
                path: `/comments/get-by-qa/${payloadData.qa._id}`,
                sendToken: false,
                type: TypeHTTP.GET,
            }).then((res) => {
                setComments(res);
            });
        }
    }, [payloadData.qa]);


    return (
        <Animated.View
            style={{
                transform: [{ translateX }],
                position: 'absolute',
                height: '100%',
                width: '100%', // Sử dụng chiều rộng của màn hình
                backgroundColor: 'white',
                zIndex: 3,
                top: 0,
                flexDirection: 'column',
                // alignItems: 'center',
                gap: 20,
                right: 0,
            }}
        >
            <View style={{ position: 'absolute', right: 15, top: 30 }}>
                <TouchableOpacity onPress={() => {
                    payloadHandler.setQa()
                    menuHandler.setDisplayDetailQuestion(false)
                }}>
                    <Icon name="x" style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start', gap: 10, paddingHorizontal: 20, paddingVertical: 50 }}>
                {payloadData.qa && (
                    <>
                        <Text style={{ fontFamily: 'Nunito-R', fontSize: 15 }}>{payloadData.qa.patient.sex === true ? "Nam" : "Nữ"} , {payloadData.qa.patient.dateOfBirth}</Text>
                        <Text style={{ fontFamily: 'Nunito-B', fontSize: 17, color: '#6567eb' }}>{payloadData.qa.title}</Text>
                        <Text style={{ fontFamily: 'Nunito-R', fontSize: 16 }}>{payloadData.qa.content}</Text>
                        <View style={{ backgroundColor: '#bfdbfe', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#6567eb', fontFamily: 'Nunito-B' }}>{payloadData.qa.category}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <Text style={{ fontFamily: 'Nunito-S' }}><Icon name='clock' style={{ fontSize: 15 }} /> {payloadData.qa.date.day}/{payloadData.qa.date.month}/{payloadData.qa.date.year}</Text>
                            <Text style={{ fontFamily: 'Nunito-S' }}><Icon name='eye' style={{ fontSize: 15 }} /> {payloadData.qa.views}</Text>
                            <Text style={{ fontFamily: 'Nunito-S' }}><Icon1 name='like2' style={{ fontSize: 15 }} /> {payloadData.qa.like.length}</Text>
                            <Text style={{ fontFamily: 'Nunito-S' }}><Icon1 name='message1' style={{ fontSize: 15 }} /> {payloadData.qa.comment}</Text>
                        </View>
                    </>
                )}
                {userData?.user &&
                    (userData.user?.role === "DOCTOR" ||
                        userData.user?._id === payloadData.qa?.patient?._id) && (
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 5 }}>
                            <Image source={{ uri: userData.user?.image }} style={{ height: 45, width: 45, borderRadius: 22 }} />
                            <TextInput placeholder='Thêm bình luận' style={{ width: '70%', borderBottomWidth: 1, borderColor: '#e5e7e9' }} />
                            <TouchableOpacity>
                                <Icon2 name='image' style={{ fontSize: 24, color: '#999' }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon3 name='send' style={{ fontSize: 24, color: '#999' }} />
                            </TouchableOpacity>
                        </View>
                    )}
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    {comments.map((comment, index) => (
                        <View key={index} style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-start', marginTop: 5 }}>
                            <Image source={{ uri: comment.author?.image }} style={{ height: 45, width: 45, borderRadius: 22 }} />
                            <View style={{ flexDirection: 'column', gap: 5, width: '85%' }}>
                                <Text style={{ fontFamily: 'Nunito-B', fontSize: 15 }}>{comment.author?.fullName}</Text>
                                <Text style={{ fontFamily: 'Nunito-R', fontSize: 14 }}>{comment.text}</Text>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    {comment.image?.map(
                                        (item, imgIndex) => (
                                            <Image key={imgIndex} source={{ uri: item }} style={{ height: 60, width: 100, borderRadius: 5 }} />
                                        )
                                    )}
                                </View>
                                <Text style={{ fontFamily: 'Nunito-R', fontSize: 13 }}><Icon name='clock' style={{ fontSize: 15 }} /> {comment.date?.day}/
                                    {comment.date?.month}/
                                    {comment.date?.year}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </Animated.View>
    )
}

export default DetailQuestion