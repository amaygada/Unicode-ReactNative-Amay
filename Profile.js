import * as React from 'react';
import {StyleSheet, View} from 'react-native'
import {Header} from './Header'
import { TextInput , Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create(
  {
    input: {
      minWidth: 100,
      marginTop: 10,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    container : {
      backgroundColor : "#fff",
      paddingTop : 10,
      flex:1
    },
    buttonStyle : {
      paddingTop : 20,
      alignItems: 'center',
    }
  }
)

export class Profile extends React.Component{


    state = {
      name : "",
      phone : "",
      age : "",
      isValid :false
    }



  componentDidUpdate = async (prevProps , prevState) => {
    if (
      this.state.name !== prevState.name ||
      this.state.phone !== prevState.phone ||
      this.state.age !== prevState.age
    ){
      this.validateForm()
      try{
        await AsyncStorage.setItem('name' , this.state.name)
        await AsyncStorage.setItem('phone' , this.state.phone)
        await AsyncStorage.setItem('age' , this.state.age)
      }catch(e){
        console.log('setting error')}
    }
  }

  componentDidMount = async () => {
    nameVal = await AsyncStorage.getItem('name')
    ageVal = await AsyncStorage.getItem('age')
    phoneVal =await AsyncStorage.getItem('phone')
    if(nameVal!=null){
    this.setState({name:nameVal})}
    if(ageVal!=null){
      this.setState({age:ageVal})}
    if(phoneVal!=null){
      this.setState({phone:phoneVal})} 
  }

  getHandler = key => val =>{
    this.setState({[key] : val})
  }

  validateForm = ()=>{
    let names = this.state.name.trim()
    let ages = this.state.age.trim()
    let phones = this.state.phone.trim()
    if(this.state.phone[9]!=="." && this.state.name.length>=1 && names.length!=-0 && ages.length!==0 && phones.length!==0 && +this.state.age<100 && this.state.age.length>=1 && Number.isInteger(+this.state.age) && this.state.phone.length===10 && Number.isInteger(+this.state.phone)){
      this.setState({isValid : true})
    }
    else{
      this.setState({isValid : false})
    }
  }
    
  render(){
   return (
    <View style={{flex:1}}>
      <Header title="Profile"/>
      <View style = {styles.container}>
       <TextInput label="Name" keyboardType="default" maxLength = {30} style = {styles.input} mode ="outlined" value={this.state.name.trim()} onChangeText={this.getHandler('name')} />
       <TextInput label="Age" keyboardType="numeric" maxLength = {3} style = {styles.input} mode ="outlined" value={this.state.age.trim()} onChangeText={this.getHandler('age')} />
       <TextInput label="Phone" keyboardType="numeric" maxLength = {10} style = {styles.input} mode ="outlined" value={this.state.phone.trim()} onChangeText={this.getHandler('phone')} />
       <View style = {styles.buttonStyle}>
        <Button children="Submit" style={{width:100}} mode="contained" disabled={!this.state.isValid} onPress ={() => {console.log('Submit Pressed')}}/>
       </View>
      </View>
    </View>
    )
  }
}