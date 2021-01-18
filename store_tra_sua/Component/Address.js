import React, { Component } from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import imageAddress from '../assets/image-login.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updateAddress } from '../Container/api/Axios';
import { connect } from 'react-redux';

class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tinh: 'Thanh Hóa',
            huyen: 'Huyện Yên Định',
            xa: 'Xã Định Thành',
            diachi: '',
            hoten: ''
        }
    }
    
    viewXa = () => {
        if(this.state.huyen === 'Huyện Yên Định'){
            return (
                <View style={styles.formPicker}>
                    <Picker
                        selectedValue={this.state.xa}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            this.setState({
                                xa: itemValue
                            })
                        }}
                    >
                        <Picker.Item label='Quán Lào' value='Quán Lào' />
                        <Picker.Item label='Xã Định Bình' value='Xã Định Bình' />
                        <Picker.Item label='Xã Định Công' value='Xã Định Công' />
                        <Picker.Item label='Xã Định Hải' value='Xã Định Hải' />
                        <Picker.Item label='Xã Định Hòa' value='Xã Định Hòa' />
                        <Picker.Item label='Xã Định Hưng' value='Xã Định Hưng' />
                        <Picker.Item label='Xã Định Long' value='Xã Định Long' />
                        <Picker.Item label='Xã Định Tăng' value='Xã Định Tăng' />
                        <Picker.Item label='Xã Định Thành' value='Xã Định Thành' />
                        <Picker.Item label='Xã Định Tiến' value='Xã Định Tiến' />
                        <Picker.Item label='Xã Yên Ninh' value='Xã Yên Ninh' />
                        <Picker.Item label='Xã Yên Lạc' value='Xã Yên Lạc' />
                        <Picker.Item label='Xã Yên Phong' value='Xã Yên Phong' />
                    </Picker>
                </View>
            )
        }
        return (
            <View style={styles.formPicker}>
                <Picker
                    selectedValue={this.state.xa}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        this.setState({
                            xa: itemValue
                        })
                    }}
                >
                    <Picker.Item label='Xã Thiệu Chính' value='Xã Thiệu Chính ' />
                    <Picker.Item label='Xã Thiệu Công' value='Xã Thiệu Công' />
                    <Picker.Item label='Xã Thiệu Duy' value='Xã Thiệu Duy' />
                    <Picker.Item label='Xã Thiệu Giang' value='Xã Thiệu Giang' />
                    <Picker.Item label='Xã Thiệu Giao' value='Xã Thiệu Giao' />
                    <Picker.Item label='Xã Thiệu Hòa' value='Xã Thiệu Hòa' />
                    <Picker.Item label='Xã Thiệu Hợp' value='Xã Thiệu Hợp' />
                    <Picker.Item label='Xã Thiệu Long' value='Xã Thiệu Long' />
                    <Picker.Item label='Xã Thiệu Lý' value='Xã Thiệu Lý' />
                    <Picker.Item label='Xã Thiệu Ngọc' value='Xã Thiệu Ngọc' />
                    <Picker.Item label='Xã Thiệu Nguyên' value='Xã Thiệu Nguyên' />
                    <Picker.Item label='Xã Thiệu Phúc' value='Xã Thiệu Phúc' />
                </Picker>
            </View>
        )
    }

    //when user change input Text
    changeInputAddress = (text) => {
        if(text.length > 0 || text.length === 0){
            this.setState({
                diachi: text
            })
        }
    }

    //when user change input Name
    changeInputName = (text) => {
        if(text.length > 4 || text.length === 0){
            this.setState({
                hoten: text
            })
        }
        
    }

    //when user click xác nhận
    update = () => {
        const {user} = this.props;
        const {tinh, huyen, xa, diachi, hoten} = this.state;
        const userNew = {...user, tinh: tinh, huyen: huyen, xa: xa, diachi: diachi, hoten: hoten};
        console.log(diachi);
        if(diachi.length > 0 && hoten.length > 0){
            updateAddress(this.state).then((res)=> {
                console.log(res)
                if(res){
                    this.props.setUser(userNew);
                    this.props.navigation.navigate('Thanh toán') //test
                    return;
                }
            })
        }
        else {
            return Alert.alert(
                'Thông báo',
                'Vui lòng nhập đúng thông tin !',
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
            );
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={imageAddress} style={styles.imageAddress} >
                    <Text style={styles.title}>Thông tin giao hàng</Text>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.formPicker}>
                            <Picker
                                selectedValue={this.state.tinh}
                                style={styles.picker}
                            >
                                <Picker.Item label='Thanh Hóa' value='Thanh Hóa' />
                            </Picker>
                        </View>
                        <View style={styles.formPicker}>
                            <Picker
                                selectedValue={this.state.huyen}
                                style={styles.picker}
                                onValueChange={(itemValue) => {
                                    if(itemValue === 'Huyện Yên Định'){
                                        this.setState({
                                            huyen: itemValue,
                                            xa: 'Xã Định Thành'
                                        })
                                    }
                                    else {
                                        this.setState({
                                            huyen: itemValue,
                                            xa: 'Xã Thiệu Hóa'
                                        })
                                    }
                                    
                                }}
                            >
                                <Picker.Item label='Huyện Yên Định' value='Huyện Yên Định' />
                                <Picker.Item label='Huyện Thiệu Hóa' value='Huyện Thiệu Hóa' />
                            </Picker>
                        </View>
                        {this.viewXa()}
                        <TextInput
                            placeholder={'Nhập Địa chỉ'}
                            placeholderTextColor={'#CCCCCC'}
                            style={styles.textInput}
                            onChangeText={(text) => this.changeInputAddress(text)}
                        />
                        <TextInput
                            placeholder={'Nhập họ và tên'}
                            placeholderTextColor={'#CCCCCC'}
                            style={styles.textInput}
                            onChangeText={(text)=> this.changeInputName(text)}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={()=> this.update()}>
                            <View style={styles.buttonForm}>
                                <Text style={styles.textButton}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        navigation: state.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => {
            dispatch({type: 'SET_USER', user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EEEEEE'
    },
    title: {
        fontSize: 20,
        marginBottom: 30
    },
    imageAddress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 7,
        width: 260,
        paddingHorizontal: 20,
        color: '#FFFFFF',
        marginBottom: 25
    },
    formPicker: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 7,
        width: 260,
        marginBottom: 25,
        paddingHorizontal: 8,
    },
    picker: {
        color: '#FFFFFF',
        width: '100%',
    },
    buttonForm: {
        backgroundColor: '#189eff',
        width: 160,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 5
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 16
    }
});
