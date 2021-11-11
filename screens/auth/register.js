import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../urls'
import {StyleSheet,View,TextInput, Dimensions,Pressable,Text} from 'react-native'
const {width, height} = Dimensions.get("screen")
const host = url()
export function RegisterComponent (props) {
    const [state, setState] = useState({credentials : {username: '',password: '',}})   
    const [nameTaken, setnameTaken] = useState(false)
    const [UsernameEmpty,setUsernameEmpty] = useState(false)
    const [PasswordEmpty,setPasswordEmpty] = useState(false)
    const Register = (event) => {
        fetch(`${host}/users/accounts/api/auth/register`,{
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.credentials)
        }).then( data => data.json()).then(
            data => {
                console.log(data.username.replace("[", '').replace("]", ''))
                if (data.username){
                    setnameTaken(true)
                }else if (data.user){
                    alert("Welcome to zebidar! Login to continue.")
                    setnameTaken(false)
                    window.location.reload()
                }
                else if (data.token){
                    setincorrectLogin(false)
                    window.location.reload()
                }else if (data.password){
                    setPasswordEmpty(true)
                }else if (data.username.replace("[", '').replace("]", '').replace('"', '').replace('"', '') === "This field may not be blank."){
                    setUsernameEmpty(true)
                }
                
            })
        .catch(error => console.error())
    }
    const inputChanged = (event) =>{
        const cred = state.credentials;
        cred[event.target.name] = event.target.value
        setState({credentials: cred})
    }
    return (
        <View>
            <Text>Join Zebidar today.</Text>
            {nameTaken ? <View style={{backgroundColor:"orange", height:50, alignItems:'center', justifyContent:'center', margin:20, borderRadius:20}}>
                <Text>Username is already taken Please try another one.</Text></View>: null}
            <View>
                <TextInput placeholder='Username' style={{width:width/1.3, padding:10, margin:10}} type='text' name='username'
                value={state.credentials.username} 
                onChange={inputChanged}
                />
            </View>
            {UsernameEmpty ? <View style={{backgroundColor:"orange", height:50, alignItems:'center', justifyContent:'center', margin:20, borderRadius:20}}>
                <Text>Please enter your Username</Text>
            </View>: null}
            <View>
               <TextInput placeholder='Password' style={{width:width/1.3, padding:10, margin:10}} type='password' name='password'
                value={state.credentials.password} 
                onChange={inputChanged}
                />
            </View>
            {PasswordEmpty ? <View style={{backgroundColor:"orange", height:50, alignItems:'center', justifyContent:'center', margin:20, borderRadius:20}}><Text>Please enter your password</Text></View>: null}
            
            <Pressable style={styles.button} onPress={Register}>
              <Text style={styles.text}>Register</Text>
          </Pressable>
          <Text style={{fontSize:20}}>Already have an account?</Text>
          <Pressable style={styles.button} onPress={() => props.navigation.navigate('login')}>
              <Text style={styles.text}>Login</Text>
          </Pressable>
        </View>
        )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      margin:20,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#2c3e50',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });