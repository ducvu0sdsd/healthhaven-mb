import { createContext, useState } from "react";
import { Alert } from "react-native";
export const payloadContext = createContext()

const PayLoadProvider = ({ children }) => {

    const [qa, setQa] = useState()
    const [blog, setBlog] = useState()

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
        bookingNormal
    }

    const handler = {
        setQa,
        setBlog,
        setPriceList,
        setDoctorRecord,
        setSick,
        setBookingNormal
    }

    return (
        <payloadContext.Provider value={{ payloadData: data, payloadHandler: handler }}>
            {children}
        </payloadContext.Provider>
    )
}

export default PayLoadProvider