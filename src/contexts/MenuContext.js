import { createContext, useState } from "react";
import { Alert, Dimensions, Pressable, View } from "react-native";
import MenuArea from "../components/menu/MenuArea";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import DetailQuestion from "../components/forums/DetailQuestion";
import AddQuestion from "../components/forums/AddQuestion";
import DetailBlog from "../components/blogs/DetailBlog";
import FormBookingNormal from "../components/booking/FormBookingNormal";
import InformationBookingNormal from "../components/booking/normal/InformationBookingNormal";
import DetailAppointment from "../components/appointments/DetailAppointment";
import ChatArea from "../components/chat/ChatArea";
export const menuContext = createContext()

const MenuProvider = ({ children }) => {
    const [display, setDisplay] = useState(false) // displayMenu
    const [displaySignIn, setDisplaySignIn] = useState(false)
    const [displaySignUp, setDisplaySignUp] = useState(false)
    const [displayDetailQuestion, setDisplayDetailQuestion] = useState(false)
    const [displayAddQuestion, setDisplayAddQuestion] = useState(false)
    const [displayDetailBlog, setDisplayDetailBlog] = useState(false)
    const [displayFormBookingNormal, setDisplayFormBookingNormal] = useState(false)
    const [displayInformationBookingNormal, setDisplayInformationBookingNormal] = useState(false)
    const [displayDetailAppointment, setDisplayDetailAppointment] = useState(false)
    const [displayChatArea, setDisplayChatArea] = useState(false)


    const hidden = () => {
        setDisplay(false)
        setDisplaySignIn(false)
        setDisplaySignUp(false)
        setDisplayDetailQuestion(false)
        setDisplayAddQuestion(false)
        setDisplayDetailBlog(false)
        setDisplayFormBookingNormal(false)
        setDisplayInformationBookingNormal(false)
        setDisplayDetailAppointment(false)
        setDisplayChatArea(false)

    }

    const data = {
        display,
        displaySignIn,
        displaySignUp,
        displayDetailQuestion,
        displayAddQuestion,
        displayDetailBlog,
        displayFormBookingNormal,
        displayInformationBookingNormal,
        displayDetailAppointment,
        displayChatArea,
    }

    const handler = {
        setDisplay,
        setDisplaySignIn,
        setDisplaySignUp,
        setDisplayDetailQuestion,
        setDisplayAddQuestion,
        setDisplayDetailBlog,
        setDisplayFormBookingNormal,
        setDisplayInformationBookingNormal,
        setDisplayDetailAppointment,
        setDisplayChatArea,
    }

    return (
        <menuContext.Provider value={{ menuData: data, menuHandler: handler }}>
            {children}
            {display && (
                <Pressable onPress={() => hidden()} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: '#00000053', zIndex: 1 }} />
            )}
            <MenuArea />
            <SignIn />
            <SignUp />
            <DetailQuestion />
            <AddQuestion />
            <DetailBlog />
            <FormBookingNormal />
            <InformationBookingNormal />
            <DetailAppointment />
            <ChatArea />
        </menuContext.Provider>
    )
}

export default MenuProvider