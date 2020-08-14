import * as React from 'react';
import {StyleSheet , View , Text} from 'react-native'
import {Header} from './Header'
import {TextInput , Button} from 'react-native-paper';

// blue = #0892d0
//grey = #D3D3D3    
//yellow = #f9d71c

const styles = StyleSheet.create({
    container : {
        paddingTop : 10,
        flex:1
      },
      buttonStyle : {
        paddingTop : 10,
        alignItems: 'center',
        color : "#FFFFFF"
      },
      input: {
        minWidth: 100,
        marginTop: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
})
export class Weather extends React.Component{

    state = {
        city : "",
        isValid : false,
        opacity : 0,
        weatherObj : {},
        bColor : "#FFFFFF",
        butColor : "#eeeeee",
        detailString : ""
    }

    getHandler = key => val =>{
        this.setState({[key] : val})
    }    

    getWeatherData = async () => {
        let cityVal = this.state.city
        let apiVal = "ceee5ec84d10261f0ca6fda426e9f1f5"
        let result
        try{
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=${apiVal}`)
        result = await response.json()
        return result
        }catch(e){
            result = "error"
            return result
        }
    }

    buttonPressHandler = () => {
        this.showData()}

    showData = async () =>{
        let result = await this.getWeatherData()
        if(result.cod !== 200){
            console.log("error")
            alert(`Error! ${result.message}`)
        }else{
            let obj = {
                detail : result.weather[0].main,
                name: result.name ,
                temp: result.main.temp,
                minTemp: result.main.temp_min,
                maxTemp: result.main.temp_max,
                pressure: result.main.pressure, 
                humidity: result.main.humidity,
                windSpeed: result.wind.speed,
            }
            if(obj.detail === "Clouds"){
                this.setState({weatherObj:obj , opacity:100 ,bColor:"#D3D3D3" , butColor:"#FFFFFF",detailString:"Cloudy"})
            }else if(obj.detail === "Rain"){
                this.setState({weatherObj:obj , opacity:100 ,bColor:"#0892d0", butColor:"#FFFFFF" , detailString:"Rainy"})
            }else if(obj.detail === "Clear"){
                this.setState({weatherObj:obj , opacity:100 ,bColor:"#f9d71c" ,  butColor:"#FFFFFF" , detailString:"Sunny"})
            }
        }
    }

    validate = () => {
        let cities = this.state.city.trim() 
        let cityVal = this.state.city
        if(this.state.bColor==="#FFFFFF"){
            if(cities.length>0){
                this.setState({isValid : true , butColor: "#551a8b"})
            }
            else{
                this.setState({isValid : false , butColor:"#eeeeee"})
            }
        }else{
            if(cities.length>0){
                this.setState({isValid : true , butColor: "#FFFFFF"})
            }
            else{
                this.setState({isValid : false , butColor:"#eeeeee"})
            }
        }
    }


    componentDidUpdate = (prevProps , prevState) => {
        if(prevState.city !== this.state.city){
            this.validate()
        }
    }

    render() {
        
        return(
            <View style={{flex : 1}}>
                <Header title = "Weather"/>
                <View style = {{backgroundColor:this.state.bColor , flex:1 }}>
                    <TextInput onFocus={()=>{this.setState({opacity : 0 })}} label="City" keyboardType="default" maxLength = {20} style = {styles.input} mode ="outlined" value={this.state.city.trim()} onChangeText={this.getHandler('city')} theme={{ colors: { primary: 'grey',underlineColor:'transparent',}}}/>
                    <View style = {styles.buttonStyle}>
                        <Button color = "#FFFFFF" labelStyle = {{color:this.state.butColor , fontSize:17}} children="Get Weather Details" mode="text" onPress = {this.buttonPressHandler} disabled={!this.state.isValid} />
                    </View>
            
                    <View style ={{flex:1 , alignItems:'center' , justifyContent:'center'}}>
                        <Text style = {{padding:10 ,textAlign:'center' , color : this.state.butColor ,fontSize : 40,fontWeight:"500" , opacity : this.state.opacity}}> 
                        {this.state.weatherObj.temp} (°C)</Text>

                        <Text style = {{padding:10 , textAlign:'center' , color : this.state.butColor ,fontSize : 40,fontWeight:"500" , opacity : this.state.opacity}}> 
                        {this.state.weatherObj.name}</Text>

                        <Text style = {{padding:10 , textAlign:'center' , color : this.state.butColor ,fontSize : 40,fontWeight:"500" , opacity : this.state.opacity}}> 
                        {this.state.detailString}</Text>
                    </View>
                </View>
            </View>
        )
    }
}