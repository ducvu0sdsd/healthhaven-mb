import React, { useContext } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native'
import { formatMoney } from '../../../utils/other';
import { convertDateToDayMonthYear } from '../../../utils/date';
import { userContext } from '../../../contexts/UserContext';
import { payloadContext } from '../../../contexts/PayloadContext';

const ChoosePayment = ({ setStep }) => {
    const { userData } = useContext(userContext)
    const { width } = Dimensions.get('window');
    const { payloadData } = useContext(payloadContext)

    return (
        <View style={{ width, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10, paddingTop: 60 }}>
            <Text style={{ fontFamily: 'Nunito-B', fontSize: 20 }}>Phương Thức Thanh Toán</Text>

            <View style={{ flexDirection: 'column', gap: 10, borderRadius: 5, width: '85%', borderWidth: 1, borderColor: '#cacfd2', marginTop: 10 }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, borderRadius: 5, width: '100%', borderBottomWidth: 1, borderColor: '#cacfd2', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontFamily: 'Nunito-S' }}>Phương Thức Thanh Toán</Text>
                </View>
                <View style={{ alignItems: 'start', flexDirection: 'column', gap: 15, borderRadius: 5, width: '100%', borderBottomWidth: 1, borderColor: '#cacfd2', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'start', gap: 5 }}>
                        <Image style={{ height: 60, width: 60, borderRadius: 5 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png' }} />
                        <View style={{ flexDirection: 'column', width: '80%' }}>
                            <Text style={{ fontFamily: 'Nunito-B', paddingHorizontal: 10, borderRadius: 5 }}>Thanh Toán Qua Ví MOMO</Text>
                            <Text style={{ fontFamily: 'Nunito-S', paddingHorizontal: 10, borderRadius: 5 }}>Sử dụng app Momo quét mã vạch hoặc nhập thông tin để thanh toán</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: 'column', gap: 10, borderRadius: 5, width: '85%', borderWidth: 1, borderColor: '#cacfd2', marginTop: 10 }}>
                <View style={{ alignItems: 'start', flexDirection: 'row', gap: 15, borderRadius: 5, width: '100%', borderBottomWidth: 1, borderColor: '#cacfd2', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View style={{
                        height: 55,
                        width: 55,
                        borderWidth: 1,
                        borderColor: '#1dcbb6',
                        overflow: 'hidden',
                        borderRadius: 150
                    }}>
                        <Image
                            source={{ uri: payloadData.bookingHome?.doctor?.image }}
                            style={{
                                height: 75,
                                width: 55,
                            }}
                        />
                    </View>
                    {console.log(payloadData.bookingHome)}
                    <View style={{ flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                        <Text style={{ fontFamily: 'Nunito-R', fontSize: 15, width: '65%' }}>Dịch Vụ Theo Dõi Sức Khỏe với bác sĩ {payloadData.bookingHome?.doctor.fullName}</Text>
                        <Text style={{ fontFamily: 'Nunito-B', fontSize: 15 }}>{payloadData.bookingHome?.doctor.fullName}</Text>
                        <Text style={{ fontFamily: 'Nunito-S', fontSize: 13, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#e0eff6', borderRadius: 5, marginVertical: 2 }}>{payloadData.bookingHome?.doctor.specialize}</Text>
                        <Text style={{ fontFamily: 'Nunito-S', fontSize: 15 }}>{formatMoney(payloadData.bookingHome?.price_list.price)} đ</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'column', gap: 10, borderRadius: 5, width: '85%', borderWidth: 1, borderColor: '#cacfd2', marginTop: 15, paddingHorizontal: 20, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', gap: 1, justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Nunito-S', fontSize: 15 }}>Giá dịch vụ</Text>
                    <Text style={{ fontFamily: 'Nunito-S', fontSize: 14 }}>{formatMoney(payloadData.bookingHome?.price_list.price)} đ</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 1, justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Nunito-S', fontSize: 15 }}>Tổng Thanh Toán</Text>
                    <Text style={{ fontFamily: 'Nunito-S', fontSize: 16, color: 'red' }}>{formatMoney(payloadData.bookingHome?.price_list.price)} đ</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => setStep(2)} style={{ borderRadius: 5, marginTop: 10, backgroundColor: '#1dcbb6', height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                <Text style={{ color: 'white', fontFamily: 'Nunito-B' }}>Bước Tiếp Theo</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChoosePayment