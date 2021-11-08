import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ExploreScreen} from './pages/explore'
import {FeedScreen} from './pages/feed'
import {GroupsScreen} from './pages/groups'
import {NotificationScreen} from './pages/notifications'
import {ProfileScreen} from './pages/profilePage'
const Tab = createBottomTabNavigator();
const homeName = "Home";
const exploreName = "Explore";
const groupsName = "Groups";
const notificationName = "Notification";
const profileName = "Profile";
const Stack = createStackNavigator();
const homeStyles = {
  headerTintColor: "black",
  headerStyle :{
    height:0,
  }
}


function loadProfile(callback,token) {
  console.log(token)
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

export function Home(props) {
  var token = props.route.params.token
  
    const [profile, setProfile] = useState([])
    useEffect(()=>{
        const myCallback = (response, status) => {
          if (status === 200){
            setProfile(response)
          } else {
            alert("There was an error")
          }
        }
        loadProfile(myCallback, token)
      }, [])
    return (
      <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) =>({
          tabBarIcon: ({focused, color, size})=>{
              let iconName;
              let rn = route.name

              if (rn === homeName){
                  iconName = 'home'
                return <Ionicons name={iconName} size={40} color={color}/>

              }else if (rn === exploreName){
                  iconName = 'search'
              return <Ionicons name={iconName} size={40} color={color}/>

              }else if (rn === groupsName){
                  iconName = 'apps'
              return <Ionicons name={iconName} size={40} color={color}/>

              }else if (rn === notificationName){
                  iconName = 'notifications'
              return <Ionicons name={iconName} size={40} color={color}/>

              }else if (rn === profile.username+"'s "+ profileName){
                  return <img style={{ display: 'block',marginRight: '5px',borderRadius: '100%'}} src={`http://localhost:8000${profile.pfp_url} `} width='40' height='40'/>
              }
          }
      })}
      tabBarOptions={{
          activeTintColor:'#fe2c55',
          inactiveTintColor:'#2c3e50',
          labelStyle: { paddingTop:35 },
          style: {padding:30}
      }}
      >
          <Tab.Screen initialParams={{'token':token}} name={homeName} component={FeedScreen} />
          <Tab.Screen initialParams={{'token':token}} name={exploreName} component={ExploreScreen} />
          <Tab.Screen initialParams={{'token':token}} name={groupsName} component={GroupsScreen} />
          <Tab.Screen initialParams={{'token':token}} name={notificationName} component={NotificationScreen} />
          <Tab.Screen initialParams={{'token':token}} name={profile.username+"'s "+ profileName} component={ProfileScreen} />
      </Tab.Navigator>
    );
}
