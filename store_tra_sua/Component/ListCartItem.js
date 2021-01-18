import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import style from '../assets/style/style';
import ActionChangeAmountCart from '../Container/amountCart/ActionChangeAmountCart';
import { connect } from 'react-redux';
import formatMoney from '../Container/listCart/formatMoney';

class ListCartItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amountCart: 1
        }
    }

    UNSAFE_componentWillMount(){
        //get amountCart from store listCart
        const amountCart = this.props.productItem.soLuong;
        if(amountCart){
            this.setState({
                amountCart: amountCart
            });
        }//end
    }

    // when user loss amount cart
    lossCart = () => {
        const amuontCart = this.state.amountCart;
        const amuontCartNew = amuontCart - 1
        if(amuontCartNew >= 1){
            this.setState({
                amountCart: amuontCartNew
            });
            ActionChangeAmountCart(this.props.productItem, amuontCartNew);
            this.props.setAmountCart(this.props.productItem, amuontCartNew);
        }
    }

    //when user click + cart
    plusCart = () => {
        const amuontCart = this.state.amountCart;
        const amuontCartNew = amuontCart + 1;
        // console.log(amuontCart);
        if(amuontCartNew <= 20){
            this.setState({
                amountCart: amuontCartNew
            });
            ActionChangeAmountCart(this.props.productItem, amuontCartNew);
            this.props.setAmountCart(this.props.productItem, amuontCartNew);
        }
    }

    //function view total product
    viewTotalProduct = () => {
        const {productItem} = this.props;
        const totalProduct = productItem.gia * this.state.amountCart;
        console.log(totalProduct.toLocaleString('vi'))
        return formatMoney(totalProduct);
    }

    

    render() {
        const {productItem} = this.props;
        console.log(this.state.amountCart)
        return (
            <View style={style.listCartItem}>
                <View style={style.listCartItemImage}>
                    <Image source={{uri: `${productItem.bigImage}`}} style={style.imageCart}/>
                </View>
                <View style={style.listCartItemContent}>
                    <Text style={style.listCartItemName}>{productItem.tenSanPham}</Text>
                    <View style={style.listCartItemPrice}>
                        <Text style={style.listCartItemPriceOld}>{productItem.priceOld}đ</Text>
                        <Text style={style.productSeenCurrent}>{productItem.priceCurrent}đ</Text>
                    </View>
                    <View style={style.listCartItemPrice}>
                        <View style={style.listCartItemNumber}>
                            <TouchableOpacity style={style.touchableNumberLoss} onPress={()=> this.lossCart()}>
                                <Text style={style.listCartItemNumberLoss}>{`<`}</Text>
                            </TouchableOpacity>
                            <Text >{this.state.amountCart}</Text>
                            <TouchableOpacity style={style.touchableNumberPlus} onPress={()=> this.plusCart()}>
                                <Text style={style.listCartItemNumberLoss}>{`>`}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={style.listCartItemTotal}>{this.viewTotalProduct()}đ</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAmountCart: (product, amount) => {
            dispatch({type: "AMOUNT_CART", product, amount})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCartItem)
