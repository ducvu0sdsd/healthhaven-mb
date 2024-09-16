import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { menuContext } from '../contexts/MenuContext';
import { payloadContext } from '../contexts/PayloadContext';
import { userContext } from '../contexts/UserContext';
import { api, TypeHTTP } from '../utils/api';
import { compare2Date, convertDateToDayMonthYearTimeObject, convertDateToDayMonthYearVietNam, isALargerWithin10Minutes, isALargerWithin60Minutes, sortByAppointmentDate } from '../utils/date';

const AppointmentScreen = () => {
    const { width } = Dimensions.get('window');
    const { menuHandler } = useContext(menuContext)
    const { payloadHandler } = useContext(payloadContext)
    const { userData } = useContext(userContext)
    const [doctorRecords, setDoctorRecords] = useState([])
    const [appointments, setAppointments] = useState([])
    const tableHead = ['Bác Sĩ', 'Trạng Thái', 'Thời Gian'];
    const [tableData, setTableData] = useState([])
    const [time, setTime] = useState(new Date().getHours() + ':' + new Date().getMinutes())
    const [displayConnect, setDisplayConnect] = useState(false)
    const intervalRef = useRef()

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime(new Date().getHours() + ':' + new Date().getMinutes())
        }, 60000);
    }, [])

    useEffect(() => {
        if (appointments.length > 0) {
            const theFirstAppointment = sortByAppointmentDate(appointments.filter(item => item.status === 'ACCEPTED')).filter(item => compareTimeDate1GreaterThanDate2(item.appointment_date, convertDateToDayMonthYearTimeObject(new Date().toISOString())))[0]
            if (theFirstAppointment) {
                if (compare2Date(convertDateToDayMonthYearTimeObject(new Date().toISOString()), theFirstAppointment.appointment_date)) {
                    if (isALargerWithin10Minutes(theFirstAppointment.appointment_date.time, time) || isALargerWithin60Minutes(time, theFirstAppointment.appointment_date.time)) {
                        setDisplayConnect(theFirstAppointment._id)
                    }
                }
            }
        }
    }, [appointments, time])

    useEffect(() => {
        if (userData.user) {
            api({ type: TypeHTTP.GET, path: '/appointments/getAll', sendToken: false })
                .then(res => {
                    setAppointments(res.filter(item => item.patient._id === userData.user._id).reverse())
                })
            api({ type: TypeHTTP.GET, path: '/doctorRecords/getAll', sendToken: false })
                .then(res => {
                    setDoctorRecords(res)
                })
        }
    }, [userData.user])



    return (
        <ScrollView>
            {/* {screenData.currentScreen === 1 && ( */}
            <View style={{ flexWrap: 'wrap', flexDirection: 'column', width, paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Nunito-B' }}>Chào {userData.user?.fullName}</Text>
                <Text style={{ fontFamily: 'Nunito-R' }}>Tư vấn với các bác sĩ để nhận lời khuyên tốt nhất</Text>

            </View>
            {/* )} */}
        </ScrollView >
    )
}

export default AppointmentScreen