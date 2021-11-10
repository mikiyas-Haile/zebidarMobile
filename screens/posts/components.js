import {StatusList} from './feed';
import {apiStatusCreate} from './apiLookup';
import React, {useState, useEffect} from 'react';
import {TextInput,Pressable, StyleSheet,Dimensions,View,Text,TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get("screen")

export default function StatussComponent(props){
  var token = props.token
    const [newStatuss, setNewStatuss] = useState([])
    const Ref = React.createRef()
    const handleBackendUpdate = (response, status) =>{
        let tempNewStatuss = [...newStatuss]
        if (status === 201){
            tempNewStatuss.unshift(response)
        setNewStatuss(tempNewStatuss)
          } else {
            alert("An error occured please try again")
          }
        }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = Ref.current.value
        apiStatusCreate(newVal, handleBackendUpdate, token)
        Ref.current.value = ''
      }
    
    return <div>
      {/* <form onSubmit={handleSubmit}>
        <View>
          <Text>What are you thinking?</Text>
        <TextInput autoComplete  multiline style={styles.input} required ref={Ref}/>
      </View>
        <button type="submit" className='btn'>Post</button>
    </form> */}
    <StatusList token={token} navigation={props.navigation} newStatuss={newStatuss}/>
    </div>
}
const styles= StyleSheet.create({
    button: {
    position:'absolute',
    width:10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 13,
      paddingHorizontal: 25,
      borderRadius: 100,
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
  input:{
    backgroundColor:"white",
    borderWidth:1,
    borderColor:'#2c3e50',
    width: width/1.3,
    padding:10,
    margin:10,
  }
})