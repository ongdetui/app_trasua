import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, LogBox } from 'react-native';
import { connect } from 'react-redux';
import ActionAddCart from '../Container/listCart/ActionAddCart';

class Product extends Component {
    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }
    render() {
        const {navigation, category, product} = this.props;
        return (
            <View style={style.container}>
                <TouchableOpacity activeOpacity={0.5} onPress={()=> {
                    navigation.navigate('Settings',{
                        // category: category,
                        product: product,
                    });
                    this.props.addListSeen(product);
                }}>
                <View>
                    <View style={style.productItem}>
                        <Image source={{uri: `${product.bigImage}`}} style={style.bigImage} />
                    </View>
                    <View style={style.textGroup}>
                          <Text style={style.titleProduct}>{product.tenSanPham}</Text>
                          <View style={style.textFooter}>
                            <Text>{product.priceCurrent}đ</Text>
                            <TouchableOpacity onPress={() => {
                                // console.log(product);
                                ActionAddCart(product);
                                this.props.addListCart(product);
                                navigation.navigate('Giỏ hàng');
                            }}>
                                <Text style={{color:'#189eff'}}>Mua ngay</Text>
                            </TouchableOpacity>
                          </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        flex: 1, 
        flexDirection: 'column',
        width: '50%',
        marginBottom: 10,
    },
    bigImage: {
       width: '100%',
       height: "100%",
       borderRadius: 4
    },
    textGroup: {
        backgroundColor: '#fff',
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    productItem: {
        padding: 15,
        width: "100%",
        height: 200,
        backgroundColor: '#fff',
        marginTop: 10,
        paddingBottom: 4,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    titleProduct: {
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 5
    },
    textFooter: {
        justifyContent: 'space-between',
        flexDirection: 'row'
        
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addListSeen: (productSeen) => {
            dispatch({type: "ADD_LIST_SEEN",productSeen})
        },
        addListCart: (productAddCart) => {
            dispatch({type:'ADD_CART',productAddCart})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);