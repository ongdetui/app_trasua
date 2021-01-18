import { useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


const setCart = async () => {
    await AsyncStorage.setItem('listCart',JSON.stringify([]));
}

export default setCart;