import {Commentslist} from './groupComments';
import {apiGroupPostCreate} from './apiLookup';
import React, {useState, useEffect} from 'react';
import SendRounded from '@mui/icons-material/SendRounded';
import {TextInput,Pressable, StyleSheet,Dimensions,View,Text,TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get("screen")

export function GroupDetailPostComponent(props){
    var token = props.token
    var groupId = props.groupId
    const [newStatuss, setNewStatuss] = useState([])
    const Ref = React.createRef()
    const handleBackendUpdate = (response, status) =>{
        let tempNewStatuss = [...newStatuss]

        if (status === 201){
            tempNewStatuss.unshift(response)
        setNewStatuss(tempNewStatuss)
          } else {
            console.log("An error occured please try again", status)
          }
        }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = Ref.current.value
        apiGroupPostCreate(newVal, groupId,handleBackendUpdate, token)
        Ref.current.value = ''
      }
    
    return <>
            <View style={{display:'flex'}}>
              {/* <form onSubmit={handleSubmit}>
                <input placeholder='What are you thinking about?' required 
                style={{fontSize:20,border: 'none', width:width/1.4, padding:10,}}    
                ref={Ref}             
                />
                <button type="submit" style={{border:'none', background:'none'}} className='btn'>
                  <SendRounded style={{fontSize:40}}/>
                  </button>
              </form> */}
            </View>
            <Commentslist token={token} groupId={groupId} navigation={props.navigation} newStatuss={newStatuss}/>
          </>
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