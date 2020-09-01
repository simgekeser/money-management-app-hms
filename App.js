import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {LoginScreen} from './src/auth';
import {
  HomeScreen,
  ProfilScreen,
  DataScreen,
  DetailScreen,
} from './src/screens';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import {DeviceEventEmitter} from 'react-native';

const StackApp = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <StackApp.Navigator initialRouteName="LoginScreen">
      <StackApp.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="HomeScreen"
        component={AppStack}
        options={navOptionHandler}
      />
    </StackApp.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Anasayfa">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={navOptionHandler}
      />
    </Stack.Navigator>
  );
}
function AppStack(props) {
  //console.log('nav', props);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          let iconName;
          let iconColor;
          //   console.log('object', route);
          if (route.name == 'Home') {
            iconName = 'home';
            iconColor = focused ? '#ff5c5c' : 'grey';
          } else if (route.name == 'Data') {
            iconName = 'chart-bar';
            iconColor = focused ? '#ff5c5c' : 'grey';
          } else if (route.name == 'Profil') {
            iconName = 'user';
            iconColor = focused ? '#ff5c5c' : 'grey';
          }
          return <Ionicons name={iconName} size={30} color={iconColor} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen
        name="Profil"
        children={() => <ProfilScreen props={props} />}
      />
    </Tab.Navigator>
  );
}
const navOptionHandler = () => ({
  headerShown: false,
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
      route: [],
    };
  }
  componentDidUnMount() {
    DeviceEventEmitter.addListener('dashboardEmitterLogout', e => {
      this.setState({isLogged: e});
    });
  }
  render() {
    return (
      <NavigationContainer>
        {this.state.isLogged ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }
}
