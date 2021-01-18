
import * as React from 'react';
import Categories from './Component/Categories';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from './Component/Category';
import Setting from './Component/Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import ListCart from './Component/ListCart';
import Login from './Component/Login';
import Register from './Component/Register';
import User from './Component/User';
import Address from './Component/Address';
import PayMent from './Component/PayMent';
import MyOrder from './Component/MyOrder';
import { ScrollView } from 'react-native-gesture-handler';
import homePage from './assets/home-page.png';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Categories} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen name="Giỏ hàng" component={ListCart} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Thanh toán" component={PayMent} />
      <Stack.Screen name="Đơn hàng" component={MyOrder} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Tab.Navigator 
           screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'md-home': 'md-home';
              } else if (route.name === 'User') {
                iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
              }
              else iconName = focused ? 'ios-cart' : 'ios-cart';
              // You can return any component that you like here!
              return <Ionicons android={iconName} name={iconName} size={32} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#189eff', 
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Giở hàng" component={ListCart}/>      
          <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
//options={{ tabBarBadge: 3 }}
export default App;


