import { useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const setStorageCart = async () => {
    const dispatch = useDispatch();
    // if(localStorage.getItem('listCart') == null){
    //     localStorage.setItem('listCart',JSON.stringify([]));
    // }
    // else {
    //     const listCartStorage = JSON.parse(localStorage.getItem('listCart'));
    //     dispatch({type: 'SET_LIST_CART', listCartStorage});
    // }
    try {
        const listCartStorage = JSON.parse(await AsyncStorage.getItem('listCart'));
        if(listCartStorage === null){
            await AsyncStorage.setItem('listCart',JSON.stringify([]));
        }
        else {
            dispatch({type: 'SET_LIST_CART', listCartStorage});
        }
    } catch (error) {
        console.log(error);
    }
}

export default setStorageCart;