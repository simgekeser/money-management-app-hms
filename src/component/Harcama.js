import React,{Component} from 'react';
import { Text,Button,Picker,Dimensions,FlatList, View,StyleSheet,TextInput,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Card, List} from '../component'
var screen=Dimensions.get('window')
export class Harcama extends Component {

constructor(props) {
    super(props);  
    this.state = { date:'',
     choosenLabel: '', choosenindex: '',
     ucret: 0,
     aciklama:'',
     index:0,
     allData : [],
     sumDaily:0,
     sumMonthly:0
    }
    

    // refreshFlatList= (activeKey) =>{
    //   this.setState((prevState) => {
    //       return {
    //         deletedRowKey: activeKey
    //       };
    //   });
    // }
}



_onPressModal = () => {
  //console.log('here',this.refs)
  this.refs.myModal.open()
}
render(){

    return (
    <KeyboardAwareScrollView style={{flex:1}}>
      <View style={{flex:1, backgroundColor:'white'}}>
          {/* <View style={{flex:1,backgroundColor: 'white',}}>
            <Card {...this.state}/>
            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                Create A New Expence              
            </Text>
            <View style={styles.inputStyle}>
             <Picker
                    selectedValue={this.state.choosenLabel}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ choosenLabel: itemValue, choosenindex: itemIndex})
                    }>
                    <Picker.Item label='Select Category' />
                    <Picker.Item label='Ulasim' value="Ulasim" />
                    <Picker.Item label='Market' value="Market"/>
                    <Picker.Item label='Kiyafet' value="Kiyafet"/>
                    <Picker.Item label='Ev Giderleri' value="Ev Giderleri"/>
                    <Picker.Item label='Eglence' value="Eglence"/>
                    <Picker.Item label='Diger' value="Diger"/>
            </Picker>
           </View>
            <TextInput clearButtonMode="always"
                placeholder='Ucret'
                keyboardType='numeric'
                onChangeText={(text) => { this.setState({ucret: text})} }
                style={styles.inputStyle}
            />     
            <TextInput clearButtonMode="always"
                placeholder='Ek bilgi'
                onChangeText={(text) => { this.setState({aciklama: text})} }
                style={styles.inputStyle}
            />  
        
          </View>
             
                <View style={{flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        padding: 15,}}>   
                        
                    <Button  onPress={() => this._setData()} title="Ekle" />
                </View>
                {/* <View style={{flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        padding: 15,}}>   
                        
                    <Button  onPress={() => this._onPressModal()} title="Modal" />
                </View>   }
               
               <List {...this.state}/>
                
                  */}
    </View>
    </KeyboardAwareScrollView>
      );
}}
