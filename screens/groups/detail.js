import React, {useState, useEffect,useContext} from 'react';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { StyleSheet, Text, Button,View } from 'react-native';
import {Card} from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faComment, faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import VerifiedIcon from '@mui/icons-material/Verified';
import {GetFormattedDate} from '../getTime';
import {url} from '../urls'
import {apiGroupAction} from './apiLookup'
const host = url()
import {apiStatusAction} from '../posts/apiLookup'

  function ParsedDate(props){
    var {date} = props
    var d = new Date(date)
    var ddate = d.getFullYear()
    var mmonth = d.getMonth()
    return <Text>{mmonth}/{ddate} </Text>
  }
export function GroupDetail(props){
  var group = props.group
  var token = props.token
  
  return (
    <Group token={token} navigation={props.navigation} group={group} key={`${group.id}`}/>
  )
}
function ProfileImg(props){
  const {group} = props
  return <View style={{display: 'block',width: '55px',marginRight: '5px', background: '#fe2c55',borderRadius: '10%', fontSize: '35px'}} className="group_name">
    <Text style={{color: 'white',display: 'flex', justifyContent: 'center'}}>{group.title[0]}</Text>
    </View>
}

function ActionBtns(props){
  const {group,action, didPerformAction,token} = props 
  const [hasLiked, setHasLiked] = useState(group.has_liked? group.has_liked : false)
  const [likes, setLikes] = useState(group.likes ? group.likes : 0)

  const handleActionBackendEvent = (response, group) =>{
    if (group === 200){
      setLikes(response.likes? response.likes : likes -1)
    }
  }
  
  const handleClick = (event) =>{
    event.preventDefault()
    if (action.type === 'like'){
      if (hasLiked){
          apiGroupAction(group.id, 'unlike',token, handleActionBackendEvent)
          setHasLiked(false)
        }else{
          apiGroupAction(group.id, 'like',token, handleActionBackendEvent)
          setHasLiked(true)
        }
    }
  }
    if (action.type === 'like'){
      if (hasLiked === true){
        return <Text><Text onClick={handleClick} style={{fontSize:'30px', paddingRight:'10px'}}>{likes }</Text><Text onClick={handleClick} style={{color: '#2c3e50',paddingRight:'100px'}} className="material-icons"><FavoriteRoundedIcon size={30}/></Text></Text>
      }else{
        return <Text><Text onClick={handleClick} style={{fontSize:'30px', paddingRight:'10px'}}>{likes }</Text><Text onClick={handleClick} style={{color: '#2c3e50',paddingRight:'100px'}} className="material-icons-outlined"><FavoriteBorderRoundedIcon size={30}/></Text></Text>
      }
    }else{
        return ''
    }
}

function Group(props){
  const {group,token, navigation} = props
  return <View style={{padding: '3px'}} className='padding'>
    <View style={{display: 'flex', border: '1px solid #fe2c55',backgroundColor: 'white', padding: '10px'}} className='cats'>
      <View className="right-part">
          <View className='middle-part' style={{display:'flex',paddingTop: '5px',paddingBottom: '10px'}}>
            <ProfileImg group={group}/>
            <Text style={{fontSize:'30px'}}>{ group.title }</Text>
          </View>
        <View >{group.about}</View>
        <ActionBtns token={token} group={group} action={{type:'like'}}/>
        <Text style={{fontSize:'30px', paddingRight:'10px'}}>{ group.posts }</Text>
        <FontAwesomeIcon onClick = {() => props.navigation.navigate('comment')} className='hover:text-red-500' style={{color:'#2c3e50'}} size={ 20 } icon={faComment} />
        {/* <Text style={{fontSize:'30px', float:'right'}}>view</Text> */}
      </View>
    </View>
    </View>
}

const styles = StyleSheet.create({

});
