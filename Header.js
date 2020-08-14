import React from 'react'
import { Appbar } from 'react-native-paper';

export let Header = props => {
    return (
        <Appbar.Header style = {{backgroundColor : "#342e2e"}}>
          <Appbar.Content title = {props.title} />
        </Appbar.Header>
    )
}

