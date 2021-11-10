import {apiStatusCreate} from '../posts/apiLookup';
import React, {useState, useEffect} from 'react';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {TextInput,Pressable, StyleSheet,Dimensions,View,Text,TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get("screen")

export function StatusCreate(props){
    var token = props.token
    const Ref = React.createRef()
    const handleBackendUpdate = (response, status) =>{
        if (status === 201){
            window.location.reload()
          } else {
            alert("An error occured please try again")
          }
        }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = Ref.current.value
        apiStatusCreate(newVal, handleBackendUpdate, token)
      }
    
    return <div style={{backgroundColor:'white',height:height,dislay:'flex'}}>
      <form onSubmit={handleSubmit}>
        <input placeholder='What are you thinking about?' required 
        style={{fontSize:20,backgroundColor:"white",border: 'none', width:width, padding:20,}}    
        ref={Ref}             
        />
        <hr/>
        <button style={{bottom:70,borderRadius:'100%',color: '#2c3e50',right:0,position: 'absolute',border:'1px solid #fe2c55'}} type="submit" className='btn'><FontAwesomeIcon size={ 50 } icon={faPaperPlane} /></button>
    </form>
    </div>
}