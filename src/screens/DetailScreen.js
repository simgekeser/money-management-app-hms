import React, {Component} from 'react';
import {Text, Button, Picker, View, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import haSDK from 'react-native-ha-interface';
import {
  HMSNative,
  NativeMediaTypes,
  HMSInterstitial,
} from 'react-native-hms-ads';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenLabel: '',
      choosenindex: '',
      ucret: 0,
      aciklama: '',
      index: 0,
    };
  }
  async componentDidMount() {
    AsyncStorage.getAllKeys().then(keyArray => {
      AsyncStorage.multiGet(keyArray).then(keyValArray => {
        console.log('CURRENT STORAGE: ', keyValArray.length);
        this.setState({index: keyValArray.length});
      });
    });
  }

  _setData = async () => {
    console.log('indexx', this.state.index + 1);
    let obj = {
      index: this.state.index + 1,
      choosenLabel: this.state.choosenLabel,
      ucret: this.state.ucret,
      aciklama: this.state.aciklama,
      date: new Date(),
    };
    console.log(this.state.index);
    var key = 'key' + this.state.index + 1;
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
      haSDK.onEvent('testEvent', obj);
      this.props.route.params._updateData(obj);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          {this.props.route.params.isPremium ? (
            <View style={{height: 250}} />
          ) : (
            <HMSNative
              style={{height: 322}}
              displayForm={{
                mediaType: NativeMediaTypes.VIDEO,
                adId: 'testy63txaom86',
              }}
            />
          )}
          <View style={{justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#4A1D40',
                  fontWeight: 'bold',
                  paddingHorizontal: 20,
                }}>
                Create Expense
              </Text>
            </View>
            <View style={styles.inputStyle}>
              <Picker
                selectedValue={this.state.choosenLabel}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    choosenLabel: itemValue,
                    choosenindex: itemIndex,
                  })
                }>
                <Picker.Item label="Select Category" />
                <Picker.Item label="Transportation" value="Transportation" />
                <Picker.Item label="Market" value="Market" />
                <Picker.Item label="Shopping" value="Shopping" />
                <Picker.Item label="Home" value="Home" />
                <Picker.Item label="Fun" value="Fun" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <View style={{justifyContent: 'center'}}>
              <TextInput
                clearButtonMode="always"
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={text => {
                  this.setState({ucret: text});
                }}
                style={styles.inputStyle}
              />
              <TextInput
                clearButtonMode="always"
                placeholder="Additional Information"
                onChangeText={text => {
                  this.setState({aciklama: text});
                }}
                style={styles.inputStyle}
              />
              <View style={{paddingTop: 10, marginRight: 50, marginLeft: 50}}>
                <Button
                  color="#ff5c5c"
                  onPress={() => this._setData()}
                  title="Add"
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: '#000000',
    margin: 20,
  },
  inputStyle: {
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  cardText: {
    padding: 10,
    fontSize: 15,
    color: '#6D1F4A',
    borderBottomColor: '#F7C9C9',
    borderBottomWidth: 1,
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  expenceAddingButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  card: {
    alignItems: 'center',
    width: '30%',
    height: 90,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#FAF6EC',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
});
