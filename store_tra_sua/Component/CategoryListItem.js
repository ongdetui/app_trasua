import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorageToken from '../Container/authention/AsyncStorageToken';
import { resetToken } from '../Container/api/Axios';


class CategoryListItem extends Component {

    componentDidMount() {
        //1h reset token
        setInterval(() => {
            console.log("reset token");
            resetToken().then((token) => {
                AsyncStorageToken(token);
            })
        }, 18000000);
    }
    
    render() {
        const {category, navigation, product} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate('Category',{
                categoryName: category.name,
                category: category,
                product: product
            })} >
                <View style={styles.container}>
                    <Text style={styles.title}>{category.name}</Text>
                    {/* <Text style={styles.title}>{category.name}</Text> */}
                    <Image style={styles.categoryImage} source={category.icon} />
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        alignItems: "center",
        marginTop: 15,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        marginBottom: 0,
        borderRadius:5,
        marginBottom: 15
    },
    title: {
        fontSize: 18,
        justifyContent: "center",
        paddingBottom: 5,
        textAlign: "center"
    },
    categoryImage:{
        width: 70,
        height: 70,
        borderRadius: 3,
    }
})

export default CategoryListItem;