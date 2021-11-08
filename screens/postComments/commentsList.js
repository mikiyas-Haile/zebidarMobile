import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, Button,View } from 'react-native';
import {GetFormattedDate} from '../getTime';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import VerifiedIcon from '@mui/icons-material/Verified';

import apiStatusAction from '../posts/apiLookup'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faComment, faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
function loadComments(callback,token,statusId) {
  const xhr = new XMLHttpRequest()
  const method = 'GET' // "POST"
  const url = `https://zebidar-api-v2.herokuapp.com/api/status/${statusId}/comments`
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


export function Commentslist(props){
    const [Comments, setComments] = useState([])
    var statusId = props.statusId
    var token = props.token
    useEffect(()=>{
      const myCallback = (response, status) => {
        if (status === 200){
          setComments(response)
        } else {
          alert("There was an error")
        }
      }
      loadComments(myCallback, token,statusId)
    }, [])
    return (<div>
      {Comments.map((item, index)=>{
        return <View><Status navigation={props.navigation} status={item} key={`${index}`}/>
        </View>
      })}</div>
    );
  }
function Comment(props){
  const {Comment} = props
  return (
    <Status />
    )
}

function ActionBtns(props){
  const {status,action, didPerformAction} = props 
  const [hasLiked, setHasLiked] = useState(status.has_liked? status.has_liked : false)
  const [likes, setLikes] = useState(status.likes ? status.likes : 0)
  let comments = status.comments
  
  const handleActionBackendEvent = (response, status) =>{
    if (status === 200){
      setLikes(response.likes? response.likes : likes -1)
    }
  }
  
  const handleClick = (event) =>{
    event.preventDefault()
    if (action.type === 'like'){
      if (hasLiked){
          apiStatusAction(status.id, 'unlike', handleActionBackendEvent)
          setHasLiked(false)
        }else{
          apiStatusAction(status.id, 'like', handleActionBackendEvent)
          setHasLiked(true)
        }
    }
  }
  if (action.type === 'like'){
      if (hasLiked === true){
          return <div><div><span onClick={handleClick} style={{fontSize: '20px'}} className='material-icons-round'><FavoriteRoundedIcon/></span></div></div>
      }else{
      return <div><div><span onClick={handleClick} style={{fontSize: '20px'}} className='material-icons-outlined'><FavoriteBorderRoundedIcon/></span></div></div>
  }
  }else if (action.type === 'comment'){
      return <div><div><FontAwesomeIcon onClick = {() => props.navigation.navigate('comment', {statusId:status.id})} className='hover:text-red-500' style={{color:'#2c3e50'}} size={ 20 } icon={faComment} /></div></div>
  }else if (action.type === 'reply'){
      return <div><FontAwesomeIcon onClick = {() => props.navigation.navigate('reply', {statusId:status.id})} style={{color:'#2c3e50'}} size={ 20 } icon={faShareAlt} /></div>
  }if (status.is_me){
      if (action.type === 'edit'){
          return <div><FontAwesomeIcon onClick = {() => props.navigation.navigate('update', {statusId:status.id})} style={{color:'#2c3e50'}} size={ 20 } icon={faEdit} /></div>
      }else if (action.type === 'delete'){
          return <div><FontAwesomeIcon onClick = {() => props.navigation.navigate('delete', {statusId:status.id})} style={{color:'#2c3e50'}} size={ 20 } icon={faTrashAlt} /></div>
      }else{
          return ''
      }
  }else{
      return ''
  }
}


function StatusAuthorProfile(props){
  const {status} = props
  if (status.author.verified){
      return <span><strong style={{fontSize: '13px'}}> {status.author.first_name} {status.author.last_name}</strong>
          <small style={{fontSize: '13px'}}>@{status.author.username} <span style={{fontSize:'10px',paddingTop:'4px', color: '#1d9bf0'}} className='material-icons-round'><VerifiedIcon style={{fontSize:'13px'}}/></span></small></span>
  }else{
      return <span><strong style={{fontSize: '13px'}}> {status.author.first_name} {status.author.last_name}</strong>
          <small style={{fontSize: '13px'}}>@{status.author.username}</small></span>
  }
}
function StatusAuthor(props){
  const {status} = props
  if (status.is_reply){
      const item = "   >   "
      return <span> <StatusAuthorProfile status={status}/> {item} <StatusAuthorProfile status={status.parent}/></span>
  }else{
      return <StatusAuthorProfile status={status}/>

  }
}
function StatusImg(props){
  const {status} = props
  if (status.img){
      return <a href={`${status.img}`}>
                  <span style={{width:'100%', background:'#efeeee',borderRadius: '20px', display:'block'}} >
                      <img src={`${status.img}`}></img>
                  </span>
              </a>
  }else{
      return ''
  }

}
function Status(props){
  const {status} = props
        return <div style={ {fontFamily: "Poppins-ExtraLight",borderRadius: '20px',border: '1px solid #fe2c55',margin: '5px',display:'flex',backgroundColor: 'white',} } className="status">
                <div style={{padding: '5px',display: 'flex',justifyContent: 'spaceBetween'}} className="left-part">
                        <img style={{ display: 'block',marginRight: '5px',borderRadius: '100%'}} src={`http://localhost:8000${status.author.pfp_url} `} width='40' height='40'/>
                </div>
                <div className='right-part'>
                    <div style={{paddingBottom: '5px',paddingTop: '5px'}} className="top-part">
                      <StatusAuthor  status={status}/> <small> <GetFormattedDate  time={status.date_added}/></small>
                    </div>
                    <div style={{paddingLeft: '5px',paddingBottom: '8px'}} className="middle-part">
                      <div style={{ fontSize: '16px'}} className='status-body'>
                          <span onClick = {() => props.navigation.navigate('detail', {statusId:status.id})}> {status.body}</span>
                          <center><div id='img'>
                              <StatusImg status={status}/>
                          </div></center>
                      </div>
                    </div>
                    <div style={{width:'250px',display: 'flex',justifyContent: 'space-between', color:'#2c3e50'}} className="last-part">
                      <ActionBtns  status={status} action={{type:'like'}}/>
                      <ActionBtns navigation={props.navigation} status={status} action={{type:'comment'}}/>
                      <ActionBtns navigation={props.navigation} status={status} action={{type:'reply'}}/>
                      <ActionBtns navigation={props.navigation} status={status} action={{type:'edit'}}/>
                      <ActionBtns navigation={props.navigation} status={status} status={status} action={{type:'delete'}}/>
                    </div>
                </div>
            </div>
}
export default Commentslist