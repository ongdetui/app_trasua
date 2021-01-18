import React, { Component } from 'react';
import {View, Text, ImageBackground, TextInput, Button, Alert} from 'react-native';
import style from '../assets/style/style';
import imageLogin2 from '../assets/login.jpg';
import validEmail from '../Container/valid/validEmail';
import validPhoneNumberVietNam from '../Container/valid/validPhoneNumber';
import { connect } from 'react-redux';
import AsyncStorageToken from '../Container/authention/AsyncStorageToken';
import { register } from '../Container/api/Axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            password: '',
            passwordConfig: '',
            messageEmail: false,
            messagePhoneNumber: false,
            messagePassword: false,
            messagePasswordConfig: false,
            messageSubmit: false
        }
    }
    
    //validate email and add data to state email
    changeTextName = (text) => {
        console.log(text);
        if(validEmail(text) || text.length === 0){
            this.setState({
                email: text,
                messageEmail: false
            });
        }
        else {
            this.setState({
                email: '',
                messageEmail: true
            });
        }
    }

    //view message error form email
    viewMessageEmail = () => {
        if(this.state.messageEmail){
            return <Text style={style.inputMessage}>Email không hợp lệ</Text>
        }
        else {
            return null;
        }
    }

    //validate phone number and add data to state.phoneNumber
    changeTextPhoneNumber = (text) => {
        console.log(validPhoneNumberVietNam(text));
        if(validPhoneNumberVietNam(text) || text.length === 0){
            this.setState({
                phoneNumber: text,
                messagePhoneNumber: false
            });
        }
        else {
            this.setState({
                phoneNumber: '',
                messagePhoneNumber: true
            });
        }
    }

    //view message error form phone number
    viewMessagePhoneNumber = () => {
        if(this.state.messagePhoneNumber){
            return <Text style={style.inputMessage}>Số điện thoại không hợp lệ !</Text>
        }
        else {
            return null;
        }
    }

    //valid password and add data to state.password
    changeTextPass = (text) => {
        if(text.length >= 6 || text.length === 0){
            this.setState({
                password: text,
                messagePassword: false
            })
        }
        else {
            this.setState({
                password: '',
                messagePassword: true
            });
        }
    }

    //view message error form password
    viewMessagePassword = () => {
        if(this.state.messagePassword){
            return <Text style={style.inputMessage}>Mật khẩu tối thiểu 6 ký tự !</Text>
        }
        else {
            return null;
        }
    }

    //validate password config and add data to state.passwordConfig
    changeTextPassConfig = (text) => {
        const {password} = this.state;
        console.log(password)
        if(password === text || text.length === 0){
            this.setState({
                passwordConfig: text,
                messagePasswordConfig: false
            });
        }
        else {
            this.setState({
                passwordConfig: '',
                messagePasswordConfig: true
            });
        }
    }

    //view message error form password config
    viewMessagePasswordConfig = () => {
        if(this.state.messagePasswordConfig){
            return  <Text style={style.inputMessage}>Mật khẩu nhập lại không khớp !</Text>
        }
        else {
            return null;
        }
    }

    //when user click submit
    submitRegister = () => {
        const {email, phoneNumber, password, passwordConfig} = this.state;
        if(email.length === 0 || phoneNumber.length === 0 || password.length === 0 || passwordConfig.length === 0){
            this.setState({
                messageSubmit: true
            });
            setTimeout(()=>{
                this.setState({
                    messageSubmit: false
                });
            },3500)
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
            register(email, phoneNumber, password).then((res)=> {
                console.log(res);
                if(res){
                    const user = res.dataUser;
                    const idToken = res.user.stsTokenManager.accessToken;
                    console.log(idToken)
                    // console.log(res.user)
                    this.props.setUser(user);
                    AsyncStorageToken(idToken);
                    this.props.navigation.navigate('User');
                }
                else {
                    return Alert.alert(
                        'Thông báo',
                        'Tài khoản trên đã được đăng ký trước đó !',
                        [
                          {text: 'OK', },
                        ],
                        { cancelable: false }
                    );
                }
            })
        }
    }

    //view errer when submit form
    viewMessageSubmit = () => {
        if(this.state.messageSubmit){
            return <Text style={style.inputMessage}>Vui lòng nhập đầy đủ các trường trên !</Text>
        }
        return null;
    }

    render() {
        console.log(this.state);
        return (
            <View style={style.container}>
                <ImageBackground source={imageLogin2} style={style.imageLogin}>
                    <View style={style.formRegister}>
                        <Text style={style.registerTitle}>Đăng ký tài khoản</Text>
                        <View>
                            <View style={style.boxInputLogin}>
                                <TextInput
                                   placeholder={'Nhập email'}
                                   style={style.inputLogin}
                                   onChangeText={(event)=> this.changeTextName(event) }
                                />
                                {this.viewMessageEmail()}
                            </View>
                            <View style={style.boxInputLogin}>
                                <TextInput
                                   placeholder={'Nhập số điện thoại'}
                                   style={style.inputLogin}
                                   onChangeText={(event)=> this.changeTextPhoneNumber(event) }
                                />
                                {this.viewMessagePhoneNumber()}
                            </View>
                            <View style={style.boxInputLogin}>
                                <TextInput
                                   placeholder={'PassWord'} 
                                   style={style.inputLogin}
                                   secureTextEntry={true}
                                   onChangeText={(event)=> this.changeTextPass(event)}
                                />
                                {this.viewMessagePassword()}
                            </View>
                            <View style={style.boxInputLogin}>
                                <TextInput
                                   placeholder={'Nhập lại PassWord'} 
                                   style={style.inputLogin}
                                   secureTextEntry={true}
                                   onChangeText={(event)=> this.changeTextPassConfig(event)}
                                />
                                {this.viewMessagePasswordConfig()}
                                {this.viewMessageSubmit()}
                            </View>
                            <Button
                               title={'Đăng ký'}
                               onPress={()=> this.submitRegister()}
                            />
                        </View>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);