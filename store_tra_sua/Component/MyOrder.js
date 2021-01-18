import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import box2 from '../assets/box2.png';
import ProductOrder from './ProductOrder';

class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            date: new Date()
        }
    }

    UNSAFE_componentWillMount() {
        if(this.state.user === null){
            this.setState({
                user: this.props.user
            })
        }
    }

    //tạo vòng đời liên tục
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    tick() {
        this.setState({
          date: new Date()
        });
    }

    //khi rời trang này thì kết thúc vòng đời
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.user !== this.state.user){
            this.setState({
                user: nextProps.user
            })
            return true;
        }
        return false;
    }
    

    viewProductOrder = () => {
        const {user} = this.state;
        if(user !== null && user.sanPhamMua && user.sanPhamMua.length !== 0){
            return user.sanPhamMua.map((value, index)=> {
                return <ProductOrder id={index} product={value} key={index}/>
            })
        }
        else {
            return (
                <View style={styles.listOrderEmpty}>
                    <Image source={box2} style={styles.imageEmpty} />
                    <Text style={styles.textEmpty}>Hiện tại bạn chưa có đơn hàng nào !</Text>
                </View>
            );
        }
        
    }
    
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.viewProductOrder()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch({type: 'dfd'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EEEEEE',
    },
    listOrderEmpty: {
        alignItems: 'center',
        marginTop: 150
    },
    imageEmpty: {
        width: 180,
        height: 180
    },
    textEmpty: {
        fontSize: 17
    }
})