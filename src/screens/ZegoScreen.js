import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { menuContext } from '../contexts/MenuContext';
import { payloadContext } from '../contexts/PayloadContext';
import { userContext } from '../contexts/UserContext';
import { screenContext } from '../contexts/ScreenContext';

const ZegoScreen = () => {
    const { width } = Dimensions.get('window');
    const { menuHandler } = useContext(menuContext)
    const { payloadHandler } = useContext(payloadContext)
    const { userData } = useContext(userContext)
    const { screenData } = useContext(screenContext)
    return (
        <ScrollView>
            <View style={{ flexWrap: 'wrap', flexDirection: 'column', width, gap: 10, paddingHorizontal: 20, paddingVertical: 10 }}>
                {screenData.currentScreen === 7 && (<>
                    <Text>ZegoScreen</Text>
                </>)}
            </View>
        </ScrollView>
    )
}

export default ZegoScreen