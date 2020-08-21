import React, {Component} from 'react';
import {
  Text,
  Button,
  Picker,
  View,
  StyleSheet,
  DeviceEventEmitter,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, List} from '../component';
import {HMSBanner, BannerAdSizes} from 'react-native-hms-ads';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      choosenTimePicker: '',
      choosenTimePickerIndex: '',
      allData: [],
      dailyData: [],
      monthlyData: [],
      sumDaily: 0,
      sumMonthly: 0,
      sumYearly: 0,
      index: 0,
      count: 0,
      limit: 0,
      isPremium: false,
      Monthly: 6500,
    };
  }
  _getData = async () => {
    console.log('Alldata', this.state.allData);
    if (this.state.allData.length >= 1) {
      this.setState({
        allData: [],
        sumDaily: 0,
        sumMonthly: 0,
        sumYearly: 0,
        dailyData: [],
        monthlyData: [],
      });
    }

    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys).then(key => {
        key.forEach(data => {
          var obj = JSON.parse(data[1]);
          this.state.allData.push(obj);

          var d = new Date(obj.date);
          var now = new Date();
          // console.log('daidddly',d.getMonth())
          //console.log('sumMonthly',obj.choosenLabel)
          if (
            d.getFullYear() === now.getFullYear() &&
            d.getFullYear() !== undefined
          ) {
            this.setState({
              sumYearly: this.state.sumYearly + parseInt(obj.ucret),
            });
            //  console.log('sumYearly',this.state.sumYearly)
          }
          if (d.getMonth() === now.getMonth() && d.getMonth() !== undefined) {
            this.setState({
              sumMonthly: this.state.sumMonthly + parseInt(obj.ucret),
            });
            this.state.monthlyData.push(obj);
            //  console.log('sumMonthly',this.state.sumMonthly)
          }
          if (
            d.getDate() === now.getDate() &&
            d.getMonth() === now.getMonth() &&
            d.getMonth() !== undefined &&
            d.getDate() !== undefined
          ) {
            this.setState({
              sumDaily: this.state.sumDaily + parseInt(obj.ucret),
            });
            this.state.dailyData.push(obj);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
    console.log('burada', this.state.allData);
  };

  _updateData = async () => {
    if (this.state.sumDaily > this.state.limit) {
      alert('limit exceeded');
    }
    console.log('updateData');
    this._getData();
  };
  async componentDidMount() {
    AsyncStorage.removeItem('premium');
    DeviceEventEmitter.addListener('dashboardEmitter', e => {
      this.setState({isPremium: e});
    });

    DeviceEventEmitter.addListener('dashboardEmitterMonthly', e => {
      this.setState({Monthly: e.budget, limit: e.value});
    });

    const isPremium = JSON.parse(await AsyncStorage.getItem('premium'));
    const budget = JSON.parse(await AsyncStorage.getItem('budget'));
    const limit = JSON.parse(await AsyncStorage.getItem('limit'));

    this.setState({Monthly: budget, limit: limit});
    if (isPremium) {
      this.setState({isPremium: isPremium});
    }
    console.log('premium', this.state.isPremium);
    this._getData();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              alert('Expence is added!');
            }}>
            <View style={styles.cardView}>
              <Text style={styles.cardText}>Monthly Total Income </Text>
              <Ionicons
                style={{fontSize: 15, color: '#00CA21'}}
                name={'arrow-up'}
                size={10}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, color: '#6D1F4A'}}>
                {' '}
                {this.state.Monthly}
              </Text>
              <Ionicons
                style={{fontSize: 15, color: '#6D1F4A'}}
                name={'lira-sign'}
                size={15}
                color={'grey'}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardView}>
              <Text style={styles.cardText}>Monthly Remaining Money </Text>
              <Ionicons
                style={{fontSize: 15, color: '#DE0700'}}
                name={'arrow-down'}
                size={10}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, color: '#6D1F4A'}}>
                {this.state.Monthly - this.state.sumMonthly}{' '}
              </Text>
              <Ionicons
                style={{fontSize: 15, color: '#6D1F4A'}}
                name={'lira-sign'}
                size={15}
                color={'grey'}
              />
            </View>
          </View>
        </View>
        <Card {...this.state} />
        <View style={styles.pickerView}>
          <View style={{flex: 1}}>
            <Picker
              style={{width: '70%', height: 44}}
              itemStyle={{height: 44}}
              selectedValue={this.state.choosenTimePicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  choosenTimePicker: itemValue,
                  choosenTimePickerIndex: itemIndex,
                })
              }>
              <Picker.Item label="Time" value="Time" />
              <Picker.Item label="Daily" value="Daily" />
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
          </View>

          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <TouchableOpacity
              style={styles.expenceAddingButton}
              onPress={() =>
                this.props.navigation.navigate('DetailScreen', {
                  _updateData: () => this._updateData(),
                  isPremium: this.state.isPremium,
                })
              }>
              <Ionicons name="plus" size={30} color="#6D1F4A" />
            </TouchableOpacity>
          </View>
        </View>

        <List {...this.state} />
        {!this.state.isPremium ? (
          <View style={{alignContent: 'flex-end', height: '12%'}}>
            <HMSBanner
              style={{flex: 1}}
              bannerAdSize={{
                bannerAdSize: BannerAdSizes.B_DYNAMIC,
              }}
              adId="testw6vs28auh3"
            />
          </View>
        ) : null}
      </View>
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
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  cardView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: '#202646',
    borderRadius: 5,
  },
  cardText: {
    margin: 20,
    alignItems: 'center',
    fontSize: 12,
    color: '#6D1F4A',
    borderBottomColor: '#F7C9C9',
    borderBottomWidth: 1,
  },
  pickerView: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
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
