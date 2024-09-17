import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import { menuContext } from '../../contexts/MenuContext';
import { payloadContext } from '../../contexts/PayloadContext';
import { deploy } from '../../utils/api';
const DetailBlog = () => {
    const { menuData, menuHandler } = useContext(menuContext);
    const { payloadData, payloadHandler } = useContext(payloadContext)
    const { width, height } = Dimensions.get('window');
    const [translateX] = useState(new Animated.Value(menuData.displayDetailBlog === true ? 0 : width));

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: menuData.displayDetailBlog === true ? 0 : width,
            duration: 300, // Thời gian animation (ms)
            useNativeDriver: true, // Sử dụng Native Driver cho hiệu suất tốt hơn
        }).start();
    }, [menuData.displayDetailBlog]);


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
            <View style={{ position: 'absolute', right: 15, top: 30, zIndex: 1 }}>
                <TouchableOpacity onPress={() => {
                    payloadHandler.setBlog()
                    menuHandler.setDisplayDetailBlog(false)
                }}>
                    <Icon name="x" style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', paddingHorizontal: 20, flexDirection: 'column', height, paddingTop: 50 }}>
                {payloadData.blog && (<>
                    <Text style={{ fontSize: 20, fontFamily: 'Nunito-B' }}>{payloadData.blog?.title}</Text>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: payloadData.blog?.content }}
                    />
                </>)}
            </ScrollView>
        </Animated.View >
    )
}

export default DetailBlog