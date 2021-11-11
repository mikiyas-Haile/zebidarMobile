import React, {useEffect, useState} from 'react';
import {apiStatusCommentCreate} from '../posts/apiLookup'
import {Dimensions, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {url} from '../urls'
const host = url()
const {width, height} = Dimensions.get("screen")

export function CreateStatusComment(props) {
    console.log(props)
    var token = props.token
    var statusId = props.statusId
    const Ref = React.createRef()
    const handleBackendUpdate = (response, status) =>{
        if (status === 201){
            window.location.reload()
          } else {
            console.log(response, status)
          }
        }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = Ref.current.value
        apiStatusCommentCreate(newVal, statusId,handleBackendUpdate, token)
      }
    
    return <View style={{backgroundColor:'white',height:height,dislay:'flex'}}>
      {/* <form onSubmit={handleSubmit}>
        <input placeholder='What are you thinking about?' required 
        style={{fontSize:20,backgroundColor:"white",border: 'none', width:width, padding:20,}}    
        ref={Ref}             
        />
        <hr/>
        <button style={{bottom:70,borderRadius:'100%',color: '#2c3e50',right:0,position: 'absolute',border:'1px solid #fe2c55'}} type="submit" className='btn'><FontAwesomeIcon size={ 50 } icon={faPaperPlane} /></button>
    </form> */}
    </View>
}