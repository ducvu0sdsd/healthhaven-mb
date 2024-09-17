import React, { useContext, useEffect, useState } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native';
import { menuContext } from '../../contexts/MenuContext';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { payloadContext } from '../../contexts/PayloadContext';

const DetailLogbook = () => {
    const { menuData, menuHandler } = useContext(menuContext);
    const { width } = Dimensions.get('window');
    const [translateX] = useState(new Animated.Value(menuData.displayDetailLogbook === true ? 0 : width));
    const { payloadData } = useContext(payloadContext)

    // goi logbook thi dung payloadData.logBook (đã chuyền dữ liệu vào khi bấm vào Detail Logbook, chỉ cần lấy ra xài thôi)
    // bieu do thì kham khảo trong components/health

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: menuData.displayDetailLogbook === true ? 0 : width,
            duration: 300, // Thời gian animation (ms)
            useNativeDriver: true, // Sử dụng Native Driver cho hiệu suất tốt hơn
        }).start();
    }, [menuData.displayDetailLogbook]);


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
                <TouchableOpacity onPress={() => menuHandler.setDisplayDetailLogbook(false)}>
                    <Icon name="x" style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>

            </View>
        </Animated.View>
    )
}

export default DetailLogbook