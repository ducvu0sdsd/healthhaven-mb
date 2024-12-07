
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { menuContext } from '../../contexts/MenuContext';
import Icon from 'react-native-vector-icons/Feather';
import Logo from '../../../assets/logo.png';
import { api, TypeHTTP } from '../../utils/api';
import { utilsContext } from '../../contexts/UtilsContext';
import { notifyType } from '../../utils/notify';
import { userContext } from '../../contexts/UserContext';
import CompleteInformation from './CompleteInformation';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../firebase/firebase';
import { formatPhoneByFireBase } from '../../utils/phone';

const SignUp = () => {
    const { menuData, menuHandler } = useContext(menuContext);
    const { utilsHandler } = useContext(utilsContext);
    const { userHandler, userData } = useContext(userContext);
    const { width } = Dimensions.get('window');
    const [translateX] = useState(new Animated.Value(menuData.displaySignUp === true ? 0 : width));
    const [step, setStep] = useState(0);
    const [otp, setOtp] = useState('');
    const scrollViewRef = useRef(null);
    const [verification, setVerification] = useState();
    const recaptchaRef = useRef();
    const [loading, setLoading] = useState(false); // Trạng thái xác thực OTP
    const [info, setInfo] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: menuData.displaySignUp === true ? 0 : width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [menuData.displaySignUp]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: step * width, animated: true });
        }
    }, [step]);

    useEffect(() => {
        if (userData.user) {
            setStep(userData.user.processSignup);
        }
    }, [userData.user]);

    useEffect(() => {
        if (userData.user && menuData.displaySignUp && step === 1) {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider
                .verifyPhoneNumber(formatPhoneByFireBase(userData.user.phone), recaptchaRef.current)
                .then((confirmation) => setVerification(confirmation))
                .catch((err) => {
                    utilsHandler.notify(notifyType.FAIL, "Gửi OTP thất bại. Vui lòng thử lại!");
                });
        }
    }, [step]);

    const handleSubmitSignUp = () => {
        if (!/^0[0-9]{9}$/.test(info.phone)) {
            utilsHandler.notify(notifyType.WARNING, "Số điện thoại không hợp lệ")
            return
        }
        if (info.password.length < 6) {
            utilsHandler.notify(notifyType.WARNING, "Mật khẩu phải lớn hơn 6 ký tự")
            return
        }
        if (info.password !== info.confirmPassword) {
            utilsHandler.notify(notifyType.WARNING, "Mật khẩu xác nhận phải trùng khớp với mật khẩu")
            return
        }
        api({ sendToken: false, type: TypeHTTP.POST, body: { phone: info.phone, passWord: info.password }, path: '/auth/signup' })
            .then(res => {
                userHandler.setUser(res)
                utilsHandler.notify(notifyType.SUCCESS, 'Đăng Ký Tài Khoản Thành Công')
            })
            .catch(error => {
                utilsHandler.notify(notifyType.FAIL, error.message)
            })
    }

    const handleSubmitOTPWithPhoneNumber = () => {
        if (otp === '') {
            utilsHandler.notify(notifyType.WARNING, "Hãy nhập OTP trước khi xác nhận");
            return;
        }
        setLoading(true);
        const credential = firebase.auth.PhoneAuthProvider.credential(verification, otp);
        firebase.auth()
            .signInWithCredential(credential)
            .then(() => {
                const updatedUser = { ...userData.user, processSignup: 2 };
                api({
                    type: TypeHTTP.POST,
                    body: updatedUser,
                    path: `/auth/update`,
                    sendToken: false,
                })
                    .then((res) => {
                        console.log(res)
                        userHandler.setUser(res);
                        utilsHandler.notify(notifyType.SUCCESS, "Xác thực tài khoản thành công!");
                    })
                    .catch(() => {
                        utilsHandler.notify(notifyType.FAIL, "Xác minh thất bại. Vui lòng thử lại!");
                    })
                    .finally(() => setLoading(false));
            })
            .catch(() => {
                utilsHandler.notify(notifyType.FAIL, "Mã xác minh không đúng. Vui lòng thử lại!");
                setLoading(false);
            });
    };

    return (
        <Animated.View
            style={{
                transform: [{ translateX }],
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                zIndex: 3,
                top: 0,
                flexDirection: 'column',
                gap: 20,
                right: 0,
            }}
        >
            <View style={{ position: 'absolute', right: 15, top: 30, zIndex: 1 }}>
                <TouchableOpacity onPress={() => menuHandler.setDisplaySignUp(false)}>
                    <Icon name="x" style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                ref={scrollViewRef}
                scrollEnabled={false}
                style={{ flexDirection: 'row' }}
            >
                {/* Form Đăng Ký */}
                <View style={{ width, flexDirection: 'column', alignItems: 'center' }}>
                    <Image source={Logo} style={{ width: 300, height: 300, marginTop: '20%' }} />
                    <Text style={{ fontFamily: 'Nunito-B', fontSize: 22 }}>Chào Mừng Đến Với HealthHaven</Text>
                    <TextInput
                        value={info.phone}
                        onChangeText={(e) => setInfo({ ...info, phone: e })}
                        placeholder="Số Điện Thoại (+84)"
                        style={{
                            color: 'black',
                            marginTop: 20,
                            height: 48,
                            width: '75%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderColor: '#bbb',
                        }}
                    />
                    <TextInput
                        value={info.password}
                        onChangeText={(e) => setInfo({ ...info, password: e })}
                        secureTextEntry={true}
                        placeholder="Mật Khẩu"
                        style={{
                            color: 'black',
                            marginTop: 10,
                            height: 48,
                            width: '75%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderColor: '#bbb',
                        }}
                    />
                    <TextInput
                        value={info.confirmPassword}
                        onChangeText={(e) => setInfo({ ...info, confirmPassword: e })}
                        secureTextEntry={true}
                        placeholder="Xác Nhận Mật Khẩu"
                        style={{
                            color: 'black',
                            marginTop: 10,
                            height: 48,
                            width: '75%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderColor: '#bbb',
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => handleSubmitSignUp()}
                        style={{
                            borderRadius: 5,
                            backgroundColor: '#1dcbb6',
                            height: 45,
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '75%',
                        }}
                    >
                        <Text style={{ color: 'white', fontFamily: 'Nunito-B' }}>Đăng Ký</Text>
                    </TouchableOpacity>
                </View>
                {/* Xác Thực Tài Khoản */}
                <View style={{ width, flexDirection: 'column', alignItems: 'center' }}>
                    <Image source={Logo} style={{ width: 300, height: 300, marginTop: '20%' }} />
                    <Text style={{ fontFamily: 'Nunito-B', fontSize: 22 }}>Xác Thực Tài Khoản</Text>
                    <Text style={{ fontFamily: 'Nunito-R', fontSize: 14, width: '75%', textAlign: 'center', marginTop: 5 }}>
                        Một mã xác minh đã được gửi đến số điện thoại của bạn. Vui lòng nhập mã xác minh bên dưới.
                    </Text>
                    <TextInput
                        value={otp}
                        onChangeText={(e) => setOtp(e)}
                        placeholder="Mã Xác Thực"
                        style={{
                            color: 'black',
                            marginTop: 20,
                            height: 48,
                            width: '75%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderColor: '#bbb',
                        }}
                    />
                    <FirebaseRecaptchaVerifierModal ref={recaptchaRef} firebaseConfig={firebaseConfig} />
                    <TouchableOpacity
                        onPress={() => handleSubmitOTPWithPhoneNumber()}
                        style={{
                            borderRadius: 5,
                            backgroundColor: '#1dcbb6',
                            height: 45,
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '75%',
                        }}
                    >
                        {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontFamily: 'Nunito-B' }}>Xác Nhận</Text>}
                    </TouchableOpacity>
                </View>
                <CompleteInformation />
            </ScrollView>
        </Animated.View>
    );
};

export default SignUp;
