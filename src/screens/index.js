import React, { useContext, useEffect, useRef } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import LandingScreen from './LandingScreen'
import DoctorsScreen from './DoctorsScreen'
import { screenContext } from '../contexts/ScreenContext'
import DetailDoctorScreen from './DetailDoctorScreen'
import ServicesScreen from './ServicesScreen'
import ForumsScreen from './ForumsScreen'
import BlogsScreen from './BlogsScreen'
import AppointmentScreen from './AppointmentsScreen'
import ZegoScreen from './ZegoScreen'
import MedicalRecordScreen from './MedicalRecordScreen'
import ChatMessageScreen from './ChatMessageScreen'
import TicketScreen from './TicketsScreen'
import FollowHealthScreen from './FollowHealthScreen'
import ProfileScreen from './ProfileScreen'

const Index = () => {
    const { width } = Dimensions.get('window');
    const { screenData } = useContext(screenContext)
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: screenData.currentScreen * width, animated: true });
        }
    }, [screenData.currentScreen])

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            style={{ flexDirection: 'row' }}
            scrollEnabled={false}
        >
            <LandingScreen />
            <DoctorsScreen />
            <DetailDoctorScreen />
            <ServicesScreen />
            <ForumsScreen />
            <BlogsScreen />
            <AppointmentScreen />
            <ZegoScreen />
            <MedicalRecordScreen />
            <ChatMessageScreen />
            <TicketScreen />
            <FollowHealthScreen />
            <ProfileScreen />
            {/* for patient */}

        </ScrollView>
    )
}

export default Index