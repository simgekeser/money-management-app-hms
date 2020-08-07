import React,{Component} from "react";
import { View,Text, StyleSheet,Button } from "react-native";
import RNHMSAccount from "@hmscore/react-native-hms-account";
import AsyncStorage from '@react-native-community/async-storage'


export class LoginScreen extends Component {

constructor(props){
    super(props);

   this.state={
      name:'',
     }
     
 }
 
render(){
  const onCancelAuthorization = () => {
    RNHMSAccount.HmsAccount.cancelAuthorization()
      .then((response) => {
        logger(JSON.stringify(response));
      })
      .catch((err) => {
        logger(err);
      });
  };
    const onSignIn = () => {
        
        let signInData = {
          huaweiIdAuthParams:
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_PARAMS_DEFAULT_AUTH_REQUEST_PARAM,
          scopes: [RNHMSAccount.HmsAccount.SCOPE_ID_TOKEN],
        };
        RNHMSAccount.HmsAccount.signIn(signInData)
          .then((response) => {
            console.log(response)
            this.setState({name:JSON.stringify(response.familyName)})
            AsyncStorage.setItem('name',this.state.name)
           
            AsyncStorage.setItem('photoUriString',JSON.stringify(response.avatarUriString).toString())
            //AsyncStorage.removeItem('photoUriString')
            AsyncStorage.setItem('isLoggedIn',true)
           // this.props.userLogIn
            this.props.navigation.navigate('HomeScreen',{ name: response.familyName })
          })
          .catch((err) => {
             
          });
      };

  return (
    <View style={styles.main}>
        <View  style={styles.container} >
           <Text style={{color:'#D22E30',fontSize: 30, fontWeight: '700' }}>
               BUDGET APP             
            </Text>       
        </View>
        <View >
        <View style={{alignItems: 'center',}} >
          <Text style={{color:'grey'}}>
                Don't you have any account? 
                Login with Huawei             
              </Text>  
         </View>
      <RNHMSAccount.HuaweiIdAuthButton
        style={styles.viewcontainer}
          colorPolicy={
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_BUTTON_COLOR_POLICY_WHITE_WITH_BORDER
          }
          enabled={false}
          theme={
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_BUTTON_THEME_FULL_NO_TITLE
          }
          cornerRadius={
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_BUTTON_CORNER_RADIUS_MEDIUM
          }
        onPress={onSignIn}
        
      /></View>                          
                          
         </View>

  );
  
    }}
const styles = StyleSheet.create({
    main:{
      flex:1,
      justifyContent:"center",
        padding: 30,
    },
    container: {
      height:"20%",
      alignItems: 'center',
  },
    btnContainer: {
        marginTop: 20,
    },
    viewcontainer: {
        marginTop: 20,
        height: 38,
    },
    });