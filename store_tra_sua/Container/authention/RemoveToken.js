import AsyncStorage from '@react-native-community/async-storage';

const RemoveToken = async (key) => {
    const token = JSON.parse(await AsyncStorage.getItem(key));
    if(token){
        await AsyncStorage.removeItem(key);
        return ;
    }
}

export default RemoveToken;