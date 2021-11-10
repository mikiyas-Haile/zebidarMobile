import loadGroups from './notificationLookup'
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faComment, faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {GetFormattedDate} from '../getTime'
import VerifiedIcon from '@mui/icons-material/Verified';
import {url} from '../urls'
const host = url()
export function Notificationslist(props){
  var token = props.token
    const [allNotifications, setAllNotifications] = useState([])
  
    useEffect(()=>{
      const myCallback = (response, status) => {
        if (status === 200){
          setAllNotifications(response.total_notifications)
        } else {
          alert("There was an error")
        }
      }
      loadGroups(myCallback, token)
    }, [])
    return (
      <ScrollView>
      <FlatList
      data={allNotifications}
      renderItem={({item})=>(
        <div style={{border: "1px solid #fe2c55",borderRadius: '10px',margin: '10px', padding: '10px',background: 'white'}} className='noti'>
                  <TouchableOpacity>
                    <LikeNotification notification={item}/>
                  </TouchableOpacity>
              </div>
      )}
      />
      </ScrollView>
    );
  }

function LikeNotification(props){
  const {notification} = props
  if (notification.type == 'like'){
    var date = new Date(notification.date)
    var NewDate = <small><GetFormattedDate time={date}/></small>
    return <div>
            <div style={{ display:'flex'}}>
              <ProfilePic notification={notification}/>
              <StatusFromUserProfile notification={notification}/> <span> has liked your Post.</span>
            </div>
              <div>{NewDate}</div>
          </div>
  }else if (notification.type == 'like_comment'){
    var date = new Date(notification.date)
    var NewDate = <small><GetFormattedDate time={date}/></small>
    return <div>
            <div style={{ display:'flex'}}>
              <ProfilePic notification={notification}/>
              <StatusFromUserProfile notification={notification}/> <span> has liked your Comment.</span>
            </div>
              <div>{NewDate}</div>
          </div>
  }else if (notification.type == 'comment'){
    var date = new Date(notification.date)
    var NewDate = <small><GetFormattedDate time={date}/></small>
    return <div>
            <div style={{ display:'flex'}}>
              <ProfilePic notification={notification}/>
              <StatusFromUserProfile notification={notification}/>  <span> has Commented on your Post.</span>
            </div>
              <div>{NewDate}</div>
          </div>
  }else if (notification.type == 'share'){
    var date = new Date(notification.date)
    var NewDate = <small><GetFormattedDate time={date}/></small>
    return <div>
            <div style={{ display:'flex'}}>
              <ProfilePic notification={notification}/>
              <StatusFromUserProfile notification={notification}/> <span> has Shared your Post.</span>
            </div>
              <div>{NewDate}</div>
          </div>
  }else if (notification.type == 'follow'){
    var date = new Date(notification.date)
    var NewDate = <small><GetFormattedDate time={date}/></small>
    return <div>
            <div style={{ display:'flex'}}>
              <ProfilePic notification={notification}/>
              <StatusFromUserProfile notification={notification}/> <span> has started following you.</span>
            </div>
              <div>{NewDate}</div>
          </div>
  }else if (notification.type == 'unfollow'){
    var date = new Date(notification.date)
    var NewDate = <small><GetFormattedDate time={date}/></small>
    return <div>
            <div style={{ display:'flex'}}>
              <ProfilePic notification={notification}/>
              <StatusFromUserProfile notification={notification}/> <span> has Unfollowed you.</span>
            </div>
              <div>{NewDate}</div>
          </div>
  }
}
function StatusFromUserProfile(props){
  const {notification} = props
  if (notification.from_user.verified){
      return <span>
              <strong>{notification.from_user.first_name} {notification.from_user.last_name}</strong>
              <small>{notification.from_user.username} <span style={{fontSize:'10px',paddingTop:'4px', color: '#1d9bf0'}} className='material-icons-round'><VerifiedIcon style={{fontSize:'13px'}}/></span></small>
            </span> 
    }else{
      return <span><strong style={{fontSize: '13px'}}> {notification.from_user.first_name} {notification.from_user.last_name}</strong>
      <small style={{fontSize: '13px'}}>@{notification.from_user.username}</small></span>
    }
}
function ProfilePic(props){
  const {notification} = props
  return <img style={{ display: 'block',marginRight: '5px',borderRadius: '100%'}} src={`${host}${notification.from_user.pfp_url} `} width='40' height='40'/>
}
export default Notificationslist