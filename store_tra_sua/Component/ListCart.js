import React, { Component } from 'react'
import {View, Text, Image, ImageBackground, TouchableOpacity, LogBox} from 'react-native';
import girl1 from '../assets/logomilktea.jpg';
import style from '../assets/style/style';
import { ScrollView } from 'react-native-gesture-handler';
import backgroundTet from '../assets/background-tet.jpg';
// import Swipeout from 'react-native-swipeout';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import ListCartItem from './ListCartItem';
import ActionRemoveCart from '../Container/listCart/ActionRemoveCart';
import formatMoney from '../Container/listCart/formatMoney';

const swipeoutBtns = [
  {
    text: 'Delete',
  },
]

class ListCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCart: [],  //list Cart
            date: new Date()
        }
    }

    UNSAFE_componentWillMount() {
        if(this.props.listCart.length !== 0){
            this.setState({
                listCart: this.props.listCart
            })
        }
    }

    //tạo vòng đời liên tục
    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
    
    //when props listCart change then update state listCart
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.listCart !== this.state.listCart){
            console.log(nextProps.listCart);
            this.setState({
                listCart: nextProps.listCart
            })
            return true;
        }
        return true;
    }
    
    //when user click delete item cart
    deleteCartItem = (productRemove) => {
        console.log(productRemove)
        ActionRemoveCart(productRemove); //thay đổi data listCart trong async Storage
        this.props.removeItemCart(productRemove);  //thay đổi listCart trong store
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

    //when user click pay product
    clickPayProduct = () => {
        if(JSON.stringify(this.props.user) === '{}'){
            return this.props.navigation.navigate('Login');
        }
        else{
            //if user is not diachi then navigation Address
            if(!this.props.user.diachi){
                return this.props.navigation.navigate('Address');
            }
            return this.props.navigation.navigate('Thanh toán');
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={style.container}>
                    <ImageBackground source={backgroundTet} style={style.imageBackgroundCart}>
                        <View style={style.navHeaderCart}>
                            <View style={style.navHeaderCartImage}>
                                <Image source={girl1} style={style.headerCartImage}/>
                            </View>
                            <View style={style.navHeaderCartTexts}>
                                <View>
                                    <Text style={style.navHeaderCartTitle}>Cửa hàng trà sữa Gấu</Text>
                                </View>
                                <View>
                                    <Text style={style.navHeaderCartText}>Tưng bừng đón tết giảm giá hot. Cơ hội trúng thưởng Iphone 12</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={style.listCart}>
                        <View style={style.listCartTitle}>
                            <Text style={style.detailText}>Giỏ hàng của bạn</Text>
                        </View>
                        <View style={style.listCartContent}>


                            {/* <TouchableOpacity onPress={()=> this.deleteCartItem()}>
                            <View style={style.listCartItem}>
                                <View style={style.listCartItemImage}>
                                    <Image source={girl1} style={style.imageCart} onClick={()=> this.deleteCartItem()}/>
                                </View>
                                <View style={style.listCartItemContent}>
                                    <Text style={style.listCartItemName}>ầdasdfsda</Text>
                                    <View style={style.listCartItemPrice}>
                                        <Text style={style.listCartItemPriceOld}>23432đ</Text>
                                        <Text style={style.productSeenCurrent}>ư23423đ</Text>
                                    </View>
                                    <View style={style.listCartItemPrice}>
                                        <View style={style.listCartItemNumber}>
                                            <Text style={style.listCartItemNumberLoss}>-</Text>
                                            <Text>1</Text>
                                            <Text style={style.listCartItemNumberLoss}>+</Text>
                                        </View>
                                        <Text style={style.listCartItemTotal}>20.000đ</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity> */}

                            <SwipeListView
                                data={this.state.listCart}
                                renderItem={ ({item}, rowMap) => <ListCartItem productItem= {item}/>}
                                renderHiddenItem={ ({item}, rowMap) => (
                                    <TouchableOpacity activeOpacity={0.5} style={style.deleteItemCart} onPress={()=> this.deleteCartItem(item)}>
                                        <View style={style.deleteItemCart}>
                                            <Text style={style.deleteItemCartText}>Delete</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item._id}
                                rightOpenValue={-75}
                            />

                        </View>
                    </View>
                    
                </View>
                <View style={style.navTotalListCart}>
                    <View style={style.infoTotalCart}>
                        <Text style={style.infoTotalCartText}>Tổng tiền: {this.viewTotal()}đ</Text>
                    </View>
                    <TouchableOpacity style={style.buttonPayProductCart} onPress={()=> this.clickPayProduct()}>
                        <View>
                            <Text style={style.buttonPayProductCartText}>Mua hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        listCart: state.listCart,  //listCart []
        navigation: state.navigation, //navigation điều hướng
        user: state.user, //info user {}
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeItemCart: (productRemoveCart) => {
            dispatch({type: 'DELETE_CART',productRemoveCart})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);