import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, ScrollView,View} from 'react-native';
import VerifiedIcon from '@mui/icons-material/Verified';


function loadProfile(callback, token) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "https://zebidar-api-v2.herokuapp.com/users/api/profile/me"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
      console.log(e)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
  }

export default function MyProfile(props) {
  var token = props.token
    const [profile, setProfile] = useState([])
    useEffect(()=>{
        const myCallback = (response, status) => {
          if (status === 200){
            setProfile(response)
            console.log(response)
          } else {
            alert("There was an error")
          }
        }
        loadProfile(myCallback, token)
      }, [])
    return (
        <ScrollView>
            <FormattedProfile UserProfile={profile}/>
        </ScrollView>
    )
}
 function FormattedProfile(props){
   const {UserProfile} = props
   return (
     <div style={{display:'flex'}}>
        <UserPfp UserProfile={UserProfile}/>
        <Username UserProfile={UserProfile}/>
     </div>
   )
 }

function Username(props){
  const {UserProfile} = props
  const verified_user = <div style={{fontSize:'18px',paddingTop:'10px'}}>
              <strong>{UserProfile.first_name} {UserProfile.last_name} </strong>@
              <small>{UserProfile.username} </small>
              <span style={{fontSize:'20px',paddingTop:'4px', color: '#1d9bf0'}} className='material-icons-round'><VerifiedIcon style={{fontSize:'20px'}}/></span>
              <UserBio UserProfile={UserProfile}/> 
              <ProfileLinks UserProfile={UserProfile}/>
            </div>
  const underverified_user =  <div style={{fontSize:'18px',paddingTop:'10px'}}>
            <strong>{UserProfile.first_name} {UserProfile.last_name} </strong>@
            <small>{UserProfile.username} </small>
            <UserBio UserProfile={UserProfile}/>
            <ProfileLinks UserProfile={UserProfile}/>
        </div>
  if (UserProfile.verified){
    return verified_user
  }else{
    return underverified_user
  }
}
function ProfileLinks(props){
  const {UserProfile} = props
  if (UserProfile.is_my_profile){
    return <div><button id='follow_btn'>Edit Profile</button></div>
  }else{
    return ''
  }
}
function UserBio(props){
  const {UserProfile} = props
  if (UserProfile.bio){
    return <span><small>{UserProfile.bio}</small></span>
  }else{
      return ' '
  }
}

function UserPfp(props){
  const {UserProfile} = props
  return (
    <div style={{padding:'5px', width:'120px'}}>
      <img style={{border:'1px solid #fe2c55', borderRadius: '100%'}} src={`http://localhost:8000${UserProfile.pfp_url} `} width='100' height='100'/>
    </div>
  )
}