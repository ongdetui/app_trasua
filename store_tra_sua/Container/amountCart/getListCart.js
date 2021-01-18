import AsyncStorage from '@react-native-community/async-storage';

const getListCart = async (nameCart) => {
    const listCart = JSON.parse(await AsyncStorage.getItem(nameCart));
    console.log(listCart);
    return listCart;
}

export default getListCart;