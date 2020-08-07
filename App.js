import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {LoginScreen} from './src/auth'
import {HomeScreen,profilScreen,DataScreen,DetailScreen } from './src/screens';
import AsyncStorage from '@react-native-community/async-storage'
import Ionicons from 'react-native-vector-icons/FontAwesome5';

const StackApp = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {

  return(
    <StackApp.Navigator initialRouteName='LoginScreen'>
      <StackApp.Screen name = "LoginScreen" component={LoginScreen} options={navOptionHandler}  userLogIn={this.userLogIn}/>
      <StackApp.Screen name = "HomeScreen" component={AppStack} options={navOptionHandler} />
   </StackApp.Navigator>)}

function HomeStack(){
  return(
    <Stack.Navigator initialRouteName="Anasayfa">
      <Stack.Screen name = "HomeScreen" component={HomeScreen} options={navOptionHandler}/>
      <Stack.Screen name = "DetailScreen" component={DetailScreen} options={navOptionHandler}/>
    </Stack.Navigator>
  )
}
function AppStack() {
  return(
    <Tab.Navigator screenOptions={({route})=>({
      tabBarLabel:({focused})=>{
       let iconName;
       let iconColor;
       if (route.name=='Home') {

         iconName='home'
         iconColor = focused
                    ? '#ff5c5c'
                    : 'grey';
     
       } else if(route.name=='Data'){
     
        iconName='chart-bar'
        iconColor = focused
                    ? '#ff5c5c'
                    : 'grey';
       }
       
      else if(route.name=='Profil'){
     
       iconName='user'
       iconColor = focused
                    ? '#ff5c5c'
                    : 'grey';
      }
      return <Ionicons name={iconName} size={30} color={iconColor}/>
 }
})}
     >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Data" component={DataScreen}  />
          <Tab.Screen name="Profil" component={profilScreen} />
    </Tab.Navigator>
    )
}
const navOptionHandler = () => ({
  headerShown:false
})
export default class App extends Component{

  constructor(props){
    super(props);

   this.state={
      isLogged:false,
     }
 }

  render(){
    
  return (
    <NavigationContainer>
     { true ? (<AppStack />) : (<AuthStack />) }
    </NavigationContainer>
  );
}}
