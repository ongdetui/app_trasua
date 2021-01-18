import AsyncStorage from '@react-native-community/async-storage';

//when user click delete cart then call function
const ActionRemoveCart = async (productItemRemove) => {
    const listCartStorage = JSON.parse(await AsyncStorage.getItem('listCart'));
    let listCartStorageNew = [];
    listCartStorage.forEach((value)=> {
        if(value._id !== productItemRemove._id){
            listCartStorageNew.push(value);
        }
    });
    await AsyncStorage.setItem('listCart',JSON.stringify(listCartStorageNew));
}

export default ActionRemoveCart;