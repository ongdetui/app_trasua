import girl1 from '../assets/girl1.jpg';
import money2 from '../assets/money2.png';
import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import formatMoney from '../Container/listCart/formatMoney';
import {orderProduct} from '../Container/api/Axios';
import { connect } from 'react-redux';

class ProductOrder extends Component {

    viewTotal = () => {
        const {product} = this.props;
        const amount = product.soLuong ? product.soLuong : 1;
        return formatMoney(product.gia * amount);
    }

    //when user cancel order
    cancelProduct = () => {
        const {id, user} = this.props;
        const newSanPham = [];
        user.sanPhamMua.forEach((value, index)=> {
            if(index !== id){
                newSanPham.push(value);
            }
        });
        console.log(newSanPham);
        const updateUser = {...user, sanPhamMua: newSanPham};
        console.log(updateUser);
        return Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn hủy đơn hàng này ?',
            [
              {text: 'OK', onPress: async ()=> {
                    if(await orderProduct(newSanPham)){
                        this.props.setUser(updateUser);
                    }
              }},
            ],
            { cancelable: false }
        );
    }


    render() {
        const {product} = this.props;
        return (
            <View style={styles.productOrder}>
            <View style={styles.productOrderContent}>
                <Image source={{uri: `${product.bigImage}`}} style={styles.imageProduct} />
                <View style={{paddingLeft: 12, width: '81%'}}>
                    <Text style={styles.productOrderName}>{product.tenSanPham}</Text>
                    <Text style={styles.productOrderAmount}>x{product.soLuong ? product.soLuong : 1}</Text>
                    <View style={styles.rowPrice}>
                        <Text style={styles.productOrderPriceOld}>{product.priceOld}đ</Text>
                        <Text style={styles.productOrderPriceCurrent}>{product.priceCurrent}đ</Text>
                    </View>
                </View>
            </View>
            <View style={styles.productOrderTimePrice}>
                <Text style={styles.productOrderTimePriceAmount}>{product.soLuong ? product.soLuong : 1} sản phẩm</Text>
                <View style={styles.productOrderPrice}>
                    <Image source={money2} style={styles.iconPriceProduct} />
                    <Text style={styles.productOrderPriceTitleText}>Thành tiền:</Text>
                    <Text style={styles.productOrderPriceText}>{this.viewTotal()}đ</Text>
                </View>
            </View>
            <View style={styles.productStatus}>
                <Text style={styles.productStatusText}>Ngày mua: {product.time}</Text>
                <Text style={styles.productStatusText}>Trạng thái: Đang xử lý</Text>
            </View>
            <View style={{padding: 8}}>
                <TouchableOpacity activeOpacity={0.6} style={styles.cancelProduct} onPress={()=> this.cancelProduct()}>
                    <Text style={styles.cancelProductText}>Hủy đơn</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => {
            dispatch({type: 'SET_USER', user})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder);


const styles = StyleSheet.create({
    productOrder: {
        backgroundColor: '#FFFFFF',
        marginTop: 8
    },
    productOrderContent: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    imageProduct: {
        width: 70,
        height: 70,
        borderRadius: 4
    },
    productOrderAmount: {
        marginLeft: 'auto',
        fontSize: 15,
        color: '#555555'
    },
    productOrderName: {
        fontSize: 18,
    },
    rowPrice: {
        flexDirection: 'row',
        marginLeft: 'auto',
        paddingTop: 5
    },
    productOrderPriceOld: {
        paddingRight: 30,
        textDecorationLine: 'line-through',
        color: '#444444',
    },
    productOrderPriceCurrent: {
        fontSize: 16,
        color:'#fd5f32'
    },
    productOrderTimePrice: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
        paddingTop: 9,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
    },
    productOrderPrice: {
        flexDirection: 'row'
    },
    productOrderTimePriceAmount: {
        color: '#777777'
    },
    iconPriceProduct: {
        width: 25,
        height: 25,
        marginTop: 3
    },
    productOrderPriceTitleText: {
        fontSize: 16,
        paddingHorizontal: 8
    },
    productOrderPriceText: {
        fontSize: 16,
        color:'#fd5f32'
    },
    productStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 9,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
    },
    productStatusText: {
        fontSize: 15,
        color: '#333333'
    },
    cancelProduct: {
        backgroundColor: '#ee4d2d',
        width: 95,
        height: 38,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    cancelProductText: {
        color: '#FFFFFF',
        fontSize: 15.2
    }
})