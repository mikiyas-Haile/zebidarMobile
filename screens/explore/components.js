import {StatusList} from './explore';
import {apiStatusCreate} from './apiLookup';
import React, {useState, useEffect} from 'react';

export default function ExploreComponent(props){
    var token = props.token
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
        apiStatusCreate(newVal, handleBackendUpdate, token)
        Ref.current.value = ''
        setopen(false)
      }
    
    return <div>
        {/* <button
        style={{height:'100px', backgroundColor: '#2c3e50'}}
        onPress = {() => props.navigation.navigate('Create')}
        >New Post</button> */}
        
        {/* { open === true ? <form onSubmit={handleSubmit}>
        <textarea required ref={Ref} className='form-control'>

        </textarea>
        <button type="submit" className='btn'>Post</button>
    </form>: <button onClick={newPost}>New Post</button> } */}
    <StatusList token={token} navigation={props.navigation} newStatuss={newStatuss}/>
    </div>
}