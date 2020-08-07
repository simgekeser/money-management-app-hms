import React,{Component} from 'react';
import { Text,Dimensions,Button,Picker, FlatList,View,StyleSheet,TextInput} from 'react-native';
import Modal from 'react-native-modalbox'

var screen=Dimensions.get('window')
export class AddModal extends Component {
    constructor(props){
        super(props);
    }

    showAddModal = () => {
        //console.log('here',this.refs)
        this.refs.myModal.open()
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{justifyContent: 'center',height:200,width:screen.width-80}}
                        animationType="slide"
                        position= 'center'
                        visible={true}
                        onClosed={()=> {
                            alert('Modal closed')
                    }}

            >
            <Text>Helllo</Text>
            </Modal>
        );
    }
}