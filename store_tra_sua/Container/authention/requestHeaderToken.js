import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {checkAuthen} from '../api/Axios';
// const checkAuthen = () => {
//     return axios.post('http://192.168.1.66:3000/authentoken',{}).then((response)=> response.data);
// }

const requestHeaderToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('idToken'));
    if(token){
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        return await checkAuthen();
    }
}

export default requestHeaderToken;