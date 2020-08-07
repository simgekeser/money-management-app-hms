import React,{Component} from 'react';
import {FlatList,View,StyleSheet} from 'react-native';
import CustomRow from './CustomRow';
import RNHmsInstanceId from '@hmscore/react-native-hwpush';

const getCurrentDate=(date)=>{
  var date = new Date(date).getDate();
  var month = new Date().getMonth()+1;
  var year = new Date().getFullYear();
   return date + '-' + month + '-' + year;
}
export class List extends Component {
 
    constructor(props) {
        super(props);
        this.state = { 
          currentDate : new Date()
         }   
      
    }
    
    render() { 
        return (
        <View style={styles.container}>
          {this.props.choosenTimePicker==='Daily' ? 
               <FlatList  keyExtractor={(item)=>item.index}
                    data = {this.props.dailyData}
                    renderItem={({item} )=>(
                    <View>
                      {item.date !== undefined ? 
                      <CustomRow
                        title={item.choosenLabel}
                        description={item.aciklama}
                        date={getCurrentDate(item.date)}
                        price={item.ucret}/>
                      :
                      null}
                    </View> 
                    )
                }>
               </FlatList>
               :
              this.props.choosenTimePicker==='Monthly' ?
               <FlatList  keyExtractor={(item)=>item.index}
                    data = {this.props.monthlyData}
                    renderItem={({item} )=>(
                    <View>
                      {item.date !== undefined ? 
                      <CustomRow
                        title={item.choosenLabel}
                        description={item.aciklama}
                        date={getCurrentDate(item.date)}
                        price={item.ucret}/>
                      :
                      null}
                    </View> 
                    )
                }>
               </FlatList>:null
               }
                </View>
            );
    }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     height:'100%'
    },
    item: {
      padding: 15,
      fontSize: 12,
      height: 50,
      borderBottomWidth:0.5,
      borderColor: 'grey',
    },
  });
  