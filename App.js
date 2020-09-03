import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeModules, View, StyleSheet, ActivityIndicator} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from './src/auth';
import {
  HomeScreen,
  ProfilScreen,
  DataScreen,
  DetailScreen,
  MapDetailScreen,
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
function DataStack() {
  return (
    <Stack.Navigator initialRouteName="Data">
      <Stack.Screen
        name="DataScreen"
        component={DataScreen}
        options={navOptionHandler}
      />
      <Stack.Screen
        name="MapDetailScreen"
        component={MapDetailScreen}
        options={navOptionHandler}
      />
    </Stack.Navigator>
  );
}
function AppStack(props) {
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
      <Tab.Screen name="Data" component={DataStack} />
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

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    DeviceEventEmitter.addListener('dashboardEmitterLogin', e => {
      console.log('e', e);
      setIsLogged(e);
    });

    NativeModules.HMSAuthservice.getCurrentUser().then(user => {
      if (user !== null) {
        setIsLogged(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => {};
  }, [isLogged]);
  console.log('loggedIn', isLogged);

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <NavigationContainer>
      {isLogged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});
