import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

const CustomRow = ({title, description, date, price}) => (
  <View style={styles.container}>
    <View style={styles.container_text}>
      <View style={{paddingRight: 10, paddingBottom: 10}}>
        {title === 'Transportation' ? (
          <Ionicons
            style={{fontSize: 35, color: '#51B3AC'}}
            name={'bus-alt'}
            size={10}
          />
        ) : null}
        {title === 'Market' ? (
          <Ionicons
            style={{fontSize: 35, color: '#AC67C4'}}
            name={'shopping-cart'}
            size={10}
          />
        ) : null}
        {title === 'Other' ? (
          <Ionicons
            style={{fontSize: 35, color: '#DFAE17'}}
            name={'coins'}
            size={10}
          />
        ) : null}
        {title === 'Home' ? (
          <Ionicons
            style={{fontSize: 35, color: '#00CA21'}}
            name={'house-user'}
            size={10}
          />
        ) : null}
        {title === 'Shopping' ? (
          <Ionicons
            style={{fontSize: 35, color: '#FF2168'}}
            name={'tshirt'}
            size={10}
          />
        ) : null}
        {title === 'Fun' ? (
          <Ionicons
            style={{fontSize: 35, color: '#00CA21'}}
            name={'smile-beam'}
            size={10}
          />
        ) : null}
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
        <Text>{price}TL</Text>
      </View>
    </View>
    <View style={styles.container_description}>
      <View style={{paddingRight: 5}}>
        <Ionicons style={{fontSize: 15, color: 'grey'}} name={'info'} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text> {date} </Text>
      </View>
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
  },
  container_description: {
    marginLeft: 12,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  description: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default CustomRow;
