import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  NativeModules,
  TextInput,
  DeviceEventEmitter,
  Alert,
} from 'react-native';

export class LoginDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isShownVerificationTokenText: false,
      code: '',
    };
  }

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };
  verifyEmail = () => {
    console.log('clicked', this.state.email);

    NativeModules.HMSAuthservice.verifyEmail(this.state.email).then(result => {
      if (parseInt(result) === 600) {
        console.log('signInWithEmailResult', result);
        Alert.alert('Please check your email');
        this.setState({isShownVerificationTokenText: true});
      } else {
        Alert.alert(result);
        console.log('SignInWithEmail error', result);
        //DeviceEventEmitter.emit('dashboardEmitterLogin', false);
      }
    });
  };
  signInWithEmail = () => {
    //console.log('clicked', this.state.email);

    NativeModules.HMSAuthservice.signInWithEmail(
      this.state.email,
      this.state.code,
    ).then(result => {
      console.log('registerWithEmailResult', result);
      if (result.email !== null)
        DeviceEventEmitter.emit('dashboardEmitterLogin', true);
      else DeviceEventEmitter.emit('dashboardEmitterLogin', false);
    });
  };
  registerWithEmail = () => {
    //console.log('clicked', this.state.email);

    NativeModules.HMSAuthservice.registerWithEmail(
      this.state.email,
      this.state.code,
    ).then(result => {
      console.log('registerWithEmailResult', result);
      if (result.email !== null)
        DeviceEventEmitter.emit('dashboardEmitterLogin', true);
      else DeviceEventEmitter.emit('dashboardEmitterLogin', false);
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          <TextInput
            clearButtonMode="always"
            placeholder="Email"
            onChangeText={text => {
              this.setState({email: text});
            }}
            style={styles.inputStyle}
          />
          {this.state.isShownVerificationTokenText ? (
            <View>
              <TextInput
                clearButtonMode="always"
                placeholder=" Verification Code"
                onChangeText={text => {
                  this.setState({code: text});
                }}
                style={styles.inputStyle}
              />
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <TouchableOpacity
                  style={styles.viewcontainer}
                  onPress={() => this.registerWithEmail()}>
                  <Text style={{fontSize: 11}}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewcontainer}
                  onPress={() => this.signInWithEmail()}>
                  <Text style={{fontSize: 11}}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'flex-end', marginRight: 20}}>
              <TouchableOpacity
                style={styles.viewcontainer}
                onPress={() => this.verifyEmail()}>
                <Text style={{fontSize: 9}}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputStyle: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  viewcontainer: {
    margin: 20,
    width: '20%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8C0F6',
    padding: 10,
  },
  container: {
    flex: 3,
  },
});
