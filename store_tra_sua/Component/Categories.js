
import React, { useState, useEffect  } from 'react'
import {ScrollView , StyleSheet } from 'react-native';
import CategoryListItem from './CategoryListItem';
import milkTea from '../assets/milk-tea.png';
import hotDrinks from '../assets/hot-drinks.png';
import snacks from '../assets/snacks.png';
import fastFood from '../assets/fast-food.png';
import lemonTea from '../assets/ice-tea.png';
import setStorageCart from '../Container/listCart/setStorageCart';
import { useSelector, useDispatch} from 'react-redux';
import requestHeaderToken from '../Container/authention/requestHeaderToken';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    top: 25,
    paddingLeft:16,
    paddingRight: 16,
    position: "relative"
  },
  scrollView: {
    paddingRight:16, 
    paddingLeft:16, 
    top: 0,
  }
});



function Categories ({ navigation }) {
  const dispatch = useDispatch();
  requestHeaderToken().then((user) => {
    dispatch({type:"SET_USER", user}); 
  });
  dispatch({type:"SET_NAVIGATION", navigation}); 
  setStorageCart();
  const [product, setProduct] = useState([]);
  // useEffect(() => {
  //   const getDataProduct = async () => {
  //     const result = await getData();
  //     console.log(result);
  //     setProduct(result);
  //   }
  //   getDataProduct();
  // },[]);
  const [category, setCategory] = useState([
    {id: 1, name: 'Trà Sữa - Milk Tea', icon: milkTea, linkApi: 'trasua'},
    {id: 2, name: 'Đồ Uống Nóng - Hot Drinks', icon: hotDrinks, linkApi: 'hotdrinks'},
    {id: 3, name: 'Đồ Ăn Nhanh - Fast Food', icon: fastFood, linkApi: 'fastfood'},
    {id: 4, name: 'Đồ Ăn Vặt - Snacks', icon: snacks, linkApi: 'snacks'},
    {id: 5, name: 'Trà Chanh Bụi Phố - Lemon Tea', icon: lemonTea, linkApi: 'lemontea'}
  ]);
  return (
    
      <ScrollView style={styles.scrollView}>
        {category.map((value)=> <CategoryListItem product={product} category={value} key={value.id} navigation={navigation}/>)}
        {/* <FlatList 
        data={category}
        renderItem={({item})=><CategoryListItem category={item} navigation={navigation}/>}
        keyExtractor={item=>item.id}
        /> */}
      </ScrollView>
    
  );
}

export default Categories;


