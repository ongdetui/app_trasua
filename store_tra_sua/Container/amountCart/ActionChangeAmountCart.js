import AsyncStorage from '@react-native-community/async-storage';

//action change amount cart in listCart AsyncStorage
const ActionChangeAmountCart = async (product, amount) => {
    const listCartStorage = JSON.parse(await AsyncStorage.getItem('listCart'));
    const listCartStorageNew = listCartStorage.map((value) => {
        if(value._id === product._id){
            return {...value, soLuong: amount};
        }
        else {
            return value;
        }
    })
    // console.log(listCartStorageNew);
    AsyncStorage.setItem('listCart',JSON.stringify(listCartStorageNew));
}

export default ActionChangeAmountCart;