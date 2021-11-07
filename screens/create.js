
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
function StatusComment(route,navigation , props) {
    var statusId = route.route.params.statusId
    const [state, setState] = useState({credentials : {body: ''}})   
    const Login = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8000/api/status/${statusId}/comment`,{
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.credentials)
        })
        .then( data => data.json()).then(
            data => {
                console.log(data)
            }
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
            <label>
                <input type='text' name='body'
                value={state.credentials.body} 
                onChange={inputChanged}
                />
            </label>
            <br/>
            <button  onClick={Login}>Post</button>
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
export default StatusComment
