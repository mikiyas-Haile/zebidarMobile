import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, Button,View } from 'react-native';
import {GetFormattedDate} from '../getTime';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import VerifiedIcon from '@mui/icons-material/Verified';
import {apiGroupPostList} from './apiLookup'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faComment, faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {url} from '../urls'
const host = url()


export function Commentslist(props){
    var groupId = props.groupId
    var token = props.token

  const [CommentsInit, setCommentsInit] = useState([])
    const [Comments, setComments] = useState([])
    const [statussDidSet, setstatussDidSet] = useState(false)
    useEffect(()=>{
      const final = [...props.newStatuss].concat(CommentsInit)
      if (final.length !== Comments.length) {
        setComments(final)
      }
    }, [props.newStatuss, Comments, CommentsInit])
    useEffect(()=>{
      if (statussDidSet === false){
      const myCallback = (response, status) => {
          setCommentsInit(response)
          setstatussDidSet(true)
      }
      apiGroupPostList(myCallback, groupId,token)
    }
    }, [CommentsInit, statussDidSet, setstatussDidSet])



    return (<div>
        <center><span>Comments</span></center>
        <hr/><br/>
        {Comments.map((item, index)=>{
            return <><Post token={token} navigation={props.navigation} post={item} key={`${item.id}`}/></>
          })}</div>
    );
  }

function Post(props){
    const {post,token} = props
    return <>
        <div style={ {fontFamily: "Poppins-ExtraLight",borderRadius: '20px',border: '1px solid #fe2c55',margin: '5px',display:'flex',backgroundColor: 'white',} } className="post">
                  <div style={{padding: '10px',display: 'flex',justifyContent: 'spaceBetween'}} className="left-part">
                  <span onClick = {() => props.navigation.navigate('viewProfile', {user:post.author.username})}>
                    <img style={{ display: 'block',marginRight: '5px',borderRadius: '100%'}} src={`${host}${post.author.pfp_url} `} width='40' height='40'/></span>
                  </div>
                  <div className='right-part'>
                      <div style={{paddingBottom: '5px',paddingTop: '5px'}} className="top-part">
                        <span onClick = {() => props.navigation.navigate('viewProfile', {user:post.author.username})}>
                          <PostAuthor  post={post}/>  </span> 
                          <small>
                           <GetFormattedDate  time={post.date_added}/>  ● <ParsedDate date={post.date_added}/></small>
                      </div>
                      <div style={{paddingLeft: '5px',paddingBottom: '8px'}} className="middle-part">
                        <div style={{ fontSize: '16px'}} className='post-body'>
                            <span onClick = {() => props.navigation.navigate('detail', {postId:post.id})} style={{fontSize:20, fontFamily: "Poppins-Bold"}}> {post.body}</span>
                            <center><div id='img'>
                                <PostImg post={post}/>
                            </div></center>
                        </div>
                      </div>
                      <div style={{width:'250px',display: 'flex',justifyContent: 'space-between', color:'#2c3e50'}} className="last-part">
                        <ActionBtns token={token} post={post} action={{type:'like'}}/>
                        <ActionBtns navigation={props.navigation} post={post} action={{type:'comment'}}/>
                        <ActionBtns navigation={props.navigation} post={post} action={{type:'reply'}}/>
                        <ActionBtns navigation={props.navigation} post={post} action={{type:'edit'}}/>
                        <ActionBtns navigation={props.navigation} post={post} post={post} action={{type:'delete'}}/>
                      </div>
                  </div>
              </div>
        </>
}

function ActionBtns(props){
    const {post,action, didPerformAction,token} = props 
    const [hasLiked, setHasLiked] = useState(post.has_liked? post.has_liked : false)
    const [likes, setLikes] = useState(post.likes ? post.likes : 0)
    let comments = post.comments
    
    const handleActionBackendEvent = (response, post) =>{
      if (post === 200){
        setLikes(response.likes? response.likes : likes -1)
      }
    }
    
    const handleClick = (event) =>{
      event.preventDefault()
      if (action.type === 'like'){
        if (hasLiked){
            apipostAction(post.id, 'unlike', token,handleActionBackendEvent)
            setHasLiked(false)
          }else{
            apipostAction(post.id, 'like',token, handleActionBackendEvent)
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
        return <div><div><FontAwesomeIcon onClick = {() => props.navigation.navigate('comment', {postId:post.id})} className='hover:text-red-500' style={{color:'#2c3e50'}} size={ 20 } icon={faComment} /></div></div>
    }else if (action.type === 'reply'){
        return <div><FontAwesomeIcon onClick = {() => props.navigation.navigate('reply', {postId:post.id})} style={{color:'#2c3e50'}} size={ 20 } icon={faShareAlt} /></div>
    }if (post.is_me){
        if (action.type === 'edit'){
            return <div><FontAwesomeIcon onClick = {() => props.navigation.navigate('update', {postId:post.id})} style={{color:'#2c3e50'}} size={ 20 } icon={faEdit} /></div>
        }else if (action.type === 'delete'){
            return <div><FontAwesomeIcon onClick = {() => props.navigation.navigate('delete', {postId:post.id})} style={{color:'#2c3e50'}} size={ 20 } icon={faTrashAlt} /></div>
        }else{
            return ''
        }
    }else{
        return ''
    }
}
  

function PostAuthorProfile(props){
    const {post} = props
    if (post.author.verified){
        return <span><strong style={{fontSize: 15}}> {post.author.first_name} {post.author.last_name}</strong>
            <small style={{fontSize: 15}}>@{post.author.username} <span style={{fontSize:'10px',paddingTop:'4px', color: '#1d9bf0'}} className='material-icons-round'><VerifiedIcon style={{fontSize:15}}/></span></small></span>
    }else{
        return <span><strong style={{fontSize: 15}}> {post.author.first_name} {post.author.last_name}</strong>
            <small style={{fontSize: 15}}>@{post.author.username}</small></span>
    }
}
function PostAuthor(props){
    const {post} = props
    if (post.is_reply){
        const item = "   >   "
        return <span> <PostAuthorProfile post={post}/> {item} <PostAuthorProfile post={post.parent}/></span>
    }else{
        return <PostAuthorProfile post={post}/>

    }
}
function PostImg(props){
    const {post} = props
    if (post.img){
                    <span style={{width:'100%', background:'#efeeee',borderRadius: '20px', display:'block'}} >
                        <img src={`${host}${post.img}`}></img>
                    </span>
    }else{
        return ''
    }

}
function ParsedDate(props){
  var {date} = props
  var d = new Date(date)
  var ddate = d.getFullYear()
  var mmonth = d.getMonth()
  return <span>{mmonth}/{ddate} </span>
}