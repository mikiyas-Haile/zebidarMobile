import React, {useState, useEffect,useContext} from 'react';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { StyleSheet, Text, Button,View } from 'react-native';
import {Card} from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faComment, faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import VerifiedIcon from '@mui/icons-material/Verified';

import {apiStatusAction} from './posts/apiLookup'

function loadStatuss(callback,statusId) {
  const xhr = new XMLHttpRequest()
  const method = 'GET' // "POST"
  const url = `http://localhost:8000/api/status/${statusId}`
  const responseType = "json"
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function (e) {
    console.log(e)
    callback({"message": "The request was an error"}, 400)
  }
  xhr.send()
}


function StatusDetail(props){
  var statusId = props.route.params.statusId
  const [status, setstatus] = useState([])
  const [author, setAuthor] = useState([])
  const [parent, setParent] = useState([])
  const [parentAuthor, setParentAuthor] = useState([])
  useEffect(()=>{
    const myCallback = (response, status) => {
      if (status === 200){
        setstatus(response)
        console.log(response)
        setAuthor(response.author)
        if (response.is_reply){
          setParent(response.parent)
        setParentAuthor(response.parent.author)
        }else{
          setParent('')
          setParentAuthor('')
        }
        
      } else {
        alert("There was an error")
      }
    }
    loadStatuss(myCallback, statusId)
  }, [])
  return <div style={ {fontFamily: "Poppins-ExtraLight",borderRadius: '20px',border: '1px solid #fe2c55',margin: '5px',display:'flex',backgroundColor: 'white',} } className='status'>
          <div style={{padding: '5px',display: 'flex',justifyContent: 'spaceBetween'}} className="left-part">
            <img style={{ display: 'block',marginRight: '5px',borderRadius: '100%'}} className='rounded-circle' src={`http://localhost:8000${author.pfp_url} `} width='40' height='40'/>
          </div>
          <div className="right-part">
            <div style={{paddingBottom: '5px',paddingTop: '5px'}} className="top-part">
              <StatusAuthor parentAuthor={parentAuthor} author={author} status={status}/>
            </div>
            <div style={{paddingLeft: '5px',paddingBottom: '8px'}} className="middle-part">
              <div style={{ fontSize: '16px'}} className='status-body'>
                {status.body}
                <center><div id='img'>
                    <StatusImg status={status}/>
                </div></center>
              </div>
            </div>
            <div style={{width:'250px',display: 'flex',justifyContent: 'space-between', color:'#2c3e50'}} className='last-part'>
              <ActionBtns  status={status} action={{type:'like'}}/>
              <ActionBtns navigation={props.navigation} status={status} action={{type:'comment'}}/>
              <ActionBtns status={status} action={{type:'reply'}}/>
              <ActionBtns status={status} action={{type:'edit'}}/>
              <ActionBtns status={status} action={{type:'delete'}}/>
            </div>
          </div>
        </div>
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
      return <a href={`/status/${status.id}/share`}><div><FontAwesomeIcon style={{color:'#2c3e50'}} size={ 20 } icon={faShareAlt} /></div></a> 
  }if (status.is_me){
      if (action.type === 'edit'){
          return <a href={`/status/edit/${status.id}`}><FontAwesomeIcon style={{color:'#2c3e50'}} size={ 20 } icon={faEdit} /></a>
      }else if (action.type === 'delete'){
          return <a href={`/status/${status.id}/delete`}><FontAwesomeIcon style={{color:'#2c3e50'}} size={ 20 } icon={faTrashAlt} /></a>
      }else{
          return ''
      }
  }else{
      return ''
  }
}
function StatusImg(props){
  const {status} = props
  if (status.img){
                  <span style={{width:'100%', background:'#efeeee',borderRadius: '20px', display:'block'}} >
                      <img src={`${status.img}`}></img>
                  </span>
  }else{
      return ''
  }

}
function StatusAuthor(props){
  const {status, author, parentAuthor} = props
  if (status.is_reply){
      const item = "   >   "
      return <span> <StatusAuthorProfile status={status} author={author}/> {item} <StatusAuthorProfile status={status} author={parentAuthor}/></span>
  }else{
      return <StatusAuthorProfile status={status} author={author}/>

  }
}
function StatusAuthorProfile(props){
  const {author} = props

  if (author.verified){
      return <span><strong> {author.first_name} {author.last_name}</strong>
          <small>@{author.username} <span style={{fontSize:'10px',paddingTop:'4px', color: '#1d9bf0'}} className='material-icons-round'><VerifiedIcon style={{fontSize:'13px'}}/></span></small></span>
  }else{
      return <span><strong> {author.first_name} {author.last_name}</strong>
          <small>@{author.username}</small></span>
  }
}
const styles = StyleSheet.create({

});

export default StatusDetail