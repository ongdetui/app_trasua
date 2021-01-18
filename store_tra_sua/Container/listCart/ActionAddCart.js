import { useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

// const ActionAddCart = (productItem) => {
//     const listCartStorage = JSON.parse(localStorage.getItem('listCart'));
//     const isSlack = listCartStorage.every((value)=> {
//         return value._id !== productItem._id;
//     })
//     if(isSlack){
//         listCartStorage.push(productItem);
//         localStorage.setItem('listCart',JSON.stringify(listCartStorage));
//     }
// }

const ActionAddCart = async (productItem) => {
    try {
        const listCartStorage = JSON.parse(await AsyncStorage.getItem('listCart'));
        const isSlack = listCartStorage.every((value)=> {
            return value._id !== productItem._id;
        });
        if(isSlack){
            listCartStorage.push(productItem);
            await AsyncStorage.setItem('listCart',JSON.stringify(listCartStorage));
        }
    } catch (error) {
        console.log(error);
    }
}

export default ActionAddCart;