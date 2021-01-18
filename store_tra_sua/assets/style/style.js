import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EEEEEE'
    },
    header: {
        borderBottomColor: '#c4c2c2',
        borderBottomWidth: 0.7,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF'
    },
    bigImage: {
        width: '100%',
        height: 400,
        marginTop: 4,
    },
    headerGroup: {
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 20,
        marginTop: 5
    },
    headerPrice: {
        flexDirection: 'row',
        marginTop: 10
    },
    priceOld: {
        fontSize: 18,
        color: "#909090",   
        textDecorationLine: 'line-through'
    },
    priceCurrent: {
        paddingLeft: 30,
        color: '#fd5f32',
        fontSize: 21,
        marginTop: -2
    },
    rating: {
        flexDirection: 'row',
        marginTop: 10
    },
    starRating: {
        width: 17,
        height: 17,
        marginLeft: 3
    },
    selled: {
        borderLeftWidth: 1,
        borderLeftColor: '#909090',
        paddingLeft: 10,
        marginLeft: 20,
        height: 16,
        marginTop: 10
    },
    sellNumber: {
        fontSize: 15,
        marginTop: -2
    },
    addCart: {  
        paddingBottom: 10
    },
    detailProduct: {
        backgroundColor: '#FFFFFF',
        marginTop: 12,
    },
    detail: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 8,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 0.6
    },
    detailText: {
        fontSize: 17,
        fontWeight: '500',
    },
    detailContent: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 0.6
    },
    detailColumn: {
        width: '50%'
    },
    detailColumnText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#909090',
    },
    detailColumn2: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%'
    },
    detailFooter: {
        paddingHorizontal: 17,
        paddingTop: 7,
        paddingBottom: 7,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 0.6
    },
    detailFooterText: {
        fontSize: 14,
        color: '#909090',
        lineHeight: 25
    },
    productsSeen: {
        flexDirection: 'row',
        paddingTop: 16,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 0.6,
        paddingBottom: 18
    },
    productSeen: {
        flexDirection: 'column',
        paddingHorizontal: 13,
    },
    productSeenImage: {
        width: 90,
        height: 100,
        borderRadius: 5
    },
    productSeenOld: {
        color: "#909090",   
        textDecorationLine: 'line-through'
    },
    productSeenCurrent: {
        color: '#fd5f32',
    },
    imageBackgroundCart: {

    },
    navHeaderCart: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    navHeaderCartImage: {
        width: '25%'
    },
    headerCartImage: {
        width: '100%',
        height: 90,
        borderRadius: 4
    },
    navHeaderCartTexts: {
        width: '75%'
    },
    navHeaderCartTitle: {
        fontSize: 18,
        color: '#ee4d2d',
        paddingLeft: 15,
        paddingBottom: 12,
        fontWeight: '500'
    },
    navHeaderCartText: {
        paddingLeft: 15,
        fontSize: 17,
        fontWeight: '500'
    },
    listCart: {
        // marginTop: 10,
        backgroundColor: '#FFFFFF',
    },
    listCartTitle: {
        borderBottomWidth: 0.8,
        borderBottomColor: '#CCCCCC',
        paddingHorizontal: 20,
        paddingBottom: 12,
        paddingTop: 12,
    },
    imageCart: {
        height: 95,
        width: '100%',
        borderRadius: 5,
        zIndex: 4,
    },
    listCartContent: {
        // marginTop: 5,
        backgroundColor: '#EEEEEE',
        paddingLeft: 10,
        // paddingTop: 8
    },
    swipeoutCart: {
        backgroundColor: '#EEEEEE',
        paddingTop: 8,
    },
    listCartItem: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        paddingTop: 8

    },
    listCartItemImage: {
        width: '25%'
    },
    listCartItemContent: {
        flexDirection: 'column',
        paddingLeft: 10
    },
    listCartItemName: {
        fontSize: 16,
        fontWeight: '500',
        paddingBottom: 13
    },
    listCartItemPrice: {
        flexDirection: 'row',
        paddingBottom: 13
    },
    listCartItemPriceOld: {
        color: "#909090",   
        textDecorationLine: 'line-through',
        paddingRight: 110,
        paddingLeft: 2
    },
    listCartItemNumber: {
        flexDirection: 'row',
        borderRadius: 3,
        borderWidth: 0.6,
        borderColor: '#777777',
        width: 80,
        height: 28,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        marginBottom: 0,
    },
    listCartItemTotal: {
        paddingLeft: 85,
        marginTop: 8,
        fontSize: 17,
        fontWeight: '500'
    },
    listCartItemNumberLoss: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    touchableNumberLoss: {
        alignItems: 'center',
        marginRight: 'auto',
        paddingHorizontal: 6,
        backgroundColor: '#63B8FF',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
    touchableNumberPlus: {
        marginLeft: 'auto',
        paddingHorizontal: 6,
        backgroundColor: '#63B8FF',
        alignItems: 'center',
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2
    },
    deleteItemCart: {
        position: 'absolute',
        top: 0,
        right: 2,
        backgroundColor: '#ee4d2d',
        height: '99%',
        width: 75,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        zIndex: 5
    },
    deleteItemCartText: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto'
    },
    navTotalListCart: {
        flexDirection: 'row',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonPayProductCart: {
        backgroundColor: '#ff0033',
        height: '100%',
        width: '30%',
        alignContent: 'center'
    },
    buttonPayProductCartText: {
        marginHorizontal: 22,
        marginVertical: 8,
        fontSize: 17,
        color: '#EEEEEE',
    },
    infoTotalCart: {
        paddingLeft: 30
    },
    infoTotalCartText: {
        fontSize: 16,
        color: '#444444',
    },
    imageLogin: {
       flex: 1,
       resizeMode: "cover",
       justifyContent: 'center',
       alignItems: 'center',
    },
    formRegister: {
        marginBottom: 60,
        alignItems: 'center'
    },
    boxInputLogin: {
        marginBottom: 15,
    },
    inputLogin: {
        width: 250,
        height: 45,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 15,
        color: '#FFFFFF',
    },
    inputMessage: {
        color: '#ee4d2d',
        marginTop: 8
    },
    textSelectorLogin: {
        color: '#FFFFFF',
        fontSize: 17,
        marginTop: 10,
        fontWeight: '600'
    },
    optionAuthen: {
        flexDirection: 'row',
        marginTop: 15
    },
    optionAuthenTextQuestion: {
        color: '#EEEEEE'
    },
    optionAuthenText: {
        fontSize: 15,
        color: '#FF6600',
        paddingLeft: 5
    },
    loginWith: {
        flexDirection: 'row',
        width: 210,
        height: 34, 
        backgroundColor: '#1988ff',
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    loginWithImageIcon: {
        width: 20,
        height: 20,
        
    },
    loginWithText: {
        color: '#FFFFFF',
        paddingLeft: 20
    },
    registerTitle: {
        fontSize: 22,
        color: '#ee4d2d',
        marginBottom: 40,
    },
    backgroundUser: {
        backgroundColor: '#DDDDDD'
    },
    headerUserInfo: {
        flexDirection: 'row',
        bottom: -80,
        paddingHorizontal: 25
    },
    linearGradient: {
        width: '100%',
        height: 160,
    },
    imageAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    headerUserTextName: {
        fontSize: 20,
        color: '#DDDDDD',
        // color: '#fd5f32',
        paddingLeft: 10,
        marginTop: 12
    },
    listOptionUser: {
        flexDirection: 'column',
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8
    },
    listOptionUserItem: {
        flexDirection: 'row',
        paddingTop: 13,
        paddingBottom: 10,
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: 0.5
    },
    listOptionUserIcon: {
        width: 28,
        height: 28,
        // borderRadius: 30,
    },
    listOptionUserText: {
        fontSize: 18,
        paddingLeft: 9
    }
  
})

export default style;