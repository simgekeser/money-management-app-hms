import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Modal,
  Slider,
  Button,
  DeviceEventEmitter,
  NativeModules,
  Image,
  Dimensions,
} from 'react-native';
import RNHMSAccount from '@hmscore/react-native-hms-account';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import HmsIapModule from '@hmscore/react-native-hms-iap';

var screen = Dimensions.get('window');

const testAgcConnectCrash = () => {
  NativeModules.HMSCrash.testAgcConnectCrash();
};
const onCancelAuthorization = () => {
  RNHMSAccount.HmsAccount.cancelAuthorization()
    .then(response => {
      logger(JSON.stringify(response));
    })
    .catch(err => {
      logger(err);
    });
};
const onSignOut = () => {
  NativeModules.HMSAuthservice.signOut();
  onCancelAuthorization();
  DeviceEventEmitter.emit('dashboardEmitterLogin', false);
};

export class ProfilScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: '',
      budget: 0,
      placeHolderBudget: 0,
      isPremium: false,
      photoUriString: '',
      name: '',
      value: 0,
    };
  }
  async UNSAFE_componentWillMount() {
    const isPremium = JSON.parse(await AsyncStorage.getItem('premium'));
    const limit = JSON.parse(await AsyncStorage.getItem('limit'));
    const budget = JSON.parse(await AsyncStorage.getItem('budget'));

    NativeModules.HMSAuthservice.getCurrentUser().then(userPhoto => {
      console.log('userprofil', userPhoto);
      if (userPhoto !== null) {
        this.setState({photoUriString: userPhoto});
        console.log('userprofil', user);
      } else {
        console.log('userprofil error', user);
      }
    });
    this.setState({
      isPremium: isPremium,
      value: limit,
      budget,
      placeHolderBudget: budget,
    });

    console.log('limit', this.state.limit);
    if (!isPremium) {
      this.setState({
        modalVisible: true,
      });
    }
  }
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
    });
  };
  purchasePremium = async () => {
    try {
      let result = await HmsIapModule.createPurchaseIntent({
        priceType: HmsIapModule.PRICE_TYPE_IN_APP_SUBSCRIPTION,
        productId: 'test',
        developerPayload: 'HMSCoreDeveloper',
      });

      console.log('result purchase', result);

      if (result.a === 0) {
        AsyncStorage.setItem('premium', JSON.stringify(true));
        this.setState({
          isPremium: true,
        });
        this.setModalVisible(false);
        this.updatePremium();
        console.log('Purchase was successful.');
      } else {
        console.log('Purchase was not successful.');
      }
    } catch (err) {
      console.log(err);
    }
  };
  updatePremium = () => {
    this.setState(
      {
        isPremium: true,
      },
      () => DeviceEventEmitter.emit('dashboardEmitter', true),
    );
  };
  setLimit = async value => {
    this.setState({
      value,
    });
    console.log('limit', value);
    AsyncStorage.setItem('limit', JSON.stringify(this.state.value));
  };
  addBudget = async () => {
    //console.log('budget', this.state.budget);
    AsyncStorage.setItem('budget', JSON.stringify(this.state.budget));
    DeviceEventEmitter.emit('dashboardEmitterMonthly', this.state);
  };
  render() {
    //console.log('modal',this.state.modalVisible)
    let {props} = this.props;
    const left = (this.state.value * (screen.width - 60)) / 100 - 15;
    console.log('props', props);
    return (
      <View style={styles.main}>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Ionicons
            name="sign-out-alt"
            size={45}
            color="grey"
            onPress={onSignOut}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingBottom: 60,
          }}>
          <Image
            style={styles.imageView}
            source={{
              uri: this.state.photoUriString,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 17,
                color: '#4A1D40',
                fontWeight: 'bold',
              }}>
              Dear, {this.state.name}
            </Text>
            {this.state.isPremium ? (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="crown"
                  size={25}
                  color="#E57600"
                  style={{
                    paddingTop: 5,
                    marginLeft: 5,
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            backgroundColor: '',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 12,
            }}>
            Add Budget Monthly
          </Text>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              marginRight: 6,
              borderColor: 'gray',
              elevation: 2,
            }}
            placeholder={JSON.stringify(this.state.placeHolderBudget)}
            onChangeText={text => {
              this.setState({
                budget: text,
              });
            }}
          />
          <Button title="Add" color="#E57600" onPress={this.addBudget} />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 20,
          }}>
          <Text
            style={{
              fontSize: 12,
            }}>
            Set Limit Monthly
          </Text>
          <Text
            style={{
              flex: 2,
              fontSize: 12,
              width: 50,
              textAlign: 'center',
            }}>
            {Math.floor(this.state.value)}
          </Text>
          <Slider
            maximumValue={6500}
            step={100}
            style={{
              width: '50%',
              height: 40,
              flex: 2,
            }}
            value={this.state.value}
            onValueChange={this.setLimit}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-start',
          }}>
          {this.state.isPremium ? null : (
            <View
              style={{
                alignItems: 'center',
              }}>
              <TouchableHighlight
                style={{
                  alignItems: 'center',
                  backgroundColor: '#E57600',
                  borderRadius: 12,
                  padding: 10,
                  marginTop: 40,
                  elevation: 2,
                  width: '30%',
                }}
                onPress={this.purchasePremium}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Go Premium
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: screen.width / 3,
                      justifyContent: 'center',
                    }}>
                    <Ionicons
                      name={'lira-sign'}
                      size={15}
                      color={'white'}
                      style={{
                        paddingTop: 2,
                      }}
                    />
                    <Text style={styles.textStyle}> 1.00 </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
        </View>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
            //alert("Modal has been closed.");
          }}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: 'grey',
                padding: 10,
              }}>
              <Ionicons
                name="window-close"
                size={30}
                color="white"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'grey',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="crown"
                size={45}
                color="white"
                style={{
                  marginBottom: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                REMOVE ADS
              </Text>
              <Text style={styles.modalText}>
                Enjoy and ad - free experience while controlling your budget
              </Text>
              <TouchableHighlight
                style={styles.openButton}
                onPress={this.purchasePremium}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Go Premium
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: screen.width / 3,
                      justifyContent: 'center',
                    }}>
                    <Ionicons
                      name={'lira-sign'}
                      size={15}
                      color={'white'}
                      style={{
                        paddingTop: 2,
                      }}
                    />
                    <Text style={styles.textStyle}> 1.00 </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  imageView: {
    flex: 1,
    width: 80,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 400 / 2,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewcontainer: {
    marginTop: 20,
    height: 38,
  },
  modalView: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
  },
  openButton: {
    backgroundColor: '#E57600',
    borderRadius: 12,
    padding: 10,
    marginTop: 30,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 20,
    color: '#DBDBDB',
    textAlign: 'center',
  },
});
