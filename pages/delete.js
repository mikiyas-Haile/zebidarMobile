
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
export function StatusDelete(route , props) {
    var statusId = route.route.params.statusId
    var token = route.route.params.token
    const [state, setState] = useState({credentials : {body: ''}})   
    const Login = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8000/api/status/${statusId}/delete`,{
        method: "DELETE", 
        headers: {'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    },
        body: JSON.stringify(state.credentials)
        })
        .then( data => data.json()).then(
            data => {
                console.log(data)
            }
        ).then(
            
            window.location.reload()
        )
        .catch(error => console.error())
      }
    return (
        <View>
            <h2>Are you sure you want to Delete this post?</h2>
            <br/>
            <button  onClick={Login}>Delete</button>
        </View>
    )
}
const styles = StyleSheet.create({
    inputStyle:{
        backgroundColor:"white",
        borderColor:"#2c3e50",
        border: 'none',
        padding: '0',
        margin: '20px',
        color: '#2c3e50'
    },

})