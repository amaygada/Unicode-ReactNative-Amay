import * as React from 'react';
import {StyleSheet,Text ,Dimensions, PermissionsAndroid, View , Platform} from 'react-native'
import {Card} from 'react-native-paper'
import Contacts from 'react-native-contacts';
import {ContactList} from './ContactList'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign'

const Stack = createStackNavigator();

const compareNames = (contact1, contact2) => contact1.displayName > contact2.displayName;

export function ContactClass(){
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name = "Contacts" options = {{headerStyle: {backgroundColor: "#342e2e"}, headerTintColor : "#FFF"}} component={List} />
        <Stack.Screen name="Details" options = {{headerStyle: {backgroundColor: "#342e2e"}, headerTintColor : "#FFF"}} component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class List extends React.Component{

    state = {
      contacts : null
    }

    componentDidMount = async () => {
      if(Platform.OS === 'ios'){
        this.getContacts()
      }
      else if(Platform.OS === 'android'){
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: "Contacts",
          message: "This app would like to view your contacts."
        }).then(() => {
          this.getContacts();
        });
      }
    }

    getContacts =() => {
      Contacts.getAll(
        (err,contacts) =>{
          if(err === 'denied'){
            alert('Error!')
          }
          else{
           let newArr = contacts.map((c) => ({...c , key:c.recordID.toString()})) 
            this.setState({contacts : newArr.sort(compareNames)})
          }
        }
      )
    }

    navigatToDetail = (name , phone) =>{
      this.props.navigation.navigate('Details' , {name: name , phone:phone})
    }

    render(){
      if(this.state.contacts!==null){
        return (
          <View>
            <View>
              <ContactList nav= {this.navigatToDetail} contactlist = {this.state.contacts}/>
            </View>
          </View>
        )
      }
      else {
        return (
          <View style ={{flex:1 , alignItems:'center' , justifyContent:'center'}}>
            <Text>Loading Contacts ...</Text>
          </View>
        )
      }
    }
}

function Detail({route , navigation}){

  const {name} = route.params
  const {phone} = route.params
  return(
    <View style ={{flex:1 , alignItems:'center' , justifyContent:'center'}}>
    <View style={styles.detail}>
      <Icon name="user" color="#FFF" size = {55}/>
    </View>
    {name.length<30 ? (<View style = {styles.belowDetail}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{phone}</Text>
    </View>) : (<View style = {styles.belowDetail}>
      <Text style={styles.nameSmall}>{name}</Text>
      <Text style={styles.number}>{phone}</Text>
    </View>)}
    </View>
  )
}

const styles = StyleSheet.create(
  {
    name:{
      color:"#FFF",
      fontSize : 25
    },
    nameSmall:{
      color:"#FFF",
      fontSize : 20
    },
    number:{
      color:"#FFF",
      fontSize : 22.5
    },
    detail : {
      height: 100,
      width : Dimensions.get('window').width*0.95 ,
      marginRight:10,
      marginLeft:10,
      backgroundColor: "tomato",
      alignItems:'center',
      justifyContent:'center'
    },
    belowDetail : {
      height: 200,
      width : Dimensions.get('window').width*0.95,
      marginLeft:10,
      marginRight:10,
      backgroundColor: "#909090",
      alignItems:'center',
      justifyContent:'center'
    }
  }
)