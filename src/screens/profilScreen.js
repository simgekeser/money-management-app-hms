import React,{Component} from 'react';
import { Text, View,StyleSheet,TouchableHighlight,Modal,Button,NativeModules,Image,Dimensions} from 'react-native';
import RNHMSAccount from "@hmscore/react-native-hms-account";
import AsyncStorage from '@react-native-community/async-storage'
import Ionicons from 'react-native-vector-icons/FontAwesome5';

var screen=Dimensions.get('window')
const testAgcConnectCrash = () => { NativeModules.HMSCrash.testAgcConnectCrash()};

const onSignOut = () => {
    RNHMSAccount.HmsAccount.signOut()
      .then((response) => {
        console.log(response)
       // console.log(AsyncStorage.getItem('name')
      })
      .catch((err) => {

      });
  };

export class profilScreen extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            modalVisible: true,
            name:'',
            photoUri:'https://upfile7.hicloud.com/FileServer/image/b.5190090000026360265.20200717053836.AeAg98Fd2JZt8BSDLG1AexGB7gzNVmzg.1000.6B4EF9E72919F7299546A9C72D54720FE537CB3FC120A29539C4FFE3E4A40FF0.jpg'
        }
        
      }
async componentWillMount() {    
    const value = await AsyncStorage.getItem('name')
    const photoUri= await AsyncStorage.getItem('photoUriString')
    console.log('urii',photoUri)
    this.setState({name:value});
}
setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

    render(){
        //console.log('modal',this.state.modalVisible)
        return (
            
          <View style={styles.main}>
               <View style={{alignItems:'flex-end'}}>
               <Ionicons name="sign-out-alt"  size={45} color="grey" onPress={onSignOut}/>
               </View>
              <View style={{flex:1}}>
                    <Image
                    style= {{ flex:1,
                        width: null,
                        height: null,
                        resizeMode: 'center',borderRadius: 400/ 2}}
                    source={{uri:this.state.photoUri}}
                    />  
               <View style={{alignItems:'center'}}>
                    <Text style={{ fontSize: 17,color:'#4A1D40', fontWeight: 'bold', paddingHorizontal: 20}}>
                                Dear, {this.state.name}            
                              </Text></View>
              </View>
                <Modal
                    animationType="slide"
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {                        
                        this.setModalVisible(!this.state.modalVisible);
                        //alert("Modal has been closed.");
                    }}
                    >
                    <View style={styles.modalView}>
                        <View style={{backgroundColor:'grey',padding:10}}>
                           <Ionicons name="window-close"  size={30} color="white"  onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}/>
                        </View>
                        
                        <View style={{flex:1,backgroundColor:'grey',alignItems:'center',justifyContent:'center'}}>
                            <Ionicons name="crown"  size={45} color="white" style={{ marginBottom:30}}/>
                                <Text style={{ fontSize: 17,color:'white', fontWeight: 'bold'}}>REMOVE ADS</Text>
                                 <Text style={styles.modalText}>Enjoy and ad-free experience while controlling your budget</Text>
                                     <TouchableHighlight
                                        style={styles.openButton}
                                        onPress={() => {
                                            this.setModalVisible(true);
                                        }}
                                        >
                                         <View style={{alignItems:'center'}}>
                                             <Text style={{color:'white'}}>
                                                 Go Premium
                                             </Text>
                                            <View style={{flexDirection:'row',width:screen.width/3,justifyContent:'center'}}>
                                                <Ionicons name={'lira-sign'} size={15} color={'white'} style={{paddingTop:2}}/>
                                                <Text style={styles.textStyle}>1.00</Text>
                                            </View>
                                            
                                         </View>
                                    </TouchableHighlight>
                                        
                        </View>
                        
                        
                    </View>
                </Modal>
              <View style={{flex:3,justifyContent:'flex-start'}}>
                    <View style={styles.btnContainer}>
                        <Text>User Type  :    </Text>
                        <Text> Basic</Text>
                    </View>
              </View>
             
         </View>
    
          );
    }
}
const styles = StyleSheet.create({
main: {
    flex:4,
    backgroundColor: 'white',
    justifyContent:"center",
    padding: 10,
},
btnContainer: {       
    marginTop: 20,
    flexDirection:'row',
    justifyContent:'center'
},
viewcontainer: {
    marginTop: 20,
    height: 38,
},
modalView: {
    backgroundColor:'transparent',
    flex:1,
    justifyContent:'flex-end'
    },
openButton: {
    backgroundColor: "#E57600",
    borderRadius: 12,
    padding: 10,
    marginTop:30,
    elevation: 2,
    
    },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    },
    modalText: {
        marginTop:20,
    color:'#DBDBDB',
    textAlign: "center"
    }
});