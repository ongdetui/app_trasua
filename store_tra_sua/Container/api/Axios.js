import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


//get data product
export const getData = (collection) => {
  return axios.post(`http://192.168.1.67:3000/product`,{collection}).then((response)=> response.data).catch(error => error);
  // return axios.post(`https://backend-native.herokuapp.com/product`,{collection}).then((response)=> response.data).catch(error => error);
}

//Login
export const loginUser = (userName, passWord) => {
    return axios.post('http://192.168.1.67:3000/login', {userName, passWord}).then((response) => response.data);
}

// Sign up 
export const register = (email, phoneNumber, password) => {
    return axios.post('http://192.168.1.67:3000/register',{email, phoneNumber, password}).then((response) => response.data);
}

//logout user
export const logOutUser = () => {
    return axios.post('http://192.168.1.67:3000/logout',{}).then((response)=> response.data)
}

//update address
export const updateAddress = async (address) => {
    const idToken = JSON.parse(await AsyncStorage.getItem('idToken'));
    return axios.post('http://192.168.1.67:3000/update_address',{address, idToken}).then((response) => response.data)
}

//user order
export const orderProduct = async (listCart) => {
    const idToken = JSON.parse(await AsyncStorage.getItem('idToken'));
    return axios.post('http://192.168.1.67:3000/order_product',{listCart, idToken}).then((response)=> response.data);
}

//reset Token
export const resetToken = async () => {
    const idToken = JSON.parse(await AsyncStorage.getItem('idToken'));
    return axios.post('http://192.168.1.67:3000/reset_token',{idToken}).then((response)=> response.data);
}

//authentoken
export const checkAuthen = async () => {
    const idToken = JSON.parse(await AsyncStorage.getItem('idToken'));
    return axios.post('http://192.168.1.67:3000/authentoken',{idToken}).then((response)=> response.data);
}

//login Google
export const loginGoogle = (idToken) => {
    return axios.post('http://192.168.1.67:3000/login_google', {idToken}).then((response)=> response.data);
}

//delete user
export const deleteUser = async (email) => {
    const idToken = JSON.parse(await AsyncStorage.getItem('idToken'));
    return axios.post('http://192.168.1.67:3000/delete_user', {email, idToken}).then((response)=> response.data);
}