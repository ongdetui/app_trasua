

const nodeInitialState = {
    navigation: null,
    listSeen: [],   //list sản phẩm đã xem
    listCart: [],   //list product in cart
    user: {},       //info user
};
const allReducer = (state = nodeInitialState, action) => {
    switch (action.type) {
        case "SET_NAVIGATION":
            // console.log(action.navigation)
            return {...state, navigation: action.navigation};
        //add những sp người dùng đã xem
        case "ADD_LIST_SEEN":
            console.log(action.productSeen);
            const isSlackListSeen = state.listSeen.every((value)=>{
                return value._id !== action.productSeen._id;
            });
            if(isSlackListSeen){
                state.listSeen.push(action.productSeen);
            }
            console.log(state.listSeen);
            return state;
        //get data listCart from localStorage set for state listCart
        case "SET_LIST_CART":
            return {...state, listCart: action.listCartStorage};
        //add cart
        case "ADD_CART": 
            // console.log(action.productAddCart);
            const isSlackListCart = state.listCart.every((value)=> {
                return value._id !== action.productAddCart._id;
            })
            if(isSlackListCart){    
                state.listCart.push(action.productAddCart);
            }
            return {...state};
        //when user click delete then action case 
        case "DELETE_CART":
            console.log(action.productRemoveCart);
            let listCartStorageNew = [];
            state.listCart.forEach((value)=> {
                if(value._id !== action.productRemoveCart._id){
                    listCartStorageNew.push(value);
                }
            });
            return {...state, listCart: listCartStorageNew};
        //update amount cart in listCart
        case "AMOUNT_CART":
            const {product, amount} = action;
            const amountListCartNew = state.listCart.map((value)=> {
                if(value._id === product._id){
                    return {...value, soLuong: amount};
                }
                else {
                    return value;
                }
            });
            // console.log(amountListCartNew);
            return {...state, listCart: amountListCartNew};
        case "SET_USER": 
            console.log(action.user);
            return {...state, user: action.user};
        default:
            return state;
    }
}

export default allReducer;