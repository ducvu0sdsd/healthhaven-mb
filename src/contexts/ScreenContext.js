import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { userContext } from "./UserContext";
export const screenContext = createContext()

const ScreenProvider = ({ children }) => {

    const [currentScreen, setCurrentScreen] = useState()
    const [currentDoctorRecord, setCurrentDoctorRecord] = useState()

    const navigate = (route) => {
        switch (route) {
            case 'landing':
                setCurrentScreen(0)
                break
            case 'doctors':
                setCurrentScreen(1)
                break
            case 'detail-doctor':
                setCurrentScreen(2)
                break
            case 'services':
                setCurrentScreen(3)
                break
            case 'forums':
                setCurrentScreen(4)
                break
            case 'blogs':
                setCurrentScreen(5)
                break
            case 'appointments':
                setCurrentScreen(6)
                break
        }
    }

    const data = {
        currentScreen,
        currentDoctorRecord
    }

    const handler = {
        navigate,
        setCurrentDoctorRecord
    }

    return (
        <screenContext.Provider value={{ screenData: data, screenHandler: handler }}>
            {children}
        </screenContext.Provider>
    )
}

export default ScreenProvider