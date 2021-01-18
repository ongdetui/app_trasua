import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import address from '../assets/address.png';
import notebook from '../assets/notebook.png';
import box from '../assets/box.png';
import money from '../assets/money.png';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import formatMoney from '../Container/listCart/formatMoney';
import getListCart from '../Container/amountCart/getListCart';
import { orderProduct } from '../Container/api/Axios';
import setCart from '../Container/listCart/setCart';

class PayMent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            date: new Date(),
            listCart: []
        }
    }

    UNSAFE_componentWillMount() {
        console.log(this.props.listCart)
        if(this.state.user === null || this.state.listCart.length === 0){
            this.setState({
                user: this.props.user,
                listCart: this.props.listCart
            });
        }
    }

    //tạo vòng đời liên tục
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    tick() {
        this.setState({
          date: new Date()
        });
    }

    //khi rời trang này thì kết thúc vòng đời
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.user !== nextProps.user){
            this.setState({
                user: nextProps.user
            });
            return true;
        }
        return false;
    }

    viewListCart = () => {
        return this.state.listCart.map((value, index)=> {
            if(value.soLuong){
                return (
                    <View style={styles.listProductItem} key={index}>
                        <Image source={{uri: `${value.bigImage}`}} style={styles.imageProduct} />
                        <View style={styles.inforProduct}>
                            <Text style={styles.nameProduct}>{value.tenSanPham}</Text>
                            <View style={styles.rowInforProduct}>
                                <Text style={styles.productPrice}>{value.priceCurrent}đ</Text>
                                <Text style={styles.productAmount}>x{value.soLuong}</Text>
                            </View>
                        </View>
                    </View>
                );
            }
            else {
                return (
                    <View style={styles.listProductItem} key={index}>
                        <Image source={{uri: `${value.bigImage}`}} style={styles.imageProduct} />
                        <View style={styles.inforProduct}>
                            <Text style={styles.nameProduct}>{value.tenSanPham}</Text>
                            <View style={styles.rowInforProduct}>
                                <Text style={styles.productPrice}>{value.priceCurrent}đ</Text>
                                <Text style={styles.productAmount}>x1</Text>
                            </View>
                        </View>
                    </View>
                );
            }
        })
    }

    //view total all product in listCart
    viewTotal = () => {
        const listCart = this.state.listCart;
        const totalCart = listCart.reduce((accumulator, currnetValue) => {
            if((currnetValue.soLuong)){
                return accumulator + (currnetValue.gia * currnetValue.soLuong);
            }
            return accumulator + currnetValue.gia;
        }, 0);
        return formatMoney(totalCart);
    }

    //when user buy product
    orderProduct = async () => {
        const {user} = this.props;
        const listCart = await getListCart('listCart');
        //nếu không có sản phẩm thì in ra thông báo
        if(listCart.length === 0){
            return Alert.alert(
                'Thông báo',
                'Vui lòng chọn sản phẩm muốn mua !',
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
            );
        }
        //set date buy product
        let date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const buyListCart = listCart.map((value) => {
            return {...value, time: time}
        });
        //nếu user đang có các đơn hàng cũ
        if(user.sanPhamMua){
            const newlistCart = buyListCart.concat(user.sanPhamMua);
            if(await orderProduct(newlistCart)){
                const userNew = {...user, sanPhamMua: newlistCart}
                this.props.setUser(userNew);
                return Alert.alert(
                    'Thông báo',
                    'Đặt hàng thành công, vào mục đơn hàng để biết thêm thông tin !',
                    [
                      {text: 'OK', onPress: ()=> {
                        setCart();
                        this.props.setListCart([]);
                        this.props.navigation.navigate('Home')}},
                    ],
                    { cancelable: false }
                );
            }
        }
        //nếu user đang không có đơn hàng nào
        else {
            if(await orderProduct(buyListCart)){
                const userNew = {...user, sanPhamMua: buyListCart}
                this.props.setUser(userNew);
                return Alert.alert(
                    'Thông báo',
                    'Đặt hàng thành công, vào mục đơn hàng để biết thêm thông tin !',
                    [
                      {text: 'OK', onPress: ()=> {
                          setCart();
                          this.props.setListCart([]);
                          this.props.navigation.navigate('Home')}},
                    ],
                    { cancelable: false }
                );
            }
        }
    }
    
    
    render() {
        return (
            <ScrollView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.groundAddress}>
                    <View>
                        <View style={styles.titleAddress}>
                            <Image source={address} style={styles.iconAddress} />
                            <Text style={styles.textAddress}>Địa chỉ nhận hàng</Text>
                        </View>
                        <View style={styles.inforUser}>
                            <Text style={styles.inforUserName}>{this.state.user.hoten}</Text>
                            <Text style={styles.inforUserPhone}>(+84) {this.state.user.phoneNumber}</Text>
                        </View>
                        <View style={styles.inforUser}>
                            <Text style={styles.inforUserName}>{this.state.user.diachi}</Text>
                        </View>
                        <View style={styles.inforUser}>
                            <Text style={styles.inforUserName}>{this.state.user.xa}, {this.state.user.huyen}, {this.state.user.tinh}</Text>
                        </View>
                    </View>
                     <View style={styles.editAddress}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=> this.props.navigation.navigate('Address')}>
                            <Image source={notebook} style={styles.iconEditAddress} />
                            <Text>Sửa</Text>
                        </TouchableOpacity>
                     </View>
                </View>
                <LinearGradient 
                    colors={['#6fa6d6','#f18d9b','#6fa6d6','#f18d9b','#6fa6d6','#f18d9b']}
                    style={styles.linearGradient}
                    start={{x: 0.0, y: 0.1}} end={{x: 1.5, y: 8.0}}
                />
                <View>
                    <View style={styles.titleListProduct}>
                        <Image source={box} style={styles.iconTitleListProduct} />
                        <Text style={styles.textListProduct}>Danh sách sản phẩm</Text>
                    </View>
                    <View style={styles.listProduct}>
                        {this.viewListCart()}
                    </View>
                    <View style={styles.totalProduct}>
                        <Text style={styles.totalProductTitle}>Tổng số tiền (2 sản phẩm):</Text>
                        <Text style={styles.totalPriceProduct}>{this.viewTotal()}đ</Text>
                    </View>
                </View>
                <View style={styles.method}>
                    <View style={styles.titleMethod}>
                        <Image source={money} style={styles.iconMethodProduct} />
                        <Text style={styles.textMethod}>Phương thức thanh toán</Text> 
                        <Picker
                            selectedValue={'Khi nhận hàng'}
                            style={styles.picker}
                        >
                            <Picker.Item label='Khi nhận hàng' value='Khi nhận hàng' />
                        </Picker>
                    </View>
                    <View style={styles.contentMethod}>
                        <View style={styles.contentMethodGround}>
                            <Text style={styles.contentMethodText}>Tổng tiền hàng</Text>
                            <Text style={styles.contentMethodText}>{this.viewTotal()}đ</Text>
                        </View>
                        <View style={styles.contentMethodGround}>
                            <Text style={styles.contentMethodText}>Tổng tiền phí vận chuyển</Text>
                            <Text style={styles.contentMethodText}>Free</Text>
                        </View>
                        <View style={styles.contentMethodGround}>
                            <Text style={styles.contentMethodTextPay}>Tổng thanh toán</Text>
                            <Text style={styles.contentMethodTextPrice}>{this.viewTotal()}đ</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.donePayProduct}>
                    <View style={styles.donePayProductTotal}>
                        <Text style={styles.donePayProductTotalText}>Tổng thanh toán</Text>
                        <Text style={styles.donePayProductTotalPrice}>{this.viewTotal()}đ</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonPay} onPress={()=> this.orderProduct()}>
                        <Text style={styles.buttonPayText}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        navigation: state.navigation,
        user: state.user,
        listCart: state.listCart
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => {
            dispatch({type: 'SET_USER', user})
        },
        setListCart: (listCartStorage) => {
            dispatch({type: 'SET_LIST_CART', listCartStorage})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayMent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EEEEEE'
    },
    groundAddress: {
        paddingHorizontal: 10,
        paddingTop: 8,
        backgroundColor: '#FFFFFF',
        marginTop: 2,
        flexDirection: 'row',
        paddingBottom: 12
    },
    titleAddress: {
        flexDirection: 'row'
    },
    iconAddress: {
        width: 20,
        height: 20
    },textAddress: {
        fontSize: 18,
        paddingLeft: 10,
        marginTop: -2,
        color: '#444444'
    },
    inforUser: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingTop: 0
    },
    inforUserName: {
        paddingRight: 10
    },
    inforUserPhone: {
        paddingLeft: 10,
        borderLeftColor: '#000000',
        borderLeftWidth: 1
    },
    editAddress: {
        justifyContent: 'center',
        
    },
    iconEditAddress: {
        width: 30,
        height: 30,
    },
    linearGradient: {
        width: '100%',
        height: 3.5
    },
    titleListProduct: {
        flexDirection: 'row',
        marginTop: 7,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingTop: 7,
        paddingBottom: 6
    },
    iconTitleListProduct: {
        width: 25,
        height: 25,
    },
    textListProduct: {
        fontSize: 16.4,
        paddingLeft: 10,
    },
    listProduct: {
        paddingHorizontal: 15,
    },
    listProductItem: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    imageProduct: {
        width: 70,
        height: 65,
        borderRadius: 3
    },
    inforProduct: {

    },
    nameProduct: {
        fontSize: 18,
        paddingLeft: 15,
        paddingBottom: 16,
    },
    rowInforProduct: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    productPrice: {
        paddingLeft: 15,
        fontSize: 15.5,
        color: '#444444'
    },
    productAmount: {
        fontSize: 17,
        paddingLeft: 200,
        color: '#555555'
    },
    totalProduct: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 14,
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    totalProductTitle: {
        fontSize: 16.5
    },
    totalPriceProduct: {
        fontSize: 16,
        color: '#189eff',
    },
    titleMethod: {
        flexDirection: 'row',
        marginTop: 7,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 14
    },
    iconMethodProduct: {
        width: 25,
        height: 25
    },
    textMethod: {
        fontSize: 16.6,
        paddingLeft: 10
    },
    picker: {
        width: '100%',
        marginTop: -13,
        marginLeft: 60
    },
    contentMethod: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingBottom: 14
    },
    contentMethodGround: {
        flexDirection: 'row',
        paddingHorizontal: 16.6,
        justifyContent: 'space-between',
    },
    contentMethodText: {
        color: '#555555'
    },
    contentMethodTextPay: {
        fontSize: 17
    },
    contentMethodTextPrice: {
        fontSize: 17,
        color: '#f16a2c'
    },
    donePayProduct: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonPay: {
        backgroundColor: '#ee4d2d',
        flex: 1,
        paddingHorizontal: 30
    },
    buttonPayText: {
        fontSize: 18,
        color: '#FFFFFF',
        paddingVertical: 12
    },
    donePayProductTotal: {
        marginLeft: 'auto',
        paddingRight: 10
    },
    donePayProductTotalText: {
        fontSize: 16,
        color: '#444444'
    },
    donePayProductTotalPrice: {
        fontSize: 17.5,
        marginLeft: 'auto',
        color: '#ee4d2d'
    }
})