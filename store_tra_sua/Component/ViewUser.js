import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import style from '../assets/style/style';
import anhbia from '../assets/anhbia.jpg';
import user from '../assets/user.png';
import LinearGradient from 'react-native-linear-gradient';
import address from '../assets/address.png';
import logout from '../assets/logout.png';
import settings from '../assets/settings.png';
import delete_User from '../assets/delete-user.png';
import information from '../assets/information.png';
import truck from '../assets/truck.png';
import shoppingCart from '../assets/shopping-cart.png';
import raiseHand from '../assets/raise-hand.png';
import { logOutUser, deleteUser } from '../Container/api/Axios';
import RemoveToken from '../Container/authention/RemoveToken';
import { connect } from 'react-redux';


class ViewUser extends Component {

    logOut = () => {
        return Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn đăng xuất ?',
            [
              {text: 'OK', onPress: () =>{
                  logOutUser().then((res)=> {
                    console.log(res);
                    if(res){
                        const user = {};
                        this.props.setLogOut(user);
                        RemoveToken('idToken');
                    }
                  })
              } },
              {text: 'Cancel'}
            ],
            { cancelable: false }
        );
    }

    removeUser = () => {
        const user = this.props.user;
        return Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn xóa tài khoản này ? Hãy chăc rằng bạn chưa đặt mua sản phẩm nào !',
            [
              {text: 'OK', onPress: () => {
                if(user.sanPhamMua){
                    if(user.sanPhamMua.length === 0){
                        deleteUser(user.email).then((res)=> {
                            if(res) {
                                const user = {};
                                this.props.setLogOut(user);
                                RemoveToken('idToken');
                            }
                            else {
                                return Alert.alert(
                                    'Thông báo',
                                    'Xóa thất bại, có lỗi xãy ra !',
                                    [
                                      {text: 'OK'},
                                    ],
                                    { cancelable: false }
                                );
                            }
                            
                        })
                    }
                    else {
                        return Alert.alert(
                            'Thông báo',
                            'Bạn đang có đơn hàng ! không thể xóa tài khoản',
                            [
                              {text: 'OK'},
                            ],
                            { cancelable: false }
                        );
                    }
                    
                }
                else {
                    return Alert.alert(
                        'Thông báo',
                        'Bạn đang có đơn hàng ! không thể xóa tài khoản',
                        [
                          {text: 'OK'},
                        ],
                        { cancelable: false }
                    );
                }
              } },
              {text: 'Cancel'}
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
            <View style={style.backgroundUser}>
                <ImageBackground source={anhbia}  style={style.linearGradient}>
                    <View style={style.headerUserInfo}>
                        {this.props.user.picture ? <Image source={{uri: `${this.props.user.picture}`}} style={style.imageAvatar} /> : <Image source={user} style={style.imageAvatar} />}
                        {/* <Image source={girl1} style={style.imageAvatar} /> */}
                        <Text style={style.headerUserTextName}>{this.props.user.email}</Text>
                    </View>
                </ImageBackground>
                <View style={style.listOptionUser}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=> this.props.navigation.navigate('Đơn hàng')}> 
                        <View style={style.listOptionUserItem}>
                            <Image source={truck} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Đơn hàng của bạn</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=> this.props.navigation.navigate('Address')}>
                        <View style={style.listOptionUserItem}>
                            <Image source={address} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Chỉnh sửa địa chỉ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=> this.props.navigation.navigate('Giỏ hàng')}>
                        <View style={style.listOptionUserItem}>
                            <Image source={shoppingCart} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Giỏ hàng</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={style.listOptionUserItem}>
                            <Image source={information} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Trung tâm trợ giúp</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <View style={style.listOptionUserItem}>
                            <Image source={raiseHand} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Đánh giá cửa hàng</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity activeOpacity={0.6} onPress={()=> this.removeUser()}>
                        <View style={style.listOptionUserItem}>
                            <Image source={delete_User} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Xóa tài khoản</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={style.listOptionUserItem}>
                            <Image source={settings} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Setting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> this.logOut()}>
                        <View style={style.listOptionUserItem}>
                            <Image source={logout} style={style.listOptionUserIcon} />
                            <Text style={style.listOptionUserText}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        setLogOut: (user) => {
            dispatch({type: 'SET_USER', user})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);