import { createContext, useState } from "react";
import { Alert } from "react-native";
export const payloadContext = createContext()

const PayLoadProvider = ({ children }) => {

    const [qa, setQa] = useState()
    const [blog, setBlog] = useState()

    //room
    const [currentRoom, setCurrentRoom] = useState()

    // detail appointment
    const [detailAppointment, setDetailAppointment] = useState()
    const [displayConnect, setDisplayConnect] = useState()

    // booking
    const [priceList, setPriceList] = useState()
    const [doctorRecord, setDoctorRecord] = useState()
    const [sick, setSick] = useState('')
    // => 
    const [bookingNormal, setBookingNormal] = useState()

    const data = {
        qa,
        blog,
        priceList,
        doctorRecord,
        sick,
        bookingNormal,
        detailAppointment,
        displayConnect,
        currentRoom
    }

    const handler = {
        setQa,
        setBlog,
        setPriceList,
        setDoctorRecord,
        setSick,
        setBookingNormal,
        setDetailAppointment,
        setDisplayConnect,
        setCurrentRoom
    }

    return (
        <payloadContext.Provider value={{ payloadData: data, payloadHandler: handler }}>
            {children}
        </payloadContext.Provider>
    )
}

export default PayLoadProvider