import { createContext, useState } from "react";
import { Alert } from "react-native";
export const dataContext = createContext()

const DataProvider = ({ children }) => {

    const [doctorRecords, setDoctorRecords] = useState([])
    const [sicks, setSicks] = useState([])

    const data = {
        doctorRecords,
        sicks
    }

    const handler = {
        setDoctorRecords,
        setSicks
    }

    return (
        <dataContext.Provider value={{ data: data, handler: handler }}>
            {children}
        </dataContext.Provider>
    )
}

export default DataProvider