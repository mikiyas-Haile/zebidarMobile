
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {url} from '../urls'
const host = url()
export function StatusUpdate(route,navigation , props) {
    var token = route.route.params.token
    var statusId = route.route.params.statusId
    const [state, setState] = useState({credentials : {body: ''}})   
    const Login = (event) => {
        event.preventDefault()
        fetch(`${host}/api/status/${statusId}/update`,{
        method: "PUT", 
        headers: {'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
    },
        body: JSON.stringify(state.credentials)
        })
        .then( data => data.json()).then(
            data => {
                console.log(data)
            }
        )
        .then(
            
            window.location.reload()
        )
        .catch(error => console.error())
      }
    
    const inputChanged = (event) =>{
        const cred = state.credentials;
        cred[event.target.name] = event.target.value
        setState({credentials: cred})
    }
    return (
        <View>
            <View>
                <TextInput type='text' name='body'
                value={state.credentials.body} 
                onChange={inputChanged}
                />
            </View>
            <Button  onPress={Login}>Post</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    inputStyle:{
        backgroundColor:"white",
        borderColor:"#2c3e50",
        padding: '0',
        margin: '20px',
        color: '#2c3e50'
    },

})