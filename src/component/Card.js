import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Daily </Text>
            <Text style={styles.cardMoneyTotalText}>{this.props.sumDaily}</Text>
            <Ionicons name={'lira-sign'} size={15} color={'#6D1F4A'} />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Weekly </Text>
            <Text style={styles.cardMoneyTotalText}>
              {this.props.sumMonthly}
            </Text>
            <Ionicons name={'lira-sign'} size={15} color={'#6D1F4A'} />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Monthly </Text>
            <Text style={styles.cardMoneyTotalText}>
              {this.props.sumMonthly}
            </Text>
            <Ionicons name={'lira-sign'} size={15} color={'#6D1F4A'} />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Yearly </Text>
            <Text style={styles.cardMoneyTotalText}>
              {this.props.sumYearly}
            </Text>
            <Ionicons name={'lira-sign'} size={15} color={'#6D1F4A'} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    width: 100,
    height: '90%',
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
  cardText: {
    padding: 10,
    fontSize: 15,
    color: '#6D1F4A',
    borderBottomColor: '#F7C9C9',
    borderBottomWidth: 1,
  },
  cardMoneyTotalText: {
    padding: 10,
    fontSize: 15,
    color: '#6D1F4A',
  },
});
