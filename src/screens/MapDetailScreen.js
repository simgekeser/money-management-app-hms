import React, {Component} from 'react';
import {View, StyleSheet, Picker} from 'react-native';
import MapView from '@hmscore/react-native-hms-map';

export class MapDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 'marker',
    };
  }

  render() {
    const region = {
      latitude: 41.01074,
      longitude: 28.997436,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return <MapView />;
  }
}

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  holder: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 300,
    height: 40,
    backgroundColor: 'white',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 7,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  picker: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 50,
    width: 300,
    color: '#000000',
  },
});
