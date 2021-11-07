import {StatusList} from './feed';
import {apiStatusCreate} from './apiLookup';
import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export default function StatussComponent(props){
    const [open, setopen] = useState(false)
    const newPost = (event) =>{
        setopen(true)
    }
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
        apiStatusCreate(newVal, handleBackendUpdate)
        Ref.current.value = ''
        setopen(false)
      }
    
    return <div>
        { open === true ? <form onSubmit={handleSubmit}>
        <textarea required ref={Ref} className='form-control'>

        </textarea>
        <button type="submit" className='btn'>Post</button>
    </form>: <button onClick={newPost}>New Post</button> }
    <ScrollView>
    <StatusList navigation={props.navigation} newStatuss={newStatuss}/>
      </ScrollView>
    </div>
}