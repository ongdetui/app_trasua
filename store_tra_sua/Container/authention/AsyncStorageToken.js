import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const AsyncStorageToken = async (idToken) => {
    // console.log(idToken);
    try {
        await AsyncStorage.setItem('idToken',JSON.stringify(idToken));   
    } catch (error) {
        console.log(error)
    }
    return axios.interceptors.request.use((config) => {
        // console.log(idToken);
        config.headers.Authorization = `Bearer ${idToken}`;
        return config;
    });
}

export default AsyncStorageToken;