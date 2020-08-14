import React from 'react'
import {FlatList , TouchableWithoutFeedback , Text , View , StyleSheet} from 'react-native'
//import {Row} from './ContactRow'
import Icon from 'react-native-vector-icons/AntDesign'
import {Card} from 'react-native-paper'

const styles = StyleSheet.create(
    {
        row: {
            padding : 5,
        }
    }
)

export class ContactList extends React.Component{

    render(){
        return(
            <FlatList
                data = {this.props.contactlist}
                renderItem = {({item}) => (
                <TouchableWithoutFeedback onPress ={() =>{
                    console.log(item.key)
                    if(item.phoneNumbers.length!==0){
                    this.props.nav(item.displayName , item.phoneNumbers[0].number)}
                    else{
                        this.props.nav(item.displayName , '-')
                    }
                    }}>
                    <View style = {styles.row}>
                        <Card>
                            <Card.Title 
                            title={`${item.displayName}`} 
                            left = {() => (<Icon name="user" size= {25} color = "tomato"/>)}
                            subtitle={item.phoneNumbers.length!==0 ? `${item.phoneNumbers[0].number}` : '-'}/>
                        </Card>
                    </View>
                </TouchableWithoutFeedback>
                )}
                listKey = {(item) => {item.key.toString()}}
            />
        )
    }
}