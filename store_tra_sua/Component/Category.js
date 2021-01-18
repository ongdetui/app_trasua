import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Product from './Product';
import { getData } from '../Container/api/Axios';
import { ScrollView } from 'react-native-gesture-handler';


function Category({ route, navigation }) {
    const [product2, setProduct] = useState([]);
    useEffect(() => {
        navigation.setOptions({ title: route.params.categoryName })
        const getDataProduct = async () => {
          const result = await getData(category.linkApi);
          console.log(result);
          setProduct(result);
        }
        getDataProduct();
    },[]);
  
    // const {product} =  route.params;
    const {category} = route.params;
    // console.log(product);
    console.log(category);
    return (
        <ScrollView style={{flex:1}}>
            <FlatList 
            data={product2}
            contentContainerStyle={style.container}
            numColumns={2}
            renderItem={({item})=> <Product product={item} category={category} navigation={navigation}/>}
            keyExtractor={item => item._id}
            />
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    },
    
});

export default Category;