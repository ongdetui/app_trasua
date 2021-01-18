import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Button, Alert} from 'react-native';
import star from '../assets/star.png';
import style from '../assets/style/style';
import { useSelector, useDispatch} from 'react-redux';
import ActionAddCart from '../Container/listCart/ActionAddCart';

function Setting({ route, navigation }) {
    const dispatch = useDispatch();
    const {product, category} = route.params;
    useEffect(() => {
        navigation.setOptions({ title: route.params.product.tenSanPham })
    });

    console.log(route.params.product);

    //view list product seen of user
    const viewListSeen = () => {
        const listSeen = useSelector(state => state.listSeen);
        return listSeen.map((value, index)=>{
            if(value._id !== product._id){
                return (
                    <TouchableOpacity key={index} activeOpacity={0.5} onPress={()=> {
                        navigation.navigate('Settings',{
                            // category: category,
                            product: value,
                        });
                    }}>
                        <View style={style.productSeen}>
                            <Image source={{uri: `${value.bigImage}`}} style={style.productSeenImage}/>
                            <Text>{tenSanPham(value.tenSanPham)}</Text>
                            <View>
                                <Text style={style.productSeenOld}>{value.priceOld}đ</Text>
                                <Text style={style.productSeenCurrent}>{value.priceCurrent}đ</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }
        });
    }

    //nếu text thành phần quá dài thì cắt bớt
    const thanhPhan = () => {
        if(product.thanhPhan.length > 20){
            return `${product.thanhPhan.slice(0,20)}...`;
        }
        return product.thanhPhan;
    }
    //nếu text tên sản phẩm quá dài thì cắt bớt
    const tenSanPham = (text) => {
        if(text.length > 13){
            return `${text.slice(0,13)}...`;
        }
        return text;
    }
    //in ra số sao đánh giá của sản phẩm
    const rating = () => {
        var listStar = [];
        const ratingLength = product.rating - 1;
        for(let i= 0; i < ratingLength; i++){
            listStar.push(i);
        }
        return listStar.map((value)=>{
            return (
                <Image key={value} source={star} style={style.starRating}/>
            );
        });
    }
    return (
        <ScrollView>
            <View style={style.container}>
                <View style={style.header}>
                    <Image source={{uri: `${product.bigImage}`}} style={style.bigImage} />
                    <View style={style.headerGroup}>
                        <View>
                            <Text style={style.headerTitle}>{product.tenSanPham}</Text>
                        </View>
                        <View style={style.headerPrice}>
                            <Text style={style.priceOld}>{product.priceOld}đ</Text>
                            <Text style={style.priceCurrent}>{product.priceCurrent}đ</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={style.rating}>
                                {rating()}
                            </View>
                            <View style={style.selled}>
                                <Text style={style.sellNumber}>Đã bán {product.sell}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={style.addCart}>
                        <Button title="Thêm vào giỏ hàng" onPress={()=> {
                            const productAddCart = product;
                            ActionAddCart(product);
                            dispatch({type: 'ADD_CART', productAddCart});
                            return Alert.alert(
                                'Thông báo',
                                'Đã thêm sản phẩm vào giỏ hàng !',
                                [
                                  {text: 'OK'},
                                ],
                                { cancelable: false }
                            );
                        }} />
                    </View>
                    <Button title="Mua ngay" color="#ee4d2d" marginTop="10" onPress={() => {
                        const productAddCart = product;
                        ActionAddCart(product);
                        dispatch({type: 'ADD_CART', productAddCart});
                        navigation.navigate('Giỏ hàng')
                    }} />
                </View>
                <View style={style.detailProduct}>
                    <View style={style.detail}>
                        <Text style={style.detailText}>Chi tiết sản phẩm</Text>
                    </View>
                    <View style={style.detailContent}>
                        <View style={style.detailColumn}>
                            <Text style={style.detailColumnText}>Thương hiệu</Text>
                            <Text style={style.detailColumnText}>Thành phần</Text>
                            <Text style={style.detailColumnText}>Xuất xứ</Text>
                            <Text style={style.detailColumnText}>Hạn sử dụng</Text>
                        </View>
                        <View style={style.detailColumn}>
                            <Text style={style.detailColumn2}>{product.brand}</Text>
                            <Text style={style.detailColumn2}>{thanhPhan()}</Text>
                            <Text style={style.detailColumn2}>{product.origin}</Text>
                            <Text style={style.detailColumn2}>Không quá 24h</Text>
                        </View>
                    </View>
                    <View style={style.detailFooter}>
                        <Text style={style.detailFooterText}>Thời gian giao hàng dự kiến cho sản phẩm này từ 15p-2h. Cam kết trả hàng nếu có vấn đề hư hỏng</Text>
                    </View>
                </View>
                <View style={style.detailProduct}>
                    <View style={style.detail}>
                        <Text style={style.detailText}>Sản phẩm đã xem</Text>
                    </View>
                    <View style={style.productsSeen}>
                        {viewListSeen()}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Setting;
