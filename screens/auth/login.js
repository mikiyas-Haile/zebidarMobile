import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginComponent (props) {
    const [state, setState] = useState({credentials : {username: '',password: '',}})   
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('Token', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }
      
    const Login = (event) => {
        
        event.preventDefault()
        fetch("https://zebidar-api-v2.herokuapp.com/users/accounts/api/auth/login",{
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.credentials)
        })
        .then( data => data.json()).then(
            data => {
                    storeData(data.token)
            window.location.reload()
        }
        )
        .catch(error => console.error())
      }
    const Register = (event) => {
        fetch("https://zebidar-api-v2.herokuapp.com/users/accounts/api/auth/register",{
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.credentials)
        }).then( data => data.json()).then(
            data => {
                if (data.token === 'undefined'){
                    alert("There was an error trying to log you in.")
                }else{
                
                }
            }).then(
                alert("Welcome to Zebidar. Please login to continue.")
                )
                .then(
                    window.location.reload()
                )
        .catch(error => alert(error))
    }
    const inputChanged = (event) =>{
        const cred = state.credentials;
        cred[event.target.name] = event.target.value
        setState({credentials: cred})
    }
    return (
        <div>
            <label>
                Username:
                <input type='text' name='username'
                value={state.credentials.username} 
                onChange={inputChanged}
                />
            </label>
            <br/>
            <label>
                Password:
                <input type='password' name='password'
                value={state.credentials.password} 
                onChange={inputChanged}
                />
            </label>
            <br/>
            <button onClick={Login}>Login</button>
            <button onClick={Register}>Register</button>
        </div>
        )
}
