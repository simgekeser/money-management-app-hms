import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapViewHMS, {Marker} from '@hmscore/react-native-hms-map';

export class MapDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapViewHMS camera={{target: {latitude: 41, longitude: 29}, zoom: 10}}>
        <Marker //Simple example
          coordinate={{latitude: 41, longitude: 29}}
          title="Hello Huawei Map"
          snippet="This is a snippet!"
        />
      </MapViewHMS>
    );
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
