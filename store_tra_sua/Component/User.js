import React, { Component } from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
import style from '../assets/style/style';
import ViewUser from './ViewUser';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            date: new Date()
        }
    }
    
    //if user null then render Login
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
        if(this.state.user !== nextProps.user){
            // console.log(nextProps.user);
            this.setState({
                user: nextProps.user
            });
            return true;
        }
        return false
    }
    

    view = () => {
        if(!this.state.user || JSON.stringify(this.state.user) === '{}'){
            return <Login/>
        }
        else {
            return (
                <ViewUser user={this.state.user}/>
            )
        }
    }

    render() {
        // console.log(this.props.user)
        return (
            <View style={style.container}>
                {this.view()}
            </View>
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
            dispatch({type: "adf"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
