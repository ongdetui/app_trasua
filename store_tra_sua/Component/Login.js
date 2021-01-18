import React, { Component } from 'react';
import {View, Text, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image} from 'react-native';
import imageLogin from '../assets/image-login.jpg';
import imageLogin2 from '../assets/login.jpg';
import google from '../assets/google.png';
import style from '../assets/style/style';
import validateEmail from '../Container/valid/validEmail'; //validate email
import { connect } from 'react-redux';
import AsyncStorageToken from '../Container/authention/AsyncStorageToken';
import { loginUser, loginGoogle } from '../Container/api/Axios';
// import { GoogleSignin } from 'react-native-google-signin';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '928709507478-fnb2gbgq5j5a8mf1qgc8545aogr9qtri.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            messageName: false,
            messagePass: false,
            messageSubmit: false,
            messageFalseLogin: false
        }
    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const idToken = userInfo.idToken;
          const authGoogleToken = await loginGoogle(idToken);
          if(authGoogleToken){
            this.props.setUser(authGoogleToken);
            AsyncStorageToken(idToken);
            this.props.navigation.navigate('User')
          }
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
    };
    
    
    //when user inport username to form
    changeTextName = (text) => {
        console.log(validateEmail(text))
        if(validateEmail(text) || text.length === 0){
            this.setState({
                userName: text,
                messageName: false,
            })
        }
        else {
            this.setState({
                userName: '',
                messageName: true
            })
        }
    }

    //when user inport pass word to form
    changeTextPass = (text) => {
        if(text.length >= 6 || text.length === 0){
            this.setState({
                passWord: text,
                messagePass: false
            });
        }
        else {
            this.setState({
                passWord: '',
                messagePass: true
            });
        }
    }

    //when user submit login
    submitLogin = () => {
        const {userName, passWord} = this.state;
        if(userName.length === 0 || passWord.length === 0){
            console.log(userName.length);
            this.setState({
                messageSubmit: true
            });
            setTimeout(()=>{
                this.setState({
                    messageSubmit: false
                })
            },3500);
            return Alert.alert(
              'Thông báo',
              'Vui lòng nhập đầy đủ các trường !',
              [
                {text: 'OK', },
              ],
              { cancelable: false }
            );
        }
        else {
            loginUser(userName, passWord).then((res)=> {
                // console.log(res.user.stsTokenManager.accessToken);
                // console.log(res.dataUser);
                // console.log(res);
                if(!res){
                    this.setState({
                        messageFalseLogin: true
                    });
                    setTimeout(()=>{
                        this.setState({
                            messageFalseLogin: false
                        })
                    },3500);
                }
                else {
                    const user = res.rest;
                    const idToken = res.user.stsTokenManager.accessToken;
                    this.props.setUser(user);
                    AsyncStorageToken(idToken);
                    this.props.navigation.navigate('User')
                } 
            })
        }
        
    }

    //when name invalid then view
    viewMessageName = () => {
        if(this.state.messageName){
            return <Text style={style.inputMessage}>Email không hợp lệ</Text>
        }
        return null;
    }

    //when pass invalid then view
    viewMessagePass = () => {
        if(this.state.messagePass){
            return <Text style={style.inputMessage}>Mật khẩu bắt buộc dài hơn 6 ký tự !</Text>
        }
        return null;
    }

    //when user submit but form null
    viewMessageSubmit = () => {
        if(this.state.messageSubmit){
            return <Text style={style.inputMessage}>Vui lòng nhập đầy đủ các trường !</Text>
        }
        return null;
    }

    viewMessageFalseLogin = () => {
        if(this.state.messageFalseLogin){
            return <Text style={style.inputMessage}>Thông tin tài khoản không chính xác !</Text>
        }
        return null;
    }

    loginGoogle = async () => {
        // try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     console.log(userInfo);
        // } catch (error) {

        // }

    }

    render() {
        return (
            <View style={style.container}>
                <ImageBackground source={imageLogin2} style={style.imageLogin}>
                    <Text style={style.registerTitle}>Đăng nhập</Text>
                    <View>
                        <View style={style.boxInputLogin}>
                            <TextInput
                               placeholder={'Nhập Email'}
                            //    placeholderTextColor={'#fd5f32'}
                               style={style.inputLogin}
                               onChangeText={(event)=> this.changeTextName(event) }
                            />
                            {this.viewMessageName()}
                        </View>
                        <View style={style.boxInputLogin}>
                            <TextInput
                               placeholder={'PassWord'} 
                               style={style.inputLogin}
                               secureTextEntry={true}
                               onChangeText={(event)=> this.changeTextPass(event)}
                            />
                            {this.viewMessagePass()}
                            {this.viewMessageSubmit()}
                            {this.viewMessageFalseLogin()}
                        </View>
                        <Button
                           title={'Đăng nhập'}
                           onPress={()=> this.submitLogin()}
                        />
                    </View>
                    <View style={style.optionAuthen}>
                        <Text style={style.optionAuthenTextQuestion}>Does'nt have an account?</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                            <Text style={style.optionAuthenText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={style.textSelectorLogin}>or connenct with</Text>
                    </View>
                    {/* <TouchableOpacity activeOpacity={0.5} onPress={()=> this.loginGoogle()}>
                        <View style={style.loginWith}>
                            <Image source={google} style={style.loginWithImageIcon}/>
                            <Text style={style.loginWithText}>Login with Google</Text>
                        </View>
                    </TouchableOpacity> */}
                    <GoogleSigninButton
                        style={{ width: 220, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={()=> this.signIn()}
                    />
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        navigation: state.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => {
            dispatch({type: "SET_USER",user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)