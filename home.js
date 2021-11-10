import React, {useEffect, useState} from 'react';
import {Dimensions,StyleSheet,TouchableOpacity,Pressable,Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ExploreScreen} from './pages/explore'
import {FeedScreen} from './pages/feed'
import {GroupsScreen} from './pages/groups'
import {NotificationScreen} from './pages/notifications'
import {ProfileScreen} from './pages/profilePage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from './urls'
const host = url()
const {width, height} = Dimensions.get("screen")

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
const navbarStyles = {
  headerTintColor: "black",
  headerStyle :{
    height:40,
  }
}

function loadProfile(callback,token) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = `${host}/users/api/profile/me`
    
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
          if (status===403){
            AsyncStorage.removeItem("Token");
            window.location.reload()
            }
          else if (status === 200){
            setProfile(response)
          } else if (status === 403) {
            alert("You are not logged in. Please Login to Zebidar.")
          }
        }
        loadProfile(myCallback, token)
      }, [])
    return (<>
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
                          return <img style={{ display: 'block',marginRight: '5px',borderRadius: '100%'}} src={`${host}${profile.pfp_url} `} width='40' height='40'/>
                      }
                  }
              })}
              tabBarOptions={{
                  activeTintColor:'#fe2c55',
                  inactiveTintColor:'#2c3e50',
                  labelStyle: {  },
                  style: {}
              }}
              >
                  <Tab.Screen  options={navbarStyles} initialParams={{'token':token}} name={homeName} component={FeedScreen} />
                  <Tab.Screen options={navbarStyles} initialParams={{'token':token}} name={exploreName} component={ExploreScreen} />
                  <Tab.Screen options={navbarStyles} initialParams={{'token':token}} name={groupsName} component={GroupsScreen} />
                  <Tab.Screen options={navbarStyles} initialParams={{'token':token}} name={notificationName} component={NotificationScreen} />
                  <Tab.Screen options={navbarStyles} initialParams={{'token':token}} name={profile.username+"'s "+ profileName} component={ProfileScreen} />
              </Tab.Navigator>
              <img style={{position:'absolute',top:'0',right:'0',borderRadius: '100%'}} src={require('./assets/icon.png')} width='40' height='40'/>

              <Pressable style={styles.button}>
                <TouchableOpacity>
                      <Text onClick = {() => props.navigation.navigate('createPost')} style={styles.text}>+</Text>
                </TouchableOpacity>
              </Pressable>
            </>
            );
    
}

const styles= StyleSheet.create({
  button: {
    position: 'absolute',
    right:0,
    bottom:65,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    paddingBottom:30,
    borderRadius: 100,
    backgroundColor: '#2c3e50',
  },
  text: {
    fontSize: 40,
    lineHeight: 21,
    color: 'white',
  },
input:{
  backgroundColor:"white",
  borderWidth:1,
  borderColor:'#2c3e50',
  width: width/1.3,
  padding:10,
  margin:10,
}
})