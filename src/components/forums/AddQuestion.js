import React, { useContext, useEffect, useState } from 'react'
import { Animated, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { menuContext } from '../../contexts/MenuContext';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { dsKhoa } from '../../utils/chuyenKhoa';
import Icon2 from 'react-native-vector-icons/Entypo';

const AddQuestion = () => {
    const { menuData, menuHandler } = useContext(menuContext);
    const { width } = Dimensions.get('window');
    const [translateX] = useState(new Animated.Value(menuData.displayAddQuestion === true ? 0 : width));
    const [display, setDisplay] = useState(false)

    //data
    const [chuyenMuc, setChuyenMuc] = useState('')

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: menuData.displayAddQuestion === true ? 0 : width,
            duration: 300, // Thời gian animation (ms)
            useNativeDriver: true, // Sử dụng Native Driver cho hiệu suất tốt hơn
        }).start();
    }, [menuData.displayAddQuestion]);


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
            {display && (
                <Pressable onPress={() => setDisplay(false)} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: '#00000053', zIndex: 4 }} />
            )}
            {display && (
                <ScrollView style={{ height: '80%', width: '80%', position: 'absolute', backgroundColor: 'white', borderRadius: 10, top: '10%', zIndex: 4, paddingHorizontal: 20, left: '10%' }}>
                    {dsKhoa.map((item, index) => (
                        <TouchableOpacity onPress={() => {
                            setChuyenMuc(item)
                            setDisplay(false)
                        }} key={index} style={{ marginTop: 10, backgroundColor: '#e5e7e9', paddingHorizontal: 10, borderRadius: 5, paddingVertical: 10 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito-S' }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )
            }

            <View style={{ position: 'absolute', right: 15, top: 30 }}>
                <TouchableOpacity onPress={() => menuHandler.setDisplayAddQuestion(false)}>
                    <Icon name="x" style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', paddingTop: 70 }}>
                <Text style={{ fontFamily: 'Nunito-B', fontSize: 20 }}>ĐẶT CÂU HỎI VỚI BÁC SĨ</Text>
                <TextInput placeholder='Tiêu đề...' style={{ color: 'black', marginTop: 20, height: 48, zIndex: 1, width: '80%', backgroundColor: 'white', borderWidth: 1, paddingHorizontal: 15, borderRadius: 7, borderColor: '#bbb' }} />
                <TouchableOpacity onPress={() => setDisplay(true)} style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, fontSize: 16, backgroundColor: 'white', borderRadius: 7, width: '80%', borderColor: '#bbb', height: 48, borderWidth: 1 }}>
                    <Text style={{ color: chuyenMuc === '' ? '#999' : 'black', fontFamily: 'Nunito-S' }}>
                        {chuyenMuc === '' ? 'Chọn Chuyên Mục...' : chuyenMuc}
                    </Text>
                </TouchableOpacity>
                <TextInput multiline={true} textAlignVertical="top" numberOfLines={4} placeholder='Nội Dung Câu Hỏi...' style={{ color: 'black', marginTop: 10, height: 108, zIndex: 1, width: '80%', backgroundColor: 'white', borderWidth: 1, paddingHorizontal: 15, borderRadius: 7, paddingVertical: 10, borderColor: '#bbb' }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'column', gap: 5, borderRadius: 5, borderColor: '#e5e7e9', borderWidth: 2 }}>
                        <Icon2 name='image' style={{ fontSize: 30 }} />
                        <Text style={{ fontSize: 15, fontFamily: 'Nunito-B' }}>Thêm Ảnh</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: 'Nunito-R', fontSize: 14, width: '80%', marginTop: 10 }}>* Câu trả lời của bạn sẽ được hiển thị công khai</Text>
                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#1dcbb6', height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontFamily: 'Nunito-B' }}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </Animated.View >
    )
}

export default AddQuestion