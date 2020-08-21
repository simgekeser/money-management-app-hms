import React, {Component} from 'react';
import {
  NativeModules,
  View,
  StyleSheet,
  Button,
  ToastAndroid,
  Text,
  Dimensions,
} from 'react-native';
import {RNErrorEnum} from '@hmscore/react-native-hwpush';
import {HMSInterstitial} from 'react-native-hms-ads';
import AsyncStorage from '@react-native-community/async-storage';
import {BarChart, PieChart} from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

var screen = Dimensions.get('window');
const getUserAddresses = () => {
  NativeModules.HMSIdentity.getUserAddress();
};

export class DataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiveContent: '',
      sumTranportation: 0,
      sumHome: 0,
      sumMarket: 0,
      sumShopping: 0,
      sumFun: 0,
      sumDiger: 0,
    };

    this.getToken = this.getToken.bind(this);
  }

  toast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  showInterstitialAd = () => {
    HMSInterstitial.isLoaded().then(result => {
      if (result) {
        HMSInterstitial.show(); // if result is true show the ad
      } else {
        console.log('HMSInterstitial error', result);
      }
    });
    HMSInterstitial.adClosedListenerAdd(() => {
      // Adds a listener
      console.log('HMSInterstitial adClosed');
    });
  };

  getToken() {
    this.showInterstitialAd();
    NativeModules.RNHmsInstanceId.getToken((result, token) => {
      let msg = '';
      if (result == RNErrorEnum.SUCCESS) {
        msg = msg + 'getToken result:' + '\n';
      } else {
        msg = msg + 'getToken exception,error: ' + result + '\n';
      }
      this.toast(token);
      console.log(token);
    });
  }
  async componentDidMount() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys).then(key => {
        key.forEach(data => {
          var obj = JSON.parse(data[1]);
          var d = new Date(obj.date);
          if (d.getDate() !== undefined) {
            switch (obj.choosenLabel) {
              case 'Transportation':
                this.setState({
                  sumTranportation:
                    this.state.sumTranportation + parseInt(obj.ucret),
                });
                break;
              case 'Home':
                this.setState({
                  sumHome: this.state.sumHome + parseInt(obj.ucret),
                });
                break;
              case 'Market':
                this.setState({
                  sumMarket: this.state.sumMarket + parseInt(obj.ucret),
                });
                break;
              case 'Shopping':
                this.setState({
                  sumShopping: this.state.sumShopping + parseInt(obj.ucret),
                });
                break;
              case 'Fun':
                this.setState({
                  sumFun: this.state.sumFun + parseInt(obj.ucret),
                });
                break;
              case 'Other':
                this.setState({
                  sumDiger: this.state.sumDiger + parseInt(obj.ucret),
                });
              default:
            }
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
    HMSInterstitial.setAdId('testb4znbuh3n2'); // video ad
    HMSInterstitial.loadAd();
    //console.log('labell',this.state.sumHome,this.state.sumFun,this.state.sumMarket,this.state.sumTranportation)
  }

  render() {
    const chartConfig = {
      backgroundColor: '#022173',
      backgroundGradientFrom: '#898CC3',
      backgroundGradientTo: '#1b3fa0',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    };
    return (
      <View style={styles.main}>
        <View style={styles.analyseTextView}>
          <Ionicons name={'chart-bar'} size={35} color={'#6D1F4A'} />
          <Text style={{fontSize: 17, color: '#6D1F4A', fontWeight: 'bold'}}>
            Analyse Your Money
          </Text>
        </View>

        <PieChart
          data={[
            {
              name: 'Transport',
              population: this.state.sumTranportation,
              color: '#0CA6FB',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Home',
              population: this.state.sumHome,
              color: '#9DE765',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Market',
              population: this.state.sumMarket,
              color: '#E00112',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Shopping',
              population: this.state.sumShopping,
              color: '#FB76D5',
              legendFontColor: '#FB76D5',
              legendFontSize: 15,
            },
            {
              name: 'Fun',
              population: this.state.sumFun,
              color: '#FF9322',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Other',
              population: this.state.sumDiger,
              color: '#FFFE00',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute //for the absolute number remove if you want percentage
        />
        <View
          style={{
            marginTop: 50,
            alignItems: 'center',
          }}>
          <BarChart
            data={{
              labels: ['Transport', 'Home', 'Market', 'Shop', 'Fun', 'Other'],
              datasets: [
                {
                  data: [
                    this.state.sumTranportation,
                    this.state.sumHome,
                    this.state.sumMarket,
                    this.state.sumShopping,
                    this.state.sumFun,
                    this.state.sumDiger,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={220}
            yAxisLabel="tl "
            chartConfig={chartConfig}
          />
          <Text style={{paddingTop: 10}}>Monthly expense</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 20,
  },
  viewcontainer: {
    marginTop: 20,
    height: 38,
  },
  analyseTextView: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#E5DEE3',
    marginBottom: 20,
    borderRadius: 8,
    padding: 10,
  },
});
