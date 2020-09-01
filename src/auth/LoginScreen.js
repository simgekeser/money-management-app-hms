import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
import RNHMSAccount from '@hmscore/react-native-hms-account';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

export class LoginScreen extends Component {
  render() {
    const onSignIn = () => {
      console.log('clicked');
      NativeModules.HMSAuthservice.signInWithHuaweiAccount().then(account => {
        if (account !== undefined) {
          console.log('username', account);
          DeviceEventEmitter.emit('dashboardEmitterLogin', true);
        } else {
          console.log('username error', user);
          DeviceEventEmitter.emit('dashboardEmitterLogin', false);
        }
      });
    };
    const signInWithAnonymousAccount = () => {
      console.log('clicked');
      NativeModules.HMSAuthservice.signInWithAnonymousAccount().then(
        account => {
          if (account !== undefined) {
            console.log('signInResult', account);
            DeviceEventEmitter.emit('dashboardEmitterLogin', true);
          } else {
            console.log('username error', user);
            DeviceEventEmitter.emit('dashboardEmitterLogin', false);
          }
        },
      );
    };
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={{color: '#D22E30', fontSize: 30, fontWeight: '700'}}>
            BUDGET APP
          </Text>
        </View>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'grey'}}>
              Don't you have any account? Login with Huawei
            </Text>
          </View>

          <RNHMSAccount.HuaweiIdAuthButton
            style={styles.viewcontainer}
            colorPolicy={
              RNHMSAccount.HmsAccount
                .CONSTANT_HUAWEI_ID_AUTH_BUTTON_COLOR_POLICY_WHITE_WITH_BORDER
            }
            enabled={false}
            theme={
              RNHMSAccount.HmsAccount
                .CONSTANT_HUAWEI_ID_AUTH_BUTTON_THEME_FULL_NO_TITLE
            }
            cornerRadius={
              RNHMSAccount.HmsAccount
                .CONSTANT_HUAWEI_ID_AUTH_BUTTON_CORNER_RADIUS_MEDIUM
            }
            onPress={onSignIn}
          />
          <TouchableOpacity
            style={styles.viewcontainer}
            onPress={signInWithAnonymousAccount}>
            <Text>Login Anonymously</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  container: {
    height: '20%',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 20,
  },
  viewcontainer: {
    marginTop: 20,
    height: 38,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
